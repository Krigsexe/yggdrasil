-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'SYSTEM');

-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('ARXIV', 'PUBMED', 'ISO', 'RFC', 'WIKIDATA', 'WEB', 'BOOK', 'JOURNAL', 'OTHER');

-- CreateEnum
CREATE TYPE "EpistemicBranch" AS ENUM ('MIMIR', 'VOLVA', 'HUGIN');

-- CreateEnum
CREATE TYPE "RejectionReason" AS ENUM ('NO_SOURCE', 'CONTRADICTS_MEMORY', 'FAILED_CRITIQUE', 'NO_CONSENSUS', 'INSUFFICIENT_CONFIDENCE', 'CONTAMINATION_DETECTED', 'TIMEOUT', 'INTERNAL_ERROR');

-- CreateEnum
CREATE TYPE "CouncilMember" AS ENUM ('KVASIR', 'BRAGI', 'NORNES', 'SAGA', 'SYN', 'LOKI', 'TYR');

-- CreateEnum
CREATE TYPE "CouncilVerdict" AS ENUM ('CONSENSUS', 'MAJORITY', 'SPLIT', 'DEADLOCK');

-- CreateEnum
CREATE TYPE "ChallengeSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "MemoryType" AS ENUM ('INTERACTION', 'DECISION', 'CORRECTION', 'CHECKPOINT', 'INVALIDATION');

-- CreateEnum
CREATE TYPE "DependencyType" AS ENUM ('DERIVES_FROM', 'REFERENCES', 'INVALIDATES', 'SUPERSEDES');

-- CreateEnum
CREATE TYPE "WebWatchType" AS ENUM ('URL', 'DOMAIN', 'SEARCH');

-- CreateEnum
CREATE TYPE "MemoryState" AS ENUM ('VERIFIED', 'REJECTED', 'PENDING_PROOF', 'WATCHING', 'DEPRECATED');

-- CreateEnum
CREATE TYPE "PriorityQueue" AS ENUM ('HOT', 'WARM', 'COLD');

-- CreateEnum
CREATE TYPE "KnowledgeRelationType" AS ENUM ('DERIVED_FROM', 'ASSUMES', 'SUPPORTS', 'CONTRADICTS');

-- CreateEnum
CREATE TYPE "AlertType" AS ENUM ('VELOCITY_SPIKE', 'CONTRADICTION', 'CONFIDENCE_DROP', 'NEW_SOURCE');

