#!/usr/bin/env ts-node

/**
 * Test Extension System
 *
 * Standalone test to verify DomainLoader and ConfigManager work correctly.
 *
 * Usage:
 *   ts-node test-extension-system.ts
 *
 * Expected: Creates test fixtures, loads them, and reports success/failure
 */

import * as fs from 'fs';
import * as path from 'path';
import { DomainLoader, DomainManifest } from './domain-loader';
import { ConfigManager, ProjectConfig } from './config-manager';

// Test configuration
const TEST_DIR = path.join(__dirname, '../../../test-fixtures');
const EXTENSIONS_DIR = path.join(TEST_DIR, 'extensions');
const TEST_EXTENSION_DIR = path.join(EXTENSIONS_DIR, 'test-extension');
const SCHEMAS_DIR = path.join(__dirname, '../../schemas');
const CONFIG_PATH = path.join(TEST_DIR, 'config.json');

/**
 * Clean up test fixtures
 */
function cleanup() {
  if (fs.existsSync(TEST_DIR)) {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
  }
}

/**
 * Create test fixtures
 */
function createTestFixtures() {
  console.log('📁 Creating test fixtures...');

  // Create directories
  fs.mkdirSync(TEST_EXTENSION_DIR, { recursive: true });
  fs.mkdirSync(path.join(TEST_EXTENSION_DIR, 'agents'), { recursive: true });
  fs.mkdirSync(path.join(TEST_EXTENSION_DIR, 'skills'), { recursive: true });
  fs.mkdirSync(path.join(TEST_EXTENSION_DIR, 'patterns'), { recursive: true });

  // Create test domain.json
  const domainManifest: DomainManifest = {
    name: 'test-extension',
    version: '1.0.0',
    type: 'extension',
    description: 'Test extension for validation',
    author: 'Test Suite',
    components: {
      agents: [
        {
          name: 'test-agent',
          path: 'agents/test-agent.md',
          description: 'A test agent',
          tier: 'tier1',
        },
      ],
      skills: [
        {
          name: 'test-skill',
          path: 'skills/test-skill.md',
          description: 'A test skill',
          tier: 'tier1',
          triggers: ['test', 'demo'],
        },
      ],
      patterns: [
        {
          name: 'test_pattern',
          path: 'patterns/test_pattern.md',
          description: 'A test pattern',
          category: 'content',
          tier: 'tier2',
        },
      ],
    },
    features: {
      teaching: false,
      demo: true,
      workflows: false,
      mcp: false,
    },
    tier: {
      tier1: ['test-agent', 'test-skill'],
      tier2: ['test_pattern'],
      tier3: [],
    },
  };

  fs.writeFileSync(
    path.join(TEST_EXTENSION_DIR, 'domain.json'),
    JSON.stringify(domainManifest, null, 2)
  );

  // Create test component files
  fs.writeFileSync(
    path.join(TEST_EXTENSION_DIR, 'agents/test-agent.md'),
    '# Test Agent\n\nA simple test agent for validation.'
  );

  fs.writeFileSync(
    path.join(TEST_EXTENSION_DIR, 'skills/test-skill.md'),
    '# Test Skill\n\nA simple test skill for validation.'
  );

  fs.writeFileSync(
    path.join(TEST_EXTENSION_DIR, 'patterns/test_pattern.md'),
    '# Test Pattern\n\nA simple test pattern for validation.'
  );

  // Create test config.json
  const projectConfig: ProjectConfig = {
    project: {
      name: 'test-project',
      version: '1.0.0',
      description: 'Test project for validation',
    },
    extensions: [
      {
        name: 'test-extension',
        enabled: true,
      },
    ],
    features: {
      teaching: false,
      demo: true,
      workflows: false,
      mcp: false,
    },
    tier: {
      mode: 'balanced',
    },
    performance: {
      caching: true,
      parallelLoading: false,
      lazyLoading: false,
    },
    model: {
      default: 'sonnet',
    },
  };

  fs.writeFileSync(CONFIG_PATH, JSON.stringify(projectConfig, null, 2));

  console.log('✅ Test fixtures created');
}

/**
 * Test ConfigManager
 */
async function testConfigManager(): Promise<boolean> {
  console.log('\n🧪 Testing ConfigManager...');

  try {
    const configManager = new ConfigManager(CONFIG_PATH, SCHEMAS_DIR);

    // Load config
    const config = configManager.loadConfig();
    console.log('  ✓ Config loaded successfully');

    // Test getEnabledExtensions
    const enabledExtensions = configManager.getEnabledExtensions();
    if (enabledExtensions.length !== 1 || enabledExtensions[0] !== 'test-extension') {
      throw new Error('Expected 1 enabled extension: test-extension');
    }
    console.log('  ✓ Enabled extensions:', enabledExtensions);

    // Test isExtensionEnabled
    if (!configManager.isExtensionEnabled('test-extension')) {
      throw new Error('test-extension should be enabled');
    }
    console.log('  ✓ Extension enabled check works');

    // Test getFeatures
    const features = configManager.getFeatures();
    if (!features || !features.demo) {
      throw new Error('demo feature should be enabled');
    }
    console.log('  ✓ Features:', features);

    // Test getTierMode
    const tierMode = configManager.getTierMode();
    if (tierMode !== 'balanced') {
      throw new Error('Tier mode should be balanced');
    }
    console.log('  ✓ Tier mode:', tierMode);

    // Test getDefaultModel
    const defaultModel = configManager.getDefaultModel();
    if (defaultModel !== 'sonnet') {
      throw new Error('Default model should be sonnet');
    }
    console.log('  ✓ Default model:', defaultModel);

    console.log('✅ ConfigManager tests passed');
    return true;
  } catch (error) {
    console.error('❌ ConfigManager test failed:', error);
    return false;
  }
}

