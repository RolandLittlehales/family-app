import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';

export class AuthHelpers {
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static generateSecureToken(): string {
    return randomBytes(32).toString('hex');
  }

  static generateInviteCode(): string {
    return randomBytes(6).toString('hex').toUpperCase();
  }

  static generateJWT(payload: object, expiresIn = '1h'): string {
    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret) {
      throw new Error('JWT secret not configured');
    }
    return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
  }

  static verifyJWT<T = Record<string, unknown>>(token: string): T {
    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret) {
      throw new Error('JWT secret not configured');
    }
    return jwt.verify(token, secret) as T;
  }

  static isTokenExpired(timestamp: Date | null): boolean {
    if (!timestamp) return true;
    return new Date() > timestamp;
  }

  static generatePasswordResetToken(): {
    token: string;
    expires: Date;
  } {
    return {
      token: this.generateSecureToken(),
      expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    };
  }

  static generateEmailVerificationToken(): {
    token: string;
    expires: Date;
  } {
    return {
      token: this.generateSecureToken(),
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    };
  }

  static validatePasswordStrength(password: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static sanitizeUserForClient(user: Record<string, unknown>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, emailVerificationToken, passwordResetToken, ...safeUser } = user;
    return safeUser;
  }
}