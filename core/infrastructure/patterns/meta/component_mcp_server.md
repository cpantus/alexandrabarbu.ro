# Pattern: Component - MCP Server

**Category**: meta
**Complexity**: simple
**Thinking**: N/A
**Knowledge Required**: N/A
**Version:** 2.0 (v5.4.0 - Directive Language + Task Decomposition Override)

---

## PURPOSE

Define structure, validation rules, and quality standards for MCP (Model Context Protocol) server configuration components.

---

## Task Decomposition Override (v5.4.0)

When creating or validating MCP server components, **DO NOT use your default task decomposition.**

### ❌ PROHIBITED SEQUENCE (Quick Server Setup):
1. Add server to mcp-servers.json without validation
2. Skip profile and environment variable checks
3. Forget to test server connection
4. Deploy without verifying tool availability

### ✅ MANDATORY SEQUENCE (Systematic MCP Server Setup):

**Phase 1: Input Validation** (Validate 3 critical MCP server requirements)
1. **Server Configuration Validation**: Verify command, args, and env vars are complete
   - Reference: This pattern "Configuration Location" section + MCP documentation
   - Output: Configuration completeness + required fields check

2. **Profile Validation**: Check profile exists and server is appropriately categorized
   - Reference: MCP profile standards (research, social, analytics, etc.)
   - Output: Profile validity + categorization appropriateness

3. **Uniqueness Validation**: Ensure server name doesn't duplicate existing servers
   - Reference: Scan `.claude/mcp-servers.json` for existing configurations
   - Output: Uniqueness check + naming conflicts

**Output Acknowledgment After Phase 1:**
```
MCP Server Validation Input Analysis:
- Configuration: [Command ✓, Required env vars ✓]
- Profile: [research ✓ / social might be more appropriate]
- Uniqueness: [Unique ✓ / Conflicts with existing-server]
```

**Phase 2: Staged Execution** (Configure MCP server)
4. Add server configuration to mcp-servers.json with correct structure
5. Set up required environment variables in shell/config
6. Register server in appropriate profile

**Phase 3: Output Generation** (Test and validate server)
7. Test server connection and initialization
8. Verify all tools are available and functional
9. Document server tools and usage patterns

**IF you use ❌ sequence instead of ✅ sequence = ARCHITECTURE VIOLATION**

**Rationale:** MCP server setup requires validating configuration completeness and profile appropriateness first. Skipping Phase 1 leads to misconfigured servers, missing environment variables, and servers that fail to connect.

---

## Language Standards (v5.4.0)

**YOU MUST use directive language throughout MCP server specifications:**

**Required Directives:**
- ✅ "MUST", "DO NOT", "ALWAYS", "NEVER", "MANDATORY", "PROHIBITED", "REQUIRED"
- ❌ Never: "should", "consider", "might", "could", "try to", "recommended"

**Server Requirements:**
- ✅ "MCP servers MUST include command and profile fields"
- ❌ "MCP servers should have command and profile"

**Configuration Rules:**
- ✅ "ALWAYS test server connection", "NEVER deploy without env vars"
- ❌ "Try to test connection", "Consider setting env vars"

**Enforcement Note:** Meta-patterns with weak language will be rejected by validation hooks.

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
