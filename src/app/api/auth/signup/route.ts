import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { UserRepository } from '@/lib/repositories/user.repository';
import { EmailSchema, PasswordSchema, UsernameSchema } from '@/lib/validation/schemas';
import { AuthHelpers } from '@/lib/auth-helpers';

const userRepository = new UserRepository(prisma);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validate input
    const nameValidation = UsernameSchema.safeParse(name);
    if (!nameValidation.success) {
      return NextResponse.json(
        { message: 'Name must be at least 2 characters long', field: 'name' },
        { status: 400 }
      );
    }

    const emailValidation = EmailSchema.safeParse(email);
    if (!emailValidation.success) {
      return NextResponse.json(
        { message: 'Please enter a valid email address', field: 'email' },
        { status: 400 }
      );
    }

    const passwordValidation = PasswordSchema.safeParse(password);
    if (!passwordValidation.success) {
      const strengthCheck = AuthHelpers.validatePasswordStrength(password);
      return NextResponse.json(
        { message: strengthCheck.errors[0] || 'Password is invalid', field: 'password' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { message: 'A user with this email already exists', field: 'email' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await AuthHelpers.hashPassword(password);

    // Create user
    const user = await userRepository.create({
      name,
      email,
      passwordHash,
      role: 'PARENT', // Default role for new users
    });

    // Return user info (without sensitive data)
    const safeUser = AuthHelpers.sanitizeUserForClient(user);

    return NextResponse.json(
      {
        message: 'Account created successfully',
        user: safeUser,
      },
      { status: 201 }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}