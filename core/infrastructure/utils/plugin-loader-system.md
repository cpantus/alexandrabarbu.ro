# Plugin Loader System

**Version:** 1.0
**Created:** 2025-11-10
**Purpose:** Load extended plugin components (patterns, skills, teaching, knowledge) from Claude Code plugins

---

## Overview

This system extends Claude Code's official plugin loading to support additional component types beyond the standard agents, commands, hooks, and MCP servers.

**Standard Components (Claude Code Native):**
- ✅ agents/ - Loaded automatically by Claude Code
- ✅ commands/ - Loaded automatically by Claude Code
- ✅ hooks/ - Loaded automatically by Claude Code
- ✅ .mcp.json - Loaded automatically by Claude Code

**Extended Components (Custom Loaders):**
- 🔧 patterns/ - Executable marketing task templates
- 🔧 skills/ - Auto-activating knowledge modules
- 🔧 teaching/ - Interactive teaching modules with datasets
- 🔧 knowledge/ - Brand guidelines, personas, frameworks

---

## Architecture

```
core/infrastructure/utils/
├── plugin-loader.ts              # Main plugin loader (orchestrates all loaders)
├── plugin-pattern-loader.ts      # Loads patterns from plugins
├── plugin-skill-loader.ts        # Loads skills from plugins
├── plugin-teaching-loader.ts     # Loads teaching modules from plugins
├── plugin-knowledge-loader.ts    # Loads knowledge bases from plugins
└── plugin-loader-system.md       # This document
```

---

## Loading Sequence

### Standard Component Loading (Claude Code Native)

```
1. User installs plugin: /plugin install marketing
2. Claude Code reads: marketing-plugin/.claude-plugin/plugin.json
3. Claude Code automatically loads:
   - agents/*.md → Available for activation
   - commands/*.md → Available as slash commands
   - hooks/*.ts → Registered with hook system
   - .mcp.json → MCP servers configured
```

### Extended Component Loading (Custom)

```
4. plugin-loader.ts detects "extensions" field in plugin.json
5. If plugin.json contains extended components:

   a. plugin-pattern-loader.ts loads patterns/:
      - Reads pattern markdown files
      - Parses pattern structure (INPUT, PROCESS, OUTPUT)
      - Registers with pattern suggestion system
      - Enables auto-suggest if configured

   b. plugin-skill-loader.ts loads skills/:
      - Reads skill markdown files
      - Parses skill triggers and activation rules
      - Registers with skill auto-activation system
      - Sets up trigger keyword matching

   c. plugin-teaching-loader.ts loads teaching/:
      - Reads teaching module files
      - Loads associated datasets (CSV, JSON)
      - Registers /learn-X-Y commands
      - Makes modules available for learning workflows

   d. plugin-knowledge-loader.ts loads knowledge/:
      - Reads knowledge base files (MD, JSON, YAML)
      - Indexes by category (brand, personas, frameworks)
      - Makes accessible to agents and patterns
      - Enables knowledge retrieval

6. All components ready for use in session
```

---

## Extended plugin.json Format

Standard plugin.json with extended fields:

```json
{
  "name": "marketing",
  "description": "Marketing plugin with extended capabilities",
  "version": "5.0.0",
  "author": {
    "name": "Marketing Agent Team",
    "email": "team@example.com"
  },

  // Standard components (Claude Code native)
  "agents": ["agents/marketing-director.md", "agents/copywriter.md"],
  "commands": ["commands/campaign.md", "commands/content.md"],
  "hooks": ["hooks/pattern-suggester.ts"],

  // Extended components (custom loaders)
  "patterns": ["patterns/**/*.md"],
  "skills": ["skills/*.md"],
  "teaching": ["teaching/**/*.md"],
  "knowledge": ["knowledge/**/*"],

  // Extension configuration
  "extensions": {
    "patterns": {
      "autoSuggest": true,
      "categories": ["content", "strategy", "analysis", "optimization"]
    },
    "skills": {
      "autoActivate": true,
      "triggers": ["brand", "campaign", "seo", "analytics"]
    },
    "teaching": {
      "modules": 30,
      "datasets": true,
      "datasetPath": "teaching/datasets"
    },
    "knowledge": {
      "brand": "knowledge/brand",
      "personas": "knowledge/personas",
      "frameworks": "knowledge/frameworks"
    }
  }
}
```

