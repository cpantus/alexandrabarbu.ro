# /system-health

🏥 Run comprehensive system health check - validates registries, references, emojis, and orphaned files

---

## WHEN TO USE

Use `/system-health` to validate the Marketing Agent system:
- After making structural changes to the system
- Before committing major refactoring work
- When troubleshooting component integration issues
- Periodically as part of system maintenance (monthly recommended)
- When preparing for production deployment

## SYNTAX

```
/system-health [options]
```

**Options:**
- No options: Run basic health check (summary only)
- `--verbose`: Show detailed issues and file-level problems
- `--json`: Output raw JSON report for programmatic use
- `--fix`: Auto-fix simple issues (emoji formatting, registry updates)

## WHAT IT DOES

The system health checker validates:

### 1. Registry Files (25% weight)
Validates all system registry JSON files:
- `skill-rules.json` - Skill definitions and triggers
- `patterns/pattern-index.json` - Pattern catalog
- `emoji-standards.json` - Emoji mappings
- `docs/docs-index.json` - Documentation index
- `settings.json` - Hook configurations

**Checks:**
- ✅ File exists
- ✅ Valid JSON syntax
- ✅ Required fields present
- ✅ Proper structure

### 2. References (35% weight)
Scans all markdown files for broken @-references:
- `@.claude/...` - Internal component references
- `@teaching/...` - Teaching module references
- Cross-file references between components

**Checks:**
- ✅ Referenced file exists
- ✅ Path is correct
- ⚠️  May flag TypeScript decorators as false positives

### 3. Emoji Compliance (25% weight)
Verifies emoji standards across all components:
- **Agents** - Emoji in YAML description field
- **Commands** - Category emoji in first description line
- **Resources** - Subject emoji in first heading

**Checks:**
- ✅ Emoji present
- ✅ Correct emoji for component
- ✅ Proper format and placement

### 4. Orphaned Files (15% weight)
Finds files not referenced anywhere in the system:
- Not referenced in any markdown file
- Not registered in any JSON registry
- Candidates for cleanup or archival

**Checks:**
- ✅ File is referenced somewhere
- ✅ File is in a registry
- ℹ️  Teaching commands may appear as orphans (expected)

---

## OUTPUT

### Health Score
Overall system health percentage (0-100%):
- 🟢 **90-100%:** Excellent - System is healthy
- 🟡 **70-89%:** Good - Minor issues to address
- 🟠 **50-69%:** Fair - Several issues need attention
- 🔴 **Below 50%:** Poor - Critical issues require immediate action

### Component Scores
Individual scores for each category:
- 📋 Registries
- 🔗 References
- 😊 Emojis
- 🔍 Orphans

### Issue Summary
- Total issues found
- Critical issues (blocking)
- Warnings (non-blocking)
- Recommendations for fixes

---

## EXAMPLES

### Basic Health Check
```bash
/system-health
```

**Output:**
```
🏥 SYSTEM HEALTH REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Overall Health: 95%

📊 Component Scores:
   📋 Registries: 100%
   🔗 References: 98%
   😊 Emojis: 92%
   🔍 Orphans: 85%

📈 Summary:
   Total Issues: 5
   Critical: 1
   Warnings: 4

💡 Recommendations:
   - Fix 1 broken reference(s)
   - Review 4 orphaned file(s) for cleanup
```

### Verbose Output
```bash
/system-health --verbose
```

Shows detailed list of:
- Specific broken references with file:line
- Missing emojis by component
- Orphaned files with paths
- Registry validation errors

### JSON Output
```bash
/system-health --json
```

Returns structured JSON for:
- Programmatic analysis
- CI/CD integration
- Automated reporting
- Custom tooling

### Auto-Fix (Future)
```bash
/system-health --fix
```

Automatically fixes:
- Missing emojis (adds from standards)
- Registry formatting issues
- Simple reference path corrections

**Note:** Currently in development

---

## INTERPRETING RESULTS

### Registry Issues
**Critical:** Must be fixed immediately
- Invalid JSON syntax → Fix syntax errors
- Missing required fields → Add missing fields
- File does not exist → Create or restore file

