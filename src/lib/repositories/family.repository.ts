import { Family, Prisma } from "../../generated/prisma";
import {
  BaseRepository,
  PaginationOptions,
  PaginatedResult,
  PaginationHelper,
} from "./base.repository";

export interface CreateFamilyData {
  name: string;
  description?: string;
  inviteCode: string;
  isPrivate?: boolean;
  maxMembers?: number;
}

export interface UpdateFamilyData {
  name?: string;
  description?: string;
  inviteCode?: string;
  isPrivate?: boolean;
  maxMembers?: number;
}

export interface FamilyFilters {
  isPrivate?: boolean;
  search?: string;
}

export class FamilyRepository extends BaseRepository {
  async create(data: CreateFamilyData): Promise<Family> {
    return this.prisma.family.create({
      data: {
        name: data.name,
        description: data.description,
        inviteCode: data.inviteCode,
        isPrivate: data.isPrivate || false,
        maxMembers: data.maxMembers || 10,
      },
    });
  }

  async findById(id: string): Promise<Family | null> {
    return this.prisma.family.findUnique({
      where: { id },
      include: {
        members: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            role: true,
            profilePicture: true,
            isActive: true,
            createdAt: true,
          },
          orderBy: [{ role: "asc" }, { firstName: "asc" }],
        },
        _count: {
          select: {
            members: true,
            books: true,
            streamingContent: true,
          },
        },
      },
    });
  }

  async findByInviteCode(inviteCode: string): Promise<Family | null> {
    return this.prisma.family.findUnique({
      where: { inviteCode },
      include: {
        members: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            role: true,
            isActive: true,
          },
        },
        _count: {
          select: {
            members: true,
          },
        },
      },
    });
  }

  async findMany(
    filters: FamilyFilters = {},
    pagination: PaginationOptions = {}
  ): Promise<PaginatedResult<Family>> {
    const { page, limit, skip, take } =
      PaginationHelper.getPaginationParams(pagination);

    const where: Prisma.FamilyWhereInput = {};

    if (filters.isPrivate !== undefined) {
      where.isPrivate = filters.isPrivate;
    }

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search } },
        { description: { contains: filters.search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.family.findMany({
        where,
        skip,
        take,
        include: {
          _count: {
            select: {
              members: true,
              books: true,
              streamingContent: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      this.prisma.family.count({ where }),
    ]);

    return {
      data,
      pagination: PaginationHelper.calculatePagination(page, limit, total),
    };
  }

  async update(id: string, data: UpdateFamilyData): Promise<Family> {
    return this.prisma.family.update({
      where: { id },
      data,
      include: {
        members: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            role: true,
            profilePicture: true,
            isActive: true,
          },
        },
        _count: {
          select: {
            members: true,
            books: true,
            streamingContent: true,
          },
        },
      },
    });
  }

  async delete(id: string): Promise<Family> {
    return this.prisma.family.delete({
      where: { id },
    });
  }

  async getMemberCount(id: string): Promise<number> {
    return this.prisma.user.count({
      where: {
        familyId: id,
        isActive: true,
      },
    });
  }

  async canAddMember(id: string): Promise<boolean> {
    const family = await this.prisma.family.findUnique({
      where: { id },
      select: {
        maxMembers: true,
        _count: {
          select: {
            members: {
              where: {
                isActive: true,
              },
            },
          },
        },
      },
    });

    if (!family) return false;

    return family._count.members < family.maxMembers;
  }

  async generateUniqueInviteCode(): Promise<string> {
    let inviteCode: string;
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 10;

    do {
      if (attempts >= maxAttempts) {
        throw new Error(
          "Unable to generate unique invite code after maximum attempts"
        );
      }
      inviteCode = this.generateInviteCode();
      const existing = await this.prisma.family.findUnique({
        where: { inviteCode },
      });
      isUnique = !existing;
      attempts++;
    } while (!isUnique);

    return inviteCode;
  }

  private generateInviteCode(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async getFamilyStats(id: string) {
    const [membersCount, booksCount, streamingCount, activitiesCount] =
      await Promise.all([
        this.prisma.user.count({
          where: {
            familyId: id,
            isActive: true,
          },
        }),
        this.prisma.book.count({
          where: { familyId: id },
        }),
        this.prisma.streamingContent.count({
          where: { familyId: id },
        }),
        this.prisma.activity.count({
          where: { familyId: id },
        }),
      ]);

    return {
      totalMembers: membersCount,
      totalBooks: booksCount,
      totalStreamingContent: streamingCount,
      totalActivities: activitiesCount,
    };
  }

  async getRecentActivity(id: string, limit: number = 10) {
    return this.prisma.activity.findMany({
      where: {
        familyId: id,
        isPublic: true,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            profilePicture: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
  }
}
