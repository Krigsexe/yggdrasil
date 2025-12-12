/**
 * Daemon Module
 *
 * NestJS module for the Cognitive Daemon.
 * Provides background processing using local LLM (Ollama).
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@yggdrasil/shared/services';
import { DaemonService } from './daemon.service.js';
import { DaemonController } from './daemon.controller.js';
import { OllamaService } from './ollama.service.js';

@Module({
  imports: [ConfigModule, RedisModule],
  controllers: [DaemonController],
  providers: [DaemonService, OllamaService],
  exports: [DaemonService, OllamaService],
})
export class DaemonModule {}
