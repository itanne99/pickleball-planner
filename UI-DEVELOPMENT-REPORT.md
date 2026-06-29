# UI Development Report — Pickleball Planner

## Build Status
**BUILD: SUCCESSFUL** — All 21 routes compile and render correctly.

---

## Dependencies Installed

| Package | Version | Purpose |
|---------|---------|---------|
| `react-hook-form` | latest | Form state management with performant re-renders |
| `zod` | latest | Schema validation for all form inputs |
| `@hookform/resolvers` | latest | Bridge between react-hook-form and Zod |
| `recharts` | latest | Charts/graphs for analytics dashboard (bar, line, pie) |
| `date-fns` | latest | Date formatting, calendar generation, time distance |
| `react-icons` | latest | Icon library (Feather icons set used throughout) |

---

## Sections Developed

### 1. Foundation / Infrastructure

#### Mock Data (`src/data/mock.js`)
- **Expanded from 58 lines to 332 lines** with realistic data for all entities
- New entities: `mockOrganizations`, `mockUsers` (10 users), `mockMatches` (10 matches), `mockScorecards` (5 detailed set-by-set), `mockNotifications` (6 types), `mockStandings` (per-division), `mockPlayerMatchHistory`, `mockDuprHistory`, `mockAdminKpis`, `mockAnalyticsData`
- Helper functions: `getUserById`, `getPlayerById`, `getTeamById`, `getLeagueById`, `getDivisionById`, `getLocationById`, `getMatchById`, `getScorecardById`, `getMatchesByTeamId`, `getMatchesByLeagueId`, `getMatchesByDivisionId`, `getDivisionsByLeagueId`, `getTeamsByDivisionId`, `getNotificationsByUserId`, `getPlayerMatchHistory`, `getDuprHistory`, `searchPlayers`, `searchTeams`, `searchLeagues`

#### Layout Fix (`src/components/Layout.js`)
- **Fixed double Layout wrapping bug** — subdirectory pages (`team/`, `player/`, `scorecard/`) were manually wrapping `<Layout>` while `_app.js` already wraps everything
- Added notification bell with dropdown in navbar
- Added Profile link to navbar
- Expanded nav links: Dashboard, Players, Teams, Leagues, Schedule, Analytics, Admin, Org Admin
- `_app.js` now wraps with `ToastProvider` for global toast notifications

#### Error Pages
- **`src/pages/404.js`** — Branded 404 page with pickleball-themed copy, links to Home and Dashboard
- **`src/pages/500.js`** — Branded 500 page with retry functionality

#### SEO
- **`src/pages/_document.js`** — Added meta description, keywords, OG tags, Twitter Card, favicon
- **`public/robots.txt`** — Disallows admin/orgAdmin/api paths, allows public pages

---

### 2. Common Components (`src/components/`)

| Component | Purpose |
|-----------|---------|
| `LoadingSpinner.js` | Reusable spinner with size variants and fullscreen mode |
| `ErrorBoundary.js` | React error boundary wrapper with recovery button |
| `ToastProvider.js` | Global toast notification system (success/danger/warning/info) with auto-dismiss |
| `SearchBar.js` | Search input with clear button, debounced-ready |
| `Paginator.js` | Full pagination component with first/prev/next/last, ellipsis for large page counts |
| `DataTable.js` | Generic table with columns config, row click handler, empty state |
| `StatusBadge.js` | Maps status strings to colored Pill badges (active/inactive/completed/scheduled/pending/etc.) |
| `StatCard.js` | KPI card with title, value, optional icon, subtitle, and trend indicator |
| `SectionHeader.js` | Page header with title, subtitle, and optional action button |
| `ConfirmModal.js` | Reusable confirmation dialog for destructive actions |

---

### 3. Feature Pages

#### Player Directory (`src/pages/players.js`)
- Card grid layout with player avatars, DUPR, record, win %
- **Search** by name or email
- **Filter** by status (active/inactive)
- **Sort** by name, DUPR, win rate, or join date (ascending/descending toggle)
- **Pagination** (8 per page)
- Click any player → navigates to player profile

#### Player Profile (`src/pages/player/[id].js`)
- Uses URL param `id` to fetch **real player data** (not mockUser anymore)
- Profile card with avatar, contact info, team link
- **4 stat cards**: DUPR, Wins, Losses, Win %
- **DUPR trend chart** (line chart via Recharts)
- **Match history table** with date, opponent, result badge, score, league/division
- 404 state if player not found

#### Team Profile (`src/pages/team/[id].js`)
- Uses URL param `id` to fetch **real team data**
- Team info card with captain, location, member count, formation date
- **4 stat cards**: Wins, Losses, Points For, Streak
- **Roster table** with player avatars, roles (captain badge), DUPR, status
- **Upcoming matches table** with date, time, opponent, location

#### Team Dashboard (`src/pages/team/dashboard.js`)
- Overview KPIs: total teams, active count, total players, avg DUPR
- **Team card grid** with record, streak badge, points, upcoming match count, roster size
- Links to individual team profiles

#### Schedule (`src/pages/schedule.js`)
- **Calendar view** — month grid with match badges on dates, navigation between months
- **Upcoming tab** — match cards with date, time, location, status badge
- **Past tab** — completed matches with scores
- Each match links to scorecard view/entry

#### Scorecard View (`src/pages/scorecard/[id].js`)
- Match details card (date, time, location, status)
- **Score display** — large VS layout with team names and scores
- **Set-by-set table** — set number, scores per team, duration, winner badge
- Notes section
- For scheduled matches: prompt to enter scorecard with link to entry form

