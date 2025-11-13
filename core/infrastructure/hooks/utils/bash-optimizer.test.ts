/**
 * Unit Tests for Bash Command Optimizer
 *
 * Tests each optimization rule independently
 */

import {
  optimizeBashCommand,
  checkToolAvailability,
  OptimizationResult,
} from './bash-optimizer';

// ============================================================================
// Test Helpers
// ============================================================================

async function testOptimization(
  input: string,
  expectedTool: string,
  description: string
): Promise<void> {
  const result = await optimizeBashCommand(input);

  console.log(`\n📝 ${description}`);
  console.log(`   Input:  ${input}`);
  console.log(`   Output: ${result.optimized}`);
  console.log(`   Tool:   ${result.tool}`);
  console.log(`   Applied: ${result.applied ? '✅' : '❌'}`);
  console.log(`   Savings: ${result.estimatedTokenSavings}%`);

  if (result.applied && result.tool === expectedTool) {
    console.log(`   ✅ PASS`);
  } else if (!result.applied && expectedTool === 'none') {
    console.log(`   ✅ PASS (no optimization needed)`);
  } else {
    console.log(`   ❌ FAIL - Expected tool: ${expectedTool}, got: ${result.tool}`);
  }
}

// ============================================================================
// Test Suite
// ============================================================================

async function runTests() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🧪 BASH OPTIMIZER UNIT TESTS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // Check tool availability
  console.log('\n🔍 Checking tool availability...');
  const tools = await checkToolAvailability();
  console.log('Available tools:', Object.entries(tools)
    .filter(([, available]) => available)
    .map(([tool]) => tool)
    .join(', '));
  console.log('Missing tools:', Object.entries(tools)
    .filter(([, available]) => !available)
    .map(([tool]) => tool)
    .join(', '));

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📦 RIPGREP (RG) TESTS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  await testOptimization(
    'grep -r "pattern" .',
    'rg',
    'Basic recursive grep'
  );

  await testOptimization(
    'grep -i "pattern" file.ts',
    'rg',
    'Case-insensitive grep'
  );

  await testOptimization(
    'grep -r "error" src/',
    'rg',
    'Recursive grep in directory'
  );

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📁 FD TESTS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  await testOptimization(
    'find . -name "*.md"',
    'fd',
    'Find by file extension'
  );

  await testOptimization(
    'find . -type f -name "*.ts"',
    'fd',
    'Find files by extension'
  );

  await testOptimization(
    'find src/ -name "*.tsx"',
    'fd',
    'Find in specific directory'
  );

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🦇 BAT TESTS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  await testOptimization(
    'cat README.md',
    'bat',
    'Simple cat command'
  );

  await testOptimization(
    'cat file1.ts file2.ts',
    'bat',
    'Multiple files'
  );

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📋 EXA TESTS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  await testOptimization(
    'ls -la',
    'exa',
    'List all with details'
  );

  await testOptimization(
    'ls -lt src/',
    'exa',
    'List by modification time'
  );

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🌳 TREE TESTS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  await testOptimization(
    'tree',
    'tree',
    'Tree without depth limit (should add limit)'
  );

  await testOptimization(
    'tree -L 10',
    'tree',
    'Tree with excessive depth (should cap at 3)'
  );

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔗 COMPOSITE PIPELINE TESTS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  await testOptimization(
    'find . -name "*.ts" | xargs grep "function"',
    'fd+rg',
    'Find and grep pipeline'
  );

  await testOptimization(
    'find . -name "*.md" | xargs cat',
    'fd+bat',
    'Find and cat pipeline'
  );

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🚫 SKIP TESTS (should NOT optimize)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  await testOptimization(
    'git add .',
    'none',
    'Git command (should skip)'
  );

  await testOptimization(
    'npm install',
    'none',
    'Package manager (should skip)'
  );

  await testOptimization(
    'rg "pattern"',
    'none',
    'Already optimized (should skip)'
  );

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ TEST SUITE COMPLETE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// Run tests
runTests().catch(console.error);
