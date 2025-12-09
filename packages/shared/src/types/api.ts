/**
 * API types for YGGDRASIL
 *
 * Request/Response types for the public API.
 */

import { EpistemicBranch } from './epistemic.js';
import { CouncilMember } from './council.js';
import { ValidationResult } from './validation.js';

export interface YggdrasilRequest {
  id: string;
  query: string;
  userId: string;
  sessionId: string;
  context?: RequestContext;
  options?: RequestOptions;
  timestamp: Date;
}

export interface RequestContext {
  previousMessageId?: string;
  conversationHistory?: ConversationMessage[];
  userPreferences?: UserPreferences;
  metadata?: Record<string, unknown>;
}

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface UserPreferences {
  language?: string;
  verbosityLevel?: 'concise' | 'normal' | 'detailed';
  includeTraceInResponse?: boolean;
  preferredBranch?: EpistemicBranch;
}

export interface RequestOptions {
  forceBranch?: EpistemicBranch;
  councilMembers?: CouncilMember[];
  includeTrace?: boolean;
  includeRawResponses?: boolean;
  timeout?: number;
  skipCache?: boolean;
}

export interface YggdrasilResponse {
  id: string;
  requestId: string;
  content: string;
  validation: ValidationResult;
  memoryUpdated: boolean;
  processingTimeMs: number;
  timestamp: Date;
  metadata?: ResponseMetadata;
}

export interface ResponseMetadata {
  tokensUsed?: number;
  modelVersions?: Record<string, string>;
  cacheHit?: boolean;
  branchesConsulted?: EpistemicBranch[];
  councilMembersConsulted?: CouncilMember[];
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  requestId?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  version: string;
  uptime: number;
  components: ComponentHealth[];
  timestamp: Date;
}

export interface ComponentHealth {
  name: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  latencyMs?: number;
  message?: string;
}
