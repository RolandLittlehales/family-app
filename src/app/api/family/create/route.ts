import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/database';
import { FamilyRepository } from '@/lib/repositories/family.repository';
import { UserRepository } from '@/lib/repositories/user.repository';
import { AuthHelpers } from '@/lib/auth-helpers';
import { authOptions } from '@/lib/auth';

const familyRepository = new FamilyRepository(prisma);
const userRepository = new UserRepository(prisma);

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { familyName } = body;

    if (!familyName?.trim()) {
      return NextResponse.json(
        { message: 'Family name is required' },
        { status: 400 }
      );
    }

    if (familyName.length < 2) {
      return NextResponse.json(
        { message: 'Family name must be at least 2 characters' },
        { status: 400 }
      );
    }

    // Check if user is already in a family
    const user = await userRepository.findById(session.user.id);
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    if (user.familyId) {
      return NextResponse.json(
        { message: 'You are already part of a family' },
        { status: 400 }
      );
    }

    // Generate invite code
    const inviteCode = AuthHelpers.generateInviteCode();

    // Create family
    const family = await familyRepository.create({
      name: familyName.trim(),
      inviteCode,
    });

    // Update user to be part of the family
    await userRepository.updateFamily(session.user.id, family.id);

    return NextResponse.json(
      {
        message: 'Family created successfully',
        family: {
          id: family.id,
          name: family.name,
          inviteCode: family.inviteCode,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Create family error:', error);
    return NextResponse.json(
      { message: 'An error occurred while creating the family' },
      { status: 500 }
    );
  }
}