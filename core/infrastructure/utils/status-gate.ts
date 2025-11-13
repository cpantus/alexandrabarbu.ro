/**
 * Status Gate Utilities
 *
 * Manages workflow state transitions and provides next-step suggestions
 * for multi-agent campaign workflows.
 */

import * as fs from 'fs';
import * as path from 'path';

export type WorkflowStatus =
  | 'INIT'
  | 'READY_FOR_STRATEGY'
  | 'READY_FOR_CONTENT'
  | 'READY_FOR_REVIEW'
  | 'READY_FOR_OPTIMIZATION'
  | 'DONE'
  | 'BLOCKED'
  | 'UNKNOWN';

export interface WorkflowState {
  task: string;
  status: WorkflowStatus;
  metadata: {
    started_at: string;
    updated_at: string;
    agent_history: string[];
    deliverables: string[];
    blockers?: string[];
  };
}

export interface NextStepSuggestion {
  status: WorkflowStatus;
  message: string;
  suggestedAgent: string;
  icon: string;
}

/**
 * Load workflow status from queue file
 */
export function loadWorkflowStatus(projectRoot: string): WorkflowState | null {
  const queuePath = path.join(projectRoot, 'enhancements', '_queue.json');

  try {
    if (!fs.existsSync(queuePath)) {
      return null;
    }

    const content = fs.readFileSync(queuePath, 'utf-8');
    const state = JSON.parse(content) as WorkflowState;

    return state;
  } catch (error) {
    console.error('[status-gate] Error loading workflow status:', error);
    return null;
  }
}

/**
 * Update workflow status
 */
export function updateWorkflowStatus(
  projectRoot: string,
  updates: Partial<WorkflowState>
): boolean {
  const queuePath = path.join(projectRoot, 'enhancements', '_queue.json');

  try {
    // Load existing state or create new
    let state: WorkflowState;

    if (fs.existsSync(queuePath)) {
      const content = fs.readFileSync(queuePath, 'utf-8');
      state = JSON.parse(content) as WorkflowState;
    } else {
      state = {
        task: updates.task || 'Unknown Task',
        status: 'INIT',
        metadata: {
          started_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          agent_history: [],
          deliverables: []
        }
      };
    }

    // Apply updates
    if (updates.task) state.task = updates.task;
    if (updates.status) state.status = updates.status;
    if (updates.metadata) {
      state.metadata = {
        ...state.metadata,
        ...updates.metadata,
        updated_at: new Date().toISOString()
      };
    }

    // Ensure directory exists
    const enhancementsDir = path.join(projectRoot, 'enhancements');
    if (!fs.existsSync(enhancementsDir)) {
      fs.mkdirSync(enhancementsDir, { recursive: true });
    }

    // Write updated state
    fs.writeFileSync(queuePath, JSON.stringify(state, null, 2), 'utf-8');

    return true;
  } catch (error) {
    console.error('[status-gate] Error updating workflow status:', error);
    return false;
  }
}

/**
 * Get next step suggestion based on current status
 */
export function getNextStepSuggestion(status: WorkflowStatus): NextStepSuggestion | null {
  const suggestions: Record<WorkflowStatus, NextStepSuggestion> = {
    'INIT': {
      status: 'INIT',
      message: 'Campaign initialized. Define strategy first.',
      suggestedAgent: 'marketing-director',
      icon: '🎯'
    },
    'READY_FOR_STRATEGY': {
      status: 'READY_FOR_STRATEGY',
      message: 'Research complete. Create campaign strategy.',
      suggestedAgent: 'marketing-director',
      icon: '📋'
    },
    'READY_FOR_CONTENT': {
      status: 'READY_FOR_CONTENT',
      message: 'Strategy approved. Create campaign content.',
      suggestedAgent: 'copywriter',
      icon: '✍️'
    },
    'READY_FOR_REVIEW': {
      status: 'READY_FOR_REVIEW',
      message: 'Content created. Review brand compliance.',
      suggestedAgent: 'brand-strategist',
      icon: '🔍'
    },
    'READY_FOR_OPTIMIZATION': {
      status: 'READY_FOR_OPTIMIZATION',
      message: 'Review complete. Optimize for performance.',
      suggestedAgent: 'growth-hacker',
      icon: '📈'
    },
    'DONE': {
      status: 'DONE',
      message: 'Campaign complete! Ready to publish.',
      suggestedAgent: '',
      icon: '✅'
    },
    'BLOCKED': {
      status: 'BLOCKED',
      message: 'Workflow blocked. Review blockers and resolve.',
      suggestedAgent: 'task-coordinator',
      icon: '⚠️'
    },
    'UNKNOWN': {
      status: 'UNKNOWN',
      message: 'Status unknown. Check workflow state.',
      suggestedAgent: '',
      icon: '❓'
    }
  };

  return suggestions[status] || null;
}

