#!/usr/bin/env npx tsx
/**
 * Migration Script: Convert Skills to Official Claude Code Format
 *
 * Migrates skills from standalone files to directory-based structure:
 * - skill-name.md → skill-name/SKILL.md
 * - Adds official YAML frontmatter (name, description)
 * - Preserves all skill content
 */

import * as fs from 'fs';
import * as path from 'path';

interface SkillMetadata {
  name: string;
  skillType: string;
  priority: string;
  autoActivatesOn: string;
  enforcement: string;
  whatThisSkillDoes: string;
}

function extractMetadata(content: string, filename: string): SkillMetadata {
  const lines = content.split('\n');

  // Extract skill name from filename
  const name = path.basename(filename, '.md');

  // Extract metadata from header
  let skillType = '';
  let priority = '';
  let autoActivatesOn = '';
  let enforcement = '';
  let whatThisSkillDoes = '';

  // Find "What This Skill Does" section
  let inWhatSection = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.includes('**Skill Type:**')) {
      skillType = line.split('**Skill Type:**')[1]?.trim() || '';
    }
    if (line.includes('**Priority:**')) {
      priority = line.split('**Priority:**')[1]?.trim() || '';
    }
    if (line.includes('**Auto-activates on:**')) {
      autoActivatesOn = line.split('**Auto-activates on:**')[1]?.trim() || '';
    }
    if (line.includes('**Enforcement:**')) {
      enforcement = line.split('**Enforcement:**')[1]?.trim() || '';
    }

    // Extract "What This Skill Does" content
    if (line.includes('## What This Skill Does')) {
      inWhatSection = true;
      continue;
    }
    if (inWhatSection && line.trim() && !line.startsWith('**') && !line.startsWith('---')) {
      whatThisSkillDoes = line.trim();
      break;
    }
    if (inWhatSection && line.startsWith('---')) {
      break;
    }
  }

  return {
    name,
    skillType,
    priority,
    autoActivatesOn,
    enforcement,
    whatThisSkillDoes
  };
}

function removeOldHeader(content: string): string {
  const lines = content.split('\n');
  let startIndex = 0;

  // Find the first "---" after metadata
  let foundFirstDivider = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '---' && i > 0) {
      if (!foundFirstDivider) {
        foundFirstDivider = true;
        continue;
      } else {
        // This is the second divider, start content after it
        startIndex = i + 1;
        break;
      }
    }
  }

  return lines.slice(startIndex).join('\n').trim();
}

function generateYAMLFrontmatter(metadata: SkillMetadata): string {
  // Create comprehensive description for model-invoked activation
  const description = `${metadata.whatThisSkillDoes} Auto-activates when user mentions: ${metadata.autoActivatesOn}`;

  return `---
name: "${metadata.name}"
description: "${description}"
---`;
}

function migrateSkill(sourceFile: string, targetDir: string): void {
  console.log(`\n📦 Migrating: ${path.basename(sourceFile)}`);

  // Read source file
  const content = fs.readFileSync(sourceFile, 'utf-8');

  // Extract metadata
  const metadata = extractMetadata(content, sourceFile);
  console.log(`   Name: ${metadata.name}`);
  console.log(`   Triggers: ${metadata.autoActivatesOn}`);

  // Generate YAML frontmatter
  const yaml = generateYAMLFrontmatter(metadata);

  // Remove old header (everything before first main content section)
  const cleanContent = removeOldHeader(content);

  // Find the title line (starts with # )
  const lines = content.split('\n');
  let titleLine = '';
  for (const line of lines) {
    if (line.startsWith('# ') && !line.includes('##')) {
      titleLine = line;
      break;
    }
  }

  // Combine: YAML + Title + Rest of content
  const newContent = `${yaml}\n\n${titleLine}\n\n${cleanContent}`;

  // Create target directory
  const skillDir = path.join(targetDir, metadata.name);
  if (!fs.existsSync(skillDir)) {
    fs.mkdirSync(skillDir, { recursive: true });
    console.log(`   ✅ Created directory: ${skillDir}`);
  }

  // Write SKILL.md
  const targetFile = path.join(skillDir, 'SKILL.md');
  fs.writeFileSync(targetFile, newContent, 'utf-8');
  console.log(`   ✅ Wrote: ${targetFile}`);
}

function main() {
  console.log('🚀 Starting Skills Migration to Official Format\n');
  console.log('=' .repeat(60));

  const skillsDir = path.join(process.cwd(), 'core/infrastructure/skills');

  const skillFiles = [
    'data-visualization-designer.md',
    'design-excellence.md',
    'diagram-drawing.md',
    'mcp-code-execution.md',
    'skill-developer.md'
  ];

  let migrated = 0;
  let failed = 0;

  for (const filename of skillFiles) {
    const sourceFile = path.join(skillsDir, filename);

    if (!fs.existsSync(sourceFile)) {
      console.log(`\n⚠️  Skipping: ${filename} (not found)`);
      failed++;
      continue;
    }

    try {
      migrateSkill(sourceFile, skillsDir);
      migrated++;
    } catch (error) {
      console.error(`\n❌ Failed to migrate ${filename}:`, error);
      failed++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`\n✅ Migration Complete!`);
  console.log(`   Migrated: ${migrated}`);
  console.log(`   Failed: ${failed}`);
  console.log(`\n📋 Next Steps:`);
  console.log(`   1. Review generated SKILL.md files`);
  console.log(`   2. Delete old standalone .md files`);
  console.log(`   3. Move MCP resources to mcp-code-execution/resources/`);
  console.log(`   4. Update skill loading infrastructure`);
  console.log(`   5. Update configuration files`);
  console.log('\n');
}

main();
