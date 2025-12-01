# SEO Audit Implementation - Plan

**Created:** 2025-12-01
**Status:** Active
**Estimated time:** 2-3 hours

## Overview

Implement findings from two comprehensive SEO audits:
- `alexandrabarbu-llm-seo-audit-v2.md` (LLM/AI Search Optimization)
- `alexandrabarbu-seo-audit-v2.md` (Traditional SEO)

**Key Discovery:** Many "critical" audit findings are **already implemented** - audits appear to have been conducted on an older site version.

## Current State Assessment

### Already Implemented (No Action Needed)
| Feature | Status | File Location |
|---------|--------|---------------|
| robots.txt with AI bots | ✅ Done | `static/robots.txt` |
| GPTBot, ChatGPT-User, etc. | ✅ Done | 8 AI crawlers configured |
| Sitemap directive | ✅ Done | Points to sitemap.xml |
| Schema markup | ✅ Done | 7 types in seo.toml |
| Hreflang tags | ✅ Done | RO + EN |
| Canonical tags | ✅ Done | Self-referencing |

### Needs Implementation
| Issue | Priority | Files |
|-------|----------|-------|
| Phone number placeholder | HIGH | 3 data files |
| llms.txt enhancement | MEDIUM | `static/llms.txt` |
| Author credentials | LOW | `data/authors/default.yaml` |

## Goals

1. Update phone number from `+40 123 456 789` to `+40 770 200 834`
2. Enhance llms.txt with richer AI crawler guidance
3. Fill in author credentials/education for E-E-A-T signals

## Approach

### Phase 1: Quick Fixes (30 min)
1. Update phone number in all data files
2. Enhance static llms.txt with audit recommendations

### Phase 2: E-E-A-T Enhancement (Optional)
3. Fill in author credentials in `data/authors/default.yaml`
4. Verify schemas are generating correctly

### Phase 3: Verification
5. Test site with `hugo server`
6. Verify changes in rendered output

## Success Criteria

- [ ] Phone number updated to `+40 770 200 834` in all files
- [ ] llms.txt contains comprehensive AI crawler guidance
- [ ] Site builds without errors
- [ ] Footer displays correct phone number

## Files to Modify

```
data/settings.yaml          # Line 15: phone
data/footer.yaml             # Line 4: phone
data/en/footer.yaml          # Line 10: phone
static/llms.txt              # Full rewrite with AI guidance
data/authors/default.yaml    # Optional: credentials, education
```

## Risks & Mitigation

**Risks:**
- Phone format breaking tel: links → Test link format
- llms.txt caching issues → Clear CDN cache after deploy

## Notes

- Audit files: `alexandrabarbu-llm-seo-audit-v2.md`, `alexandrabarbu-seo-audit-v2.md`
- Architecture doc: `ARCHITECTURE.md`
- SEO config: `config/_default/seo.toml`
