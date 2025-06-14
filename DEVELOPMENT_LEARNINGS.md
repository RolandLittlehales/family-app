# Development Learnings - The Family App

## Key Issues Encountered and Solutions

### 1. **Theme Structure Mismatch**

**Problem**: Created CSS files expecting a complex theme structure with `tokens` object, but actual theme only exported `vars`.

**Root Cause**: Assumed theme structure without checking the actual implementation in `src/styles/theme.css.ts`.

**Solution**:

- Always read existing theme structure before creating styles
- Use only `vars` import, not non-existent `tokens`
- Theme structure is:
  ```typescript
  vars.colors.{primary, primaryHover, background, foreground, etc}
  vars.spacing.{small, medium, large, xlarge}
  vars.typography.fontSize.{small, base, large, xlarge, "2xl", "3xl"}
  vars.typography.fontWeight.{normal, medium, semibold, bold}
  vars.radii.{small, medium, large, full}
  ```

**Lesson**: **ALWAYS check existing code structure before building on top of it.**

### 2. **Vanilla-Extract Limitations**

**Problem**: Build errors with complex pseudo-selectors and CSS properties.

**Issues Found**:

- `:focus:not(:focus-visible)` not supported in vanilla-extract recipes
- Media queries must use specific syntax: `"@media": { "screen and (min-width: 768px)": {...} }`
- `!important` not supported for all CSS properties
- `scrollBehavior: "auto !important"` causes type errors

**Solution**:

- Use simpler pseudo-selectors: just `:focus`, `:hover`, `:active`
- Follow vanilla-extract documentation for media queries
- Avoid `!important` declarations
- Test build frequently when adding complex CSS

**Lesson**: **Understand the limitations of your CSS-in-JS library before writing complex styles.**

### 3. **Import Organization**

**Problem**: Importing unused modules (`style` from vanilla-extract when only using `recipe`).

**Solution**:

- Remove unused imports immediately
- ESLint will catch these, but they cause build warnings
- Import only what you need

**Lesson**: **Clean imports as you go to avoid build warnings.**

### 4. **Pre-commit Hooks and Code Quality**

**Problem**: Commitlint rejected commits due to incorrect format and ESLint rejected natural apostrophes.

**Solutions Applied**:

- **Conventional Commits**: Use format `feat: lowercase subject line`
- **ESLint Configuration**: Disabled `react/no-unescaped-entities` to allow natural apostrophes in copy text
- **Natural Language**: Updated to use `family's` instead of `family&apos;s` for better readability

**Configuration Change**:

```javascript
// eslint.config.mjs
"react/no-unescaped-entities": "off", // Allow natural apostrophes in copy text
```

**Lesson**: **Configure tools to support natural language while maintaining code quality.**

### 5. **Testing Before Committing**

**Problem**: Attempted to commit without testing build, leading to broken localhost.

**Critical Workflow**:

1. **Always run `npm run build` before committing**
2. **Test development server (`npm run dev`)**
3. **Run linting (`npm run lint`)**
4. **Run type checking (`npm run type-check`)**
5. **Only then commit changes**

**Lesson**: **NEVER commit without testing the build. Always verify localhost works.**

### 6. **Component File Organization**

**Success**: Created a well-organized structure:

- `src/app/[page]/page.css.ts` - Page-specific styles
- `src/components/[Component].css.ts` - Component-specific styles
- `src/styles/theme.css.ts` - Central theme
- `src/styles/base.css.ts` - Global styles
- `src/styles/utilities.css.ts` - Utility classes
- `src/styles/components.css.ts` - Shared component recipes

**Lesson**: **Consistent file organization makes debugging much easier.**

### 7. **Vanilla-Extract Best Practices Learned**

- Use `recipe()` for component variants
- Use `style()` for individual classes
- Use `globalStyle()` for global CSS
- Import structure: `import { vars } from './theme.css'`
- Theme structure: Simple flat object, not nested tokens
- Complex selectors: Keep them simple, avoid chaining

## Current Working Structure

### Theme Usage Pattern:

```typescript
// ✅ Correct
import { vars } from './theme.css';
fontSize: vars.typography.fontSize.base,
color: vars.colors.foreground,
padding: vars.spacing.medium,

// ❌ Incorrect
import { vars, tokens } from './theme.css'; // tokens doesn't exist
fontSize: tokens.typography.fontSize.base, // Will break build
```

### Responsive Design Pattern:

```typescript
// ✅ Correct
export const container = style({
  "@media": {
    "screen and (min-width: 768px)": {
      maxWidth: "768px",
    },
  },
});

// ❌ Incorrect
globalStyle("@media (max-width: 768px)", { ... }); // Wrong syntax
```

## Quality Gates Established

1. **Build must pass**: `npm run build`
2. **Linting must pass**: `npm run lint`
3. **Type checking must pass**: `npm run type-check`
4. **Dev server must start**: `npm run dev`
5. **Conventional commit format**: `feat: lowercase description`
6. **Natural language in copy**: Apostrophes allowed

## URLs Currently Working

✅ `http://localhost:3002/` - Home page with navigation cards  
✅ `http://localhost:3002/books` - Books management with stats and feature cards  
✅ `http://localhost:3002/streaming` - Streaming services with preview cards

All pages are fully responsive and use the vanilla-extract theme system consistently.
