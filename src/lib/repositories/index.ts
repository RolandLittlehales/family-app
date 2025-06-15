import { prisma } from '../database';
import { UserRepository } from './user.repository';
import { FamilyRepository } from './family.repository';
import { BookRepository } from './book.repository';
import { StreamingRepository } from './streaming.repository';

export class RepositoryFactory {
  private static instance: RepositoryFactory;
  
  public readonly user: UserRepository;
  public readonly family: FamilyRepository;
  public readonly book: BookRepository;
  public readonly streaming: StreamingRepository;

  private constructor() {
    this.user = new UserRepository(prisma);
    this.family = new FamilyRepository(prisma);
    this.book = new BookRepository(prisma);
    this.streaming = new StreamingRepository(prisma);
  }

  public static getInstance(): RepositoryFactory {
    if (!RepositoryFactory.instance) {
      RepositoryFactory.instance = new RepositoryFactory();
    }
    return RepositoryFactory.instance;
  }
}

export const repositories = RepositoryFactory.getInstance();

export * from './base.repository';
export * from './user.repository';
export * from './family.repository';
export * from './book.repository';
export * from './streaming.repository';