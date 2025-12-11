/**
 * Auth Service
 *
 * Handles authentication logic: login, registration, token management.
 * Uses Prisma for database persistence.
 */

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import {
  User,
  Role,
  TokenPair,
  JwtPayload,
  createLogger,
  generateId,
  InvalidCredentialsError,
  TokenExpiredError,
} from '@yggdrasil/shared';
import { DatabaseService } from '@yggdrasil/shared/database';

const logger = createLogger('AuthService', 'info');

@Injectable()
export class AuthService {
  private readonly bcryptRounds: number;
  private readonly jwtExpiresIn: string;
  private readonly refreshExpiresIn: string;

  constructor(
    private readonly db: DatabaseService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    this.bcryptRounds = this.configService.get<number>('BCRYPT_ROUNDS', 12);
    this.jwtExpiresIn = this.configService.get<string>('JWT_EXPIRES_IN', '15m');
    this.refreshExpiresIn = this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d');
  }

  async register(email: string, password: string): Promise<User> {
    // Check if user already exists
    const existingUser = await this.db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const passwordHash = await bcrypt.hash(password, this.bcryptRounds);

    const user = await this.db.user.create({
      data: {
        email,
        passwordHash,
        role: Role.USER,
        isActive: true,
      },
    });

    logger.info('User registered', { userId: user.id, email });

    return {
      id: user.id,
      email: user.email,
      role: user.role as Role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      isActive: user.isActive,
    };
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return null;
    }

    // Update last login
    await this.db.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    return {
      id: user.id,
      email: user.email,
      role: user.role as Role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      isActive: user.isActive,
    };
  }

  async login(email: string, password: string): Promise<{ user: User; tokens: TokenPair }> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const tokens = await this.generateTokens(user);

    logger.info('User logged in', { userId: user.id });

    return { user, tokens };
  }

  async refresh(refreshToken: string): Promise<TokenPair> {
    // Find the refresh token in database
    const tokenData = await this.db.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!tokenData) {
      throw new TokenExpiredError('refresh');
    }

    // Check if token is expired
    if (tokenData.expiresAt < new Date()) {
      // Delete expired token
      await this.db.refreshToken.delete({
        where: { id: tokenData.id },
      });
      throw new TokenExpiredError('refresh');
    }

    // Check if token was revoked
    if (tokenData.revokedAt) {
      throw new TokenExpiredError('refresh');
    }

    // Revoke the old token (rotate tokens)
    await this.db.refreshToken.update({
      where: { id: tokenData.id },
      data: { revokedAt: new Date() },
    });

    const user: User = {
      id: tokenData.user.id,
      email: tokenData.user.email,
      role: tokenData.user.role as Role,
      createdAt: tokenData.user.createdAt,
      updatedAt: tokenData.user.updatedAt,
      isActive: tokenData.user.isActive,
    };

    return this.generateTokens(user);
  }

  async logout(refreshToken: string): Promise<void> {
    // Revoke the refresh token
    const token = await this.db.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (token) {
      await this.db.refreshToken.update({
        where: { id: token.id },
        data: { revokedAt: new Date() },
      });
    }

    logger.info('User logged out');
  }

  private async generateTokens(user: User): Promise<TokenPair> {
    const payload: Omit<JwtPayload, 'iat' | 'exp'> = {
      sub: user.id,
      email: user.email,
      role: user.role,
      jti: generateId(),
    };

    const accessToken = this.jwtService.sign(payload);

    const refreshToken = generateId();
    const refreshExpiresMs = this.parseExpiration(this.refreshExpiresIn);

    // Store refresh token in database
    await this.db.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + refreshExpiresMs),
      },
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: this.parseExpiration(this.jwtExpiresIn) / 1000,
      tokenType: 'Bearer',
    };
  }

  private parseExpiration(expiration: string): number {
    const match = expiration.match(/^(\d+)([smhd])$/);
    if (!match) {
      return 15 * 60 * 1000; // Default 15 minutes
    }

    const value = parseInt(match[1] ?? '15', 10);
    const unit = match[2];

    switch (unit) {
      case 's':
        return value * 1000;
      case 'm':
        return value * 60 * 1000;
      case 'h':
        return value * 60 * 60 * 1000;
      case 'd':
        return value * 24 * 60 * 60 * 1000;
      default:
        return 15 * 60 * 1000;
    }
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this.db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role as Role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      isActive: user.isActive,
    };
  }

  /**
   * Clean up expired refresh tokens (maintenance task)
   */
  async cleanupExpiredTokens(): Promise<number> {
    const result = await this.db.refreshToken.deleteMany({
      where: {
        OR: [{ expiresAt: { lt: new Date() } }, { revokedAt: { not: null } }],
      },
    });

    logger.info('Cleaned up expired tokens', { count: result.count });
    return result.count;
  }
}
