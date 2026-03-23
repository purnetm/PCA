# Data Studio v2 — Project Context

## Repo
- **Local path:** `C:\Users\purnet.moirangthem\Documents\Claude\Data Studio v2`
- **GitHub:** `purnetm/Data-Studio_PCA`
- **Preview server:** port 3000

## Branch Convention
| Branch | Purpose |
|--------|---------|
| `Iterations-A` | First iteration (design system, tokenisation, accent colours, typography) |
| `Iterations-B` | Second iteration (Hybrid Query Builder — active development) |
| `main` | Stable/production |

> `Iterations-A` was originally named `Iterations` — renamed 2026-03-18 to match the `-A`/`-B` pattern.

## Codebase Structure
- **Single file:** `index.html` (all CSS/JS/HTML inline, ~6500+ lines)
- **Token file:** `tokens.json` at repo root — source of truth for design tokens
- Design tokens defined in `:root` at ~line 91 of `index.html`

## Key Commits
| Hash | Branch | Description |
|------|--------|-------------|
| `cc31e9a` | Iterations-A | Phase 4 — Accent colour system + typography hierarchy |
| `2d8bf06` | Iterations-A | Phase 1 — 550+ hardcoded values → `var(--token)` |
| `a53c2a4` | Iterations-A | Phase 3 — 5 roadmap features |
| `336b2a7` | Iterations-A | Phase 2 — Visual & accessibility redesign |
| `55b5fe5` | Iterations-B | Hybrid Query Builder initial build |
| `5fe96bc` | Iterations-B | Iris violet palette (reverted in `6cb4cc7`, preserved for reference) |

## Design Tokens (`:root` ~line 91)
- **Colors:** `--teal`, `--teal-10/15/20/30/50/80`, `--cutty-sark`, `--dark-teal`, `--aqua-haze`, `--nebula`, `--surface`, `--bg-light`, gradient vars
- **Accent:** `--accent-success` (#10B981), `--accent-warning` (#F59E0B), `--accent-info` (#3B82F6), `--accent-neutral` (#6B7280)
- **Typography:** `--font-xs` (11px) → `--font-hero` (40px); `--font-subtitle` (20px); `--weight-regular/medium/semibold/bold`; `--letter-tight` (-0.4px)
- **Spacing:** `--space-1` (4px) → `--space-12` (40px)
- **Sizing:** `--size-sidebar` (256px), `--size-topbar` (52px), `--icon-sm/md`
- **Radius:** `--radius-sm` (8px), `--radius-md` (12px), `--radius-lg` (20px)
- **Shadows:** `--shadow-card`, `--shadow-card-sm`, `--shadow-topbar`
- **Opacity:** `--opacity-wave` (0.35), `--opacity-placeholder` (0.55), `--opacity-muted` (0.6)
- **Status:** `--status-positive`, `--status-negative` (#DC2626), `--color-disabled`
- **Tags:** `--tag-volume/performance/compliance/experience/quality/operations`

## Values NOT Tokenized (intentional exceptions)
- Font sizes outside scale: 9px, 10px, 16px, 20px, 24px, 26px, 42px
- Font-weight 300
- Spacing outside scale: 2px, 5px, 7px, 9px, 18px, 42px
- Border-radius outside tokens: 6px, 10px, 50%
- Unique Phase 2 box-shadows (not matching the 3 named shadow tokens)

## Key Patterns
- All text styles use token vars (`var(--font-md)`, `var(--weight-semibold)`)
- All spacing uses token vars (`gap: var(--space-3)`, `padding: var(--space-5) var(--space-7)`)
- Modals follow `.sq-overlay` + `.sq-modal` pattern
- Toasts via `showToast('message')` function
- Dashboard data in `DASHBOARDS_DATA` array (`visibility` field: `'public'`/`'private'`)

## Iterations-B — Hybrid Query Builder

### Layout
3-column responsive:
- **Left sidebar** (`.ib-config-sidebar`, 280px) — configuration controls
- **Center pane** (`.ib-center-pane`, flex) — chips bar + data preview
- **Right sidebar** (`.ib-right-sidebar`, 340px) — SQL Console + Kap AI panel

### Key JS Functions
| Function | Purpose |
|----------|---------|
| `ibUpdateChips()` | Populate chips from report type, date range, grouping, filters |
| `ibGenerateSql()` | Build SELECT/WHERE/GROUP BY dynamically |
| `ibShowPreview()` | Render preview table with mock data |
| `showColumnPicker()` | Column select UI (stub) |
| `showAddFilter()` | Prompt-based filter UI |
| `removeFilter(idx)` | Delete filter, refresh chips |
| `generateMockReportData(type)` | Mock data for tickets/agents/queue/sla |

### State
- `ibFilters[]` array: `[{ field, operator, value, label }]`
- Key element IDs: `#ib-report-type`, `#ib-date-from/to`, `#ib-groupby`, `#ib-filters`, `#ib-chips-list`, `#ib-sql-editor`, `#ib-preview-body`

## User Preferences
- Prefers design token consistency — always use `var(--token)` over hardcoded values
- Values iterative A/B branch exploration
- Interested in colour palette experiments while keeping brand teal as anchor
- Works from both Git Bash and the Claude desktop app
