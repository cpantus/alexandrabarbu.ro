/**
 * Suggest Research Hook
 *
 * Runs BEFORE Claude sees the user's prompt.
 * Detects research-worthy queries and suggests `/research` command or `--with-research` flag.
 *
 * Non-intrusive: Provides helpful suggestions when external knowledge would be beneficial.
 */

import * as fs from 'fs';
import * as path from 'path';
import { readStdinWithTimeout } from './utils/stdin-reader';
import { getProjectRoot } from './utils/project-root';

/**
 * Detect if prompt is research-worthy
 */
function detectResearchNeeds(prompt: string): {
  needsResearch: boolean;
  topic: string | null;
  researchType: 'best-practices' | 'comparison' | 'documentation' | 'patterns' | null;
  confidence: number;
} {
  const lowerPrompt = prompt.toLowerCase();

  // Keywords that indicate research needs
  const bestPracticesKeywords = [
    'best practice', 'best way', 'recommended way', 'how should', 'proper way',
    'correct approach', 'right way', 'standard practice', 'industry standard'
  ];

  const comparisonKeywords = [
    ' vs ', ' versus ', 'compare', 'difference between', 'which is better',
    'should i use', 'choose between', 'alternative to'
  ];

  const documentationKeywords = [
    'documentation', 'official docs', 'api reference', 'how to use',
    'getting started with', 'learn about', 'understand'
  ];

  const patternKeywords = [
    'architecture pattern', 'design pattern', 'implementation pattern',
    'how to implement', 'how to architect', 'how to structure'
  ];

  // Technologies that often need research
  const commonTechnologies = [
    'react', 'vue', 'angular', 'next.js', 'nuxt', 'svelte',
    'typescript', 'javascript', 'python', 'rust', 'go', 'java',
    'postgresql', 'mongodb', 'redis', 'elasticsearch',
    'graphql', 'rest api', 'grpc', 'websocket',
    'docker', 'kubernetes', 'aws', 'azure', 'gcp',
    'oauth', 'jwt', 'authentication', 'authorization',
    'microservices', 'serverless', 'event-driven'
  ];

  // Check for research type
  let researchType: 'best-practices' | 'comparison' | 'documentation' | 'patterns' | null = null;
  let confidence = 0;

  if (bestPracticesKeywords.some(kw => lowerPrompt.includes(kw))) {
    researchType = 'best-practices';
    confidence = 0.8;
  } else if (comparisonKeywords.some(kw => lowerPrompt.includes(kw))) {
    researchType = 'comparison';
    confidence = 0.9;
  } else if (documentationKeywords.some(kw => lowerPrompt.includes(kw))) {
    researchType = 'documentation';
    confidence = 0.7;
  } else if (patternKeywords.some(kw => lowerPrompt.includes(kw))) {
    researchType = 'patterns';
    confidence = 0.75;
  }

  // Check if technology is mentioned
  const mentionedTech = commonTechnologies.find(tech => lowerPrompt.includes(tech));

  if (!researchType || !mentionedTech) {
    return { needsResearch: false, topic: null, researchType: null, confidence: 0 };
  }

  // Extract topic (technology + research type context)
  let topic = mentionedTech;
  if (researchType === 'best-practices') {
    topic = `${mentionedTech} best practices`;
  } else if (researchType === 'comparison') {
    // Try to extract both technologies in comparison
    const vsMatch = lowerPrompt.match(/(\w+(?:\.\w+)?)\s+(?:vs|versus)\s+(\w+(?:\.\w+)?)/);
    if (vsMatch) {
      topic = `${vsMatch[1]} vs ${vsMatch[2]}`;
    }
  } else if (researchType === 'patterns') {
    topic = `${mentionedTech} architecture patterns`;
  }

  return {
    needsResearch: confidence >= 0.7,
    topic,
    researchType,
    confidence
  };
}

/**
 * Check if research already exists for this topic
 */
function checkExistingResearch(projectRoot: string, topic: string): string | null {
  const researchDir = path.join(projectRoot, 'research');

  if (!fs.existsSync(researchDir)) {
    return null;
  }

  // Sanitize topic for filename matching
  const sanitizedTopic = topic.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  // Check for existing research files
  try {
    const files = fs.readdirSync(researchDir);
    const matchingFile = files.find(file =>
      file.toLowerCase().includes(sanitizedTopic) ||
      sanitizedTopic.includes(file.toLowerCase().replace('.md', ''))
    );

    if (matchingFile) {
      return path.join(researchDir, matchingFile);
    }
  } catch (error) {
    // Directory doesn't exist or can't be read
    return null;
  }

  return null;
}

/**
 * Format suggestion message
 */
function formatSuggestion(
  topic: string,
  researchType: string,
  existingResearch: string | null,
  command: string
): string {
  const border = '━'.repeat(48);

  if (existingResearch) {
    return `
${border}
💡 RESEARCH AVAILABLE
${border}

Existing research found for this topic:
📄 ${existingResearch}

You can review it with:
cat ${existingResearch}

Or update with fresh research:
${command}

${border}
`;
  }

  const typeEmojis = {
    'best-practices': '✨',
    'comparison': '⚖️',
    'documentation': '📚',
    'patterns': '🏗️'
  };

  const emoji = typeEmojis[researchType as keyof typeof typeEmojis] || '💡';

  return `
${border}
${emoji} RESEARCH SUGGESTION
${border}

This query might benefit from external research.

💡 Suggested command:
   ${command}

⏱️  Takes 3-5 minutes
💰 Cost: ~$0.03-0.05
📊 Returns: 5-10 authoritative sources

You can also integrate research with workflows:
/workflow scout-plan-build "task" --with-research

${border}
`;
}

/**
 * Main hook function
 */
async function main() {
  try {
    // Get user prompt from stdin with timeout
    const prompt = await readStdinWithTimeout({ timeout: 1000 });

    if (!prompt || prompt.trim().length === 0) {
      process.exit(0); // Success - no prompt to analyze
    }

    // Short-circuit for trivial prompts
    const promptLower = prompt.toLowerCase().trim();
    if (promptLower.length < 15 ||
        /^(hi|hello|hey|thanks?|thank you|bye|goodbye|\?)$/i.test(promptLower)) {
      process.exit(0); // Success - trivial prompt
    }

    // Skip if user is already using /research command or --with-research flag
    if (promptLower.includes('/research') || promptLower.includes('--with-research')) {
      process.exit(0); // Success - already using research
    }

    // Get project root (portable detection via git or cwd)
    const projectRoot = getProjectRoot();

    // Detect research needs
    const detection = detectResearchNeeds(prompt);

    if (!detection.needsResearch || !detection.topic) {
      process.exit(0);
    }

    // Check for existing research
    const existingResearch = checkExistingResearch(projectRoot, detection.topic);

    // Format suggested command
    let command = `/research "${detection.topic}"`;
    if (detection.researchType === 'comparison') {
      command = `/research "${detection.topic}"`;
    } else if (detection.researchType === 'best-practices') {
      command = `/research "${detection.topic}"`;
    }

    // Output suggestion
    const suggestion = formatSuggestion(
      detection.topic,
      detection.researchType || 'best-practices',
      existingResearch,
      command
    );

    console.log(suggestion);
    process.exit(0); // Success - suggestion shown

  } catch (error) {
    // Silent fail - don't disrupt user experience if hook errors
    console.error('Hook error:', error);
    process.exit(0); // Exit gracefully on error (don't block user)
  }
}

// Run the hook
main().catch(error => {
  console.error('Unexpected error:', error);
  process.exit(0); // Exit gracefully on error (don't block user)
});
