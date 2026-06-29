# Pickleball Planner — Design System

> **Style**: Neon Glassmorphism — dark-first, sport-tech dashboard
> **Stack**: Next.js 16 · React 19 · Bootstrap 5.3 · React-Bootstrap · Vanilla CSS
> **Font**: [Lexend](https://fonts.google.com/specimen/Lexend) (Google Fonts, variable `--font-lexend`)
> **Icons**: [react-icons/fi](https://react-icons.github.io/react-icons/icons/fi/) (Feather icon set)
> **Charts**: Recharts 3.8

---

## 1. Color Palette

### 1.1 Dark Theme (default)

| Token | Hex | Usage |
|---|---|---|
| `--bs-primary` | `#00E5FF` | Accent, links, active states, neon glow |
| `--bs-secondary` | `#FF4081` | Secondary accent, loss state, danger-adjacent |
| `--bs-body-bg` | `#050505` | Page background — near-black |
| `--bs-body-color` | `#dce3f1` | Primary text — cool off-white |
| `--surface-dim` | `#12141C` | Card/panel backgrounds, inputs |
| `--surface` | `#0d141d` | Slightly elevated surfaces |
| `--inverse-surface` | `#dce3f1` | Inverted context (avatar initials, contrast text) |
| `--outline` | `#849396` | Borders, dividers, faint metadata |
| `--text-subtle` | `#bac9cc` | Secondary text, labels, captions |

### 1.2 Light Theme (`body.light-theme`)

| Token | Hex | Usage |
|---|---|---|
| `--bs-body-bg` | `#FAF5FF` | Page background — soft lavender |
| `--bs-body-color` | `#4C1D95` | Primary text — deep violet |
| `--surface-dim` | `#FFFFFF` | Card surfaces |
| `--surface` | `#F3E8FF` | Elevated surfaces — pale purple |
| `--inverse-surface` | `#1E1B4B` | Inverted context |
| `--outline` | `#9333EA` | Borders — vivid purple |
| `--text-subtle` | `#6B21A8` | Secondary text — mid purple |

> **Theme switch**: Toggle `body.light-theme` class via `localStorage.getItem('theme')`.

### 1.3 Semantic Colors (hard-coded)

| Color | Hex | Usage |
|---|---|---|
| Win / Success | `#22C55E` | Active status dots, win counts |
| Loss / Danger | `#EF4444` | Inactive status dots, loss counts |
| Away / Warning | `#F59E0B` | Away status dots |
| Neon Cyan | `#00E5FF` | Primary glow, DUPR badge, active tabs |
| Hot Pink | `#FF4081` | Secondary pills, gradient endpoint |

### 1.4 Alpha Channels

| Usage | Value |
|---|---|
| Neon border (rest) | `rgba(0, 229, 255, 0.12)` |
| Neon border (hover) | `rgba(0, 229, 255, 0.3)` – `0.4` |
| Neon glow (box-shadow) | `rgba(0, 229, 255, 0.1)` – `0.3` |
| Glass panel bg | `rgba(18, 20, 28, 0.6)` |
| Light-theme purple border | `rgba(124, 58, 237, 0.2)` – `0.6` |
| Light-theme purple hover bg | `rgba(124, 58, 237, 0.1)` |
| Secondary pill bg | `rgba(255, 64, 129, 0.15)` |
| Secondary pill border | `rgba(255, 64, 129, 0.3)` |

---

## 2. Typography

| Property | Value |
|---|---|
| **Family** | `var(--font-lexend), sans-serif` |
| **Body size** | Browser default (16px) — Bootstrap base |
| **Section label** | `0.75rem` · uppercase · `letter-spacing: 0.1em` · weight 500 |
| **DUPR badge** | `0.85rem` · weight 600 · color `#00E5FF` |
| **Pill text** | `0.8rem` · weight 500 |
| **Small metadata** | `0.85rem` (emails, subtitles) |
| **H3 (stat values)** | `fw-bold` (700) · color `#dce3f1` |
| **H5 (player names)** | `fw-bold` (700) · color `#dce3f1` |
| **Text gradient** | `linear-gradient(135deg, #00E5FF, #FF4081)` · `-webkit-background-clip: text` |

### Text Utility Classes

| Class | Effect |
|---|---|
| `.text-subtle` | `color: var(--text-subtle)` — secondary text |
| `.text-faint` | `color: var(--outline)` — tertiary/metadata |
| `.section-label` | Uppercase, tracked, 0.75rem, subtle color |
| `.text-gradient` | Cyan → Pink gradient text |

> ⚠️ **Never use `.text-muted`** — too dark on dark background. Use `.text-subtle` instead.

---

## 3. Surfaces & Elevation

### 3.1 Glass Panel

```css
.glass-panel {
  background: rgba(18, 20, 28, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(0, 229, 255, 0.12);
}
```

Use for stat cards and elevated overlays that need translucency.

### 3.2 Card (Component)

| Variant | Border |
|---|---|
| `default` | `1px solid rgba(0, 229, 255, 0.15)` |
| `accent` | `1px solid rgba(0, 229, 255, 0.3)` |
| `muted` | `1px solid #1F222C` |

**All cards share**: `background: var(--surface-dim)` · `border-radius: 12px` · `box-shadow: 0 2px 12px rgba(0,0,0,0.4)`

### 3.3 Feature Card (Marketing)

```css
.feature-card {
  background: var(--surface-dim);
  border: 1px solid rgba(0, 229, 255, 0.12);
  border-radius: 0.75rem;
}
.feature-card:hover {
  border-color: rgba(0, 229, 255, 0.3);
  box-shadow: 0 0 30px rgba(0, 229, 255, 0.1);
}
```

### 3.4 Interactive Card Hover

```css
.card-interactive:hover {
  border-color: rgba(0, 229, 255, 0.4);
  box-shadow: 0 4px 20px rgba(0,0,0,0.5), 0 0 15px rgba(0, 229, 255, 0.1);
}
```

Applies to any surface with `interactive={true}` or `.card-interactive` class.

---

## 4. Spacing & Layout

| Property | Value |
|---|---|
| **Page container** | Bootstrap `<Container>` — responsive max-width |
| **Main content padding** | `py-4` (Bootstrap) |
| **Card padding** | `16px` (PlayerCard) or Bootstrap Card.Body defaults |
| **Section gap** | `mb-4` (SectionHeader bottom margin) |
| **Internal gaps** | `gap-2` (pills, badges) · `gap-3` (card content rows) |
| **Footer padding** | `40px 0` · top border `1px solid #1F222C` |
| **Border radius** | `12px` (cards) · `50rem` / `9999px` (pills, search bar) · `4px` (progress bars) |

### Z-Index Scale

| Layer | Value |
|---|---|
| Marketing nav | `1000` |

---

## 5. Component Library

### 5.1 Avatar

| Prop | Default | Notes |
|---|---|---|
| `size` | `40` | Also accepts `'sm'` (30), `'md'` (50), `'lg'` (80) |
| `src` | — | Image URL; falls back to initials |
| `initials` / `name` | — | Auto-generates initials from name |

**Styles**: Circle · `var(--surface-dim)` bg · `#1F222C` border · font size = `size * 0.4`

### 5.2 Card

| Prop | Default | Notes |
|---|---|---|
| `variant` | `'default'` | `'default'` / `'accent'` / `'muted'` |
| `interactive` | `false` | Adds `.card-interactive` hover |

### 5.3 Pill

| Prop | Default | Notes |
|---|---|---|
| `variant` | `'primary'` | `'primary'` (cyan) / `'secondary'` (pink) |

**Styles**: Rounded pill · `0.8rem` · translucent bg with matching border

### 5.4 StatusBadge

Wraps `Pill` with semantic mapping:

| Status | Label | Variant |
|---|---|---|
| `active` | Active | primary |
| `inactive` | Inactive | secondary |
| `completed` | Completed | primary |
| `scheduled` | Scheduled | info |
| `pending` | Pending | warning |
| `approved` | Approved | primary |
| `rejected` | Rejected | danger |
| `upcoming` | Upcoming | info |
| `W` | Win | primary |
| `L` | Loss | secondary |

### 5.5 WinLossBadge

Inline `{wins}-{losses}` display. Win in `#22C55E`, dash in `#FFFFFF`, loss in `#EF4444`. Bold `1.1rem`.

### 5.6 StatCard

Glass panel stat display. Props: `title`, `value`, `icon`, `subtitle`, `trend`. Trend colors: `+` → `text-success`, `-` → `text-danger`.

### 5.7 StatBar

Horizontal progress bar. `var(--bs-primary)` or `var(--bs-secondary)` fill. Track: `#12141C` bg · `#1F222C` border · `8px` height · `4px` radius. Animated fill with neon glow shadow.

### 5.8 PlayerCard

Composite card: Avatar (with status dot) + name + email + DUPR badge + WinLossBadge + role Pill. Inline hover effects when `onClick` provided.

### 5.9 DataTable

Bootstrap `<Table variant="dark">`. Striped + hover by default. Clickable rows get `cursor: pointer`. Empty state centered text.

### 5.10 SearchBar

Pill-shaped `InputGroup`. Search icon left, clear button right (shows when value present). Full-width rounded corners via `.search-bar` CSS.

### 5.11 Paginator

Bootstrap `Pagination` with ellipsis. `maxVisible` pages shown. First/Prev/Next/Last buttons. Hidden when `totalPages <= 1`.

### 5.12 ConfirmModal

Centered Bootstrap modal. Dark-themed via global `.modal-content` CSS. Props: `title`, `message`, `confirmText`, `variant`.

### 5.13 SectionHeader

Flex row: title + subtitle left, optional action slot right. `mb-4` spacing.

### 5.14 LoadingSpinner

Bootstrap `Spinner` with optional text. `fullScreen` mode centers in `60vh` container.

### 5.15 Layout (Navbar)

Bootstrap `Navbar` (dark variant). Links: Dashboard, Players, Teams, Schedule, Analytics, Captains Portal, Org Admin. Right side: notification bell dropdown + profile link. Hidden on landing page (`/`).

### 5.16 Footer

Simple flex row: brand name (primary color) left, copyright right. Top border `#1F222C`.

### 5.17 ToastProvider

Context-based toast system (wraps app).

### 5.18 ErrorBoundary

React error boundary (wraps app).

---

## 6. Effects & Transitions

### 6.1 Neon Glow

```css
.neon-glow-primary {
  box-shadow: 0px 0px 20px rgba(0, 229, 255, 0.3);
}
```

Applied on `.btn-primary:hover` as well.

### 6.2 Transition Timing

| Context | Duration | Easing |
|---|---|---|
| Card border/shadow hover | `0.2s` | ease |
| Feature card hover | `0.3s` | ease |
| Button outline neon | `0.3s` | ease |
| Body bg/color theme switch | `0.3s` | ease |
| StatBar fill animation | `0.3s` | ease |

### 6.3 Hero Gradient (Marketing)

```css
.hero-gradient {
  background: radial-gradient(ellipse at 50% 0%, rgba(0, 229, 255, 0.15) 0%, transparent 60%);
}
```

### 6.4 CTA Section

```css
.cta-section {
  background: linear-gradient(180deg, transparent 0%, rgba(0, 229, 255, 0.05) 100%);
  border-top: 1px solid rgba(0, 229, 255, 0.1);
}
```

---

## 7. Forms

### 7.1 Dark Theme (default)

| Property | Value |
|---|---|
| Text color | `#dce3f1` |
| Background | `#12141C` |
| Border | `rgba(0, 229, 255, 0.15)` |
| Focus border | `rgba(0, 229, 255, 0.4)` |
| Focus ring | `0 0 0 0.2rem rgba(0, 229, 255, 0.15)` |
| Placeholder | `#dce3f1` at `0.7` opacity |

### 7.2 Light Theme

| Property | Value |
|---|---|
| Text color | `#4C1D95` |
| Background | `#FFFFFF` |
| Border | `rgba(124, 58, 237, 0.3)` |
| Focus border | `rgba(124, 58, 237, 0.6)` |
| Focus ring | `0 0 0 0.2rem rgba(124, 58, 237, 0.15)` |
| Placeholder | `#6B21A8` at `0.7` opacity |

---

## 8. Modals & Dropdowns

### Modals

| Theme | Background | Border | Dividers |
|---|---|---|---|
| Dark | `#12141C` | `rgba(0, 229, 255, 0.15)` | Same as border |
| Light | `#FFFFFF` | `rgba(124, 58, 237, 0.2)` | Same as border |

### Dropdowns

| Theme | Background | Border | Hover bg | Hover text |
|---|---|---|---|---|
| Dark | `#12141C` | `rgba(0, 229, 255, 0.15)` | `rgba(0, 229, 255, 0.1)` | `#00E5FF` |
| Light | `#FFFFFF` | `rgba(124, 58, 237, 0.2)` | `rgba(124, 58, 237, 0.1)` | `#7C3AED` |

---

## 9. Tabs (Nav Pills)

| State | Background | Text | Border |
|---|---|---|---|
| Default | transparent | `#bac9cc` | `rgba(0, 229, 255, 0.1)` |
| Active | `rgba(0, 229, 255, 0.15)` | `#00E5FF` | `rgba(0, 229, 255, 0.3)` |

---

## 10. Status Dots

Small inline circle indicators:

| Class | Color | Meaning |
|---|---|---|
| `.status-dot.active` | `#22C55E` | Player online/active |
| `.status-dot.inactive` | `#EF4444` | Player offline/inactive |
| `.status-dot.away` | `#F59E0B` | Player away |

Size: `8px` default · `10px` on PlayerCard (with `2px solid #12141C` border ring).

---

## 11. Buttons

### Neon Outline Button

```css
.btn-outline-neon {
  background: transparent;
  border: 1px solid #00E5FF;
  color: #00E5FF;
}
.btn-outline-neon:hover {
  background: rgba(0, 229, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 229, 255, 0.2);
}
```

### Primary Button Hover

Gains `.neon-glow-primary` shadow: `0px 0px 20px rgba(0, 229, 255, 0.3)`.

### Close Button (Dark)

```css
.btn-close {
  filter: invert(1) grayscale(100%) brightness(200%);
}
```

Light theme resets `filter: none`.

---

## 12. Marketing Nav

```css
.marketing-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  background: rgba(5, 5, 5, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 229, 255, 0.1);
}
```

---

## 13. Design Principles

1. **Dark-first**: All base styles assume `#050505` background. Light theme is an opt-in override.
2. **Neon accent language**: Cyan (`#00E5FF`) = primary action/active. Pink (`#FF4081`) = secondary/negative.
3. **Glassmorphism**: Use `backdrop-filter: blur()` + translucent bg for elevated panels.
4. **Subtle borders**: All borders use low-alpha neon cyan, increasing on hover/focus.
5. **No emoji icons**: Feather icons (react-icons/fi) exclusively.
6. **Cursor discipline**: All clickable elements get `cursor: pointer`.
7. **Smooth transitions**: 200–300ms ease on all interactive state changes.
8. **Component-first**: Use the component library (`Card`, `Pill`, `Avatar`, etc.) — avoid raw Bootstrap markup.
9. **CSS variable-driven**: Theme-swap via CSS custom properties on `:root` / `body.light-theme`.
10. **Consistent radii**: `12px` for cards, `50rem` for pills/search, `4px` for progress bars.

---

## 14. File Map

| File | Purpose |
|---|---|
| [globals.css](file:///c:/Users/IdoTanne/Documents/Resilio%20Sync/Ido_Tanne/Personal%20Projects/NextJS/pickleball-planner/src/styles/globals.css) | CSS variables, utility classes, global overrides |
| [Home.module.css](file:///c:/Users/IdoTanne/Documents/Resilio%20Sync/Ido_Tanne/Personal%20Projects/NextJS/pickleball-planner/src/styles/Home.module.css) | Landing/marketing page scoped styles |
| [_app.js](file:///c:/Users/IdoTanne/Documents/Resilio%20Sync/Ido_Tanne/Personal%20Projects/NextJS/pickleball-planner/src/pages/_app.js) | Font loading (Lexend), theme init, Layout + Footer + ToastProvider wrapping |
| [Layout.js](file:///c:/Users/IdoTanne/Documents/Resilio%20Sync/Ido_Tanne/Personal%20Projects/NextJS/pickleball-planner/src/components/Layout.js) | Navbar, notifications dropdown, league mega-menu |
| [Card.js](file:///c:/Users/IdoTanne/Documents/Resilio%20Sync/Ido_Tanne/Personal%20Projects/NextJS/pickleball-planner/src/components/Card.js) | Base card with variant + interactive props |
| [Pill.js](file:///c:/Users/IdoTanne/Documents/Resilio%20Sync/Ido_Tanne/Personal%20Projects/NextJS/pickleball-planner/src/components/Pill.js) | Rounded badge — primary (cyan) / secondary (pink) |
| [Avatar.js](file:///c:/Users/IdoTanne/Documents/Resilio%20Sync/Ido_Tanne/Personal%20Projects/NextJS/pickleball-planner/src/components/Avatar.js) | Circle avatar with image or initials fallback |
| [StatusBadge.js](file:///c:/Users/IdoTanne/Documents/Resilio%20Sync/Ido_Tanne/Personal%20Projects/NextJS/pickleball-planner/src/components/StatusBadge.js) | Semantic status → Pill mapping |
| [StatCard.js](file:///c:/Users/IdoTanne/Documents/Resilio%20Sync/Ido_Tanne/Personal%20Projects/NextJS/pickleball-planner/src/components/StatCard.js) | Glass-panel KPI display |
| [StatBar.js](file:///c:/Users/IdoTanne/Documents/Resilio%20Sync/Ido_Tanne/Personal%20Projects/NextJS/pickleball-planner/src/components/StatBar.js) | Horizontal progress bar with neon fill |
| [PlayerCard.js](file:///c:/Users/IdoTanne/Documents/Resilio%20Sync/Ido_Tanne/Personal%20Projects/NextJS/pickleball-planner/src/components/PlayerCard.js) | Rich player info card composite |
| [SearchBar.js](file:///c:/Users/IdoTanne/Documents/Resilio%20Sync/Ido_Tanne/Personal%20Projects/NextJS/pickleball-planner/src/components/SearchBar.js) | Pill-shaped search input with clear |
| [DataTable.js](file:///c:/Users/IdoTanne/Documents/Resilio%20Sync/Ido_Tanne/Personal%20Projects/NextJS/pickleball-planner/src/components/DataTable.js) | Bootstrap dark table wrapper |
| [Paginator.js](file:///c:/Users/IdoTanne/Documents/Resilio%20Sync/Ido_Tanne/Personal%20Projects/NextJS/pickleball-planner/src/components/Paginator.js) | Pagination with ellipsis |
| [WinLossBadge.js](file:///c:/Users/IdoTanne/Documents/Resilio%20Sync/Ido_Tanne/Personal%20Projects/NextJS/pickleball-planner/src/components/WinLossBadge.js) | Colored W-L inline display |
| [ConfirmModal.js](file:///c:/Users/IdoTanne/Documents/Resilio%20Sync/Ido_Tanne/Personal%20Projects/NextJS/pickleball-planner/src/components/ConfirmModal.js) | Confirmation dialog |
| [SectionHeader.js](file:///c:/Users/IdoTanne/Documents/Resilio%20Sync/Ido_Tanne/Personal%20Projects/NextJS/pickleball-planner/src/components/SectionHeader.js) | Page section title + action slot |
| [LoadingSpinner.js](file:///c:/Users/IdoTanne/Documents/Resilio%20Sync/Ido_Tanne/Personal%20Projects/NextJS/pickleball-planner/src/components/LoadingSpinner.js) | Bootstrap spinner with text |
| [Footer.js](file:///c:/Users/IdoTanne/Documents/Resilio%20Sync/Ido_Tanne/Personal%20Projects/NextJS/pickleball-planner/src/components/Footer.js) | Simple brand + copyright footer |
