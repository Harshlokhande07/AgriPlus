# 🎨 Sankalp Design System Documentation

## Overview

The Sankalp Digital Twin uses a **modern, data-forward design system** focused on agricultural technology. The system emphasizes clarity, accessibility, and brand consistency with an agricultural/nature-inspired green color palette.

---

## 🎯 Brand Identity

**Primary Brand Color:** #22c55e (Brand Green 500)  
**Brand Philosophy:** Clean, modern, farm-first focus with calm, professional aesthetic  
**Typography:** System fonts (cross-platform compatibility)  
**Spacing:** Generous, scannable layouts with 20px grid base  

---

## 📊 Color Palette

### Primary Brand Colors
- **Brand 50** (#f0fdf4) - Light backgrounds, highlights
- **Brand 100** (#dcfce7) - Card highlights, subtle accents
- **Brand 500** (#22c55e) - Primary actions, active states ⭐
- **Brand 600** (#16a34a) - Hover states, emphasis
- **Brand 700** (#15803d) - Active press states

### Semantic Colors
- **Text Primary** (#1e293b) - Headings, primary text
- **Text Secondary** (#64748b) - Body text, descriptions
- **Text Muted** (#94a3b8) - Inactive text, hints
- **Surface** (#f4f6f8) - Main background
- **Surface Light** (#ffffff) - Cards, panels
- **Border** (#e2e8f0) - Subtle divisions
- **Success** (#22c55e) - Positive status
- **Warning** (#f97316) - Warning states
- **Error** (#ef4444) - Error states
- **Info** (#06b6d4) - Information

### Gray Scale (Slate)
- **Slate 50** (#f8fafc) - Lightest
- **Slate 100** (#f1f5f9)
- **Slate 200** (#e2e8f0)
- **Slate 300** (#cbd5e1)
- **Slate 400** (#94a3b8)
- **Slate 500** (#64748b)
- **Slate 600** (#475569)
- **Slate 700** (#334155)
- **Slate 800** (#1e293b)
- **Slate 900** (#0f172a) - Darkest

---

## 🔤 Typography

### Font Family
**Primary:** System font stack (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, etc.)  
**Mono:** Courier New, Monaco, monospace (for code/data)

### Type Scale

| Style | Size | Weight | Line-Height | Usage |
|-------|------|--------|-------------|-------|
| Display Large | 3.5rem (56px) | 800 | 1.1 | Page headlines |
| Display Medium | 2.8rem (44px) | 700 | 1.2 | Section titles |
| Heading Large | 2rem (32px) | 700 | 1.3 | Major sections |
| Heading Medium | 1.5rem (24px) | 700 | 1.4 | Card titles |
| Heading Small | 1.25rem (20px) | 600 | 1.5 | Subsections |
| Body | 1rem (16px) | 400 | 1.6 | Paragraph text |
| Body Small | 0.875rem (14px) | 400 | 1.5 | Secondary text |
| Label | 0.875rem (14px) | 600 | 1.4 | Form labels |
| Label Small | 0.75rem (12px) | 600 | 1.3 | Badges, tags |
| Small | 0.75rem (12px) | 500 | 1.3 | Hints, captions |

---

## 🛠️ Spacing System

**Base Unit:** 1rem (16px)  
**Grid Base:** 20px (1.25rem)

| Name | Value | CSS |
|------|-------|-----|
| xs | 4px | 0.25rem |
| sm | 8px | 0.5rem |
| md | 16px | 1rem |
| lg | 20px | 1.25rem |
| xl | 24px | 1.5rem |
| 2xl | 32px | 2rem |
| 3xl | 40px | 2.5rem |
| 4xl | 48px | 3rem |
| 5xl | 56px | 3.5rem |
| 6xl | 64px | 4rem |

### Common Patterns
- **Card Padding:** 2rem (32px)
- **Section Padding:** 2.5rem (40px)
- **Grid Gap:** 1.25rem (20px) / 1.5rem (24px)
- **Element Spacing:** 1rem (16px)

---

## 🎭 Border Radius

| Name | Value | Usage |
|------|-------|-------|
| sm | 0.5rem (8px) | Small elements, inputs |
| md | 1rem (16px) | Buttons, tags |
| lg | 1.5rem (24px) | Cards, panels |
| xl | 2rem (32px) | Large cards |
| 2xl | 3rem (48px) | Hero sections |
| Full | 9999px | Pills, circles |

---

## ✨ Shadows & Depth

| Level | CSS | Usage |
|-------|-----|-------|
| sm | 0 2px 8px rgba(0,0,0,0.05) | Subtle lift |
| md | 0 10px 25px -5px rgba(0,0,0,0.05) | Cards, hover |
| lg | 0 20px 25px -5px rgba(0,0,0,0.1) | Modals  |
| xl | 0 25px 50px -12px rgba(0,0,0,0.15) | Deep modals |

---

## 🔄 Transitions

| Purpose | Duration | Timing |
|---------|----------|--------|
| Color Changes | 150ms | ease-in-out |
| Hover Effects | 200ms | ease-in-out |
| Page Transitions | 300ms | ease-in-out |
| Animations | 200-700ms | Various |

---

## 📦 Reusable Components

### Buttons

```css
.btn              /* Base button */
.btn-primary      /* Green brand button */
.btn-secondary    /* White border button */
.btn-ghost        /* Transparent button */
.btn-sm           /* Small variant */
.btn-lg           /* Large variant */
```

**Usage:**
```html
<button class="btn btn-primary">Click me</button>
<button class="btn btn-secondary btn-lg">Secondary</button>
```

### Cards

```css
.card             /* Standard card */
.card-compact     /* Reduced padding card */
.hover-lift       /* Adds hover lift effect */
```

**Usage:**
```html
<div class="card hover-lift">Card content</div>
```

### Badges

```css
.badge            /* Base badge */
.badge-success    /* Green success badge */
.badge-warning    /* Orange warning badge */
.badge-error      /* Red error badge */
.badge-info       /* Blue info badge */
```

**Usage:**
```html
<span class="badge badge-success">Completed</span>
```

### Form Inputs

```css
.input            /* Standard input field */
```

**Usage:**
```html
<input type="text" class="input" placeholder="Enter text">
```

### Status Indicators

```css
.status-indicator /* Base indicator */
.status-active    /* Pulsing active indicator */
.status-warning   /* Static warning indicator */
.status-inactive  /* Inactive indicator */
```

---

## 🎯 Layout Utilities

### Grid Systems

```css
.grid-cols-2      /* 2-column grid */
.grid-cols-3      /* 3-column grid */
.grid-cols-4      /* 4-column grid */
```

### Spacing Utilities

```css
.gap-sm, .gap-md, .gap-lg, .gap-xl, .gap-2xl     /* Gap spacing */
.px-lg, .px-xl                                    /* Horizontal padding */
.py-lg, .py-xl                                    /* Vertical padding */
```

### Flexbox Utilities

```css
.flex-center      /* Center flex items */
.flex-between     /* Space-between flex */
.flex-col         /* Column direction */
.flex-wrap        /* Wrap content */
```

### Text Utilities

```css
.text-truncate    /* Truncate with ellipsis */
.line-clamp-2     /* Clamp text to 2 lines */
.line-clamp-3     /* Clamp text to 3 lines */
```

---

## 🎨 Design Principles

### 1. **Clarity First**
- Clean typography hierarchy
- Generous whitespace
- Clear visual hierarchy

### 2. **Data-Forward**
- Emphasis on readable data
- Scannable layouts
- Quick information access

### 3. **Consistency**
- Unified color usage
- Consistent spacing
- Predictable interactions

### 4. **Accessibility**
- High contrast ratios (WCAG AA)
- Clear focus states
- Semantic HTML

### 5. **Performance**
- Minimal animations
- Optimized images
- Efficient CSS

---

## 📱 Responsive Design

### Breakpoints

| Name | Width |
|------|-------|
| Mobile | < 480px |
| Tablet | 480px - 768px |
| Desktop | > 768px |

### Patterns

- **Mobile First:** Design for mobile, enhance for desktop
- **Touch-Friendly:** Min 44px touch targets
- **Flexible Layouts:** Stack on mobile, grid on desktop

---

## 🌈 Color Usage Guidelines

### Primary Actions
Use **Brand 500** (#22c55e) for:
- Primary buttons
- Active states
- Call-to-action elements
- Important highlights

### Hover/Focus States
Use **Brand 600** (#16a34a) for:
- Button hover states
- Link focus states
- Interactive elements

### Backgrounds
Use **Brand 50-100** (#f0fdf4, #dcfce7) for:
- Card highlights
- Alert backgrounds
- Subtle accents
- Success backgrounds

### Text
- **Primary (#1e293b):** Headings, important text
- **Secondary (#64748b):** Body text, descriptions
- **Muted (#94a3b8):** Hints, disabled text

---

## 🎬 Animation Guidelines

### Hover Effects
```css
.smooth-transition {
  transition: all 200ms ease-in-out;
}

.hover-lift {
  transition: transform 200ms, box-shadow 200ms;
}
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

### Page Transitions
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.page-enter {
  animation: fadeIn 300ms ease-in;
}
```

---

## 📋 Implementation Checklist

- [ ] Include `design-system.css` in all pages
- [ ] Use CSS custom properties for colors/spacing
- [ ] Apply semantic class names (.btn-primary, etc.)
- [ ] Use heading hierarchy (h1 → h2 → h3, etc.)
- [ ] Set proper line-heights for readability
- [ ] Include focus states for keyboard navigation
- [ ] Test with screen readers
- [ ] Verify color contrast ratios
- [ ] Optimize images and animations
- [ ] Test responsive layouts

---

## 🔗 Files

- **design-system.css** - Core design tokens CSS
- **styles.css** - Application-specific styles
- **dashboard.css** - Dashboard-specific styles
- **login.html** - Login page (uses design system)

---

## 🚀 Getting Started

1. Link `design-system.css` in your HTML `<head>`
2. Use semantic class names from the system
3. Use CSS custom properties for colors/spacing
4. Reference this documentation for components
5. Test across browsers and devices

---

## 📞 Support

For design system questions or to propose changes:
1. Review this documentation
2. Check CSS custom properties in `design-system.css`
3. Reference component examples above
4. Maintain consistency with existing patterns

---

**Last Updated:** April 4, 2026  
**Status:** ✅ Complete & Ready  
**Version:** 1.0.0