-- CreateEnum
CREATE TYPE "AlertSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "last_login_at" TIMESTAMP(3),
    "name" TEXT,
    "organization" TEXT,
    "timezone" TEXT,
    "locale" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revoked_at" TIMESTAMP(3),
    "replaced_by_token" TEXT,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "metadata" JSONB,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sources" (
    "id" TEXT NOT NULL,
    "type" "SourceType" NOT NULL,
    "identifier" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "authors" TEXT[],
    "published_at" TIMESTAMP(3),
    "fetched_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trust_score" INTEGER NOT NULL,
    "branch" "EpistemicBranch" NOT NULL,
    "is_valid" BOOLEAN NOT NULL DEFAULT true,
    "invalidated_at" TIMESTAMP(3),
    "doi" TEXT,
    "isbn" TEXT,
    "issn" TEXT,
    "arxiv_id" TEXT,
    "pubmed_id" TEXT,
    "abstract" TEXT,
    "keywords" TEXT[],
    "citations" INTEGER,
    "peer_reviewed" BOOLEAN,
    "journal" TEXT,
    "volume" TEXT,
    "issue" TEXT,
    "pages" TEXT,
    "embedding" vector(1536),
    "embedding_updated_at" TIMESTAMP(3),

    CONSTRAINT "sources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "validations" (
    "id" TEXT NOT NULL,
    "request_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "is_valid" BOOLEAN NOT NULL,
    "confidence" INTEGER NOT NULL,
    "rejection_reason" "RejectionReason",
    "trace" JSONB NOT NULL,
    "processing_time_ms" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "validations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "validation_sources" (
    "id" TEXT NOT NULL,
    "validation_id" TEXT NOT NULL,
    "source_id" TEXT NOT NULL,

    CONSTRAINT "validation_sources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deliberations" (
    "id" TEXT NOT NULL,
    "request_id" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "final_proposal" TEXT NOT NULL,
    "verdict" "CouncilVerdict" NOT NULL,
    "processing_time_ms" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "deliberations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "council_responses" (
    "id" TEXT NOT NULL,
    "deliberation_id" TEXT NOT NULL,
    "member" "CouncilMember" NOT NULL,
    "content" TEXT NOT NULL,
    "confidence" INTEGER NOT NULL,
    "reasoning" TEXT,
    "processing_time_ms" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "council_responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loki_challenges" (
    "id" TEXT NOT NULL,
    "deliberation_id" TEXT NOT NULL,
    "target_member" "CouncilMember" NOT NULL,
    "challenge" TEXT NOT NULL,
    "severity" "ChallengeSeverity" NOT NULL,
    "response" TEXT,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "loki_challenges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memories" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "session_id" TEXT,
    "type" "MemoryType" NOT NULL,
    "content" JSONB NOT NULL,
    "embedding" vector(1536),
    "tags" TEXT[],
    "importance" INTEGER NOT NULL DEFAULT 50,
    "access_count" INTEGER NOT NULL DEFAULT 0,
    "last_accessed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "valid_until" TIMESTAMP(3),
    "invalidated_at" TIMESTAMP(3),
    "invalidated_by" TEXT,
    "invalidation_reason" TEXT,

    CONSTRAINT "memories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memory_dependencies" (
    "id" TEXT NOT NULL,
    "memory_id" TEXT NOT NULL,
    "depends_on_id" TEXT NOT NULL,
    "dependency_type" "DependencyType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "memory_dependencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkpoints" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "state_hash" TEXT NOT NULL,
    "memory_ids" TEXT[],
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "checkpoints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "user_id" TEXT,
    "resource_type" TEXT NOT NULL,
    "resource_id" TEXT,
    "method" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "status_code" INTEGER NOT NULL,
    "duration_ms" INTEGER NOT NULL,
    "ip" TEXT,
    "user_agent" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "display_name" TEXT,
    "username" TEXT NOT NULL,
    "bio" TEXT,
    "image_url" TEXT,
    "has_onboarded" BOOLEAN NOT NULL DEFAULT false,
    "openai_api_key" TEXT,
    "anthropic_api_key" TEXT,
    "google_gemini_api_key" TEXT,
    "mistral_api_key" TEXT,
    "groq_api_key" TEXT,
    "perplexity_api_key" TEXT,
    "azure_openai_api_key" TEXT,
    "openrouter_api_key" TEXT,
    "use_azure_openai" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspaces" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_home" BOOLEAN NOT NULL DEFAULT false,
    "default_context_length" INTEGER NOT NULL DEFAULT 4096,
    "default_model" TEXT NOT NULL DEFAULT 'claude-3-5-sonnet-20241022',
    "default_prompt" TEXT NOT NULL DEFAULT 'You are a helpful assistant.',
    "default_temperature" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "include_profile_context" BOOLEAN NOT NULL DEFAULT true,
    "include_workspace_instructions" BOOLEAN NOT NULL DEFAULT true,
    "instructions" TEXT,
    "embeddings_provider" TEXT NOT NULL DEFAULT 'openai',
    "image_url" TEXT,
    "sharing" TEXT NOT NULL DEFAULT 'private',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workspaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "folders" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "workspace_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "folders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chats" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "workspace_id" TEXT NOT NULL,
    "folder_id" TEXT,
    "assistant_id" TEXT,
    "name" TEXT NOT NULL,
    "model" TEXT,
    "prompt" TEXT,
    "temperature" DOUBLE PRECISION,
    "context_length" INTEGER,
    "include_profile_context" BOOLEAN NOT NULL DEFAULT true,
    "include_workspace_instructions" BOOLEAN NOT NULL DEFAULT true,
    "embeddings_provider" TEXT,
    "sharing" TEXT NOT NULL DEFAULT 'private',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "assistant_id" TEXT,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "model" TEXT,
    "image_urls" TEXT[],
    "sequence_number" INTEGER NOT NULL,
    "yggdrasil_branch" "EpistemicBranch",
    "yggdrasil_confidence" INTEGER,
    "yggdrasil_sources" JSONB,
    "yggdrasil_trace" JSONB,
    "yggdrasil_request_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "presets" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "workspace_id" TEXT NOT NULL,
    "folder_id" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "model" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "context_length" INTEGER NOT NULL,
    "include_profile_context" BOOLEAN NOT NULL DEFAULT true,
    "include_workspace_instructions" BOOLEAN NOT NULL DEFAULT true,
    "embeddings_provider" TEXT,
    "sharing" TEXT NOT NULL DEFAULT 'private',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "presets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prompts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "workspace_id" TEXT NOT NULL,
    "folder_id" TEXT,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sharing" TEXT NOT NULL DEFAULT 'private',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prompts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assistants" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "workspace_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "model" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "context_length" INTEGER NOT NULL,
    "include_profile_context" BOOLEAN NOT NULL DEFAULT true,
    "include_workspace_instructions" BOOLEAN NOT NULL DEFAULT true,
    "embeddings_provider" TEXT,
    "image_url" TEXT,
    "sharing" TEXT NOT NULL DEFAULT 'private',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assistants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "workspace_id" TEXT NOT NULL,
    "folder_id" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "tokens" INTEGER,
    "sharing" TEXT NOT NULL DEFAULT 'private',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "file_items" (
    "id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "tokens" INTEGER NOT NULL,
    "local_embedding" vector(1536),
    "openai_embedding" vector(1536),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "file_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_files" (
    "id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_files" (
    "id" TEXT NOT NULL,
    "message_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "message_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assistant_files" (
    "id" TEXT NOT NULL,
    "assistant_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assistant_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tools" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "custom_headers" JSONB,
    "schema" JSONB NOT NULL,
    "sharing" TEXT NOT NULL DEFAULT 'private',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assistant_tools" (
    "id" TEXT NOT NULL,
    "assistant_id" TEXT NOT NULL,
    "tool_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assistant_tools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "web_content" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "fetched_at" TIMESTAMP(3) NOT NULL,
    "trust_score" INTEGER NOT NULL,
    "domain" TEXT NOT NULL,
    "language" TEXT,
    "author" TEXT,
    "published_at" TIMESTAMP(3),
    "description" TEXT,
    "warnings" TEXT[],
    "watch_id" TEXT,

    CONSTRAINT "web_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "web_watches" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT,
    "domain" TEXT,
    "search_query" TEXT,
    "watch_type" "WebWatchType" NOT NULL,
    "interval_ms" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_checked_at" TIMESTAMP(3),
    "last_change_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "web_watches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "knowledge_nodes" (
    "id" TEXT NOT NULL,
    "statement" TEXT NOT NULL,
    "domain" TEXT,
    "tags" TEXT[],
    "current_state" "MemoryState" NOT NULL DEFAULT 'PENDING_PROOF',
    "epistemic_branch" "EpistemicBranch" NOT NULL DEFAULT 'HUGIN',
    "confidence_score" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "epistemic_velocity" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "shapley_attribution" JSONB,
    "audit_trail" JSONB NOT NULL DEFAULT '[]',
    "priority_queue" "PriorityQueue" NOT NULL DEFAULT 'WARM',
    "last_scan" TIMESTAMP(3),
    "next_scan" TIMESTAMP(3),
    "idle_cycles" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "knowledge_nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "knowledge_dependencies" (
    "id" TEXT NOT NULL,
    "source_id" TEXT NOT NULL,
    "target_id" TEXT NOT NULL,
    "relation" "KnowledgeRelationType" NOT NULL,
    "strength" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "knowledge_dependencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hugin_alerts" (
    "id" TEXT NOT NULL,
    "type" "AlertType" NOT NULL,
    "node_id" TEXT NOT NULL,
    "statement" TEXT NOT NULL,
    "severity" "AlertSeverity" NOT NULL,
    "message" TEXT NOT NULL,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acknowledged" BOOLEAN NOT NULL DEFAULT false,
    "acknowledged_at" TIMESTAMP(3),
    "acknowledged_by" TEXT,

    CONSTRAINT "hugin_alerts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shapley_attributions" (
    "id" TEXT NOT NULL,
    "deliberation_id" TEXT NOT NULL,
    "member" "CouncilMember" NOT NULL,
    "shapley_value" DOUBLE PRECISION NOT NULL,
    "percentage_contribution" DOUBLE PRECISION NOT NULL,
    "response_quality" DOUBLE PRECISION NOT NULL,
    "challenge_impact" DOUBLE PRECISION NOT NULL,
    "consensus_alignment" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shapley_attributions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_key" ON "refresh_tokens"("token");

-- CreateIndex
CREATE INDEX "refresh_tokens_user_id_idx" ON "refresh_tokens"("user_id");

-- CreateIndex
CREATE INDEX "refresh_tokens_expires_at_idx" ON "refresh_tokens"("expires_at");

-- CreateIndex
CREATE INDEX "sessions_user_id_idx" ON "sessions"("user_id");

-- CreateIndex
CREATE INDEX "sources_branch_trust_score_idx" ON "sources"("branch", "trust_score");

-- CreateIndex
CREATE INDEX "sources_type_idx" ON "sources"("type");

-- CreateIndex
CREATE INDEX "sources_arxiv_id_idx" ON "sources"("arxiv_id");

-- CreateIndex
CREATE INDEX "sources_pubmed_id_idx" ON "sources"("pubmed_id");

-- CreateIndex
CREATE UNIQUE INDEX "sources_type_identifier_key" ON "sources"("type", "identifier");

-- CreateIndex
CREATE INDEX "validations_request_id_idx" ON "validations"("request_id");

-- CreateIndex
CREATE INDEX "validations_is_valid_idx" ON "validations"("is_valid");

-- CreateIndex
CREATE UNIQUE INDEX "validation_sources_validation_id_source_id_key" ON "validation_sources"("validation_id", "source_id");

-- CreateIndex
CREATE INDEX "deliberations_request_id_idx" ON "deliberations"("request_id");

-- CreateIndex
CREATE INDEX "council_responses_deliberation_id_idx" ON "council_responses"("deliberation_id");

-- CreateIndex
CREATE INDEX "loki_challenges_deliberation_id_idx" ON "loki_challenges"("deliberation_id");

-- CreateIndex
CREATE INDEX "memories_user_id_type_idx" ON "memories"("user_id", "type");

-- CreateIndex
CREATE INDEX "memories_session_id_idx" ON "memories"("session_id");

-- CreateIndex
CREATE INDEX "memories_created_at_idx" ON "memories"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "memory_dependencies_memory_id_depends_on_id_key" ON "memory_dependencies"("memory_id", "depends_on_id");

-- CreateIndex
CREATE INDEX "checkpoints_user_id_idx" ON "checkpoints"("user_id");

-- CreateIndex
CREATE INDEX "audit_logs_user_id_created_at_idx" ON "audit_logs"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "audit_logs_action_idx" ON "audit_logs"("action");

-- CreateIndex
CREATE INDEX "audit_logs_resource_type_resource_id_idx" ON "audit_logs"("resource_type", "resource_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_id_key" ON "profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_username_key" ON "profiles"("username");

-- CreateIndex
CREATE INDEX "workspaces_user_id_idx" ON "workspaces"("user_id");

-- CreateIndex
CREATE INDEX "folders_workspace_id_idx" ON "folders"("workspace_id");

-- CreateIndex
CREATE INDEX "folders_user_id_idx" ON "folders"("user_id");

-- CreateIndex
CREATE INDEX "chats_workspace_id_idx" ON "chats"("workspace_id");

-- CreateIndex
CREATE INDEX "chats_user_id_idx" ON "chats"("user_id");

-- CreateIndex
CREATE INDEX "chats_folder_id_idx" ON "chats"("folder_id");

-- CreateIndex
CREATE INDEX "messages_chat_id_idx" ON "messages"("chat_id");

-- CreateIndex
CREATE INDEX "messages_user_id_idx" ON "messages"("user_id");

-- CreateIndex
CREATE INDEX "presets_workspace_id_idx" ON "presets"("workspace_id");

-- CreateIndex
CREATE INDEX "presets_user_id_idx" ON "presets"("user_id");

-- CreateIndex
CREATE INDEX "prompts_workspace_id_idx" ON "prompts"("workspace_id");

-- CreateIndex
CREATE INDEX "prompts_user_id_idx" ON "prompts"("user_id");

-- CreateIndex
CREATE INDEX "assistants_workspace_id_idx" ON "assistants"("workspace_id");

-- CreateIndex
CREATE INDEX "assistants_user_id_idx" ON "assistants"("user_id");

-- CreateIndex
CREATE INDEX "files_workspace_id_idx" ON "files"("workspace_id");

-- CreateIndex
CREATE INDEX "files_user_id_idx" ON "files"("user_id");

-- CreateIndex
CREATE INDEX "file_items_file_id_idx" ON "file_items"("file_id");

-- CreateIndex
CREATE INDEX "file_items_user_id_idx" ON "file_items"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "chat_files_chat_id_file_id_key" ON "chat_files"("chat_id", "file_id");

-- CreateIndex
CREATE UNIQUE INDEX "message_files_message_id_file_id_key" ON "message_files"("message_id", "file_id");

-- CreateIndex
CREATE UNIQUE INDEX "assistant_files_assistant_id_file_id_key" ON "assistant_files"("assistant_id", "file_id");

-- CreateIndex
CREATE INDEX "tools_user_id_idx" ON "tools"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "assistant_tools_assistant_id_tool_id_key" ON "assistant_tools"("assistant_id", "tool_id");

-- CreateIndex
CREATE UNIQUE INDEX "web_content_url_key" ON "web_content"("url");

-- CreateIndex
CREATE INDEX "web_content_domain_idx" ON "web_content"("domain");

-- CreateIndex
CREATE INDEX "web_content_trust_score_idx" ON "web_content"("trust_score");

-- CreateIndex
CREATE INDEX "web_content_fetched_at_idx" ON "web_content"("fetched_at");

-- CreateIndex
CREATE INDEX "web_watches_is_active_idx" ON "web_watches"("is_active");

-- CreateIndex
CREATE INDEX "knowledge_nodes_current_state_idx" ON "knowledge_nodes"("current_state");

-- CreateIndex
CREATE INDEX "knowledge_nodes_epistemic_branch_idx" ON "knowledge_nodes"("epistemic_branch");

-- CreateIndex
CREATE INDEX "knowledge_nodes_priority_queue_idx" ON "knowledge_nodes"("priority_queue");

-- CreateIndex
CREATE INDEX "knowledge_nodes_next_scan_idx" ON "knowledge_nodes"("next_scan");

-- CreateIndex
CREATE INDEX "knowledge_dependencies_source_id_idx" ON "knowledge_dependencies"("source_id");

-- CreateIndex
CREATE INDEX "knowledge_dependencies_target_id_idx" ON "knowledge_dependencies"("target_id");

-- CreateIndex
CREATE UNIQUE INDEX "knowledge_dependencies_source_id_target_id_key" ON "knowledge_dependencies"("source_id", "target_id");

-- CreateIndex
CREATE INDEX "hugin_alerts_type_idx" ON "hugin_alerts"("type");

-- CreateIndex
CREATE INDEX "hugin_alerts_severity_idx" ON "hugin_alerts"("severity");

-- CreateIndex
CREATE INDEX "hugin_alerts_acknowledged_idx" ON "hugin_alerts"("acknowledged");

-- CreateIndex
CREATE INDEX "hugin_alerts_created_at_idx" ON "hugin_alerts"("created_at");

-- CreateIndex
CREATE INDEX "shapley_attributions_member_idx" ON "shapley_attributions"("member");

-- CreateIndex
CREATE INDEX "shapley_attributions_deliberation_id_idx" ON "shapley_attributions"("deliberation_id");

-- CreateIndex
CREATE INDEX "shapley_attributions_shapley_value_idx" ON "shapley_attributions"("shapley_value");

-- CreateIndex
CREATE UNIQUE INDEX "shapley_attributions_deliberation_id_member_key" ON "shapley_attributions"("deliberation_id", "member");

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "validation_sources" ADD CONSTRAINT "validation_sources_validation_id_fkey" FOREIGN KEY ("validation_id") REFERENCES "validations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "validation_sources" ADD CONSTRAINT "validation_sources_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "sources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "council_responses" ADD CONSTRAINT "council_responses_deliberation_id_fkey" FOREIGN KEY ("deliberation_id") REFERENCES "deliberations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loki_challenges" ADD CONSTRAINT "loki_challenges_deliberation_id_fkey" FOREIGN KEY ("deliberation_id") REFERENCES "deliberations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memories" ADD CONSTRAINT "memories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memories" ADD CONSTRAINT "memories_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memory_dependencies" ADD CONSTRAINT "memory_dependencies_memory_id_fkey" FOREIGN KEY ("memory_id") REFERENCES "memories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memory_dependencies" ADD CONSTRAINT "memory_dependencies_depends_on_id_fkey" FOREIGN KEY ("depends_on_id") REFERENCES "memories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkpoints" ADD CONSTRAINT "checkpoints_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_assistant_id_fkey" FOREIGN KEY ("assistant_id") REFERENCES "assistants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "presets" ADD CONSTRAINT "presets_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "presets" ADD CONSTRAINT "presets_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assistants" ADD CONSTRAINT "assistants_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_items" ADD CONSTRAINT "file_items_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_files" ADD CONSTRAINT "chat_files_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_files" ADD CONSTRAINT "chat_files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_files" ADD CONSTRAINT "message_files_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_files" ADD CONSTRAINT "message_files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assistant_files" ADD CONSTRAINT "assistant_files_assistant_id_fkey" FOREIGN KEY ("assistant_id") REFERENCES "assistants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assistant_files" ADD CONSTRAINT "assistant_files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assistant_tools" ADD CONSTRAINT "assistant_tools_assistant_id_fkey" FOREIGN KEY ("assistant_id") REFERENCES "assistants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assistant_tools" ADD CONSTRAINT "assistant_tools_tool_id_fkey" FOREIGN KEY ("tool_id") REFERENCES "tools"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "web_content" ADD CONSTRAINT "web_content_watch_id_fkey" FOREIGN KEY ("watch_id") REFERENCES "web_watches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knowledge_dependencies" ADD CONSTRAINT "knowledge_dependencies_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "knowledge_nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knowledge_dependencies" ADD CONSTRAINT "knowledge_dependencies_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "knowledge_nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

