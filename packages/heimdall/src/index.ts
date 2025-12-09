/**
 * 🛡️ HEIMDALL - Gateway Component
 * 
 * "Heimdall voit à cent lieues, de jour comme de nuit.
 *  Il entend l'herbe pousser sur la terre et la laine sur les moutons."
 * 
 * HEIMDALL is the gateway guardian of YGGDRASIL.
 * All requests must pass through HEIMDALL before reaching the World Tree.
 * 
 * Responsibilities:
 * - Authentication (JWT, OAuth2)
 * - Rate Limiting
 * - Audit Logging
 * - Input Validation
 * - TLS/mTLS Termination
 */

export * from './app.module';
export * from './auth/auth.module';
export * from './auth/auth.service';
export * from './audit/audit.service';

// Re-export guards and decorators for other packages
export * from './auth/guards/jwt-auth.guard';
export * from './auth/decorators/current-user.decorator';
