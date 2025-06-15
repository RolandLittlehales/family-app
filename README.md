# Family App

A centralized family management platform for coordinating books, streaming content, and family activities. Built with Next.js 15, TypeScript, and Vanilla-Extract CSS-in-JS.

## Overview

The Family App provides two main management areas:

- **📚 Family Reading Management** - Track books, reading progress, and build reading habits together
- **🎬 Family Streaming Management** - Organize viewing content, manage subscriptions, and coordinate watch time

Currently in prototype phase with comprehensive UI components and mock data, ready for backend integration.

## Quick Start

### Prerequisites

- **Node.js 18+** (check with `node --version`)
- **npm** (included with Node.js)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd family-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## Development Scripts

### Core Commands

```bash
npm run dev          # Start development server
npm run build        # Create production build
npm run start        # Start production server
```

### Quality Assurance

```bash
npm run quality      # Run all quality checks (lint, format, type-check)
npm run quality:fix  # Auto-fix all quality issues

# Individual checks
npm run lint         # ESLint check
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check formatting
npm run type-check   # TypeScript compilation check
```

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── books/          # Family reading management
│   ├── streaming/      # Family streaming management
│   ├── layout.tsx      # Root layout with navigation
│   └── page.tsx        # Home page
├── components/         # Reusable UI components
│   ├── Button.css.ts   # Button component styles
│   ├── Header.tsx      # Navigation header
│   └── PageLayout.tsx  # Page layout wrapper
└── styles/            # Theme system and global styles
    ├── theme.css.ts    # Design tokens and theme
    ├── base.css.ts     # Base styles and resets
    └── README.md       # Theme system documentation
```

## Technology Stack

- **Framework**: Next.js 15.3.3 with App Router
- **Language**: TypeScript 5+ with strict mode
- **Styling**: Vanilla-Extract CSS-in-JS with component recipes
- **Code Quality**: ESLint, Prettier, Commitlint, Husky pre-commit hooks
- **Development**: Hot reloading, TypeScript path aliases (`@/*`)

## Development Workflow

### Quality Gates

All changes must pass these checks before commit:

1. **Build**: `npm run build` succeeds
2. **Lint**: `npm run lint` passes
3. **Type Check**: `npm run type-check` passes
4. **Format**: `npm run format:check` passes
5. **Dev Server**: `npm run dev` starts without errors

### Commit Standards

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: add new feature
fix: resolve bug
docs: update documentation
style: code formatting changes
refactor: code restructuring
test: add or update tests
```

Pre-commit hooks automatically enforce these standards.

## Current Features

### Home Page (`/`)

- Vanilla-Extract CSS-in-JS showcase
- Responsive design demonstration
- Navigation to family management features

### Books Management (`/books`)

- Reading statistics dashboard
- Reading list and progress tracking
- Family library management
- Book recommendations system
- Reading goals and achievements

### Streaming Management (`/streaming`)

- Watchlist for family viewing
- Streaming service management
- Content recommendations
- Watch statistics and habits
- Currently watching tracker

## Environment Configuration

The app currently runs without external dependencies or environment variables. For future backend integration, create a `.env.local` file:

```bash
# Example configuration (not currently required)
NEXT_PUBLIC_APP_URL=http://localhost:3000
# Database configuration will be added when implemented
# API keys for external services will be documented here
```

## Troubleshooting

### Common Issues

**Development server won't start:**

- Check Node.js version: `node --version` (requires 18+)
- Clear dependencies: `rm -rf node_modules package-lock.json && npm install`
- Check port availability: Default is :3000, configure with `PORT=3001 npm run dev`

**Build failures:**

- Run type check: `npm run type-check`
- Check for linting errors: `npm run lint`
- Ensure all imports use TypeScript paths (`@/` for src/)

**Styling issues:**

- Vanilla-Extract requires build step - restart dev server after CSS changes
- Check [Theme Documentation](src/styles/README.md) for usage patterns
- Use component recipes for consistent styling

**Pre-commit hooks failing:**

- Run quality fixes: `npm run quality:fix`
- Ensure commit message follows conventional format
- Check that all files are properly formatted

### Getting Help

- **Theme System**: See [src/styles/README.md](src/styles/README.md)
- **Development Learnings**: See [DEVELOPMENT_LEARNINGS.md](DEVELOPMENT_LEARNINGS.md)
- **Component Patterns**: Check existing components in `src/components/`

## Contributing

1. Follow the established code patterns and file organization
2. Use the existing quality scripts before committing
3. Write descriptive commit messages using conventional format
4. Test your changes with `npm run dev` and `npm run build`
5. Update documentation when adding new features

## Next Steps

This prototype is ready for:

- Backend API development
- Database integration
- External service APIs (books, streaming)
- User authentication system
- Real data persistence

See [DEVELOPMENT_LEARNINGS.md](DEVELOPMENT_LEARNINGS.md) for detailed technical insights and implementation patterns.
