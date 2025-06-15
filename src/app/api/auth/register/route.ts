import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/database'
import { EmailSchema, PasswordSchema, UsernameSchema } from '@/lib/validation/schemas'

export async function POST(request: NextRequest) {
  try {
    const { email, password, username, firstName, lastName } = await request.json()

    // Validate input
    const emailValidation = EmailSchema.safeParse(email)
    const passwordValidation = PasswordSchema.safeParse(password)
    const usernameValidation = UsernameSchema.safeParse(username)

    if (!emailValidation.success) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    if (!passwordValidation.success) {
      return NextResponse.json({ 
        error: passwordValidation.error.errors[0]?.message || 'Password requirements not met'
      }, { status: 400 })
    }

    if (!usernameValidation.success) {
      return NextResponse.json({ 
        error: 'Username must be 2-50 characters, alphanumeric only' 
      }, { status: 400 })
    }

    if (!firstName || firstName.trim().length === 0) {
      return NextResponse.json({ error: 'First name is required' }, { status: 400 })
    }

    if (!lastName || lastName.trim().length === 0) {
      return NextResponse.json({ error: 'Last name is required' }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { username: username }
        ]
      }
    })

    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
      } else {
        return NextResponse.json({ error: 'Username already taken' }, { status: 400 })
      }
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        name: `${firstName.trim()} ${lastName.trim()}`, // NextAuth standard field
        passwordHash,
        role: 'PARENT', // Default role for new registrations
        emailVerified: null, // User must verify email
        isActive: true
      }
    })

    return NextResponse.json({
      message: 'User created successfully. Please check your email to verify your account.',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name
      }
    })

  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}