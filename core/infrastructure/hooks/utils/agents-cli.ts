/**
 * Agents CLI - Interactive command for managing agents
 *
 * Provides subcommands for listing, creating, editing, deleting, and validating agents.
 * Uses agent-discovery.ts for file-based discovery.
 *
 * Part of Sub-Agents Migration (Day 3-4)
 * See: dev/active/sub-agents-migration/sub-agents-migration-plan.md
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { spawn } from 'child_process';
import * as readline from 'readline';
import {
  discoverAgents,
  findAgentByName,
  parseAgentFile,
  type AgentConfig,
  type DiscoveryOptions
} from './agent-discovery';

// ============================================================================
// Types & Interfaces
// ============================================================================

interface CliOptions {
  source?: 'project' | 'user' | 'plugin';
  format?: 'table' | 'json';
  force?: boolean;
  backup?: boolean;
  all?: boolean;
  project?: boolean;
  plugin?: string;
}

// ============================================================================
// Constants
// ============================================================================

const PROJECT_AGENTS_DIR = path.join(process.cwd(), 'core/infrastructure/agents');
const USER_AGENTS_DIR = path.join(os.homedir(), '.claude/agents');

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Print formatted header
 */
function printHeader(title: string): void {
  console.log('');
  console.log(title);
  console.log('━'.repeat(80));
  console.log('');
}

/**
 * Print formatted section
 */
function printSection(title: string, count?: number): void {
  const countStr = count !== undefined ? ` (${count})` : '';
  console.log('');
  console.log(`${title}${countStr}`);
  console.log('─'.repeat(80));
}

/**
 * Print success message
 */
function printSuccess(message: string): void {
  console.log(`\n✓ ${message}\n`);
}

/**
 * Print error message
 */
function printError(message: string): void {
  console.error(`\n✗ ${message}\n`);
}

/**
 * Ask user for confirmation
 */
