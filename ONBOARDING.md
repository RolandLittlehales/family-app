# Developer Onboarding Checklist

Welcome to the Family App project! This checklist will guide you through setting up your development environment and getting familiar with the codebase.

## Prerequisites

### Required Software

- [ ] **Node.js 18+** installed ([Download](https://nodejs.org/))
  - Verify: `node --version` should show v18.0.0 or higher
- [ ] **npm** (comes with Node.js)
  - Verify: `npm --version`
- [ ] **Git** for version control
  - Verify: `git --version`

### Recommended Tools

- [ ] **VS Code** or preferred IDE with TypeScript support
- [ ] **Git GUI** (GitHub Desktop, SourceTree, or VS Code Git integration)
- [ ] **Browser DevTools** (Chrome DevTools recommended)

## Project Setup

### 1. Repository Setup

- [ ] Clone the repository
  ```bash
  git clone <repository-url>
  cd family-app
  ```
- [ ] Switch to the main development branch
  ```bash
  git checkout main
  ```

### 2. Dependencies Installation

- [ ] Install project dependencies
  ```bash
  npm install
  ```
- [ ] Verify installation completed without errors

### 3. Environment Configuration

- [ ] Copy environment template (optional for current setup)
  ```bash
  cp .env.example .env.local
  ```
- [ ] Review `.env.example` for future configuration options

### 4. Validation

- [ ] Run setup validation script
  ```bash
  npm run setup:check
  ```
- [ ] Address any issues reported by the validation script

### 5. Development Server

- [ ] Start the development server
  ```bash
  npm run dev
  ```
- [ ] Open [http://localhost:3000](http://localhost:3000) in your browser
- [ ] Verify all three pages work:
  - [ ] Home page (`/`) - Vanilla-Extract showcase
  - [ ] Books page (`/books`) - Reading management
  - [ ] Streaming page (`/streaming`) - Content management

### 6. Quality Tools Verification

- [ ] Run TypeScript check
  ```bash
  npm run type-check
  ```
- [ ] Run linting
  ```bash
  npm run lint:check
  ```
- [ ] Run formatting check
  ```bash
  npm run format:check
  ```
- [ ] Run all quality checks
  ```bash
  npm run quality
  ```
- [ ] Create a test build
  ```bash
  npm run build
  ```

## IDE Setup (VS Code Recommended)

### Essential Extensions

- [ ] **TypeScript and JavaScript Language Features** (built-in)
- [ ] **ESLint** (`ms-vscode.vscode-eslint`)
- [ ] **Prettier** (`esbenp.prettier-vscode`)
- [ ] **Auto Rename Tag** (`formulahendry.auto-rename-tag`)

### VS Code Settings

Add these to your VS Code settings (`.vscode/settings.json`):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

### File Associations

- [ ] Verify `.ts` and `.tsx` files open with TypeScript syntax highlighting
- [ ] Verify `.css.ts` files (Vanilla-Extract) have TypeScript support

## Codebase Familiarization

### 1. Project Structure Review

- [ ] Read the main **README.md** for project overview
- [ ] Review **Project Structure** section in README.md
- [ ] Examine `src/` directory organization

### 2. Key Files to Understand

- [ ] **`src/app/layout.tsx`** - Root layout and navigation
- [ ] **`src/app/page.tsx`** - Home page implementation
- [ ] **`src/components/Header.tsx`** - Navigation component
- [ ] **`src/styles/theme.css.ts`** - Design system and theme
- [ ] **`package.json`** - Scripts and dependencies

### 3. Styling System

- [ ] Read **`src/styles/README.md`** - Comprehensive theme documentation
- [ ] Understand Vanilla-Extract usage patterns
- [ ] Review existing component styles (`.css.ts` files)

### 4. Development Guidelines

- [ ] Read **DEVELOPMENT_LEARNINGS.md** for technical insights
- [ ] Understand the 5-step quality gate process
- [ ] Review conventional commit format requirements

## Development Workflow

### Daily Development

- [ ] Understand the development workflow:
  1. Pull latest changes: `git pull`
  2. Create feature branch: `git checkout -b feature/your-feature`
  3. Make changes and test with `npm run dev`
  4. Run quality checks: `npm run quality`
  5. Commit with conventional format
  6. Push and create pull request

### Quality Gates

Before any commit, ensure:

- [ ] **Build**: `npm run build` succeeds
- [ ] **Lint**: `npm run lint` passes
- [ ] **Type Check**: `npm run type-check` passes
- [ ] **Format**: `npm run format:check` passes
- [ ] **Dev Server**: `npm run dev` starts without errors

### Git Workflow

- [ ] Understand conventional commit format:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation
  - `style:` for formatting changes
  - `refactor:` for code restructuring
- [ ] Pre-commit hooks are configured (Husky)
- [ ] All commits must pass quality checks

## Testing and Validation

### Manual Testing Checklist

- [ ] Navigate between all pages (Home, Books, Streaming)
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Verify dark mode compatibility (theme system ready)
- [ ] Check browser console for errors
- [ ] Test hot reloading during development

### Code Quality

- [ ] All TypeScript types are properly defined
- [ ] ESLint rules are followed
- [ ] Code is properly formatted with Prettier
- [ ] Conventional commits are used

## Troubleshooting Common Issues

### Development Server Issues

- [ ] **Port 3000 in use**: Use `PORT=3001 npm run dev`
- [ ] **Build fails**: Run `npm run type-check` for specific errors
- [ ] **Hot reload not working**: Restart dev server

### Dependencies Issues

- [ ] **Installation errors**: Clear cache with `npm cache clean --force`
- [ ] **Version conflicts**: Delete `node_modules` and `package-lock.json`, then `npm install`

### Git Issues

- [ ] **Pre-commit hooks failing**: Run `npm run quality:fix`
- [ ] **Commit message rejected**: Use conventional commit format

## Getting Help

### Documentation Resources

- [ ] **README.md** - Project setup and overview
- [ ] **DEVELOPMENT_LEARNINGS.md** - Technical insights and solutions
- [ ] **src/styles/README.md** - Theme system documentation
- [ ] **ONBOARDING.md** (this file) - Developer setup guide

### Ask for Help

- [ ] Check existing documentation first
- [ ] Review recent commits for similar implementations
- [ ] Ask questions about project architecture and decisions
- [ ] Request code review for learning opportunities

## Onboarding Complete!

Once you've completed this checklist:

- [ ] You can start the development server successfully
- [ ] All quality checks pass
- [ ] You understand the project structure and workflow
- [ ] You've read the key documentation files
- [ ] You're ready to contribute to the Family App

**Welcome to the team! 🎉**

---

_If you encounter any issues not covered in this guide, please update this documentation to help future developers._
