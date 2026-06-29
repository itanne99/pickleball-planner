# Implementation Plan — Pickleball Planner

> Status: UI prototype only. Zero production-ready functionality.
> Total missing: 106 items across 40 categories.

## Current State

- **Stack**: Next.js 16.2.4 (Pages Router), React 19, Bootstrap 5, react-bootstrap
- **Data**: Single `mock.js` file — all hardcoded, resets on refresh
- **Auth**: `useAuthGuard` checks `mockUser.role` — client-side only, trivially bypassed
- **CRUD**: Modals exist but Save/Create/Delete buttons only close the modal
- **Tests**: Zero test files
- **CI/CD**: None
- **Security**: `GOOGLE_API_KEY` exposed in `.env` (committed to repo)

---

## Phase 1 — Foundation (CRITICAL)

### 1.1 Database & ORM
| Item | Priority | Description |
|------|----------|-------------|
| DB selection | CRITICAL | Choose PostgreSQL (recommended) or MongoDB. Set up local dev instance via Docker. |
| ORM | CRITICAL | Install Prisma or Drizzle. Define schema for all entities. |
| Schema design | CRITICAL | Entities: Organizations, Users, Roles, Leagues, Divisions, Teams, Players, Matches, Scorecards, Schedules, Locations, Notifications, AuditLogs. |
| Migrations | HIGH | Set up migration tooling (Prisma Migrate / Drizzle Kit). |
| Seed script | HIGH | Populate dev DB with realistic test data replacing `mock.js`. |

### 1.2 Authentication
| Item | Priority | Description |
|------|----------|-------------|
| Auth library | CRITICAL | Install NextAuth.js / Auth.js or Clerk. Configure session strategy. |
| Login/Register pages | CRITICAL | Sign-in, sign-up, password reset, email verification flows. |
| Session management | CRITICAL | Server-side sessions or JWT with secure cookies. |
| OAuth providers | HIGH | Google, Apple social login. |
| Multi-tenant auth | MEDIUM | Users belong to organizations; scope data access. |

### 1.3 API Routes
| Item | Priority | Description |
|------|----------|-------------|
| REST endpoints | CRITICAL | Full CRUD for: users, teams, players, leagues, divisions, matches, scorecards, schedules, locations, organizations. |
| Data fetching | CRITICAL | Replace all `import from mock.js` with `getServerSideProps`, SWR, or React Query. |
| Server-side validation | HIGH | Zod/Yup validation on all API inputs. |
| Error responses | HIGH | Standardized error format `{ error, message, status }`. |

### 1.4 Wire CRUD Operations
| Item | Priority | Description |
|------|----------|-------------|
| Org Admin modals | CRITICAL | Connect Save/Create/Delete to actual API calls. |
| Admin panel buttons | CRITICAL | Wire Edit/Delete on admin.js user table. |
| Delete confirmations | HIGH | Add confirmation dialogs before destructive actions. |
| Optimistic updates | MEDIUM | Update UI before server confirms, rollback on error. |

### 1.5 Security Hardening
| Item | Priority | Description |
|------|----------|-------------|
| Rotate exposed API key | CRITICAL | `GOOGLE_API_KEY` in `.env` is committed. Rotate immediately. Remove from git history. |
| CSRF protection | CRITICAL | Enable CSRF tokens for all mutating requests. |
| Input sanitization | CRITICAL | Escape all user input. Prevent XSS. |
| Rate limiting | CRITICAL | Add rate limiting to all API routes. |
| Security headers | HIGH | CSP, X-Frame-Options, HSTS in `next.config.mjs`. |
| CORS config | HIGH | Configure allowed origins. |
| `.env.example` | HIGH | Create template for developers. Never commit `.env`. |

### 1.6 Testing Setup
| Item | Priority | Description |
|------|----------|-------------|
| Test framework | CRITICAL | Install Jest or Vitest. Configure for Next.js Pages Router. |
| Component testing | HIGH | Install React Testing Library. Write tests for all components. |
| E2E testing | HIGH | Install Playwright. Write E2E tests for critical flows (login, CRUD, scorecard). |
| API testing | MEDIUM | Test all API routes for correct responses and error handling. |
| Coverage reporting | MEDIUM | Set up coverage thresholds. |

---

## Phase 2 — Core Features (HIGH)

