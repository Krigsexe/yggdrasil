/**
 * Configuration constants for YGGDRASIL
 */

export const YGGDRASIL_VERSION = '0.1.0';

export const DEFAULT_CONFIG = {
  // Server
  server: {
    port: 3000,
    host: '0.0.0.0',
    corsOrigins: ['http://localhost:3000'],
  },

  // Authentication
  auth: {
    jwtExpiresIn: '15m',
    refreshExpiresIn: '7d',
    bcryptRounds: 12,
    maxLoginAttempts: 5,
    lockoutDurationMs: 15 * 60 * 1000, // 15 minutes
  },

  // Rate limiting
  rateLimit: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100,
    maxRequestsPerUser: 1000,
  },

  // Validation
  validation: {
    requireMimirAnchor: true,
    minimumConfidence: 100,
    maxProcessingTimeMs: 30000,
    lokiChallengeRequired: true,
  },

  // Council
  council: {
    maxDeliberationTimeMs: 60000,
    votingThreshold: 0.66,
    parallelExecution: true,
  },

  // Memory
  memory: {
    maxEntriesPerUser: 100000,
    embeddingDimension: 1536,
    retentionDays: 365,
    autoCheckpointInterval: 100,
  },

  // Sources
  sources: {
    arxiv: {
      baseUrl: 'https://export.arxiv.org/api/query',
      rateLimit: 1, // requests per second
    },
    pubmed: {
      baseUrl: 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils',
      rateLimit: 3, // requests per second
    },
  },

  // Logging
  logging: {
    level: 'info',
    format: 'json',
    includeTimestamp: true,
  },

  // Database
  database: {
    maxConnections: 20,
    idleTimeoutMs: 30000,
    connectionTimeoutMs: 10000,
  },

  // Redis
  redis: {
    maxRetries: 3,
    retryDelayMs: 1000,
  },
} as const;

export type Config = typeof DEFAULT_CONFIG;

/**
 * Environment variable names
 */
export const ENV_VARS = {
  NODE_ENV: 'NODE_ENV',
  PORT: 'PORT',
  HOST: 'HOST',

  DATABASE_URL: 'DATABASE_URL',
  REDIS_URL: 'REDIS_URL',

  JWT_SECRET: 'JWT_SECRET',
  JWT_EXPIRES_IN: 'JWT_EXPIRES_IN',
  JWT_REFRESH_EXPIRES_IN: 'JWT_REFRESH_EXPIRES_IN',

  ANTHROPIC_API_KEY: 'ANTHROPIC_API_KEY',
  OPENAI_API_KEY: 'OPENAI_API_KEY',
  DEEPSEEK_API_KEY: 'DEEPSEEK_API_KEY',

  LOG_LEVEL: 'LOG_LEVEL',
  LOG_FORMAT: 'LOG_FORMAT',

  RATE_LIMIT_WINDOW_MS: 'RATE_LIMIT_WINDOW_MS',
  RATE_LIMIT_MAX_REQUESTS: 'RATE_LIMIT_MAX_REQUESTS',
} as const;
