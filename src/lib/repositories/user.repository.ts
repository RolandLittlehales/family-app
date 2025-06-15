import { User, UserRole, Prisma } from '../../generated/prisma';
import { BaseRepository, PaginationOptions, PaginatedResult, PaginationHelper } from './base.repository';

export interface CreateUserData {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  role?: UserRole;
  dateOfBirth?: Date;
  profilePicture?: string;
  bio?: string;
  familyId?: string;
}

export interface UpdateUserData {
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  profilePicture?: string;
  bio?: string;
  role?: UserRole;
  isActive?: boolean;
  emailVerified?: boolean;
  familyId?: string;
}

export interface UserFilters {
  familyId?: string;
  role?: UserRole;
  isActive?: boolean;
  emailVerified?: boolean;
  search?: string;
}

export class UserRepository extends BaseRepository {
  async create(data: CreateUserData): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        passwordHash: data.passwordHash,
        role: data.role || UserRole.CHILD,
        dateOfBirth: data.dateOfBirth,
        profilePicture: data.profilePicture,
        bio: data.bio,
        familyId: data.familyId,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        family: true,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        family: true,
      },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { username },
      include: {
        family: true,
      },
    });
  }

  async findMany(
    filters: UserFilters = {},
    pagination: PaginationOptions = {}
  ): Promise<PaginatedResult<User>> {
    const { page, limit, skip, take } = PaginationHelper.getPaginationParams(pagination);
    
    const where: Prisma.UserWhereInput = {};
    
    if (filters.familyId) {
      where.familyId = filters.familyId;
    }
    
    if (filters.role) {
      where.role = filters.role;
    }
    
    if (filters.isActive !== undefined) {
      where.isActive = filters.isActive;
    }
    
    if (filters.emailVerified !== undefined) {
      where.emailVerified = filters.emailVerified;
    }
    
    if (filters.search) {
      where.OR = [
        { firstName: { contains: filters.search } },
        { lastName: { contains: filters.search } },
        { username: { contains: filters.search } },
        { email: { contains: filters.search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take,
        include: {
          family: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data,
      pagination: PaginationHelper.calculatePagination(page, limit, total),
    };
  }

  async update(id: string, data: UpdateUserData): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
      include: {
        family: true,
      },
    });
  }

  async delete(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async updateLastLogin(id: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        lastLoginAt: new Date(),
      },
    });
  }

  async updatePassword(id: string, passwordHash: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        passwordHash,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });
  }

  async setPasswordResetToken(id: string, token: string, expiresAt: Date): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        passwordResetToken: token,
        passwordResetExpires: expiresAt,
      },
    });
  }

  async setEmailVerificationToken(id: string, token: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        emailVerificationToken: token,
      },
    });
  }

  async verifyEmail(id: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        emailVerified: true,
        emailVerificationToken: null,
      },
    });
  }

  async findByPasswordResetToken(token: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpires: {
          gt: new Date(),
        },
      },
    });
  }

  async findByEmailVerificationToken(token: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
      },
    });
  }

  async getFamilyMembers(familyId: string): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        familyId,
        isActive: true,
      },
      orderBy: [
        { role: 'asc' },
        { firstName: 'asc' },
      ],
    });
  }

  async getUserStats(userId: string) {
    const [booksCount, streamingCount, activitiesCount] = await Promise.all([
      this.prisma.userBook.count({
        where: { userId },
      }),
      this.prisma.userStreamingItem.count({
        where: { userId },
      }),
      this.prisma.activity.count({
        where: { userId },
      }),
    ]);

    return {
      totalBooks: booksCount,
      totalStreaming: streamingCount,
      totalActivities: activitiesCount,
    };
  }
}