async function confirm(question: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(`${question} (y/n): `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

/**
 * Prompt user for input
 */
async function prompt(question: string, defaultValue?: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const questionStr = defaultValue
    ? `${question} [${defaultValue}]: `
    : `${question}: `;

  return new Promise((resolve) => {
    rl.question(questionStr, (answer) => {
      rl.close();
      resolve(answer.trim() || defaultValue || '');
    });
  });
}

/**
 * Open file in editor
 */
async function openInEditor(filePath: string): Promise<void> {
  const editor = process.env.EDITOR || process.env.VISUAL || 'nano';

  return new Promise((resolve, reject) => {
    const editorProcess = spawn(editor, [filePath], {
      stdio: 'inherit'
    });

    editorProcess.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Editor exited with code ${code}`));
      }
    });

    editorProcess.on('error', (err) => {
      reject(err);
    });
  });
}

// ============================================================================
// Subcommand: list
// ============================================================================

async function listAgents(options: CliOptions): Promise<void> {
  printHeader('🤖 DISCOVERED AGENTS');

  // Discovery options
  const discoveryOpts: DiscoveryOptions = {
    includeProject: !options.source || options.source === 'project',
    includeUser: !options.source || options.source === 'user',
    includePlugins: !options.source || options.source === 'plugin'
  };

  const agents = await discoverAgents(discoveryOpts);

  if (options.format === 'json') {
    console.log(JSON.stringify(agents, null, 2));
    return;
  }

  // Group by source
  const projectAgents = agents.filter(a => a.source === 'project');
  const userAgents = agents.filter(a => a.source === 'user');
  const pluginAgents = agents.filter(a => a.source === 'plugin');

  // Display project agents
  if (projectAgents.length > 0 && discoveryOpts.includeProject) {
    printSection('PROJECT AGENTS', projectAgents.length);
    displayAgentsTable(projectAgents);
  }

  // Display user agents
  if (userAgents.length > 0 && discoveryOpts.includeUser) {
    printSection('USER AGENTS', userAgents.length);
    displayAgentsTable(userAgents);
  }

  // Display plugin agents
  if (pluginAgents.length > 0 && discoveryOpts.includePlugins) {
    printSection('PLUGIN AGENTS', pluginAgents.length);
    displayAgentsTable(pluginAgents);
  } else if (discoveryOpts.includePlugins) {
    printSection('PLUGIN AGENTS', 0);
    console.log('No plugin agents found (plugin agents need YAML frontmatter)');
  }

  console.log('');
  console.log(`Total: ${agents.length} agents`);
  console.log('');
}

/**
 * Display agents in table format
 */
function displayAgentsTable(agents: AgentConfig[]): void {
  for (const agent of agents) {
    const model = agent.model || 'default';
    const timeout = agent.timeout ? `${agent.timeout} min` : 'default';
    const tools = agent.tools || 'all';

    console.log(`  ${agent.name}`);
    console.log(`    Description: ${agent.description}`);
    console.log(`    Model: ${model} | Timeout: ${timeout} | Tools: ${tools}`);
    console.log(`    Location: ${agent.filePath}`);
    console.log('');
  }
}

// ============================================================================
// Subcommand: create
// ============================================================================

async function createAgent(name: string | undefined, options: CliOptions): Promise<void> {
  printHeader('🤖 CREATE NEW AGENT');

  // Prompt for name if not provided
  if (!name) {
    name = await prompt('Agent name (kebab-case)');
    if (!name) {
      printError('Agent name is required');
      process.exit(1);
    }
  }

  // Validate name format (kebab-case)
  if (!/^[a-z][a-z0-9-]*$/.test(name)) {
    printError(`Invalid agent name: ${name}\nUse kebab-case: my-agent-name`);
    process.exit(1);
  }

  // Check if agent already exists
  const existing = await findAgentByName(name);
  if (existing) {
    printError(`Agent already exists: ${name}\nLocation: ${existing.filePath}`);
    process.exit(1);
  }

  // Interactive wizard
  console.log(`Creating agent: ${name}\n`);

  const description = await prompt('Description');
  if (!description) {
    printError('Description is required');
    process.exit(1);
  }

  const model = await prompt('Model (haiku/sonnet/opus)', 'sonnet');
  const timeout = await prompt('Timeout (minutes)', '60');
  const tools = await prompt('Tools (comma-separated or "all")', 'all');
  const thinking = await prompt('Thinking mode (quick/normal/deep)', 'normal');

  console.log('\nEnter system prompt (multi-line, press Ctrl+D when done):');
  const systemPrompt = await readMultilineInput();

  if (!systemPrompt.trim()) {
    printError('System prompt is required');
    process.exit(1);
  }

  // Generate agent file content
  const fileContent = `---
name: ${name}
description: ${description}
model: ${model}
timeout: ${parseInt(timeout)}
tools: ${tools}
thinking: ${thinking}
---

${systemPrompt}
`;

  // Determine file location
  let agentDir = USER_AGENTS_DIR;
  if (options.project) {
    agentDir = PROJECT_AGENTS_DIR;
  } else if (options.plugin) {
    agentDir = path.join(process.cwd(), `${options.plugin}-plugin/agents`);
  }

  // Create directory if it doesn't exist
  if (!fs.existsSync(agentDir)) {
    fs.mkdirSync(agentDir, { recursive: true });
  }

  const filePath = path.join(agentDir, `${name}.md`);

  // Preview and confirm
  console.log('\n━'.repeat(80));
  console.log('PREVIEW:');
  console.log('━'.repeat(80));
  console.log(fileContent);
  console.log('━'.repeat(80));
  console.log(`\nFile location: ${filePath}\n`);

  const confirmed = await confirm('Create agent?');
  if (!confirmed) {
    console.log('\nAgent creation cancelled.\n');
    process.exit(0);
  }

  // Write file
  fs.writeFileSync(filePath, fileContent);

  printSuccess(`Agent created: ${filePath}`);

  // Validate
  console.log('Validating agent...');
  const validAgent = await parseAgentFile(filePath);
  if (validAgent) {
    printSuccess('Agent validated successfully');
    console.log(`Agent ready to use: /background ${name} "task description"\n`);
  } else {
    printError('Agent validation failed - please check the file manually');
  }
}

/**
 * Read multi-line input from stdin
 */
async function readMultilineInput(): Promise<string> {
  return new Promise((resolve) => {
    const lines: string[] = [];
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });

    rl.on('line', (line) => {
      lines.push(line);
    });

    rl.on('close', () => {
      resolve(lines.join('\n'));
    });
  });
}

// ============================================================================
// Subcommand: edit
// ============================================================================

async function editAgent(name: string | undefined): Promise<void> {
  if (!name) {
    printError('Agent name is required\nUsage: /agents edit [name]');
    process.exit(1);
  }

  // Find agent
  const agent = await findAgentByName(name);
  if (!agent) {
    printError(`Agent not found: ${name}\nUse /agents list to see available agents`);
    process.exit(1);
  }

  printHeader(`📝 EDIT AGENT: ${name}`);
  console.log(`File: ${agent.filePath}`);
  console.log(`Editor: ${process.env.EDITOR || 'nano'}\n`);

  try {
    // Open in editor
    await openInEditor(agent.filePath);

    printSuccess('Agent saved');

    // Validate after edit
    console.log('Validating agent...');
    const validAgent = await parseAgentFile(agent.filePath);
    if (validAgent) {
      printSuccess('YAML validation passed');
      console.log('Agent ready to use\n');
    } else {
      printError('YAML validation failed - please check the file manually');
    }
  } catch (error) {
    printError(`Failed to open editor: ${error}`);
    process.exit(1);
  }
}

// ============================================================================
// Subcommand: delete
// ============================================================================

async function deleteAgent(name: string | undefined, options: CliOptions): Promise<void> {
  if (!name) {
    printError('Agent name is required\nUsage: /agents delete [name]');
    process.exit(1);
  }

  // Find agent
  const agent = await findAgentByName(name);
  if (!agent) {
    printError(`Agent not found: ${name}\nUse /agents list to see available agents`);
    process.exit(1);
  }

  printHeader(`🗑️  DELETE AGENT: ${name}`);

  // Show agent details
  console.log(`Location: ${agent.filePath}`);
  console.log(`Source: ${agent.source}\n`);
  console.log('Agent details:');
  console.log(`  Name: ${agent.name}`);
  console.log(`  Description: ${agent.description}`);
  console.log(`  Model: ${agent.model || 'default'}`);
  console.log(`  Timeout: ${agent.timeout || 'default'} min\n`);

  // Protect project agents
  if (agent.source === 'project' && !options.force) {
    printError('Cannot delete project agent without --force flag');
    console.log('Project agents are protected. Use --force to override:\n');
    console.log(`  /agents delete ${name} --force\n`);
    process.exit(1);
  }

  // Protect plugin agents
  if (agent.source === 'plugin') {
    printError('Cannot delete plugin agents through this command');
    console.log('Plugin agents should be modified in their plugin directory:\n');
    console.log(`  ${agent.filePath}\n`);
    process.exit(1);
  }

  // Confirm deletion
  if (!options.force) {
    console.log('This action cannot be undone.');
    const confirmed = await confirm('Delete agent?');
    if (!confirmed) {
      console.log('\nDeletion cancelled.\n');
      process.exit(0);
    }
  }

  // Backup if requested
  if (options.backup) {
    const backupDir = path.join(os.homedir(), '.claude/.agents-backup');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    const backupPath = path.join(backupDir, `${name}-${Date.now()}.md`);
    fs.copyFileSync(agent.filePath, backupPath);
    console.log(`\nBackup created: ${backupPath}`);
  }

  // Delete file
  fs.unlinkSync(agent.filePath);

  printSuccess(`Agent deleted: ${name}`);
  console.log(`File removed: ${agent.filePath}\n`);
}

// ============================================================================
// Subcommand: validate
// ============================================================================

async function validateAgent(name: string | undefined, options: CliOptions): Promise<void> {
  if (options.all) {
    await validateAllAgents();
    return;
  }

  if (!name) {
    printError('Agent name is required\nUsage: /agents validate [name] or /agents validate --all');
    process.exit(1);
  }

  // Find agent
  const agent = await findAgentByName(name);
  if (!agent) {
    printError(`Agent not found: ${name}\nUse /agents list to see available agents`);
    process.exit(1);
  }

  printHeader(`✓ VALIDATE AGENT: ${name}`);

  // Perform validation
  const isValid = await performValidation(agent);

  if (isValid) {
    printSuccess('Agent validation passed');
    console.log(`\nAgent ready to use:`);
    console.log(`  /background ${name} "task description"\n`);
  } else {
    printError('Agent validation failed');
    console.log(`\nEdit agent to fix issues:`);
    console.log(`  /agents edit ${name}\n`);
    process.exit(1);
  }
}

/**
 * Validate all agents
 */
async function validateAllAgents(): Promise<void> {
  printHeader('✓ VALIDATE ALL AGENTS');

  const agents = await discoverAgents();
  let validCount = 0;
  let invalidCount = 0;

  for (const agent of agents) {
    console.log(`\nValidating: ${agent.name}`);
    const isValid = await performValidation(agent, false);
    if (isValid) {
      console.log('  ✓ Valid');
      validCount++;
    } else {
      console.log('  ✗ Invalid');
      invalidCount++;
    }
  }

  console.log('');
  console.log('━'.repeat(80));
  console.log(`Valid: ${validCount} | Invalid: ${invalidCount} | Total: ${agents.length}`);
  console.log('━'.repeat(80));
  console.log('');
}

/**
 * Perform validation on agent
 */
async function performValidation(agent: AgentConfig, verbose: boolean = true): Promise<boolean> {
  let isValid = true;

  // Check required fields
  if (verbose) console.log('✓ YAML frontmatter found');

  if (agent.name) {
    if (verbose) console.log(`✓ Required field 'name': ${agent.name}`);
  } else {
    if (verbose) console.log(`✗ Required field missing: 'name'`);
    isValid = false;
  }

  if (agent.description) {
    if (verbose) console.log(`✓ Required field 'description': ${agent.description}`);
  } else {
    if (verbose) console.log(`✗ Required field missing: 'description'`);
    isValid = false;
  }

  // Check optional fields
  if (agent.model) {
    if (verbose) console.log(`✓ Optional field 'model': ${agent.model}`);
  } else {
    if (verbose) console.log(`✓ Optional field 'model': not specified (will use default: sonnet)`);
  }

  if (agent.timeout) {
    if (verbose) console.log(`✓ Optional field 'timeout': ${agent.timeout} min`);
  } else {
    if (verbose) console.log(`✓ Optional field 'timeout': not specified (will use default: 60 min)`);
  }

  if (agent.tools) {
    if (verbose) console.log(`✓ Optional field 'tools': ${agent.tools}`);
  } else {
    if (verbose) console.log(`✓ Optional field 'tools': not specified (will use all tools)`);
  }

  if (agent.thinking) {
    if (verbose) console.log(`✓ Optional field 'thinking': ${agent.thinking}`);
  } else {
    if (verbose) console.log(`✓ Optional field 'thinking': not specified (will use default)`);
  }

  // Check system prompt
  if (agent.systemPrompt && agent.systemPrompt.trim()) {
    const lines = agent.systemPrompt.split('\n').length;
    if (verbose) console.log(`✓ System prompt: ${lines} lines`);
  } else {
    if (verbose) console.log(`✗ System prompt: missing or empty`);
    isValid = false;
  }

  return isValid;
}

// ============================================================================
// Main CLI
// ============================================================================

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    // Interactive mode - show menu
    printHeader('🤖 AGENTS CLI');
    console.log('Subcommands:');
    console.log('  list      - List all discovered agents');
    console.log('  create    - Create new agent interactively');
    console.log('  edit      - Edit existing agent');
    console.log('  delete    - Delete agent (with confirmation)');
    console.log('  validate  - Validate agent YAML frontmatter');
    console.log('');
    console.log('Usage:');
    console.log('  /agents list');
    console.log('  /agents create [name]');
    console.log('  /agents edit [name]');
    console.log('  /agents delete [name]');
    console.log('  /agents validate [name]');
    console.log('');
    process.exit(0);
  }

  const subcommand = args[0];
  const restArgs = args.slice(1);

  // Parse options
  const options: CliOptions = {};
  const positionalArgs: string[] = [];

  for (let i = 0; i < restArgs.length; i++) {
    const arg = restArgs[i];
    if (arg.startsWith('--')) {
      const optName = arg.substring(2);
      if (optName === 'source' || optName === 'format' || optName === 'plugin') {
        options[optName] = restArgs[++i] as any;
      } else {
        options[optName as keyof CliOptions] = true as any;
      }
    } else {
      positionalArgs.push(arg);
    }
  }

  // Execute subcommand
  try {
    switch (subcommand) {
      case 'list':
        await listAgents(options);
        break;
      case 'create':
        await createAgent(positionalArgs[0], options);
        break;
      case 'edit':
        await editAgent(positionalArgs[0]);
        break;
      case 'delete':
        await deleteAgent(positionalArgs[0], options);
        break;
      case 'validate':
        await validateAgent(positionalArgs[0], options);
        break;
      default:
        printError(`Unknown subcommand: ${subcommand}`);
        console.log('Valid subcommands: list, create, edit, delete, validate\n');
        process.exit(1);
    }
  } catch (error) {
    printError(`Command failed: ${error}`);
    process.exit(1);
  }
}

// Run CLI
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