---

## Component Loaders

### 1. Pattern Loader (plugin-pattern-loader.ts)

**Purpose:** Load and register pattern files from plugins

**Responsibilities:**
- Parse pattern markdown files
- Extract pattern metadata (name, category, inputs, outputs)
- Register patterns with core pattern system
- Enable auto-suggestion based on configuration
- Handle pattern dependencies and chaining

**Input:**
- Plugin path
- plugin.json manifest
- Pattern file paths from "patterns" field

**Output:**
- Patterns registered and available via `/pattern [name]`
- Auto-suggestion enabled if configured
- Pattern index updated

### 2. Skill Loader (plugin-skill-loader.ts)

**Purpose:** Load and register auto-activating skills from plugins

**Responsibilities:**
- Parse skill markdown files
- Extract skill triggers and keywords
- Register skills with auto-activation system
- Set up trigger matching logic
- Handle skill dependencies and resources

**Input:**
- Plugin path
- plugin.json manifest
- Skill file paths from "skills" field

**Output:**
- Skills registered with trigger keywords
- Auto-activation enabled if configured
- Skills activate when keywords detected in user prompts

### 3. Teaching Loader (plugin-teaching-loader.ts)

**Purpose:** Load teaching modules and associated datasets from plugins

**Responsibilities:**
- Parse teaching module markdown files
- Load associated datasets (CSV, JSON)
- Register /learn-X-Y commands
- Set up progressive learning paths
- Handle module dependencies and prerequisites

**Input:**
- Plugin path
- plugin.json manifest
- Teaching module paths from "teaching" field
- Dataset paths from extensions.teaching.datasetPath

**Output:**
- Teaching modules available via `/learn-X-Y` commands
- Datasets loaded and accessible
- Learning paths configured

### 4. Knowledge Loader (plugin-knowledge-loader.ts)

**Purpose:** Load knowledge bases from plugins

**Responsibilities:**
- Parse knowledge files (MD, JSON, YAML)
- Index by category (brand, personas, frameworks, compliance)
- Make accessible to agents and patterns
- Enable knowledge retrieval and search
- Handle knowledge updates and versioning

**Input:**
- Plugin path
- plugin.json manifest
- Knowledge paths from "knowledge" field
- Category mapping from extensions.knowledge

**Output:**
- Knowledge indexed and searchable
- Accessible to all agents and patterns
- Retrieval API available

---

## Integration Points

### Integration with Claude Code Plugin System

```typescript
// Claude Code calls this when plugin is installed/enabled
export function onPluginLoad(pluginPath: string, manifest: any): void {
  // Standard components already loaded by Claude Code

  // Load extended components if present
  if (manifest.extensions) {
    PluginLoader.loadPlugin(pluginPath, manifest);
  }
}

export function onPluginUnload(pluginName: string): void {
  // Cleanup extended components
  PluginLoader.unloadPlugin(pluginName);
}
```

### Integration with Pattern System

```typescript
// Pattern system integration
import { PatternRegistry } from '../patterns/pattern-registry';

PluginPatternLoader.loadPatterns(pluginPath, manifest).then(patterns => {
  patterns.forEach(pattern => {
    PatternRegistry.register(pattern);
  });
});
```

### Integration with Skill System

```typescript
// Skill system integration
import { SkillActivationSystem } from '../skills/skill-activation';

PluginSkillLoader.loadSkills(pluginPath, manifest).then(skills => {
  skills.forEach(skill => {
    SkillActivationSystem.registerSkill(skill);
  });
});
```

