import { PrismaClient, UserRole } from '../../../src/generated/prisma';
import { UserRepository } from '../../../src/lib/repositories/user.repository';
import bcrypt from 'bcryptjs';

describe('UserRepository', () => {
  let prisma: PrismaClient;
  let userRepository: UserRepository;

  beforeAll(async () => {
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: 'file:./test.db',
        },
      },
    });
    
    userRepository = new UserRepository(prisma);
    
    // Reset database
    await prisma.$executeRawUnsafe('DELETE FROM users');
    await prisma.$executeRawUnsafe('DELETE FROM families');
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    // Clean up between tests
    await prisma.user.deleteMany();
    await prisma.family.deleteMany();
  });

  describe('create', () => {
    it('should create a new user with default role', async () => {
      const userData = {
        email: 'test@example.com',
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        passwordHash: await bcrypt.hash('password123', 10),
      };

      const user = await userRepository.create(userData);

      expect(user).toBeDefined();
      expect(user.email).toBe(userData.email);
      expect(user.username).toBe(userData.username);
      expect(user.firstName).toBe(userData.firstName);
      expect(user.lastName).toBe(userData.lastName);
      expect(user.role).toBe(UserRole.CHILD);
      expect(user.isActive).toBe(true);
      expect(user.emailVerified).toBe(false);
    });

    it('should create a user with specified role', async () => {
      const userData = {
        email: 'parent@example.com',
        username: 'parentuser',
        firstName: 'Parent',
        lastName: 'User',
        passwordHash: await bcrypt.hash('password123', 10),
        role: UserRole.PARENT,
      };

      const user = await userRepository.create(userData);

      expect(user.role).toBe(UserRole.PARENT);
    });

    it('should throw error for duplicate email', async () => {
      const userData = {
        email: 'duplicate@example.com',
        username: 'user1',
        firstName: 'First',
        lastName: 'User',
        passwordHash: await bcrypt.hash('password123', 10),
      };

      await userRepository.create(userData);

      const duplicateUserData = {
        ...userData,
        username: 'user2',
      };

      await expect(userRepository.create(duplicateUserData)).rejects.toThrow();
    });

    it('should throw error for duplicate username', async () => {
      const userData = {
        email: 'user1@example.com',
        username: 'duplicate',
        firstName: 'First',
        lastName: 'User',
        passwordHash: await bcrypt.hash('password123', 10),
      };

      await userRepository.create(userData);

      const duplicateUserData = {
        ...userData,
        email: 'user2@example.com',
      };

      await expect(userRepository.create(duplicateUserData)).rejects.toThrow();
    });
  });

  describe('findById', () => {
    it('should find user by id', async () => {
      const userData = {
        email: 'findbyid@example.com',
        username: 'finduserid',
        firstName: 'Find',
        lastName: 'User',
        passwordHash: await bcrypt.hash('password123', 10),
      };

      const createdUser = await userRepository.create(userData);
      const foundUser = await userRepository.findById(createdUser.id);

      expect(foundUser).toBeDefined();
      expect(foundUser!.id).toBe(createdUser.id);
      expect(foundUser!.email).toBe(userData.email);
    });

    it('should return null for non-existent id', async () => {
      const foundUser = await userRepository.findById('non-existent-id');
      expect(foundUser).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should find user by email', async () => {
      const userData = {
        email: 'findbyemail@example.com',
        username: 'finduseremail',
        firstName: 'Find',
        lastName: 'User',
        passwordHash: await bcrypt.hash('password123', 10),
      };

      await userRepository.create(userData);
      const foundUser = await userRepository.findByEmail(userData.email);

      expect(foundUser).toBeDefined();
      expect(foundUser!.email).toBe(userData.email);
    });

    it('should return null for non-existent email', async () => {
      const foundUser = await userRepository.findByEmail('nonexistent@example.com');
      expect(foundUser).toBeNull();
    });
  });

  describe('findByUsername', () => {
    it('should find user by username', async () => {
      const userData = {
        email: 'findbyusername@example.com',
        username: 'finduserusername',
        firstName: 'Find',
        lastName: 'User',
        passwordHash: await bcrypt.hash('password123', 10),
      };

      await userRepository.create(userData);
      const foundUser = await userRepository.findByUsername(userData.username);

      expect(foundUser).toBeDefined();
      expect(foundUser!.username).toBe(userData.username);
    });

    it('should return null for non-existent username', async () => {
      const foundUser = await userRepository.findByUsername('nonexistentuser');
      expect(foundUser).toBeNull();
    });
  });

  describe('findMany', () => {
    beforeEach(async () => {
      // Create test users
      const users = [
        {
          email: 'user1@example.com',
          username: 'user1',
          firstName: 'John',
          lastName: 'Doe',
          passwordHash: await bcrypt.hash('password123', 10),
          role: UserRole.PARENT,
        },
        {
          email: 'user2@example.com',
          username: 'user2',
          firstName: 'Jane',
          lastName: 'Smith',
          passwordHash: await bcrypt.hash('password123', 10),
          role: UserRole.CHILD,
        },
        {
          email: 'user3@example.com',
          username: 'user3',
          firstName: 'Bob',
          lastName: 'Johnson',
          passwordHash: await bcrypt.hash('password123', 10),
          role: UserRole.CHILD,
          isActive: false,
        },
      ];

      for (const userData of users) {
        await userRepository.create(userData);
      }
    });

    it('should return all users with pagination', async () => {
      const result = await userRepository.findMany({}, { page: 1, limit: 10 });

      expect(result.data).toHaveLength(3);
      expect(result.pagination.total).toBe(3);
      expect(result.pagination.page).toBe(1);
      expect(result.pagination.limit).toBe(10);
    });

    it('should filter by role', async () => {
      const result = await userRepository.findMany({ role: UserRole.CHILD });

      expect(result.data).toHaveLength(2);
      expect(result.data.every(user => user.role === UserRole.CHILD)).toBe(true);
    });

    it('should filter by isActive', async () => {
      const result = await userRepository.findMany({ isActive: true });

      expect(result.data).toHaveLength(2);
      expect(result.data.every(user => user.isActive === true)).toBe(true);
    });

    it('should search by name', async () => {
      const result = await userRepository.findMany({ search: 'John' });

      expect(result.data).toHaveLength(2); // John Doe and Bob Johnson
    });

    it('should handle pagination correctly', async () => {
      const page1 = await userRepository.findMany({}, { page: 1, limit: 2 });
      const page2 = await userRepository.findMany({}, { page: 2, limit: 2 });

      expect(page1.data).toHaveLength(2);
      expect(page2.data).toHaveLength(1);
      expect(page1.pagination.hasNext).toBe(true);
      expect(page2.pagination.hasNext).toBe(false);
    });
  });

  describe('update', () => {
    it('should update user data', async () => {
      const userData = {
        email: 'update@example.com',
        username: 'updateuser',
        firstName: 'Update',
        lastName: 'User',
        passwordHash: await bcrypt.hash('password123', 10),
      };

      const createdUser = await userRepository.create(userData);
      const updatedUser = await userRepository.update(createdUser.id, {
        firstName: 'Updated',
        bio: 'Updated bio',
      });

      expect(updatedUser.firstName).toBe('Updated');
      expect(updatedUser.bio).toBe('Updated bio');
      expect(updatedUser.lastName).toBe('User'); // Should remain unchanged
    });
  });

  describe('delete', () => {
    it('should delete user', async () => {
      const userData = {
        email: 'delete@example.com',
        username: 'deleteuser',
        firstName: 'Delete',
        lastName: 'User',
        passwordHash: await bcrypt.hash('password123', 10),
      };

      const createdUser = await userRepository.create(userData);
      await userRepository.delete(createdUser.id);

      const deletedUser = await userRepository.findById(createdUser.id);
      expect(deletedUser).toBeNull();
    });
  });

  describe('password and authentication methods', () => {
    it('should update password and clear reset tokens', async () => {
      const userData = {
        email: 'password@example.com',
        username: 'passworduser',
        firstName: 'Password',
        lastName: 'User',
        passwordHash: await bcrypt.hash('oldpassword', 10),
      };

      const user = await userRepository.create(userData);
      await userRepository.setPasswordResetToken(user.id, 'reset-token', new Date(Date.now() + 3600000));

      const newPasswordHash = await bcrypt.hash('newpassword', 10);
      const updatedUser = await userRepository.updatePassword(user.id, newPasswordHash);

      expect(updatedUser.passwordHash).toBe(newPasswordHash);
      expect(updatedUser.passwordResetToken).toBeNull();
      expect(updatedUser.passwordResetExpires).toBeNull();
    });

    it('should verify email', async () => {
      const userData = {
        email: 'verify@example.com',
        username: 'verifyuser',
        firstName: 'Verify',
        lastName: 'User',
        passwordHash: await bcrypt.hash('password123', 10),
      };

      const user = await userRepository.create(userData);
      await userRepository.setEmailVerificationToken(user.id, 'verify-token');

      const verifiedUser = await userRepository.verifyEmail(user.id);

      expect(verifiedUser.emailVerified).toBe(true);
      expect(verifiedUser.emailVerificationToken).toBeNull();
    });
  });
});