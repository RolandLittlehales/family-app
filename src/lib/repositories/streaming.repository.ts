import { StreamingContent, UserStreamingItem, StreamingStatus, ContentType, Episode, Prisma } from '../../generated/prisma';
import { BaseRepository, PaginationOptions, PaginatedResult, PaginationHelper } from './base.repository';

export interface CreateStreamingContentData {
  title: string;
  type: ContentType;
  description?: string;
  releaseDate?: Date;
  runtime?: number;
  genre?: string;
  director?: string;
  cast?: string;
  posterImage?: string;
  backdropImage?: string;
  tmdbId?: string;
  imdbId?: string;
  totalSeasons?: number;
  totalEpisodes?: number;
  familyId: string;
}

export interface UpdateStreamingContentData {
  title?: string;
  type?: ContentType;
  description?: string;
  releaseDate?: Date;
  runtime?: number;
  genre?: string;
  director?: string;
  cast?: string;
  posterImage?: string;
  backdropImage?: string;
  tmdbId?: string;
  imdbId?: string;
  totalSeasons?: number;
  totalEpisodes?: number;
}

export interface StreamingContentFilters {
  familyId?: string;
  type?: ContentType;
  genre?: string;
  search?: string;
}

export interface CreateUserStreamingItemData {
  userId: string;
  streamingContentId: string;
  status?: StreamingStatus;
  rating?: number;
  progress?: number;
  currentSeason?: number;
  currentEpisode?: number;
  startDate?: Date;
  endDate?: Date;
  notes?: string;
  isFavorite?: boolean;
}

export interface UpdateUserStreamingItemData {
  status?: StreamingStatus;
  rating?: number;
  progress?: number;
  currentSeason?: number;
  currentEpisode?: number;
  startDate?: Date;
  endDate?: Date;
  notes?: string;
  isFavorite?: boolean;
}

export interface CreateEpisodeData {
  streamingContentId: string;
  seasonNumber: number;
  episodeNumber: number;
  title: string;
  description?: string;
  airDate?: Date;
  runtime?: number;
  stillImage?: string;
}

export class StreamingRepository extends BaseRepository {
  async create(data: CreateStreamingContentData): Promise<StreamingContent> {
    return this.prisma.streamingContent.create({
      data,
    });
  }

