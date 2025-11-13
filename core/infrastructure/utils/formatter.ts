/**
 * Utility functions for formatting hook output
 */

export interface SkillActivation {
  name: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  icon: string;
  message: string;
  skillPath: string;
}

export interface PatternSuggestion {
  name: string;
  category: 'content' | 'strategy' | 'analysis' | 'optimization';
  complexity: 'simple' | 'medium' | 'complex';
  icon: string;
  patternPath: string;
}

/**
 * Format skill activation reminder for user-prompt-submit hook
 */
export function formatSkillActivationReminder(skills: SkillActivation[]): string {
  if (skills.length === 0) {
    return '';
  }

  const lines = [
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '🎯 SKILL ACTIVATION CHECK',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    ''
  ];

  // Sort by priority
  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  const sortedSkills = skills.sort((a, b) =>
    priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  for (const skill of sortedSkills) {
    lines.push(`${skill.icon} ${skill.message}`);
    lines.push(`   Skill: @${skill.skillPath}`);
    lines.push('');
  }

  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('');

  return lines.join('\n');
}

/**
 * Format combined skill + pattern activation reminder for user-prompt-submit hook
 */
export function formatCombinedActivationReminder(
  skills: SkillActivation[],
  patterns: PatternSuggestion[]
): string {
  if (skills.length === 0 && patterns.length === 0) {
    return '';
  }

  const lines = [
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '🎯 SKILL & PATTERN ACTIVATION',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    ''
  ];

  // Add skills section if any
  if (skills.length > 0) {
    // Sort by priority
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    const sortedSkills = skills.sort((a, b) =>
      priorityOrder[a.priority] - priorityOrder[b.priority]
    );

    for (const skill of sortedSkills) {
      lines.push(`${skill.icon} ${skill.message}`);
      lines.push(`   Skill: @${skill.skillPath}`);
      lines.push('');
    }
  }

  // Add patterns section if any
  if (patterns.length > 0) {
    if (skills.length > 0) {
      lines.push('---');
      lines.push('');
    }

    lines.push('🚨 PATTERN INVOCATION REQUIRED:');
    lines.push('');

    for (const pattern of patterns) {
      const displayName = pattern.name.replace(/_/g, ' ');
      lines.push(`${pattern.icon} ${displayName} (${pattern.category}, ${pattern.complexity})`);
      lines.push(`   Pattern: @${pattern.patternPath}`);
      lines.push('');
    }

    lines.push('⚠️  ACTION: Invoke pattern via `/pattern ${pattern_name} [args]`');
    lines.push('   ❌ DO NOT read pattern file and implement manually');
    lines.push('   ✅ Pattern executes with enforcement (templates + standards + quality gates)');
    lines.push('');
  }

  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('');

  return lines.join('\n');
}

/**
 * Format error checking reminder for stop-event hook
 */
export function formatErrorCheckReminder(issues: ErrorIssue[]): string {
  if (issues.length === 0) {
    return '';
  }

  const lines = [
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '📋 SELF-CHECK REMINDER',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    ''
  ];

  // Group issues by severity
  const critical = issues.filter(i => i.severity === 'critical');
  const warning = issues.filter(i => i.severity === 'warning');
  const info = issues.filter(i => i.severity === 'info');

  if (critical.length > 0) {
    lines.push('🚨 Critical Issues:');
    for (const issue of critical) {
      lines.push(`   ❌ ${issue.file}: ${issue.message}`);
    }
    lines.push('');
  }

  if (warning.length > 0) {
    lines.push('⚠️  Risky Patterns Detected:');
    for (const issue of warning) {
      lines.push(`   ❓ ${issue.file}: ${issue.message}`);
    }
    lines.push('');
  }

  if (info.length > 0) {
    lines.push('💡 Best Practice Reminders:');
    for (const issue of info) {
      lines.push(`   ℹ️  ${issue.message}`);
    }
    lines.push('');
  }

  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  return lines.join('\n');
}

export interface ErrorIssue {
  file: string;
  message: string;
  severity: 'critical' | 'warning' | 'info';
  line?: number;
}

/**
 * Format dev docs creation confirmation
 */
export function formatDevDocsConfirmation(taskSlug: string, directory: string): string {
  return [
    '',
    '✅ Dev docs auto-created!',
    '',
    `📁 Directory: ${directory}`,
    '',
    'Files created:',
    `  - ${taskSlug}-plan.md (approved plan)`,
    `  - ${taskSlug}-context.md (key files, decisions, next steps)`,
    `  - ${taskSlug}-tasks.md (checklist for tracking)`,
    '',
    '💡 These docs will survive context resets.',
    `   To continue after compaction: "Continue ${taskSlug.replace(/-/g, ' ')}"`,
    ''
  ].join('\n');
}

/**
 * Truncate text to max length
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Format file path for display (relative to project root)
 */
export function formatPath(absolutePath: string, projectRoot: string): string {
  return absolutePath.replace(projectRoot, '').replace(/^\//, '');
}
