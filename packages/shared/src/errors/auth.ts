/**
 * Authentication errors for YGGDRASIL
 */

import { YggdrasilError, ErrorDetails } from './base.js';

export class AuthenticationError extends YggdrasilError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, 'AUTHENTICATION_ERROR', details);
  }
}

export class InvalidCredentialsError extends AuthenticationError {
  constructor() {
    super('Invalid email or password', { hint: 'Check your credentials' });
  }
}

export class TokenExpiredError extends AuthenticationError {
  constructor(tokenType: 'access' | 'refresh') {
    super(`${tokenType} token has expired`, { tokenType });
  }
}

export class TokenInvalidError extends AuthenticationError {
  constructor(reason?: string) {
    super('Invalid token', { reason });
  }
}

export class TokenRevokedError extends AuthenticationError {
  constructor() {
    super('Token has been revoked');
  }
}

export class AuthorizationError extends YggdrasilError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, 'AUTHORIZATION_ERROR', details);
  }
}

export class InsufficientPermissionsError extends AuthorizationError {
  constructor(requiredRole: string, actualRole: string) {
    super('Insufficient permissions for this operation', {
      requiredRole,
      actualRole,
    });
  }
}

export class RateLimitExceededError extends YggdrasilError {
  public readonly retryAfter: number;

  constructor(limit: number, windowMs: number, retryAfter: number) {
    super('Rate limit exceeded', 'RATE_LIMIT_EXCEEDED', {
      limit,
      windowMs,
      retryAfter,
    });
    this.retryAfter = retryAfter;
  }
}

export class AccountDisabledError extends AuthenticationError {
  constructor() {
    super('Account has been disabled');
  }
}
