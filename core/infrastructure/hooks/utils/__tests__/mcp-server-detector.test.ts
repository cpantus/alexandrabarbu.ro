/**
 * Tests for MCP Server Detection Utility
 */

import { describe, it, expect } from '@jest/globals';
import {
  detectNeededServers,
  recommendProfile,
  compareWithLoadedServers,
  type MCPServerCatalog,
  type ServerDetectionResult
} from '../mcp-server-detector';

// Mock catalog for testing
const mockCatalog: MCPServerCatalog = {
  servers: {
    playwright: {
      category: 'browser-automation',
      keywords: ['browser', 'scrape', 'web page', 'screenshot', 'navigate'],
      toolCount: 23,
      estimatedTokens: 18400,
      frequency: 'medium',
      autoStart: false,
      description: 'Browser automation'
    },
    gdrive: {
      category: 'productivity',
      keywords: ['google drive', 'gdrive', 'document', 'spreadsheet'],
      toolCount: 18,
      estimatedTokens: 14400,
      frequency: 'high',
      autoStart: false,
      description: 'Google Drive'
    },
    github: {
      category: 'development',
      keywords: ['github', 'repository', 'pull request', 'pr', 'issue'],
      toolCount: 20,
      estimatedTokens: 16000,
      frequency: 'medium',
      autoStart: false,
      description: 'GitHub'
    }
  },
  profiles: {
    'browser-automation': {
      description: 'Browser automation',
      servers: ['playwright'],
      estimatedTokens: 18400,
      tokenSavings: 30400,
      savingsPercentage: 62
    },
    'productivity': {
      description: 'Productivity tools',
      servers: ['gdrive'],
      estimatedTokens: 14400,
      tokenSavings: 34400,
      savingsPercentage: 71
    },
    'development': {
      description: 'Development tools',
      servers: ['github'],
      estimatedTokens: 16000,
      tokenSavings: 32800,
      savingsPercentage: 67
    }
  },
  metadata: {
    totalServers: 3,
    totalEstimatedTokens: 48800,
    averageTokensPerServer: 16267,
    lastUpdated: '2025-11-15',
    version: '1.0.0'
  }
};

describe('detectNeededServers', () => {
  it('should detect browser automation from keywords', () => {
    const prompt = 'Please scrape this website for pricing data';
    const result = detectNeededServers(prompt, mockCatalog);

    expect(result.serversNeeded).toContain('playwright');
    expect(result.matchedKeywords['playwright']).toContain('scrape');
    expect(result.confidence).not.toBe('low');
  });

  it('should detect multiple servers from prompt', () => {
    const prompt = 'Scrape the website and upload results to Google Drive';
    const result = detectNeededServers(prompt, mockCatalog);

    expect(result.serversNeeded).toContain('playwright');
    expect(result.serversNeeded).toContain('gdrive');
    expect(result.serversNeeded.length).toBe(2);
  });

  it('should detect GitHub from repository keywords', () => {
    const prompt = 'Create a pull request for this repository';
    const result = detectNeededServers(prompt, mockCatalog);

    expect(result.serversNeeded).toContain('github');
    expect(result.matchedKeywords['github']).toContain('pull request');
  });

  it('should return empty when no keywords match', () => {
    const prompt = 'What is the weather today?';
    const result = detectNeededServers(prompt, mockCatalog);

    expect(result.serversNeeded.length).toBe(0);
    expect(result.estimatedTokens).toBe(0);
    expect(result.tokenSavings).toBe(mockCatalog.metadata.totalEstimatedTokens);
    expect(result.savingsPercentage).toBe(100);
  });

  it('should be case-insensitive', () => {
    const prompt = 'Take a SCREENSHOT of this PAGE';
    const result = detectNeededServers(prompt, mockCatalog);

    expect(result.serversNeeded).toContain('playwright');
  });

  it('should calculate tokens correctly', () => {
    const prompt = 'Scrape website and create GitHub issue';
    const result = detectNeededServers(prompt, mockCatalog);

    const expectedTokens = 18400 + 16000; // playwright + github
    expect(result.estimatedTokens).toBe(expectedTokens);
    expect(result.totalTokens).toBe(48800);
    expect(result.tokenSavings).toBe(48800 - expectedTokens);
  });

  it('should have high confidence with multiple keyword matches', () => {
    const prompt = 'Navigate to web page, take screenshot, and scrape data';
    const result = detectNeededServers(prompt, mockCatalog);

    expect(result.confidence).toBe('high');
    expect(result.matchedKeywords['playwright'].length).toBeGreaterThan(2);
  });
});

