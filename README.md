# Family App

A Next.js application for managing family books and streaming content with simplified authentication.

## 🏠 About

This is a private family application that allows family members to:
- Manage shared book collections
- Track streaming content and recommendations
- User authentication with admin approval for family control

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- Database (PostgreSQL recommended)

### Development Setup

1. **Install dependencies:**
```bash
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

4. **Run development server:**
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

## 🎨 Styling

This project uses [Vanilla Extract](https://vanilla-extract.style/) for type-safe CSS-in-JS styling instead of Tailwind CSS.

## 🧪 Testing & Code Quality

Available scripts:
```bash
npm run lint          # Run ESLint
npm run lint:fix       # Fix ESLint issues
npm run type-check     # TypeScript checking
npm run format         # Format with Prettier
npm run quality        # Run all quality checks
```

## 📂 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── auth/           # Authentication pages
│   ├── admin/          # Admin interface
│   ├── books/          # Book management
│   └── streaming/      # Streaming content
├── components/         # Reusable components
├── lib/               # Utility functions
└── styles/            # Vanilla Extract styles
```

## 🔒 Security Considerations

This family app prioritizes simplicity while maintaining essential security:

- ✅ Password hashing with bcrypt
- ✅ Secure session cookies
- ✅ Admin approval for new users
- ✅ Input validation and sanitization
- ❌ No email verification (family trust model)
- ❌ No JWT complexity (cookie sessions)
- ❌ No advanced rate limiting (family use only)

## 📝 Development Notes

- **No Google Auth**: Using email/password with Prisma for simplicity
- **Admin Approval**: All new users require admin approval
- **Family Focus**: Designed for 5-15 trusted family members
- **Privacy First**: No external auth providers, all data self-hosted

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

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Vanilla Extract Documentation](https://vanilla-extract.style/)