#### Scorecard Entry (`src/pages/scorecard/new.js`)
- **Set-by-set form** with react-hook-form + Zod validation
- Add/remove sets (1-5 sets max)
- Score inputs (0-21) for home and away teams
- Optional notes textarea
- Submit with loading state, redirects to scorecard view on success

#### Leagues (`src/pages/league.js`)
- League selector dropdown
- **League info card** with description, format, dates, status
- **Three tabs**:
  - **Standings** — per-division tables with rank, team, W/L, win %, PF/PA, differential, GB, streak
  - **Schedule** — all league matches sorted by date
  - **Divisions** — division cards with DUPR range, team count, team buttons

#### Admin Panel (`src/pages/admin.js`)
- **4 KPI cards**: Total Users, Active Leagues, Matches This Month, Revenue
- **User management table** with search, role filter, pagination
- **Edit user modal** with name, email, role, status fields
- **Delete confirmation modal**
- Toast notifications for all actions

#### Org Admin (`src/pages/orgAdmin.js`)
- **Four tabs**: Teams, Players, Locations, Leagues
- Each tab has:
  - Data table with full CRUD
  - **Add/Edit modals** with react-hook-form + Zod validation
  - **Delete confirmation modals**
  - Toast notifications on create/update/delete
- Validation rules:
  - Players: name (min 2 chars), email format, phone (min 7), DUPR (2.0-8.0)
  - Teams: name (min 2), location required
  - Locations: name (min 2), address (min 5), courts (min 1)
  - Leagues: name (min 2), season name, start/end dates, format

#### Analytics (`src/pages/analytics.js`)
- **4 KPI cards**: Total Players, Active Leagues, Matches This Month, Court Utilization
- **Bar chart**: Matches per month (6 months)
- **Pie chart**: DUPR distribution (5 skill ranges)
- **Line chart**: Participation by day of week
- **Leaderboard table**: Top 5 players with rank medals, DUPR, record, win %

#### Notifications (`src/pages/notifications.js`)
- **Three tabs**: All, Unread, Read
- Notification list with type icons, title, message, relative timestamp
- **Mark all read** button
- Click to mark individual as read
- Badge count in navbar

#### Profile (`src/pages/profile.js`)
- **Three tabs**:
  - **Profile** — edit name, email, phone with save
  - **Notifications** — toggle email/SMS/in-app preferences
  - **Settings** — change password, theme selector, delete account
- Stat cards: DUPR, Role, Member Since, Status

#### Onboarding (`src/pages/onboarding.js`)
- **4-step wizard** with progress bar:
  1. Welcome — feature overview cards
  2. Profile — play style, position, skill level selection
  3. Preferences — availability days, notification toggles
  4. Complete — confirmation with links to dashboard/players
- Skip option available on all steps

---

### 4. CSS Updates (`src/styles/globals.css`)
Added styles for:
- Form controls (dark theme consistent inputs)
- Modal styling
- Dropdown menus
- Progress bars
- Badges
- Search bar input groups
- Tab pills
- Table transparency
- Cursor pointer utility

---

## Questions for Review

1. **Scorecard validation rules** — Currently allows any score 0-21. Should I enforce pickleball-specific rules (win by 2, game to 11 for regular, 15/21 for finals)?
2. **Calendar view** — Currently shows month view only. Should I add week/day toggle views?
3. **Team creation** — Currently doesn't allow selecting players during team creation in orgAdmin. Should I add a multi-select for roster assignment?
4. **File upload** — Player photos, team logos are null placeholders. Should I add a file upload component (even if mock)?
5. **Responsive testing** — All pages use Bootstrap grid which should be responsive, but mobile-specific testing hasn't been done. Should I add mobile-specific breakpoints?
6. **Dark/Light theme toggle** — Profile page has a theme selector but it's non-functional. Should I implement actual theme switching?
7. **Landing page** — The marketing landing page (`/`) was not modified. Should it be updated to link to the new features?

---

## File Summary

### New Files Created (18)
- `src/components/LoadingSpinner.js`
- `src/components/ErrorBoundary.js`
- `src/components/ToastProvider.js`
- `src/components/SearchBar.js`
- `src/components/Paginator.js`
- `src/components/DataTable.js`
- `src/components/StatusBadge.js`
- `src/components/StatCard.js`
- `src/components/SectionHeader.js`
- `src/components/ConfirmModal.js`
- `src/pages/404.js`
- `src/pages/500.js`
- `src/pages/players.js`
- `src/pages/schedule.js`
- `src/pages/analytics.js`
- `src/pages/notifications.js`
- `src/pages/profile.js`
- `src/pages/onboarding.js`
- `src/pages/scorecard/new.js`
- `public/robots.txt`

### Modified Files (13)
- `src/data/mock.js` — Expanded from 58 to 332 lines
- `src/components/Layout.js` — Added nav links, notification bell, profile link
- `src/pages/_app.js` — Added ToastProvider wrapper
- `src/pages/_document.js` — Added SEO meta tags
- `src/pages/player/[id].js` — Complete rewrite with real data, charts, match history
- `src/pages/team/[id].js` — Complete rewrite with roster, stats, upcoming matches
- `src/pages/team/dashboard.js` — Complete rewrite with KPIs, team cards
- `src/pages/team/schedule.js` — Redirect to /schedule (was double-wrapped)
- `src/pages/playerDashboard.js` — Complete rewrite with KPIs, upcoming matches, notifications
- `src/pages/league.js` — Complete rewrite with standings, schedule, divisions tabs
- `src/pages/admin.js` — Complete rewrite with KPIs, user management, edit/delete modals
- `src/pages/orgAdmin.js` — Complete rewrite with Zod validation, wired CRUD, confirmations
- `src/pages/scorecard/[id].js` — Complete rewrite with set-by-set table, match details
- `src/styles/globals.css` — Added 60+ lines of utility styles