/**
 * Format workflow status message for display
 */
export function formatWorkflowStatus(state: WorkflowState): string {
  const suggestion = getNextStepSuggestion(state.status);

  if (!suggestion) {
    return '';
  }

  const lines = [
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '📋 WORKFLOW STATUS',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    ''
  ];

  // Current status
  lines.push(`${suggestion.icon} ${suggestion.message}`);
  lines.push('');

  // Task info
  if (state.task) {
    lines.push(`Task: ${state.task}`);
  }

  // Agent history (last 3)
  if (state.metadata.agent_history.length > 0) {
    const recentAgents = state.metadata.agent_history.slice(-3);
    lines.push(`Recent: ${recentAgents.join(' → ')}`);
  }

  // Deliverables count
  if (state.metadata.deliverables.length > 0) {
    lines.push(`Deliverables: ${state.metadata.deliverables.length} created`);
  }

  lines.push('');

  // Next step suggestion (if not DONE)
  if (state.status !== 'DONE' && suggestion.suggestedAgent) {
    lines.push('💡 Suggested Next Step:');
    lines.push(`   Use ${suggestion.suggestedAgent} subagent`);
    lines.push('');
  }

  // Blockers (if any)
  if (state.metadata.blockers && state.metadata.blockers.length > 0) {
    lines.push('⚠️  Blockers:');
    for (const blocker of state.metadata.blockers) {
      lines.push(`   • ${blocker}`);
    }
    lines.push('');
  }

  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  return lines.join('\n');
}

/**
 * Determine next status based on current status and completion
 */
export function getNextStatus(currentStatus: WorkflowStatus): WorkflowStatus {
  const transitions: Record<WorkflowStatus, WorkflowStatus> = {
    'INIT': 'READY_FOR_STRATEGY',
    'READY_FOR_STRATEGY': 'READY_FOR_CONTENT',
    'READY_FOR_CONTENT': 'READY_FOR_REVIEW',
    'READY_FOR_REVIEW': 'READY_FOR_OPTIMIZATION',
    'READY_FOR_OPTIMIZATION': 'DONE',
    'DONE': 'DONE',
    'BLOCKED': 'BLOCKED',
    'UNKNOWN': 'UNKNOWN'
  };

  return transitions[currentStatus] || 'UNKNOWN';
}

/**
 * Record agent execution in workflow history
 */
export function recordAgentExecution(
  projectRoot: string,
  agentName: string,
  deliverables: string[] = []
): boolean {
  try {
    const state = loadWorkflowStatus(projectRoot);

    if (!state) {
      // No active workflow, skip recording
      return false;
    }

    // Add agent to history
    if (!state.metadata.agent_history.includes(agentName)) {
      state.metadata.agent_history.push(agentName);
    }

    // Add deliverables
    if (deliverables.length > 0) {
      state.metadata.deliverables.push(...deliverables);
    }

    // Update state
    return updateWorkflowStatus(projectRoot, state);
  } catch (error) {
    console.error('[status-gate] Error recording agent execution:', error);
    return false;
  }
}

/**
 * Clear workflow state (reset for new campaign)
 */
export function clearWorkflowStatus(projectRoot: string): boolean {
  const queuePath = path.join(projectRoot, 'enhancements', '_queue.json');

  try {
    if (fs.existsSync(queuePath)) {
      fs.unlinkSync(queuePath);
    }
    return true;
  } catch (error) {
    console.error('[status-gate] Error clearing workflow status:', error);
    return false;
  }
}

/**
 * Initialize new workflow
 */
export function initializeWorkflow(
  projectRoot: string,
  taskName: string
): boolean {
  const initialState: WorkflowState = {
    task: taskName,
    status: 'INIT',
    metadata: {
      started_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      agent_history: [],
      deliverables: []
    }
  };

  return updateWorkflowStatus(projectRoot, initialState);
}