### 2.1 Scorecard System
| Item | Priority | Description |
|------|----------|-------------|
| Create scorecard UI | CRITICAL | Build form to enter match results (set-by-set). |
| Scorecard validation | HIGH | Validate pickleball scoring rules (win by 2, game to 11, etc.). |
| Scorecard approval workflow | MEDIUM | Captain submits → admin approves/rejects. |
| Scorecard templates | MEDIUM | Singles, doubles, round-robin formats. |

### 2.2 Scheduling System
| Item | Priority | Description |
|------|----------|-------------|
| Create/edit schedule UI | CRITICAL | Build match scheduling forms. |
| Conflict detection | HIGH | Prevent double-booking courts, players, teams. |
| Calendar view | HIGH | Month/week/day calendar component. |
| Recurring scheduling | HIGH | Support weekly/bi-weekly recurring matches. |
| Availability management | MEDIUM | Players mark available/unavailable dates. |
| Auto-schedule generation | MEDIUM | Round-robin, Swiss tournament algorithms. |

### 2.3 Player Profiles
| Item | Priority | Description |
|------|----------|-------------|
| Real player lookup | HIGH | `player/[id]` must fetch actual player data, not mockUser. |
| Match history | HIGH | Display player's past matches and results. |
| Player statistics | HIGH | Win/loss record, DUPR trends, points scored. |
| Player search/directory | MEDIUM | Searchable player list with filters. |
| Player preferences | MEDIUM | Position, play style, availability settings. |

### 2.4 Team Management
| Item | Priority | Description |
|------|----------|-------------|
| Real team lookup | HIGH | `team/[id]` must fetch actual team data, not mockTeam. |
| Roster management | HIGH | Add/remove players, assign captain/roles. |
| Team statistics | HIGH | Win/loss, points for/against, streaks. |
| Team creation wizard | MEDIUM | Step-by-step team setup flow. |
| Team invitations | MEDIUM | Invite players via email to join team. |

### 2.5 League Features
| Item | Priority | Description |
|------|----------|-------------|
| League CRUD UI | HIGH | Create/edit/delete leagues from orgAdmin (currently read-only). |
| Standings/leaderboards | HIGH | Win/loss records, points table, division rankings. |
| League rules config | HIGH | Scoring system, playoff format, tiebreaker rules. |
| Team enrollment | MEDIUM | Registration flow for teams to join leagues. |
| Playoff brackets | MEDIUM | Auto-generate tournament brackets. |

### 2.6 Error Handling & Loading
| Item | Priority | Description |
|------|----------|-------------|
| Error boundaries | HIGH | Wrap components in React error boundaries. |
| API error handling | HIGH | Try/catch, user-friendly error messages, retry logic. |
| Custom 404 page | HIGH | `pages/404.js` with branded design. |
| Custom 500 page | HIGH | `pages/500.js` with branded design. |
| Loading indicators | HIGH | Spinners, skeleton loaders for all async operations. |
| Form submission states | MEDIUM | Disable buttons + show spinner during API calls. |

### 2.7 Form Validation
| Item | Priority | Description |
|------|----------|-------------|
| Validation library | HIGH | Install React Hook Form + Zod. |
| Field validation | HIGH | Required fields, email format, phone format, DUPR range (2.0–8.0). |
| Inline error messages | MEDIUM | Real-time validation feedback in forms. |
| Duplicate detection | MEDIUM | Check for duplicate emails, team names, etc. |

### 2.8 Search, Filter, Pagination
| Item | Priority | Description |
|------|----------|-------------|
| Search functionality | HIGH | Global search for players, teams, leagues, matches. |
| List filtering | HIGH | Filter by status, date, division, location. |
| Sorting | MEDIUM | Sort by name, date, rating, win rate. |
| Pagination | HIGH | Paginate all list views. Will break at scale without it. |

### 2.9 File Upload
| Item | Priority | Description |
|------|----------|-------------|
| Upload mechanism | HIGH | Player photos, team logos, court images. |
| Storage strategy | MEDIUM | S3, Cloudinary, or Vercel Blob. |
| Image optimization | MEDIUM | Use `next/image` component instead of `<img>`. |

### 2.10 Responsive & Mobile
| Item | Priority | Description |
|------|----------|-------------|
| Mobile testing | HIGH | Test all pages on mobile. Fix table overflow, modal sizing. |
| Navbar mobile | MEDIUM | Verify collapse behavior on small screens. |
| Touch targets | MEDIUM | Ensure buttons/links meet minimum touch size (44x44px). |