describe('recommendProfile', () => {
  it('should recommend exact matching profile', () => {
    const detection: ServerDetectionResult = {
      serversNeeded: ['playwright'],
      estimatedTokens: 18400,
      tokenSavings: 30400,
      savingsPercentage: 62,
      totalTokens: 48800,
      confidence: 'high',
      matchedKeywords: { playwright: ['scrape'] }
    };

    const profile = recommendProfile(detection, mockCatalog);
    expect(profile).toBe('browser-automation');
  });

  it('should recommend closest profile when no exact match', () => {
    const detection: ServerDetectionResult = {
      serversNeeded: ['playwright', 'gdrive'],
      estimatedTokens: 32800,
      tokenSavings: 16000,
      savingsPercentage: 33,
      totalTokens: 48800,
      confidence: 'medium',
      matchedKeywords: { playwright: ['scrape'], gdrive: ['document'] }
    };

    const profile = recommendProfile(detection, mockCatalog);
    // Should recommend either browser-automation or productivity (both 50% match)
    expect(profile).toBeTruthy();
  });

  it('should return null when match score is too low', () => {
    const detection: ServerDetectionResult = {
      serversNeeded: ['playwright', 'github', 'gdrive'],
      estimatedTokens: 48800,
      tokenSavings: 0,
      savingsPercentage: 0,
      totalTokens: 48800,
      confidence: 'low',
      matchedKeywords: {}
    };

    const profile = recommendProfile(detection, mockCatalog);
    // All three servers, no single profile matches well enough
    expect(profile).toBeNull();
  });
});

describe('compareWithLoadedServers', () => {
  it('should identify servers already loaded', () => {
    const detection: ServerDetectionResult = {
      serversNeeded: ['playwright', 'gdrive'],
      estimatedTokens: 32800,
      tokenSavings: 16000,
      savingsPercentage: 33,
      totalTokens: 48800,
      confidence: 'high',
      matchedKeywords: { playwright: ['scrape'], gdrive: ['document'] }
    };

    const loadedServers = ['playwright'];
    const comparison = compareWithLoadedServers(detection, loadedServers);

    expect(comparison.alreadyLoaded).toEqual(['playwright']);
    expect(comparison.shouldLoad).toEqual(['gdrive']);
    expect(comparison.unnecessary).toEqual([]);
  });

  it('should identify unnecessary loaded servers', () => {
    const detection: ServerDetectionResult = {
      serversNeeded: ['playwright'],
      estimatedTokens: 18400,
      tokenSavings: 30400,
      savingsPercentage: 62,
      totalTokens: 48800,
      confidence: 'high',
      matchedKeywords: { playwright: ['scrape'] }
    };

    const loadedServers = ['playwright', 'github', 'gdrive'];
    const comparison = compareWithLoadedServers(detection, loadedServers);

    expect(comparison.alreadyLoaded).toEqual(['playwright']);
    expect(comparison.shouldLoad).toEqual([]);
    expect(comparison.unnecessary).toEqual(['github', 'gdrive']);
    expect(comparison.recommendation).toContain('unloading');
  });

  it('should give optimal recommendation when configuration matches', () => {
    const detection: ServerDetectionResult = {
      serversNeeded: ['playwright'],
      estimatedTokens: 18400,
      tokenSavings: 30400,
      savingsPercentage: 62,
      totalTokens: 48800,
      confidence: 'high',
      matchedKeywords: { playwright: ['scrape'] }
    };

    const loadedServers = ['playwright'];
    const comparison = compareWithLoadedServers(detection, loadedServers);

    expect(comparison.recommendation).toContain('optimal');
  });
});
