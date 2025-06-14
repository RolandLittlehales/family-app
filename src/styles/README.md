# Family App Theme System

A comprehensive design system built with Vanilla Extract for "The Family" app, featuring modern design tokens, component recipes, and full light/dark mode support.

## Features

- 🎨 **Comprehensive Design Tokens**: Colors, typography, spacing, and more
- 🌓 **Light/Dark Mode**: Automatic system preference detection with manual override
- 🧩 **Component Recipes**: Pre-built, customizable UI components
- 🔧 **Utility Classes**: Complete set of layout and styling utilities
- ♿ **Accessibility**: WCAG compliant with proper focus states and semantic colors
- ⚡ **Performance**: Zero-runtime CSS-in-JS with build-time compilation
- 👨‍👩‍👧‍👦 **Family-Friendly**: Warm, professional aesthetic suitable for all ages

## Quick Start

```tsx
import { button, card, textCenter } from "@/styles";

function MyComponent() {
  return (
    <div className={card({ variant: "elevated" })}>
      <h2 className={textCenter}>Hello Family!</h2>
      <button className={button({ variant: "primary", size: "lg" })}>
        Get Started
      </button>
    </div>
  );
}
```

## Theme System Structure

```
src/styles/
├── theme.css.ts          # Design tokens and theme definitions
├── base.css.ts           # Global styles and CSS reset
├── utilities.css.ts      # Utility classes for common styles
├── components.css.ts     # Component recipes
├── ThemeProvider.tsx     # React context for theme management
├── ThemeToggle.tsx       # Theme switching components
└── index.ts              # Main exports
```

## Design Tokens

### Colors

The color system includes semantic scales for:

- **Primary**: Main brand colors (blue family)
- **Secondary**: Accent colors (yellow family)
- **Accent**: Success/action colors (green family)
- **Neutral**: Grays for text and backgrounds
- **Semantic**: Success, warning, error, and info states

Each color has 10 shades (50-900) for maximum flexibility.

### Typography

- **Font Family**: Inter as primary, with system fallbacks
- **Font Sizes**: 12px to 72px in a harmonious scale
- **Font Weights**: Light (300) to Extra Bold (800)
- **Line Heights**: Tight to loose spacing options
- **Letter Spacing**: Precise tracking controls

### Spacing

Based on an 8px grid system:

- **Base unit**: 4px (0.25rem)
- **Scale**: 0, 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px, 128px, 160px, 192px, 224px, 256px

### Breakpoints

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## Component Recipes

### Button

```tsx
import { button } from "@/styles";

// Variants: primary, secondary, outline, ghost, success, warning, error
// Sizes: xs, sm, md, lg, xl
<button className={button({ variant: "primary", size: "md" })}>
  Click me
</button>;
```

### Input

```tsx
import { input } from "@/styles";

// Variants: default, error
// Sizes: sm, md, lg
<input className={input({ size: "md" })} placeholder="Enter text..." />;
```

### Card

```tsx
import { card } from "@/styles";

// Variants: default, elevated, flat
// Padding: none, sm, md, lg, xl
// Interactive: boolean for hover effects
<div className={card({ variant: "elevated", interactive: true })}>
  Card content
</div>;
```

### Badge

```tsx
import { badge } from "@/styles";

// Variants: default, primary, secondary, success, warning, error, info, outline
// Sizes: sm, md, lg
<span className={badge({ variant: "success", size: "sm" })}>New</span>;
```

### Alert

```tsx
import { alert } from "@/styles";

// Variants: info, success, warning, error
<div className={alert({ variant: "warning" })}>
  <strong>Warning:</strong> Please check your input.
</div>;
```

### Avatar

```tsx
import { avatar } from "@/styles";

// Sizes: xs, sm, md, lg, xl, 2xl
<div className={avatar({ size: "lg" })}>JD</div>;
```

## Utility Classes

### Layout

```tsx
import { container, flex, grid, gridCols3, gap4 } from "@/styles";

<div className={container}>
  <div className={`${grid} ${gridCols3} ${gap4}`}>{/* Grid content */}</div>
</div>;
```

### Spacing

```tsx
import { m4, p6, mt8, mb4 } from "@/styles";

<div className={`${m4} ${p6} ${mt8} ${mb4}`}>Spaced content</div>;
```

### Typography

```tsx
import { text2xl, fontBold, textCenter, textPrimary } from "@/styles";

<h1 className={`${text2xl} ${fontBold} ${textCenter} ${textPrimary}`}>
  Styled heading
</h1>;
```

### Colors

```tsx
import { textBrand, bgSecondary, borderPrimary } from "@/styles";

<div className={`${bgSecondary} ${borderPrimary} ${textBrand}`}>
  Colored content
</div>;
```

## Theme Management

### ThemeProvider

Wrap your app with the theme provider:

```tsx
import { ThemeProvider } from "@/styles/ThemeProvider";

function App({ children }) {
  return <ThemeProvider defaultTheme="system">{children}</ThemeProvider>;
}
```

### useTheme Hook

```tsx
import { useTheme } from "@/styles/ThemeProvider";

function MyComponent() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Resolved theme: {resolvedTheme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={() => setTheme("dark")}>Dark Mode</button>
    </div>
  );
}
```

### Theme Toggle Component

```tsx
import { ThemeToggle, ThemeSelector } from '@/styles/ThemeToggle';

// Simple toggle button
<ThemeToggle variant="ghost" size="md" />

// Toggle with label
<ThemeToggle showLabel variant="outline" />

// Dropdown selector
<ThemeSelector />
```

## Accessibility Features

- **Focus Management**: Visible focus rings with `:focus-visible` support
- **Color Contrast**: WCAG AA compliant color combinations
- **Reduced Motion**: Respects `prefers-reduced-motion` setting
- **Screen Readers**: Semantic HTML and proper ARIA attributes
- **Keyboard Navigation**: Full keyboard accessibility

## Dark Mode Implementation

The theme system automatically:

- Detects system preference (`prefers-color-scheme`)
- Provides manual override options
- Smoothly transitions between themes
- Maintains color contrast ratios
- Adjusts shadows and opacity for dark backgrounds

## Performance Optimizations

- **Zero Runtime**: All styles compiled at build time
- **Tree Shaking**: Only used styles included in bundle
- **CSS Variables**: Efficient theme switching
- **Cached Themes**: Theme preference stored in localStorage
- **Optimized Selectors**: Minimal CSS specificity conflicts

## Browser Support

- **Modern Browsers**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **CSS Features**: CSS Custom Properties, CSS Grid, Flexbox
- **Fallbacks**: System fonts and basic styling for older browsers

## Contributing

When adding new design tokens or components:

1. Follow the existing naming conventions
2. Ensure accessibility compliance
3. Test in both light and dark modes
4. Update this documentation
5. Add TypeScript types for better DX

## Examples

See `src/components/ThemeDemo.tsx` for comprehensive examples of all components and utilities in action.