### 2.11 Accessibility
| Item | Priority | Description |
|------|----------|-------------|
| ARIA labels | HIGH | Add to all buttons, nav links, form inputs. |
| Keyboard navigation | HIGH | Tab order, focus trap in modals, focus restoration. |
| Color contrast | MEDIUM | Verify neon colors on dark bg meet WCAG AA. |
| Screen reader testing | MEDIUM | Test with VoiceOver/NVDA. |

### 2.12 SEO
| Item | Priority | Description |
|------|----------|-------------|
| Dynamic meta tags | HIGH | Title, description, Open Graph, Twitter Card per page. |
| robots.txt | HIGH | Create `public/robots.txt`. |
| sitemap.xml | HIGH | Generate sitemap for all pages. |
| SSR for SEO pages | MEDIUM | Use `getServerSideProps` for player/team profile pages. |

### 2.13 RBAC (Role-Based Access Control)
| Item | Priority | Description |
|------|----------|-------------|
| Granular roles | CRITICAL | super-admin, league-admin, team-captain, player, viewer. |
| Route protection | HIGH | Server-side auth checks, not just client-side. |
| API authorization | HIGH | Verify permissions on every API route. |
| Org-scoped access | MEDIUM | Users only see their organization's data. |

---

## Phase 3 — Enhanced Features (MEDIUM)

### 3.1 Notifications
| Item | Priority | Description |
|------|----------|-------------|
| In-app notifications | HIGH | Notification bell in navbar, notification center page. |
| Email alerts | HIGH | Match reminders, scorecard submissions, team invites. |
| Notification preferences | HIGH | Opt-in/out, frequency settings. |
| Event triggers | MEDIUM | Wire notifications to schedule changes, scorecard events. |

### 3.2 Admin Dashboard
| Item | Priority | Description |
|------|----------|-------------|
| System settings | HIGH | Global config, email templates, branding. |
| Admin KPIs | MEDIUM | Total users, active leagues, matches this week. |
| User management | MEDIUM | Suspend, ban, impersonate users. |
| Org settings | MEDIUM | Branding, custom domains, billing tier. |

### 3.3 Statistics & Analytics
| Item | Priority | Description |
|------|----------|-------------|
| Stats dashboard | HIGH | Charts, graphs, data visualization. |
| Player performance trends | MEDIUM | DUPR over time, win rate trends. |
| League-wide analytics | MEDIUM | Participation rates, match frequency. |
| Player leaderboards | MEDIUM | Top DUPR, most matches, highest win rate. |

### 3.4 Communication
| Item | Priority | Description |
|------|----------|-------------|
| Messaging/chat | MEDIUM | Player-to-player and team chat. |
| Announcements | MEDIUM | League-wide broadcasts, team announcements. |

### 3.5 Data Export/Import
| Item | Priority | Description |
|------|----------|-------------|
| CSV export | MEDIUM | Standings, rosters, scorecards. |
| CSV import | MEDIUM | Bulk player upload, team import. |
| PDF reports | LOW | Printable standings, match reports. |

### 3.6 Audit & Activity
| Item | Priority | Description |
|------|----------|-------------|
| Audit logging | MEDIUM | Record who changed what and when. |
| Activity feed | MEDIUM | User/team activity timelines. |
| Change history | LOW | Diff view for entity changes. |

### 3.7 Onboarding
| Item | Priority | Description |
|------|----------|-------------|
| Welcome wizard | MEDIUM | Guided setup for new users. |
| Tooltips/help text | MEDIUM | Contextual help on complex features. |
| FAQ/docs | LOW | Documentation section. |

### 3.8 Court Booking
| Item | Priority | Description |
|------|----------|-------------|
| Court booking flow | MEDIUM | Book courts at locations for matches. |
| Third-party integration | LOW | CourtReserve, PlaySight API. |

### 3.9 Real-Time
| Item | Priority | Description |
|------|----------|-------------|
| WebSocket/SSE | MEDIUM | Push score changes, messages, schedule updates. |
| Live score tracking | LOW | Real-time score updates during matches. |

### 3.10 Analytics Integration
| Item | Priority | Description |
|------|----------|-------------|
| Web analytics | MEDIUM | Google Analytics, Plausible, or Vercel Analytics. |
| Event tracking | MEDIUM | Track match created, scorecard submitted, user registered. |

---

## Phase 4 — Nice-to-Have (LOW)

### 4.1 Payments
| Item | Priority | Description |
|------|----------|-------------|
| Stripe integration | MEDIUM | Subscription tiers, league fee collection. |
| Invoicing | MEDIUM | Receipt generation, payment history. |

