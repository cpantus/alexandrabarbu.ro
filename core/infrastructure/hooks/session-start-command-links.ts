#!/usr/bin/env -S npx tsx
/**
 * Session Start Command Link Manager
 *
 * Dynamically creates/removes plugin command symlinks based on enabled plugins
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import * as path from 'path';
import { isCodePluginEnabled } from './utils/plugin-state';

function main() {
  const projectRoot = process.cwd();
  const codeCommandsDir = path.join(projectRoot, '.claude', 'commands', 'code');

  try {
    if (isCodePluginEnabled()) {
      // Code plugin enabled: create symlinks if they don't exist
      if (!existsSync(codeCommandsDir)) {
        console.log('SessionStart:startup hook success: Enabling code plugin commands...');
        execSync('./scripts/link-plugin-commands.sh code', {
          cwd: projectRoot,
          stdio: 'pipe',
        });
        console.log('SessionStart:startup hook success: Code commands enabled');
      }
    } else {
      // Code plugin disabled: remove symlinks if they exist
      if (existsSync(codeCommandsDir)) {
        console.log('SessionStart:startup hook success: Disabling code plugin commands...');
        execSync('rm -rf .claude/commands/code', {
          cwd: projectRoot,
          stdio: 'pipe',
        });
        console.log('SessionStart:startup hook success: Code commands disabled (set CODE_PLUGIN_ENABLED=1 to enable)');
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('SessionStart:startup hook error:', error);
    process.exit(1);
  }
}

main();