/**
 * Test DomainLoader
 */
async function testDomainLoader(): Promise<boolean> {
  console.log('\n🧪 Testing DomainLoader...');

  try {
    const domainLoader = new DomainLoader(EXTENSIONS_DIR, SCHEMAS_DIR);

    // Discover extensions
    await domainLoader.discoverExtensions();
    console.log('  ✓ Extensions discovered');

    // Check extension loaded
    const extension = domainLoader.getExtension('test-extension');
    if (!extension) {
      throw new Error('test-extension should be loaded');
    }
    console.log('  ✓ Extension loaded:', extension.manifest.name);

    // Check components registered
    const agents = domainLoader.getComponents('agents');
    if (agents.size !== 1) {
      throw new Error('Expected 1 agent registered');
    }
    console.log('  ✓ Agents registered:', agents.size);

    const skills = domainLoader.getComponents('skills');
    if (skills.size !== 1) {
      throw new Error('Expected 1 skill registered');
    }
    console.log('  ✓ Skills registered:', skills.size);

    const patterns = domainLoader.getComponents('patterns');
    if (patterns.size !== 1) {
      throw new Error('Expected 1 pattern registered');
    }
    console.log('  ✓ Patterns registered:', patterns.size);

    // Check component details
    const testAgent = domainLoader.getComponent('agents', 'test-agent');
    if (!testAgent || testAgent.tier !== 'tier1') {
      throw new Error('test-agent should have tier1');
    }
    console.log('  ✓ Component details correct:', testAgent.name, testAgent.tier);

    // Check tier filtering
    const tier1Components = domainLoader.getComponentsByTier('tier1');
    if (tier1Components.length !== 2) {
      // test-agent and test-skill
      throw new Error('Expected 2 tier1 components');
    }
    console.log('  ✓ Tier filtering works:', tier1Components.length, 'tier1 components');

    // Check skill trigger matching
    const matchedSkills = domainLoader.getSkillsByTriggers('test demo');
    if (matchedSkills.length !== 1 || matchedSkills[0].name !== 'test-skill') {
      throw new Error('Expected test-skill to match trigger');
    }
    console.log('  ✓ Skill trigger matching works');

    // Check stats
    const stats = domainLoader.getStats();
    if (
      stats.extensions !== 1 ||
      stats.agents !== 1 ||
      stats.skills !== 1 ||
      stats.patterns !== 1
    ) {
      throw new Error('Stats mismatch');
    }
    console.log('  ✓ Stats:', stats);

    console.log('✅ DomainLoader tests passed');
    return true;
  } catch (error) {
    console.error('❌ DomainLoader test failed:', error);
    return false;
  }
}

/**
 * Test integration
 */
async function testIntegration(): Promise<boolean> {
  console.log('\n🧪 Testing Integration...');

  try {
    const configManager = new ConfigManager(CONFIG_PATH, SCHEMAS_DIR);
    const domainLoader = new DomainLoader(EXTENSIONS_DIR, SCHEMAS_DIR);

    // Load config
    configManager.loadConfig();

    // Get enabled extensions from config
    const enabledExtensions = configManager.getEnabledExtensions();
    console.log('  ✓ Config says enable:', enabledExtensions);

    // Discover extensions
    await domainLoader.discoverExtensions();

    // Verify extension is loaded and enabled
    const extension = domainLoader.getExtension('test-extension');
    if (!extension || !extension.enabled) {
      throw new Error('Extension should be loaded and enabled');
    }
    console.log('  ✓ Extension loaded and enabled');

    // In real usage, we'd filter by enabled extensions from config
    const isEnabled = configManager.isExtensionEnabled('test-extension');
    if (!isEnabled) {
      throw new Error('Extension should be enabled per config');
    }
    console.log('  ✓ Config and loader agree on enablement');

    // Test tier mode from config affecting component loading
    const tierMode = configManager.getTierMode();
    console.log('  ✓ Tier mode from config:', tierMode);

    // Would filter components based on tier mode
    const tier1Components = domainLoader.getComponentsByTier('tier1');
    console.log('  ✓ Can load tier1 components:', tier1Components.length);

    console.log('✅ Integration tests passed');
    return true;
  } catch (error) {
    console.error('❌ Integration test failed:', error);
    return false;
  }
}

/**
 * Main test runner
 */
async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🧪 Extension System Test Suite');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Cleanup previous test run
  cleanup();

  // Create test fixtures
  createTestFixtures();

  // Run tests
  const results = {
    configManager: await testConfigManager(),
    domainLoader: await testDomainLoader(),
    integration: await testIntegration(),
  };

  // Cleanup
  console.log('\n🧹 Cleaning up test fixtures...');
  cleanup();
  console.log('✅ Cleanup complete');

  // Report results
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 Test Results:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  ConfigManager: ${results.configManager ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  DomainLoader:  ${results.domainLoader ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  Integration:   ${results.integration ? '✅ PASS' : '❌ FAIL'}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const allPassed = Object.values(results).every((result) => result);

  if (allPassed) {
    console.log('✅ All tests passed! Extension system is working correctly.\n');
    process.exit(0);
  } else {
    console.log('❌ Some tests failed. Please review errors above.\n');
    process.exit(1);
  }
}

// Run tests
main();
