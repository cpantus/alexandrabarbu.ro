/**
 * Test script for acknowledgment gate enforcement (v5.3.1)
 *
 * Verifies that:
 * 1. Acknowledgment templates exist for "require" enforcement skills
 * 2. Templates format correctly with all required fields
 * 3. Validation detects missing acknowledgments
 *
 * Usage: npx tsx test-acknowledgment-gates.ts
 */

import {
  getAcknowledgmentTemplate,
  formatAcknowledgment,
  requiresAcknowledgment,
  getSkillsWithAcknowledgment,
  validateAcknowledgmentResponse
} from './skill-acknowledgment-templates';

import { loadSkillProgressive } from './skill-loader';
import * as path from 'path';

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🧪 Testing Acknowledgment Gate Enforcement (v5.3.1)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Test 1: Template Existence
console.log('Test 1: Verifying acknowledgment templates exist');
const skillsWithAck = getSkillsWithAcknowledgment();
console.log(`✓ Found ${skillsWithAck.length} skills with acknowledgment templates:`);
skillsWithAck.forEach(skill => console.log(`  - ${skill}`));
console.log('');

// Test 2: Template Formatting
console.log('Test 2: Testing template formatting');
for (const skillName of skillsWithAck) {
  const template = getAcknowledgmentTemplate(skillName);
  if (!template) {
    console.error(`✗ Template not found for ${skillName}`);
    continue;
  }

  const formatted = formatAcknowledgment(template);
  const hasStopSignal = formatted.includes('🛑 STOP');
  const hasViolationWarning = formatted.includes('ARCHITECTURE VIOLATION');
  const hasFields = template.fields.every(f => formatted.includes(f.name));

  if (hasStopSignal && hasViolationWarning && hasFields) {
    console.log(`✓ ${skillName}: Template formatted correctly`);
  } else {
    console.error(`✗ ${skillName}: Template formatting issues`);
    if (!hasStopSignal) console.error(`  - Missing 🛑 STOP signal`);
    if (!hasViolationWarning) console.error(`  - Missing ARCHITECTURE VIOLATION warning`);
    if (!hasFields) console.error(`  - Missing required fields`);
  }
}
console.log('');

// Test 3: Skill Loading Integration
console.log('Test 3: Testing skill loading with acknowledgment gates');
const testSkills = [
  { name: 'diagram-drawing', path: '../../skills/diagram-drawing.md' },
  { name: 'design-excellence', path: '../../skills/design-excellence.md' },
  { name: 'mcp-code-execution', path: '../../skills/mcp-code-execution.md' }
];

for (const skill of testSkills) {
  const absolutePath = path.resolve(__dirname, skill.path);
  const loaded = loadSkillProgressive(skill.name, absolutePath, 'quick');

  if (!loaded) {
    console.error(`✗ ${skill.name}: Failed to load skill`);
    continue;
  }

  const hasAcknowledgment = loaded.content.includes('🛑 STOP - MANDATORY SKILL ACKNOWLEDGMENT');
  const hasDecompositionOverride = loaded.content.includes('Task Decomposition Override');

  if (requiresAcknowledgment(skill.name)) {
    if (hasAcknowledgment) {
      console.log(`✓ ${skill.name}: Acknowledgment gate injected (${loaded.tokens} tokens)`);
    } else {
      console.error(`✗ ${skill.name}: Acknowledgment gate missing despite requirement`);
    }
  } else {
    if (!hasAcknowledgment) {
      console.log(`✓ ${skill.name}: No acknowledgment (as expected)`);
    } else {
      console.warn(`⚠ ${skill.name}: Unexpected acknowledgment gate`);
    }
  }

  if (hasDecompositionOverride) {
    console.log(`  └─ Task decomposition override present`);
  }
}
console.log('');

// Test 4: Validation
console.log('Test 4: Testing acknowledgment validation');

const testResponses = [
  {
    skill: 'diagram-drawing',
    response: `
SKILL ACKNOWLEDGMENT: diagram-drawing

Theme: Technical
Typography: JetBrains Mono
Color Strategy: Sequential

I will follow this skill's design principles and Chart.js patterns.
    `,
    shouldPass: true
  },
  {
    skill: 'diagram-drawing',
    response: `
Let me create a diagram for you.
    `,
    shouldPass: false
  }
];

for (const test of testResponses) {
  const result = validateAcknowledgmentResponse(test.skill, test.response);
  const passed = result.valid === test.shouldPass;

  if (passed) {
    console.log(`✓ ${test.skill}: Validation ${test.shouldPass ? 'passed' : 'failed'} as expected`);
  } else {
    console.error(`✗ ${test.skill}: Validation unexpected result`);
    console.error(`  Expected: ${test.shouldPass ? 'pass' : 'fail'}, Got: ${result.valid ? 'pass' : 'fail'}`);
    if (result.missingFields) {
      console.error(`  Missing fields: ${result.missingFields.join(', ')}`);
    }
  }
}
console.log('');

// Summary
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ Acknowledgment Gate Tests Complete');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('Next steps:');
console.log('1. Test with real Claude session (create diagram request)');
console.log('2. Verify acknowledgment appears before Claude uses tools');
console.log('3. Monitor application rate improvement (target: 60-70%)');
console.log('4. Collect metrics for Phase 2/3 improvements\n');
