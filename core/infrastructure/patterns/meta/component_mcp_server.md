# Pattern: Component - MCP Server

**Category**: meta
**Complexity**: simple
**Thinking**: N/A
**Knowledge Required**: N/A

---

## PURPOSE

Define structure, validation rules, and quality standards for MCP (Model Context Protocol) server configuration components.

---

## INPUT

**Required:**
1. **Server name**: kebab-case identifier
2. **Command**: Executable command to start server
3. **Profile**: Which profile this server belongs to (research, social, analytics, etc.)

**Optional:**
4. **Environment variables**: Required env vars
5. **Args**: Command-line arguments

---

## RULES

### Naming Convention

**Format:** kebab-case
**Pattern:** `/^[a-z0-9]+(-[a-z0-9]+)*$/`

**Valid examples:**
- `brave-search` ✓
- `google-search` ✓
- `tavily-search` ✓
- `youtube-transcript` ✓
- `github-mcp` ✓

---

### Configuration Location

**File:** `.claude/mcp-servers.json`

**Structure:**
```json
{
  "mcpServers": {
    "server-name": {
      "command": "executable",
      "args": ["arg1", "arg2"],
      "env": {
        "ENV_VAR": "value"
      },
      "profile": "profile-name"
    }
  }
}
```

---

### Profile System

**Profiles:**
- `research`: Search and web research tools
- `social`: Social media APIs
- `analytics`: Analytics and tracking platforms
- `productivity`: Task management and collaboration
- `development`: Development tools and APIs

**Usage:** `/mcp-load [profile-name]` loads all servers in that profile

---

### Emoji Standards

MCP category emoji: 🔌 (connection/integration)

**Individual servers don't have unique emojis** - all use category emoji 🔌

---

## PROCESS

1. **Determine Server Type** - Identify integration category (search, social, analytics, etc.)
2. **Assign to Profile** - Choose profile (research, social, analytics, productivity, development)
3. **Get Configuration** - Command, args, environment variables
4. **Add to mcp-servers.json** - Register server configuration
5. **Document Usage** - Create command or document in integration guide
6. **Test Server** - Verify server starts and responds correctly

---

## OUTPUT

### Template Structure (JSON Entry)

```json
{
  "mcpServers": {
    "{{serverName}}": {
      "command": "{{command}}",
      {{#if hasArgs}}
      "args": [
        {{#each args}}
        "{{this}}"{{#unless @last}},{{/unless}}
        {{/each}}
      ],
      {{/if}}
      {{#if hasEnv}}
      "env": {
        {{#each envVars}}
        "{{this.key}}": "{{this.value}}"{{#unless @last}},{{/unless}}
        {{/each}}
      },
      {{/if}}
      "profile": "{{profile}}"
    }
  }
}
```

### Template Variables

**Required:**
- `serverName`: Server identifier (kebab-case)
- `command`: Executable command (npx, python, node, etc.)
- `profile`: Profile name (research, social, analytics, productivity, development)

**Optional:**
- `hasArgs`: Boolean - whether server has command-line arguments
- `args`: Array of command-line arguments
- `hasEnv`: Boolean - whether server requires environment variables
- `envVars`: Array of {key, value} environment variable pairs

### Example: Generated MCP Server Configuration

**Input:**
```json
{
  "serverName": "brave-search",
  "command": "npx",
  "hasArgs": true,
  "args": ["-y", "@modelcontextprotocol/server-brave-search"],
  "hasEnv": true,
  "envVars": [
    {"key": "BRAVE_API_KEY", "value": "your-api-key-here"}
  ],
  "profile": "research"
}
```

**Output:**
```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-brave-search"
      ],
      "env": {
        "BRAVE_API_KEY": "your-api-key-here"
      },
      "profile": "research"
    }
  }
}
```

---

## QUALITY CHECKS

- [ ] Server name is kebab-case
- [ ] Command is valid executable
- [ ] Profile specified
- [ ] Required env vars documented
- [ ] Server registered in mcp-servers.json
- [ ] JSON syntax valid
- [ ] Profile exists in system

---

## ADAPTATION

**When adapting MCP server configs from external sources:**

**Format:** Convert to system JSON structure | Place in settings.json or mcp-servers.json | Ensure command+args+env format correct
**Naming:** Enforce kebab-case | Remove special chars | Use semantic server names (service-name pattern)
**Profile assignment:** Map to system profiles (research/social/analytics/productivity/development) | Create profile if unique integration type
**Environment vars:** Document required env vars | Use placeholder values | Add setup instructions
**Validation:** Test server starts correctly | Verify JSON syntax | Check profile exists

**Adaptation validated via:** JSON schema validation + MCP server startup test

---

**Pattern Version:** 1.1
**Last Updated:** 2025-11-12
**Component Count:** 15 MCP servers across 5 profiles
