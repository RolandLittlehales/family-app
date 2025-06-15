# Family App

A Next.js application for managing family books and streaming content with simplified authentication. Built with Next.js 15, TypeScript, Vanilla-Extract CSS-in-JS, and Prisma ORM.

## 🏠 About

This is a private family application that allows family members to:

- **📚 Family Reading Management** - Track books, reading progress, and build reading habits together
- **🎬 Family Streaming Management** - Organize viewing content, manage subscriptions, and coordinate watch time
- **🔐 User Authentication** - Admin approval system for family control

Currently includes comprehensive UI components with database foundation ready for full backend integration.

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** (check with `node --version`)
- **npm** (included with Node.js)
- **Database** (PostgreSQL recommended)

### Development Setup

1. **Clone and install dependencies:**

```bash
# Clone the repository
git clone <repository-url>
cd family-app

# Install dependencies
npm install
```

2. **Set up environment variables:**

```bash
cp .env.example .env.local
```

Required environment variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/family_app"

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Email (optional, for notifications)
SMTP_HOST="your-smtp-host"
SMTP_PORT="587"
SMTP_USER="your-email"
SMTP_PASSWORD="your-password"
```

3. **Set up database:**

```bash
npx prisma generate
npx prisma db push
```

4. **Validate setup:**

```bash
npm run setup:check
```

5. **Run development server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🔐 Authentication System

### Authentication Flow

This app uses a **simplified authentication system** designed for family use:

1. **Registration**: Family members register with email/name/password
2. **Admin Approval**: New accounts require admin approval before activation
3. **Login**: Approved users can login with email/password
4. **Sessions**: Secure cookie-based sessions (no JWT complexity)

### Technology Stack

- **Session Management**: Next.js built-in sessions with encrypted cookies
- **Database**: Prisma ORM with PostgreSQL
- **Password Security**: bcrypt hashing
- **No email verification**: Simplified for trusted family environment

### Admin Setup

To create the first admin user, run:

```bash
npm run create-admin
```

Or manually update a user in the database:

```sql
UPDATE users SET "isAdmin" = true WHERE email = 'your-email@example.com';
```

### Protected Routes

- `/admin/*` - Admin only (user management)
- `/books/*` - Authenticated users only
- `/streaming/*` - Authenticated users only

## 🛠️ Development

### Development Scripts

#### Core Commands

```bash
npm run dev          # Start development server
npm run build        # Create production build
npm run start        # Start production server
npm run setup:check  # Validate development environment
```

#### Database Commands

```bash
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with test data
npm run db:studio    # Open Prisma Studio
```

#### Quality Assurance

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

#### Testing

```bash
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Development Workflow

#### Quality Gates

All changes must pass these checks before commit:

1. **Build**: `npm run build` succeeds
2. **Lint**: `npm run lint` passes
3. **Type Check**: `npm run type-check` passes
4. **Format**: `npm run format:check` passes
5. **Dev Server**: `npm run dev` starts without errors

#### Commit Standards

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

## 📂 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── auth/           # Authentication pages
│   ├── admin/          # Admin interface
│   ├── books/          # Book management
│   ├── streaming/      # Streaming content
│   ├── layout.tsx      # Root layout with navigation
│   └── page.tsx        # Home page
├── components/         # Reusable UI components
│   ├── Button.css.ts   # Button component styles
│   ├── Header.tsx      # Navigation header
│   └── PageLayout.tsx  # Page layout wrapper
├── lib/               # Utility functions
└── styles/            # Theme system and global styles
    ├── theme.css.ts    # Design tokens and theme
    ├── base.css.ts     # Base styles and resets
    └── README.md       # Theme system documentation
```

## 🎨 Technology Stack

- **Framework**: Next.js 15.3.3 with App Router
- **Language**: TypeScript 5+ with strict mode
- **Database**: Prisma ORM with PostgreSQL
- **Styling**: Vanilla-Extract CSS-in-JS with component recipes
- **Authentication**: Next.js sessions with bcrypt password hashing
- **Code Quality**: ESLint, Prettier, Commitlint, Husky pre-commit hooks
- **Testing**: Jest with React Testing Library
- **Development**: Hot reloading, TypeScript path aliases (`@/*`)

## 🔒 Security Considerations

This family app prioritizes simplicity while maintaining essential security:

- ✅ Password hashing with bcrypt
- ✅ Secure session cookies
- ✅ Admin approval for new users
- ✅ Input validation and sanitization
- ❌ No email verification (family trust model)
- ❌ No JWT complexity (cookie sessions)
- ❌ No advanced rate limiting (family use only)

## 💡 Current Features

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

## 🚨 Troubleshooting

### Common Issues

**Development server won't start:**

- Check Node.js version: `node --version` (requires 18+)
- Clear dependencies: `rm -rf node_modules package-lock.json && npm install`
- Check port availability: Default is :3000, configure with `PORT=3001 npm run dev`

**Build failures:**

- Run type check: `npm run type-check`
- Check for linting errors: `npm run lint`
- Ensure all imports use TypeScript paths (`@/` for src/)

**Database connection issues:**

- Verify DATABASE_URL in .env.local
- Check database is running: `npm run db:studio`
- Regenerate Prisma client: `npm run db:generate`

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
- **Developer Onboarding**: See [ONBOARDING.md](ONBOARDING.md)
- **Component Patterns**: Check existing components in `src/components/`

## 🤝 Contributing

1. Follow the established code patterns and file organization
2. Use the existing quality scripts before committing
3. Write descriptive commit messages using conventional format
4. Test your changes with `npm run dev` and `npm run build`
5. Update documentation when adding new features

## 🚀 Deployment

### Environment Setup

Ensure all environment variables are set in production:

- `DATABASE_URL` - Production database connection
- `NEXTAUTH_SECRET` - Secure random secret for production
- `NEXTAUTH_URL` - Production domain URL

### Database Migration

```bash
npx prisma generate
npx prisma db push  # or prisma migrate deploy for production
```

### Vercel Deployment

The easiest way to deploy is using [Vercel Platform](https://vercel.com/new):

1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically on git push

## 📝 Development Notes

- **No Google Auth**: Using email/password with Prisma for simplicity
- **Admin Approval**: All new users require admin approval
- **Family Focus**: Designed for 5-15 trusted family members
- **Privacy First**: No external auth providers, all data self-hosted

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Vanilla Extract Documentation](https://vanilla-extract.style/)
- [DEVELOPMENT_LEARNINGS.md](DEVELOPMENT_LEARNINGS.md) for detailed technical insights