  async findById(id: string): Promise<StreamingContent | null> {
    return this.prisma.streamingContent.findUnique({
      where: { id },
      include: {
        family: {
          select: {
            id: true,
            name: true,
          },
        },
        userItems: {
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
        },
        reviews: {
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
            createdAt: 'desc',
          },
        },
        episodes: {
          orderBy: [
            { seasonNumber: 'asc' },
            { episodeNumber: 'asc' },
          ],
        },
        _count: {
          select: {
            userItems: true,
            reviews: true,
            episodes: true,
          },
        },
      },
    });
  }

  async findMany(
    filters: StreamingContentFilters = {},
    pagination: PaginationOptions = {}
  ): Promise<PaginatedResult<StreamingContent>> {
    const { page, limit, skip, take } = PaginationHelper.getPaginationParams(pagination);
    
    const where: Prisma.StreamingContentWhereInput = {};
    
    if (filters.familyId) {
      where.familyId = filters.familyId;
    }
    
    if (filters.type) {
      where.type = filters.type;
    }
    
    if (filters.genre) {
      where.genre = { contains: filters.genre };
    }
    
    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search } },
        { description: { contains: filters.search } },
        { genre: { contains: filters.search } },
        { director: { contains: filters.search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.streamingContent.findMany({
        where,
        skip,
        take,
        include: {
          _count: {
            select: {
              userItems: true,
              reviews: true,
              episodes: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.streamingContent.count({ where }),
    ]);

    return {
      data,
      pagination: PaginationHelper.calculatePagination(page, limit, total),
    };
  }

  async update(id: string, data: UpdateStreamingContentData): Promise<StreamingContent> {
    return this.prisma.streamingContent.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<StreamingContent> {
    return this.prisma.streamingContent.delete({
      where: { id },
    });
  }

  async addUserStreamingItem(data: CreateUserStreamingItemData): Promise<UserStreamingItem> {
    return this.prisma.userStreamingItem.create({
      data: {
        userId: data.userId,
        streamingContentId: data.streamingContentId,
        status: data.status || StreamingStatus.WATCHLIST,
        rating: data.rating,
        progress: data.progress || 0,
        currentSeason: data.currentSeason,
        currentEpisode: data.currentEpisode,
        startDate: data.startDate,
        endDate: data.endDate,
        notes: data.notes,
        isFavorite: data.isFavorite || false,
      },
      include: {
        streamingContent: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
          },
        },
      },
    });
  }

  async updateUserStreamingItem(
    userId: string,
    streamingContentId: string,
    data: UpdateUserStreamingItemData
  ): Promise<UserStreamingItem> {
    return this.prisma.userStreamingItem.update({
      where: {
        userId_streamingContentId: {
          userId,
          streamingContentId,
        },
      },
      data,
      include: {
        streamingContent: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
          },
        },
      },
    });
  }

  async removeUserStreamingItem(userId: string, streamingContentId: string): Promise<UserStreamingItem> {
    return this.prisma.userStreamingItem.delete({
      where: {
        userId_streamingContentId: {
          userId,
          streamingContentId,
        },
      },
    });
  }

  async findUserStreamingItem(userId: string, streamingContentId: string): Promise<UserStreamingItem | null> {
    return this.prisma.userStreamingItem.findUnique({
      where: {
        userId_streamingContentId: {
          userId,
          streamingContentId,
        },
      },
      include: {
        streamingContent: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
          },
        },
      },
    });
  }

  async getUserStreamingItems(
    userId: string,
    status?: StreamingStatus,
    pagination: PaginationOptions = {}
  ): Promise<PaginatedResult<UserStreamingItem>> {
    const { page, limit, skip, take } = PaginationHelper.getPaginationParams(pagination);
    
    const where: Prisma.UserStreamingItemWhereInput = {
      userId,
    };
    
    if (status) {
      where.status = status;
    }

    const [data, total] = await Promise.all([
      this.prisma.userStreamingItem.findMany({
        where,
        skip,
        take,
        include: {
          streamingContent: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      }),
      this.prisma.userStreamingItem.count({ where }),
    ]);

    return {
      data,
      pagination: PaginationHelper.calculatePagination(page, limit, total),
    };
  }

  async getFamilyStreamingContent(
    familyId: string,
    pagination: PaginationOptions = {}
  ): Promise<PaginatedResult<StreamingContent>> {
    return this.findMany({ familyId }, pagination);
  }

  async getPopularStreamingContent(familyId: string, limit: number = 10): Promise<StreamingContent[]> {
    return this.prisma.streamingContent.findMany({
      where: {
        familyId,
      },
      include: {
        _count: {
          select: {
            userItems: true,
          },
        },
      },
      orderBy: {
        userItems: {
          _count: 'desc',
        },
      },
      take: limit,
    });
  }

  async getRecentStreamingContent(familyId: string, limit: number = 10): Promise<StreamingContent[]> {
    return this.prisma.streamingContent.findMany({
      where: {
        familyId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
  }

  async getUserStreamingStats(userId: string) {
    const stats = await this.prisma.userStreamingItem.groupBy({
      by: ['status'],
      where: { userId },
      _count: { status: true }
    });
    
    const result = {
      watchlist: 0,
      watching: 0,
      completed: 0,
      paused: 0,
      dropped: 0,
      total: 0
    };
    
    stats.forEach(stat => {
      const status = stat.status.toLowerCase() as keyof typeof result;
      if (status !== 'total' && status in result) {
        result[status] = stat._count.status;
        result.total += stat._count.status;
      }
    });
    
    return result;
  }

  async createEpisode(data: CreateEpisodeData): Promise<Episode> {
    return this.prisma.episode.create({
      data,
    });
  }

  async createEpisodes(episodes: CreateEpisodeData[]): Promise<void> {
    await this.prisma.episode.createMany({
      data: episodes,
    });
  }

  async getEpisodes(streamingContentId: string): Promise<Episode[]> {
    return this.prisma.episode.findMany({
      where: {
        streamingContentId,
      },
      orderBy: [
        { seasonNumber: 'asc' },
        { episodeNumber: 'asc' },
      ],
    });
  }

  async getEpisodesBySeason(streamingContentId: string, seasonNumber: number): Promise<Episode[]> {
    return this.prisma.episode.findMany({
      where: {
        streamingContentId,
        seasonNumber,
      },
      orderBy: {
        episodeNumber: 'asc',
      },
    });
  }

  async searchStreamingContent(query: string, familyId?: string, limit: number = 20): Promise<StreamingContent[]> {
    const where: Prisma.StreamingContentWhereInput = {
      OR: [
        { title: { contains: query } },
        { description: { contains: query } },
        { genre: { contains: query } },
        { director: { contains: query } },
      ],
    };

    if (familyId) {
      where.familyId = familyId;
    }

    return this.prisma.streamingContent.findMany({
      where,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}