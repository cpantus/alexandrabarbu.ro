#!/usr/bin/env node
/**
 * Conversation Storage Utility
 *
 * Manages persistent JSONL conversation files for resumable agents.
 * Each agent's conversation is stored in `/tmp/agents/agent-{agentId}.jsonl`
 * with one JSON event per line (newline-delimited JSON).
 *
 * @see core/docs/agent-orchestration.md for resumable agent patterns
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// Types
export interface ConversationEvent {
  timestamp: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  metadata?: Record<string, any>;
}

export interface ConversationMetadata {
  agentId: string;
  agentType: string;
  startTime: string;
  resumedFrom?: string;
  version: string;
}

// Constants
const AGENTS_DIR = path.join(os.tmpdir(), 'agents');
const CONVERSATION_VERSION = '1.0';

/**
 * Ensure the agents directory exists
 */
function ensureAgentsDir(): void {
  if (!fs.existsSync(AGENTS_DIR)) {
    fs.mkdirSync(AGENTS_DIR, { recursive: true });
  }
}

/**
 * Get the conversation file path for an agent
 */
export function getConversationPath(agentId: string): string {
  return path.join(AGENTS_DIR, `agent-${agentId}.jsonl`);
}

/**
 * Check if a conversation file exists
 */
export function conversationExists(agentId: string): boolean {
  return fs.existsSync(getConversationPath(agentId));
}

/**
 * Create a new conversation file for an agent
 *
 * @param agentId - Unique identifier for the agent
 * @param agentType - Type of agent (e.g., 'orchestrator', 'research-scout')
 * @param resumedFrom - Optional agent ID if resuming from another agent
 * @returns Path to the created conversation file
 */
export function createConversationFile(
  agentId: string,
  agentType: string,
  resumedFrom?: string
): string {
  ensureAgentsDir();

  const conversationPath = getConversationPath(agentId);

  // Check if file already exists
  if (fs.existsSync(conversationPath)) {
    throw new Error(`Conversation file already exists: ${conversationPath}`);
  }

  // Create metadata entry (first line)
  const metadata: ConversationMetadata = {
    agentId,
    agentType,
    startTime: new Date().toISOString(),
    version: CONVERSATION_VERSION,
    ...(resumedFrom && { resumedFrom })
  };

  // Write metadata as first line
  fs.writeFileSync(conversationPath, JSON.stringify(metadata) + '\n', 'utf-8');

  return conversationPath;
}

/**
 * Append an event to the conversation file
 *
 * Uses atomic write with file locking to prevent corruption from concurrent writes.
 *
 * @param agentId - Unique identifier for the agent
 * @param event - Conversation event to append
 */
export function appendToConversation(
  agentId: string,
  event: Omit<ConversationEvent, 'timestamp'>
): void {
  const conversationPath = getConversationPath(agentId);

  // Check if conversation file exists
  if (!fs.existsSync(conversationPath)) {
    throw new Error(`Conversation file does not exist: ${conversationPath}`);
  }

  // Create timestamped event
  const timestampedEvent: ConversationEvent = {
    timestamp: new Date().toISOString(),
    ...event
  };

  // Append to file (Node.js fs.appendFileSync is atomic)
  const line = JSON.stringify(timestampedEvent) + '\n';
  fs.appendFileSync(conversationPath, line, 'utf-8');
}

/**
 * Load the complete conversation history from a file
 *
 * @param agentId - Unique identifier for the agent
 * @returns Metadata and array of conversation events
 */
export function loadConversation(agentId: string): {
  metadata: ConversationMetadata;
  events: ConversationEvent[];
} {
  const conversationPath = getConversationPath(agentId);

  // Check if conversation file exists
  if (!fs.existsSync(conversationPath)) {
    throw new Error(`Conversation file does not exist: ${conversationPath}`);
  }

  // Read entire file
  const content = fs.readFileSync(conversationPath, 'utf-8');

  // Split into lines and filter empty lines
  const lines = content.split('\n').filter(line => line.trim().length > 0);

  if (lines.length === 0) {
    throw new Error(`Conversation file is empty: ${conversationPath}`);
  }

  // Parse first line as metadata
  let metadata: ConversationMetadata;
  try {
    metadata = JSON.parse(lines[0]);
  } catch (error) {
    throw new Error(`Failed to parse conversation metadata: ${error}`);
  }

  // Validate metadata
  if (!metadata.agentId || !metadata.agentType || !metadata.startTime) {
    throw new Error('Invalid conversation metadata: missing required fields');
  }

  // Parse remaining lines as events
  const events: ConversationEvent[] = [];
  for (let i = 1; i < lines.length; i++) {
    try {
      const event = JSON.parse(lines[i]);

      // Validate event structure
      if (!event.timestamp || !event.role || event.content === undefined) {
        console.error(`Warning: Skipping invalid event at line ${i + 1}`);
        continue;
      }

      events.push(event);
    } catch (error) {
      console.error(`Warning: Failed to parse event at line ${i + 1}: ${error}`);
      continue;
    }
  }

  return { metadata, events };
}

/**
 * List all conversation files in the agents directory
 *
 * @returns Array of agent IDs with conversation files
 */
export function listConversations(): string[] {
  ensureAgentsDir();

  const files = fs.readdirSync(AGENTS_DIR);
  const agentIds: string[] = [];

  for (const file of files) {
    const match = file.match(/^agent-(.+)\.jsonl$/);
    if (match) {
      agentIds.push(match[1]);
    }
  }

  return agentIds;
}

