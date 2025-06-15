# Claude Development Guidelines - Family App

## Project Context

Next.js family application with vanilla-extract styling, Prisma ORM, and comprehensive form component library.

## Critical Quality Gates

**NEVER commit without running all quality checks:**

```bash
npm run build        # Must pass - validates entire app
npm run lint         # Must pass - code quality
npm run type-check   # Must pass - TypeScript validation
npm run dev          # Must start - localhost validation
npm run setup:check  # Environment validation
```

## Code Conventions

### Theme System Usage

```typescript
// ✅ Correct - Use existing theme structure
import { vars } from './styles/theme.css';
fontSize: vars.typography.fontSize.base,
color: vars.colors.foreground,
padding: vars.spacing.medium,

// ❌ Never assume tokens object exists
import { tokens } from './styles/theme.css'; // Will break build
```

### Component Organization

- `src/app/[page]/page.css.ts` - Page-specific styles
- `src/components/[Component].css.ts` - Component-specific styles
- `src/styles/theme.css.ts` - Central theme variables
- `src/components/index.ts` - Export all components

### Vanilla-Extract Best Practices

- Use `recipe()` for component variants
- Use `style()` for individual classes
- Avoid complex pseudo-selectors (`:focus:not(:focus-visible)`)
- No `!important` declarations
- Test build frequently with complex CSS

## Development Workflow

### Branch Management

- Keep feature branches focused on single concerns
- Separate documentation from implementation to prevent conflicts
- Merge main regularly: `git fetch origin && git merge origin/main`

### Commit Standards

- Format: `feat: lowercase description`
- Natural language allowed in copy text
- ESLint configured to allow apostrophes: `react/no-unescaped-entities: "off"`

### GitHub CLI Usage

**Always warn users before authentication-required operations:**

```bash
echo "🔐 Creating GitHub PR - authentication popup may appear..."
gh pr create --title "..." --body "..."
```

## Technology Stack Constraints

### Authentication Approach

- Next.js built-in sessions (encrypted cookies)
- bcrypt password hashing
- Admin approval workflow for family context
- NO JWT complexity, email verification, or enterprise features

### Form Components Available

Complete library in `src/components/`:

- Input, Textarea, Select, Checkbox, Radio
- FileUpload with drag-and-drop
- FormField wrapper with validation
- useFormValidation hook

### Database Schema (Prisma)

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // bcrypt hash
  name      String
  isActive  Boolean  @default(false)  // Admin approval
  isAdmin   Boolean  @default(false)
  createdAt DateTime @default(now())
  familyId  String?
}
```

## Work Breakdown Guidelines

### Issue Sizing

- Target 500-1000 LOC per PR for optimal review
- Group by domain/feature, not technical layers
- Each issue should be complete, testable unit
- Maximum 12 comprehensive issues for parallel development

### Dependency Management

- Foundation layer (no dependencies): UI components, theme, database
- Core layer (sequential): Authentication, backend services
- Feature layer: Frontend integration
- Integration layer: Final assembly and deployment

## Environment Setup

### Required Scripts

- `setup:check` - Validates entire development environment
- All standard Next.js scripts (dev, build, lint, type-check)

### Environment Variables

- Template in `.env.example` organized by feature area
- Currently runs without env vars (pure frontend prototype)
- Prepared for: database, auth, APIs, analytics

## Documentation Standards

### File Organization

- **README.md** - Project setup and overview
- **ONBOARDING.md** - Developer checklist
- **DEVELOPMENT_LEARNINGS.md** - Technical insights and lessons
- **CLAUDE.md** - Global development guidelines (this file)

### Quality Requirements

- All documentation must be tested and accurate
- Cross-references between documents required
- Progressive complexity: quick start → detailed → advanced
- Multiple learning paths supported

## Common Pitfalls to Avoid

1. **Theme Structure**: Never assume `tokens` object exists
2. **Build Testing**: Always test before committing
3. **Import Cleanup**: Remove unused imports immediately
4. **Complex CSS**: Keep vanilla-extract selectors simple
5. **Authentication**: Don't over-engineer for family use case
6. **Issue Scope**: Avoid micro-tasks, focus on complete features
7. **Merge Conflicts**: Separate concerns by file/directory
8. **GitHub CLI**: Always warn users about authentication prompts

## Success Metrics

### Current Working State

✅ `http://localhost:3000/` - Home with navigation
✅ `http://localhost:3000/books` - Books management  
✅ `http://localhost:3000/streaming` - Streaming services
✅ Complete form component library available
✅ Comprehensive documentation and onboarding
✅ Automated environment validation

### Quality Gates Passing

✅ Build succeeds
✅ Linting passes  
✅ Type checking passes
✅ Dev server starts
✅ All setup validation checks pass
✅ Pre-commit hooks function correctly
