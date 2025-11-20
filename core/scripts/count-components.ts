#!/usr/bin/env npx tsx
/**
 * Automated Component Counter
 *
 * Counts actual components in the hal-10k-core repository and generates
 * accurate statistics for documentation.
 *
 * Usage:
 *   npx tsx scripts/count-components.ts
 *   npx tsx scripts/count-components.ts --json (for machine-readable output)
 */

import * as fs from 'fs';
import * as path from 'path';

const ROOT = process.cwd();

interface ComponentCounts {
  hooks: number;
  hookUtilities: number;
  utilityFiles: number;
  skills: number;
  skillResources: number;
  patterns: number;
  agents: number;
  commands: number;
  docs: number;
}

function countFiles(dir: string, pattern?: RegExp): number {
  if (!fs.existsSync(dir)) return 0;

  const files = fs.readdirSync(dir, { recursive: true }) as string[];
  const filtered = files.filter(f => {
    const fullPath = path.join(dir, f);
    const stat = fs.statSync(fullPath);
    if (!stat.isFile()) return false;
    if (pattern) return pattern.test(f);
    return true;
  });

  return filtered.length;
}

function countDirectories(dir: string, pattern?: RegExp): number {
  if (!fs.existsSync(dir)) return 0;

  const entries = fs.readdirSync(dir, { withFileTypes: true, recursive: true }) as Array<{ name: string; isDirectory: () => boolean }>;
  const dirs = entries.filter(e => e.isDirectory());
  if (pattern) {
    return dirs.filter(d => pattern.test(d.name)).length;
  }
  return dirs.length;
}

function getFileList(dir: string, pattern?: RegExp): string[] {
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir, { recursive: true }) as string[];
  return files.filter(f => {
    const fullPath = path.join(dir, f);
    const stat = fs.statSync(fullPath);
    if (!stat.isFile()) return false;
    if (pattern) return pattern.test(f);
    return true;
  });
}

function main() {
  const jsonOutput = process.argv.includes('--json');

  // Count components
  const counts: ComponentCounts = {
    hooks: countFiles(path.join(ROOT, 'infrastructure/hooks'), /^[^/]+\.ts$/),
    hookUtilities: countFiles(path.join(ROOT, 'infrastructure/hooks/utils'), /\.ts$/) -
                   countFiles(path.join(ROOT, 'infrastructure/hooks/utils'), /\.test\.ts$/),
    utilityFiles: countFiles(path.join(ROOT, 'infrastructure/utils'), /\.ts$/) -
                  countFiles(path.join(ROOT, 'infrastructure/utils'), /\.test\.ts$/),
    skills: countFiles(path.join(ROOT, 'infrastructure/skills'), /^[^/@][^/]*\.md$/),
    skillResources: countDirectories(path.join(ROOT, 'infrastructure/skills'), /^@/),
    patterns: countFiles(path.join(ROOT, 'infrastructure/patterns'), /\.md$/),
    agents: countFiles(path.join(ROOT, 'infrastructure/agents'), /\.md$/),
    commands: countFiles(path.join(ROOT, '.claude/commands'), /\.md$/),
    docs: countFiles(path.join(ROOT, 'docs'), /\.md$/),
  };

  if (jsonOutput) {
    console.log(JSON.stringify(counts, null, 2));
  } else {
    console.log('='.repeat(60));
    console.log('HAL-10K-CORE COMPONENT COUNTS');
    console.log('='.repeat(60));
    console.log();
    console.log(`Hooks (main):           ${counts.hooks}`);
    console.log(`Hook Utilities:         ${counts.hookUtilities}`);
    console.log(`Shared Utilities:       ${counts.utilityFiles}`);
    console.log(`Skills:                 ${counts.skills}`);
    console.log(`Skill Resources:        ${counts.skillResources} resource directories`);
    console.log(`Patterns:               ${counts.patterns}`);
    console.log(`Agents:                 ${counts.agents}`);
    console.log(`Commands:               ${counts.commands}`);
    console.log(`Documentation:          ${counts.docs}`);
    console.log();
    console.log('='.repeat(60));
    console.log(`Total Components:       ${counts.hooks + counts.hookUtilities + counts.utilityFiles + counts.skills + counts.patterns + counts.agents + counts.commands}`);
    console.log('='.repeat(60));
    console.log();

    // Detailed breakdown
    if (process.argv.includes('--verbose')) {
      console.log('\nDETAILED BREAKDOWN:\n');

      console.log('Hooks:');
      getFileList(path.join(ROOT, 'infrastructure/hooks'), /^[^/]+\.ts$/).forEach(f => {
        console.log(`  - ${f}`);
      });

      console.log('\nSkills:');
      getFileList(path.join(ROOT, 'infrastructure/skills'), /^[^/@][^/]*\.md$/).forEach(f => {
        console.log(`  - ${f}`);
      });

      console.log('\nPatterns:');
      getFileList(path.join(ROOT, 'infrastructure/patterns'), /\.md$/).forEach(f => {
        console.log(`  - ${f}`);
      });
    }
  }
}

main();