### Broken References
**Critical:** May cause runtime errors
- Target file missing → Create file or update reference
- Incorrect path → Correct the @-reference path
- False positives → TypeScript decorators (`@context`, `@type`) can be ignored

### Emoji Issues
**Warning:** Affects visual consistency
- Missing emoji → Add emoji from emoji-standards.json
- Wrong emoji → Update to correct emoji
- Wrong format → Reposition emoji per guidelines

### Orphaned Files
**Info:** Cleanup candidates
- Teaching commands → Expected, can ignore
- Old versions → Archive or delete
- Experimental code → Document or remove
- Unused resources → Clean up or integrate

---

## TROUBLESHOOTING

### Score Lower Than Expected

**Check:**
1. Recent file moves or renames
2. Broken symlinks
3. Git conflicts or merge issues
4. Manual edits without validation

**Fix:**
1. Run `--verbose` to see specific issues
2. Address critical issues first (registries, references)
3. Fix warnings (emojis, orphans) as time permits
4. Re-run to verify improvements

### False Positives

**Common causes:**
- TypeScript decorators (`@param`, `@returns`, `@context`)
- Email addresses in examples
- Code snippets with @ symbols

**Solution:**
- Ignore these in the report
- Focus on @.claude/ and @teaching/ references

### Too Many Orphans

**Causes:**
- Teaching commands (expected)
- Work-in-progress files
- Archived content

**Solution:**
- Review list with `--verbose`
- Keep intentional files
- Clean up unused files

---

## INTEGRATION

### With Auto-Correction Hooks
Validation happens automatically:
```bash
# Create component (auto-correction runs automatically)
# Pre-tool-use hooks validate and fix issues

# After system-wide changes, verify health
/system-health --verbose
```

### With Git Workflow
```bash
# Before committing
/system-health

# If score < 90%, fix issues
# Then commit with confidence
```

### CI/CD Integration
```bash
# In CI pipeline
npx ts-node .claude/hooks/utils/component-health-checker.ts --json

# Fail build if score < 70%
# Generate reports for review
```

---

## TECHNICAL DETAILS

### Implementation
- **Utility:** `.claude/hooks/utils/component-health-checker.ts`
- **Runtime:** ~5-15 seconds for full system scan
- **Dependencies:** Node.js, TypeScript, fs, path modules
- **Output:** Console or JSON

### Validation Logic

**Registry validation:**
1. Check file exists
2. Parse JSON (syntax check)
3. Verify required fields
4. Validate structure

**Reference checking:**
1. Find all @-references in markdown
2. Resolve to absolute paths
3. Check target file exists
4. Report broken links

**Emoji compliance:**
1. Load emoji-standards.json
2. Check agents (YAML description)
3. Check commands (line 3)
4. Check resources (first heading)
5. Report missing or incorrect

**Orphan detection:**
1. Build reference map (which files reference which)
2. Check registry inclusions
3. Find unreferenced files
4. Report candidates for cleanup

### Performance
- Scans ~150-200 files
- Validates 5 JSON registries
- Checks 100+ components
- Completes in <15 seconds

---

## BEST PRACTICES

### Regular Maintenance
- Run monthly: Catch drift early
- Run before releases: Ensure quality
- Run after refactoring: Verify integrity
- Run after onboarding: Validate new contributions

### Fixing Issues Priority
1. **Critical (Registries, References)** - Fix immediately
2. **Warnings (Emojis)** - Fix within a week
3. **Info (Orphans)** - Review quarterly

### Score Targets
- **Development:** Aim for 80%+
- **Staging:** Require 90%+
- **Production:** Maintain 95%+

### Team Workflow
- Check before pull requests
- Include score in PR description
- Review failing checks together
- Update standards as system evolves

---

## SEE ALSO

- `pre-tool-use-write.ts` - Auto-correction hook for new files
- `pre-tool-use-edit.ts` - Auto-correction hook for edits
- `emoji-guide.md` - Emoji usage documentation
- `pre-implementation-guide.md` - Component creation best practices
- `component-health-checker.ts` - Underlying utility source

---

**Last Updated:** 2025-11-06
**Version:** 1.0
**Category:** System Maintenance
**Related:** pre-tool-use-write.ts, pre-tool-use-edit.ts, emoji-standards.json, component-consistency-validator.ts