### 4.2 Advanced Features
| Item | Priority | Description |
|------|----------|-------------|
| PWA support | LOW | Manifest, service worker, install prompt. |
| Advanced stats | LOW | Serve accuracy, rally length, shot placement. |
| Head-to-head records | MEDIUM | Player vs player, team vs team history. |
| Match replay | LOW | Detailed game breakdown viewer. |
| Achievements/badges | LOW | Player milestone system. |
| Discussion forums | LOW | Comment threads on matches. |

### 4.3 DevOps & Infrastructure
| Item | Priority | Description |
|------|----------|-------------|
| CI/CD pipeline | HIGH | GitHub Actions for lint, test, build on PR. |
| Deployment config | HIGH | `vercel.json` or Dockerfile. |
| Preview deployments | MEDIUM | Vercel preview URLs for PRs. |
| Staging environment | MEDIUM | Separate staging DB and config. |
| Browser testing | MEDIUM | Cross-browser compatibility verification. |
| Dependency scanning | MEDIUM | Dependabot or Snyk for vulnerability alerts. |

### 4.4 Cleanup
| Item | Priority | Description |
|------|----------|-------------|
| Remove `Home.module.css` | HIGH | Dead code from create-next-app. |
| TypeScript decision | HIGH | Either migrate to TS or remove from devDependencies. |
| Consistent Layout usage | HIGH | Some pages wrap with Layout, some don't. Standardize. |
| Favicon/og-image | MEDIUM | Replace Next.js defaults with branded assets. |
| Versioning strategy | LOW | Semantic versioning for releases. |

---

## Dependency Graph

```
Phase 1 (Foundation)
  ├── 1.1 Database ─────────────────────────────────────┐
  ├── 1.2 Auth ─────────────────────────────────────────┤
  ├── 1.3 API Routes ───────────────────────────────────┤
  ├── 1.4 Wire CRUD ── depends on 1.1, 1.2, 1.3 ────────┤
  ├── 1.5 Security ─────────────────────────────────────┤
  └── 1.6 Testing ──────────────────────────────────────┘
                          │
                          ▼
Phase 2 (Core Features) ─ all depend on Phase 1 completion
  ├── 2.1 Scorecards
  ├── 2.2 Scheduling
  ├── 2.3 Player Profiles
  ├── 2.4 Team Management
  ├── 2.5 League Features
  ├── 2.6 Error/Loading
  ├── 2.7 Form Validation
  ├── 2.8 Search/Filter/Pagination
  ├── 2.9 File Upload
  ├── 2.10 Responsive
  ├── 2.11 Accessibility
  ├── 2.12 SEO
  └── 2.13 RBAC
                          │
                          ▼
Phase 3 (Enhanced) ──── all depend on Phase 2 completion
  ├── 3.1 Notifications
  ├── 3.2 Admin Dashboard
  ├── 3.3 Statistics
  ├── 3.4 Communication
  ├── 3.5 Export/Import
  ├── 3.6 Audit
  ├── 3.7 Onboarding
  ├── 3.8 Court Booking
  ├── 3.9 Real-Time
  └── 3.10 Analytics
                          │
                          ▼
Phase 4 (Nice-to-Have)
  ├── 4.1 Payments
  ├── 4.2 Advanced Features
  ├── 4.3 DevOps
  └── 4.4 Cleanup
```

---

## Immediate Actions (Do Now)

1. **Rotate `GOOGLE_API_KEY`** — it's exposed in git history
2. **Add `.env` to `.gitignore`** and create `.env.example`
3. **Remove `Home.module.css`** — dead code
4. **Pick DB + ORM** — recommended: PostgreSQL + Prisma
5. **Pick Auth library** — recommended: NextAuth.js
6. **Set up test framework** — recommended: Jest + React Testing Library + Playwright

---

## Estimated Effort

| Phase | Items | Estimated Weeks (1 dev) |
|-------|-------|------------------------|
| Phase 1 — Foundation | 14 CRITICAL + 12 HIGH | 4–6 weeks |
| Phase 2 — Core Features | 1 CRITICAL + 24 HIGH + 8 MEDIUM | 6–8 weeks |
| Phase 3 — Enhanced | 2 HIGH + 16 MEDIUM + 2 LOW | 4–6 weeks |
| Phase 4 — Nice-to-Have | 2 MEDIUM + 10 LOW | 2–4 weeks |
| **Total** | **106 items** | **16–24 weeks** |

> Estimates assume 1 full-time developer. Parallel work on independent items can reduce timeline.