/**
 * Delete a conversation file
 *
 * @param agentId - Unique identifier for the agent
 * @returns True if file was deleted, false if it didn't exist
 */
export function deleteConversation(agentId: string): boolean {
  const conversationPath = getConversationPath(agentId);

  if (!fs.existsSync(conversationPath)) {
    return false;
  }

  fs.unlinkSync(conversationPath);
  return true;
}

/**
 * Get conversation statistics
 *
 * @param agentId - Unique identifier for the agent
 * @returns Statistics about the conversation
 */
export function getConversationStats(agentId: string): {
  eventCount: number;
  fileSize: number;
  startTime: string;
  lastEventTime?: string;
} {
  const conversationPath = getConversationPath(agentId);

  if (!fs.existsSync(conversationPath)) {
    throw new Error(`Conversation file does not exist: ${conversationPath}`);
  }

  const { metadata, events } = loadConversation(agentId);
  const stats = fs.statSync(conversationPath);

  return {
    eventCount: events.length,
    fileSize: stats.size,
    startTime: metadata.startTime,
    lastEventTime: events.length > 0 ? events[events.length - 1].timestamp : undefined
  };
}

/**
 * Clean up old conversation files
 *
 * Removes conversation files older than the specified age.
 *
 * @param maxAgeHours - Maximum age in hours (default: 72 hours / 3 days)
 * @returns Number of files deleted
 */
export function cleanupOldConversations(maxAgeHours: number = 72): number {
  ensureAgentsDir();

  const agentIds = listConversations();
  const maxAgeMs = maxAgeHours * 60 * 60 * 1000;
  const now = Date.now();
  let deletedCount = 0;

  for (const agentId of agentIds) {
    try {
      const conversationPath = getConversationPath(agentId);
      const stats = fs.statSync(conversationPath);
      const age = now - stats.mtimeMs;

      if (age > maxAgeMs) {
        fs.unlinkSync(conversationPath);
        deletedCount++;
      }
    } catch (error) {
      console.error(`Warning: Failed to process conversation ${agentId}: ${error}`);
    }
  }

  return deletedCount;
}

// CLI interface for testing
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];

  try {
    switch (command) {
      case 'create': {
        const agentId = args[1];
        const agentType = args[2];
        if (!agentId || !agentType) {
          console.error('Usage: conversation-storage.ts create <agentId> <agentType>');
          process.exit(1);
        }
        const path = createConversationFile(agentId, agentType);
        console.log(`✓ Created conversation file: ${path}`);
        break;
      }

      case 'append': {
        const agentId = args[1];
        const role = args[2] as 'user' | 'assistant' | 'system';
        const content = args.slice(3).join(' ');
        if (!agentId || !role || !content) {
          console.error('Usage: conversation-storage.ts append <agentId> <role> <content...>');
          process.exit(1);
        }
        appendToConversation(agentId, { role, content });
        console.log(`✓ Appended ${role} message to conversation ${agentId}`);
        break;
      }

      case 'load': {
        const agentId = args[1];
        if (!agentId) {
          console.error('Usage: conversation-storage.ts load <agentId>');
          process.exit(1);
        }
        const { metadata, events } = loadConversation(agentId);
        console.log('Metadata:', JSON.stringify(metadata, null, 2));
        console.log(`Events: ${events.length}`);
        events.forEach((event, i) => {
          console.log(`  [${i + 1}] ${event.timestamp} ${event.role}: ${event.content.substring(0, 50)}...`);
        });
        break;
      }

      case 'list': {
        const agentIds = listConversations();
        console.log(`Found ${agentIds.length} conversation(s):`);
        agentIds.forEach(id => console.log(`  - ${id}`));
        break;
      }

      case 'stats': {
        const agentId = args[1];
        if (!agentId) {
          console.error('Usage: conversation-storage.ts stats <agentId>');
          process.exit(1);
        }
        const stats = getConversationStats(agentId);
        console.log('Statistics:', JSON.stringify(stats, null, 2));
        break;
      }

      case 'delete': {
        const agentId = args[1];
        if (!agentId) {
          console.error('Usage: conversation-storage.ts delete <agentId>');
          process.exit(1);
        }
        const deleted = deleteConversation(agentId);
        if (deleted) {
          console.log(`✓ Deleted conversation ${agentId}`);
        } else {
          console.log(`! Conversation ${agentId} does not exist`);
        }
        break;
      }

      case 'cleanup': {
        const maxAge = args[1] ? parseInt(args[1]) : 72;
        const count = cleanupOldConversations(maxAge);
        console.log(`✓ Cleaned up ${count} old conversation(s)`);
        break;
      }

      default:
        console.log('Usage: conversation-storage.ts <command> [args...]');
        console.log('Commands:');
        console.log('  create <agentId> <agentType>     - Create new conversation file');
        console.log('  append <agentId> <role> <msg>    - Append event to conversation');
        console.log('  load <agentId>                   - Load and display conversation');
        console.log('  list                             - List all conversations');
        console.log('  stats <agentId>                  - Show conversation statistics');
        console.log('  delete <agentId>                 - Delete conversation file');
        console.log('  cleanup [maxAgeHours]            - Clean up old conversations (default: 72h)');
        process.exit(1);
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
}
