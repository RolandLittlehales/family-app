import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/database';
import { FamilyRepository } from '@/lib/repositories/family.repository';
import { UserRepository } from '@/lib/repositories/user.repository';
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
    const { inviteCode } = body;

    if (!inviteCode?.trim()) {
      return NextResponse.json(
        { message: 'Invite code is required' },
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

    // Find family by invite code
    const family = await familyRepository.findByInviteCode(inviteCode.trim().toUpperCase());
    if (!family) {
      return NextResponse.json(
        { message: 'Invalid invite code' },
        { status: 400 }
      );
    }

    // Update user to be part of the family
    await userRepository.updateFamily(session.user.id, family.id);

    return NextResponse.json(
      {
        message: 'Successfully joined family',
        family: {
          id: family.id,
          name: family.name,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Join family error:', error);
    return NextResponse.json(
      { message: 'An error occurred while joining the family' },
      { status: 500 }
    );
  }
}