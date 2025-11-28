# Sveltia CMS Reconfiguration - Tasks

**Last Updated:** 2025-11-28
**Progress:** 7/7 phases COMPLETE - Ready for browser testing

## High-Level Phases

- [x] Phase 1: Fix Content Paths & Structure
- [x] Phase 2: Implement Section Management (Split Approach)
- [x] Phase 3: Create Page Collections
- [x] Phase 4: Menu/Navigation Management
- [x] Phase 5: SEO & Metadata Management
- [x] Phase 6: Image Management
- [x] Phase 7: Available Sections Reference

## Detailed Task Breakdown

### Phase 1: Fix Content Paths & Structure

- [x] Create `static/admin/` directory
- [x] Create `index.html` with Sveltia CMS loader
- [x] Fix content paths (content/romanian/, content/english/)

### Phase 2: Implement Section Management

- [x] Create sections array with type selector (37 section types)
- [x] Create collapsible config objects for each section type
- [x] Include all field definitions per section

### Phase 3: Create Page Collections

- [x] Create `pages_ro` folder collection with create/delete
- [x] Create `pages_en` folder collection with create/delete
- [x] Add SEO fields (description, keywords)

### Phase 4: Menu/Navigation Management

- [x] Create navigation file collection
- [x] Configure Romanian menu (menus.ro.toml)
- [x] Configure English menu (menus.en.toml)

### Phase 5: SEO & Metadata Management

- [x] Add per-page SEO fields (description, keywords)
- [x] Create site settings collection (social media)

### Phase 6: Image Management

- [x] Configure media_folder (static/images)
- [x] Configure public_folder (/images)
- [x] Add image fields to relevant sections

### Phase 7: Available Sections Reference

- [x] Create `data/cms_sections.yaml` with 37 section types
- [x] Include bilingual labels and descriptions
- [x] Organize by category

### Additional Tasks

- [x] Create `config.production.yml` for GitHub backend
- [x] Switch local config to `test-repo` backend (no OAuth needed)
- [x] Verify CMS loads at /admin (HTTP 200)

## Completed Tasks

✅ 2025-11-28 - Created static/admin directory
✅ 2025-11-28 - Created index.html with branded loading screen
✅ 2025-11-28 - Created config.yml with 37 section types, RO/EN pages, navigation, settings (~867 lines)
✅ 2025-11-28 - Created data/cms_sections.yaml with 37 section types documented (bilingual)
✅ 2025-11-28 - Created config.production.yml for GitHub production backend (~650 lines)
✅ 2025-11-28 - Verified CMS loads at /admin (HTTP 200 on all endpoints)
✅ 2025-11-28 - Switched to test-repo backend for local development (no GitHub OAuth)

## Configuration Work COMPLETED

- [x] Complete English section configs in `config.yml` (all 20+ sections added)
- [x] Complete English section configs in `config.production.yml` (all 20+ sections added)

**Result:** Both EN collections now have full section configs matching RO structure.

## Manual Testing Pending (in browser)

- [ ] Page creation works
- [ ] Page deletion works
- [ ] Section add/remove/reorder works
- [ ] Section content editing works
- [ ] Navigation menu editing works
- [ ] Image upload works
- [ ] Hugo builds with CMS-edited content

## Files Created

| File | Lines | Description |
|------|-------|-------------|
| `static/admin/index.html` | 85 | CMS entry point with branded loader |
| `static/admin/config.yml` | ~1350 | Local dev config (test-repo backend) |
| `static/admin/config.production.yml` | ~1350 | Production config (GitHub backend) |
| `data/cms_sections.yaml` | ~250 | Section reference with descriptions |
| `sveltia.md` | 3070 | Sveltia CMS documentation reference |

## Notes

- Local config uses `test-repo` backend (File System Access API) - no OAuth needed
- Production config uses `github` backend with branch `main`
- All 37 section types have full field definitions
- Use `hugo server --buildDrafts` then visit `/admin`