---

## Error Handling

### Plugin Loading Errors

```typescript
try {
  PluginLoader.loadPlugin(pluginPath, manifest);
} catch (error) {
  if (error.type === 'MISSING_COMPONENT') {
    console.warn(`Optional component not found: ${error.component}`);
    // Continue loading other components
  } else if (error.type === 'INVALID_FORMAT') {
    console.error(`Invalid format in ${error.file}`);
    // Abort plugin loading
    throw error;
  } else {
    console.error('Plugin loading failed:', error);
    throw error;
  }
}
```

### Graceful Degradation

- If pattern loading fails → Skip patterns, load other components
- If skill loading fails → Skills won't auto-activate, but plugin still works
- If teaching loading fails → Teaching commands unavailable, other features work
- If knowledge loading fails → Knowledge retrieval disabled, agents still function

---

## Performance Considerations

### Lazy Loading

- Patterns loaded on first use or pre-cached
- Skills loaded immediately (needed for auto-activation)
- Teaching modules loaded on-demand when `/learn-X-Y` called
- Knowledge indexed on load, content loaded on-demand

### Caching

- Pattern metadata cached in memory
- Skill triggers indexed for fast matching
- Teaching module structure cached
- Knowledge index cached, content loaded as needed

### Token Optimization

- Extended components loaded only when plugin enabled
- Components unloaded when plugin disabled
- Progressive loading: core metadata first, details on-demand
- Cache invalidation on plugin update

---

## Plugin Toggle Support

### Enable Plugin

```bash
/plugin enable marketing
→ PluginLoader.loadPlugin() called
→ All extended components loaded
→ Components available in session
```

### Disable Plugin

```bash
/plugin disable marketing
→ PluginLoader.unloadPlugin() called
→ All extended components unloaded
→ Context reduced, tokens saved
```

---

## Testing Strategy

### Unit Tests

- Test each loader independently
- Test error handling and edge cases
- Test plugin.json parsing
- Test component registration

### Integration Tests

- Test full plugin loading sequence
- Test component interactions
- Test enable/disable toggling
- Test multiple plugins simultaneously

### Performance Tests

- Measure loading time
- Measure memory usage
- Measure token overhead
- Compare to baseline (extension system)

---

## Migration from Extension System

### Key Differences

**Extension System (Old):**
- Custom config.json loading
- Always loaded (not toggleable)
- Not marketplace compatible
- Custom domain loader

**Plugin System (New):**
- Standard plugin.json
- Toggleable via `/plugin enable/disable`
- Marketplace compatible
- Integrated with Claude Code plugin system

### Compatibility

- Pattern files: No changes needed (same markdown format)
- Skill files: No changes needed (same markdown format)
- Teaching modules: No changes needed (same structure)
- Knowledge files: No changes needed (same formats)

Only changes:
- Directory structure (add `.claude-plugin/`)
- Metadata format (plugin.json instead of domain.json)
- Loading mechanism (plugin loaders instead of domain loader)

---

## Future Enhancements

### Potential Additions

- **Plugin dependencies:** Allow plugins to depend on other plugins
- **Component hot-reload:** Reload components without restarting session
- **Component versioning:** Support multiple versions of same component
- **Component overrides:** Allow plugins to override core components
- **Component marketplace:** Separate marketplace for individual components

---

## References

**Official Documentation:**
- [Claude Code Plugin System](https://code.claude.com/docs/en/plugin-marketplaces)
- [Plugin Specification](https://www.anthropic.com/news/claude-code-plugins)

**Related Files:**
- `dev/active/plugin-architecture-fix/MIGRATION-PLAN.md`
- `dev/active/plugin-architecture-fix/PLUGIN-SPEC.md`
- `core/CORE.md`

---

**Document Version:** 1.0
**Last Updated:** 2025-11-10
**Status:** Architecture Design Complete
**Next Step:** Implement plugin-pattern-loader.ts
