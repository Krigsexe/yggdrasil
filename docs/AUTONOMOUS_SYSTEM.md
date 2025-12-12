# 🤖 YGGDRASIL — Système Autonome avec Concertation Claude

> **Version** : 2.0
> **Objectif** : Auto-pilotage, auto-correction, concertation Claude ↔ YGGDRASIL
> **Règle absolue** : Respecter CLAUDE.md en toutes circonstances

---

## ARCHITECTURE AUTONOME

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SYSTÈME AUTONOME YGGDRASIL                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐                 │
│  │   CLAUDE    │◄────►│  YGGDRASIL  │◄────►│    ODIN     │                 │
│  │  (Conseiller)│      │  (Système)  │      │ (Validation)│                 │
│  └──────┬──────┘      └──────┬──────┘      └──────┬──────┘                 │
│         │                    │                    │                         │
│         ▼                    ▼                    ▼                         │
│  ┌─────────────────────────────────────────────────────────────┐           │
│  │                    COUCHE D'ACCÈS                            │           │
│  ├─────────────┬─────────────┬─────────────┬───────────────────┤           │
│  │  Repo Local │ Repo Distant│  MCP Docker │ Sources Officielles│          │
│  │  (fichiers) │   (GitHub)  │  (Desktop)  │   (Whitelist)      │          │
│  └─────────────┴─────────────┴─────────────┴───────────────────┘           │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────┐           │
│  │                    SERVICES LOCAUX                           │           │
│  ├─────────────┬─────────────┬─────────────┬───────────────────┤           │
│  │  Heimdall   │   Bifrost   │  PostgreSQL │      Redis        │           │
│  │  :3000      │   :3001     │   :54322    │      :6379        │           │
│  └─────────────┴─────────────┴─────────────┴───────────────────┘           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## PARTIE 1 : RÈGLES D'AUTO-PILOTAGE

### 1.1 Principes Fondamentaux

```yaml
autopilot:
  enabled: true
  
  rules:
    # Règle 1: Toujours vérifier avant d'agir
    - name: "NO_ASSUMPTIONS"
      description: "Je ne suppose pas. Je vérifie."
      enforcement: "STRICT"
    
    # Règle 2: Respecter CLAUDE.md
    - name: "CLAUDE_MD_AUTHORITY"
      description: "CLAUDE.md est la source de vérité pour les règles"
      enforcement: "ABSOLUTE"
    
    # Règle 3: Auto-correction dans les limites
    - name: "SELF_CORRECT_BOUNDED"
      description: "Auto-correction permise si risque < MEDIUM"
      enforcement: "CONDITIONAL"
      conditions:
        - "Ne pas supprimer de fichiers sans confirmation"
        - "Ne pas modifier prisma/schema.prisma sans validation"
        - "Ne pas push sur main sans tests verts"
    
    # Règle 4: Escalade si doute
    - name: "ESCALATE_ON_DOUBT"
      description: "Si confiance < 70%, demander à Claude"
      enforcement: "STRICT"

  boundaries:
    allowed:
      - "Lire tous les fichiers du repo"
      - "Exécuter tests et lints"
      - "Créer des fichiers dans packages/"
      - "Modifier code existant (avec backup)"
      - "Commit sur branches feature/*"
      - "Rechercher documentation officielle"
      - "Utiliser MCPs Docker configurés"
    
    requires_confirmation:
      - "Modifier prisma/schema.prisma"
      - "Supprimer des fichiers"
      - "Merge sur main/develop"
      - "Modifier CLAUDE.md ou VISION.md"
      - "Changer variables d'environnement"
    
    forbidden:
      - "Push force sur main"
      - "Supprimer .git/"
      - "Modifier sans backup"
      - "Ignorer les erreurs de tests"
      - "Utiliser sources non officielles"
```

### 1.2 Fichier de Configuration

**Fichier** : `config/autopilot.json`

```json
{
  "version": "2.0",
  "enabled": true,
  
  "claude": {
    "command": "claude",
    "role": "advisor",
    "consultOn": ["doubt", "risk_high", "odin_split", "schema_change"]
  },
  
  "repos": {
    "local": {
      "path": ".",
      "reference_files": ["CLAUDE.md", "docs/VISION.md", "prisma/schema.prisma"]
    },
    "remote": {
      "url": "https://github.com/[user]/yggdrasil",
      "default_branch": "main",
      "protected_branches": ["main", "develop"]
    }
  },
  
  "services": {
    "heimdall": { "url": "http://localhost:3000", "health": "/health" },
    "bifrost": { "url": "http://localhost:3001", "health": "/" },
    "postgres": { "url": "postgresql://postgres:postgres@localhost:54322/yggdrasil" },
    "redis": { "url": "redis://localhost:6379" }
  },
  
  "mcp": {
    "docker_desktop": {
      "enabled": true,
      "containers": ["yggdrasil-*"]
    }
  },
  
  "sources": {
    "mode": "WHITELIST_ONLY",
    "official_only": true
  },
  
  "escalation": {
    "confidence_threshold": 0.70,
    "risk_threshold": "MEDIUM",
    "always_escalate": ["security", "data_loss", "breaking_change"]
  }
}
```

---

## PARTIE 2 : SOURCES OFFICIELLES UNIQUEMENT

### 2.1 Whitelist des Sources

**Fichier** : `config/verified-sources.json`

```json
{
  "version": "1.0",
  "mode": "WHITELIST_STRICT",
  "description": "Seules ces sources sont autorisées pour la recherche",
  
  "categories": {
    "documentation_officielle": {
      "priority": 1,
      "trust_level": 1.0,
      "sources": [
        {
          "name": "MDN Web Docs",
          "domain": "developer.mozilla.org",
          "type": "reference"
        },
        {
          "name": "Node.js Docs",
          "domain": "nodejs.org/docs",
          "type": "reference"
        },
        {
          "name": "TypeScript Docs",
          "domain": "typescriptlang.org/docs",
          "type": "reference"
        },
        {
          "name": "NestJS Docs",
          "domain": "docs.nestjs.com",
          "type": "reference"
        },
        {
          "name": "React Docs",
          "domain": "react.dev",
          "type": "reference"
        },
        {
          "name": "Next.js Docs",
          "domain": "nextjs.org/docs",
          "type": "reference"
        },
        {
          "name": "Prisma Docs",
          "domain": "prisma.io/docs",
          "type": "reference"
        },
        {
          "name": "PostgreSQL Docs",
          "domain": "postgresql.org/docs",
          "type": "reference"
        },
        {
          "name": "Docker Docs",
          "domain": "docs.docker.com",
          "type": "reference"
        },
        {
          "name": "GitHub Docs",
          "domain": "docs.github.com",
          "type": "reference"
        },
        {
          "name": "Anthropic Docs",
          "domain": "docs.anthropic.com",
          "type": "reference"
        },
        {
          "name": "OpenAI Docs",
          "domain": "platform.openai.com/docs",
          "type": "reference"
        },
        {
          "name": "Google AI Docs",
          "domain": "ai.google.dev/docs",
          "type": "reference"
        },
        {
          "name": "Supabase Docs",
          "domain": "supabase.com/docs",
          "type": "reference"
        },
        {
          "name": "Vercel Docs",
          "domain": "vercel.com/docs",
          "type": "reference"
        }
      ]
    },
    
    "repositories_officiels": {
      "priority": 2,
      "trust_level": 0.95,
      "sources": [
        {
          "name": "GitHub Official Repos",
          "pattern": "github.com/{owner}/{repo}",
          "allowed_owners": [
            "microsoft", "facebook", "google", "vercel", "prisma",
            "nestjs", "nodejs", "docker", "anthropics", "openai",
            "supabase", "tailwindlabs"
          ]
        },
        {
          "name": "NPM Registry",
          "domain": "npmjs.com/package",
          "type": "registry"
        }
      ]
    },
    
    "securite": {
      "priority": 1,
      "trust_level": 1.0,
      "sources": [
        {
          "name": "CVE Database",
          "domain": "cve.mitre.org",
          "type": "security"
        },
        {
          "name": "NVD",
          "domain": "nvd.nist.gov",
          "type": "security"
        },
        {
          "name": "GitHub Security Advisories",
          "domain": "github.com/advisories",
          "type": "security"
        },
        {
          "name": "Snyk Vulnerability DB",
          "domain": "security.snyk.io",
          "type": "security"
        }
      ]
    },
    
    "standards": {
      "priority": 1,
      "trust_level": 1.0,
      "sources": [
        {
          "name": "IETF RFCs",
          "domain": "rfc-editor.org",
          "type": "standard"
        },
        {
          "name": "W3C",
          "domain": "w3.org",
          "type": "standard"
        },
        {
          "name": "ECMAScript",
          "domain": "tc39.es",
          "type": "standard"
        }
      ]
    },
    
    "recherche": {
      "priority": 2,
      "trust_level": 0.90,
      "sources": [
        {
          "name": "arXiv",
          "domain": "arxiv.org",
          "type": "research"
        },
        {
          "name": "PubMed",
          "domain": "pubmed.ncbi.nlm.nih.gov",
          "type": "research"
        },
        {
          "name": "Semantic Scholar",
          "domain": "semanticscholar.org",
          "type": "research"
        }
      ]
    }
  },
  
  "blacklist": {
    "description": "Sources JAMAIS autorisées",
    "domains": [
      "reddit.com",
      "stackoverflow.com",
      "medium.com",
      "dev.to",
      "hashnode.com",
      "freecodecamp.org",
      "w3schools.com",
      "geeksforgeeks.org",
      "tutorialspoint.com",
      "javatpoint.com",
      "quora.com",
      "twitter.com",
      "x.com",
      "facebook.com",
      "linkedin.com",
      "youtube.com",
      "*.blogspot.com",
      "*.wordpress.com",
      "*.substack.com"
    ],
    "reason": "Sources non vérifiées, opinions, contenu généré par utilisateurs"
  }
}
```

### 2.2 Service de Validation des Sources

**Fichier** : `packages/shared/src/sources/source-validator.service.ts`

```typescript
import * as fs from 'fs';
import * as path from 'path';

interface SourceConfig {
  categories: Record<string, {
    priority: number;
    trust_level: number;
    sources: Array<{
      name: string;
      domain?: string;
      pattern?: string;
      allowed_owners?: string[];
    }>;
  }>;
  blacklist: {
    domains: string[];
  };
}

export class SourceValidatorService {
  private config: SourceConfig;
  
  constructor() {
    const configPath = path.resolve(__dirname, '../../../../config/verified-sources.json');
    this.config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  }
  
  /**
   * Vérifie si une URL est autorisée
   */
  isAllowed(url: string): { allowed: boolean; reason: string; trust_level?: number } {
    const domain = this.extractDomain(url);
    
    // Check blacklist first
    if (this.isBlacklisted(domain)) {
      return {
        allowed: false,
        reason: `BLACKLISTED: ${domain} - Source non vérifiée interdite`
      };
    }
    
    // Check whitelist
    const whitelistMatch = this.findInWhitelist(url);
    if (whitelistMatch) {
      return {
        allowed: true,
        reason: `VERIFIED: ${whitelistMatch.name}`,
        trust_level: whitelistMatch.trust_level
      };
    }
    
    // Default: reject
    return {
      allowed: false,
      reason: `NOT_IN_WHITELIST: ${domain} - Seules les sources officielles sont autorisées`
    };
  }
  
  /**
   * Filtre une liste d'URLs pour ne garder que les autorisées
   */
  filterUrls(urls: string[]): { allowed: string[]; rejected: Array<{ url: string; reason: string }> } {
    const allowed: string[] = [];
    const rejected: Array<{ url: string; reason: string }> = [];
    
    for (const url of urls) {
      const result = this.isAllowed(url);
      if (result.allowed) {
        allowed.push(url);
      } else {
        rejected.push({ url, reason: result.reason });
      }
    }
    
    return { allowed, rejected };
  }
  
  private extractDomain(url: string): string {
    try {
      const parsed = new URL(url);
      return parsed.hostname;
    } catch {
      return url;
    }
  }
  
  private isBlacklisted(domain: string): boolean {
    return this.config.blacklist.domains.some(blocked => {
      if (blocked.startsWith('*.')) {
        const suffix = blocked.slice(2);
        return domain.endsWith(suffix);
      }
      return domain === blocked || domain.endsWith('.' + blocked);
    });
  }
  
  private findInWhitelist(url: string): { name: string; trust_level: number } | null {
    const domain = this.extractDomain(url);
    
    for (const [, category] of Object.entries(this.config.categories)) {
      for (const source of category.sources) {
        if (source.domain && domain.includes(source.domain)) {
          return { name: source.name, trust_level: category.trust_level };
        }
        
        // Check GitHub pattern
        if (source.pattern && source.allowed_owners) {
          const match = url.match(/github\.com\/([^\/]+)\//);
          if (match && source.allowed_owners.includes(match[1])) {
            return { name: source.name, trust_level: category.trust_level };
          }
        }
      }
    }
    
    return null;
  }
  
  /**
   * Retourne la liste des sources officielles pour la recherche
   */
  getSearchDomains(): string[] {
    const domains: string[] = [];
    
    for (const category of Object.values(this.config.categories)) {
      for (const source of category.sources) {
        if (source.domain) {
          domains.push(source.domain);
        }
      }
    }
    
    return domains;
  }
}
```

---

## PARTIE 3 : CONCERTATION CLAUDE ↔ YGGDRASIL

### 3.1 Service de Concertation

**Fichier** : `packages/shared/src/concertation/claude-concertation.service.ts`

```typescript
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';

const execAsync = promisify(exec);

export interface ConcertationRequest {
  context: string;
  question: string;
  yggdrasilState: {
    confidence: number;
    sources: string[];
    reasoning: string;
  };
  urgency: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface ConcertationResponse {
  recommendation: string;
  confidence: number;
  action: 'APPROVE' | 'REJECT' | 'MODIFY' | 'ESCALATE';
  modifications?: string;
  reasoning: string;
}

export class ClaudeConcertationService {
  private repoRoot: string;
  private claudeMdContent: string;
  private visionContent: string;

  constructor() {
    this.repoRoot = this.findRepoRoot();
    this.loadReferenceFiles();
  }

  private findRepoRoot(): string {
    let current = __dirname;
    while (current !== path.parse(current).root) {
      if (fs.existsSync(path.join(current, 'CLAUDE.md'))) {
        return current;
      }
      current = path.dirname(current);
    }
    throw new Error('Repo YGGDRASIL non trouvé');
  }

  private loadReferenceFiles(): void {
    this.claudeMdContent = fs.readFileSync(
      path.join(this.repoRoot, 'CLAUDE.md'),
      'utf-8'
    );
    
    try {
      this.visionContent = fs.readFileSync(
        path.join(this.repoRoot, 'docs', 'VISION.md'),
        'utf-8'
      ).substring(0, 3000); // Limiter pour le contexte
    } catch {
      this.visionContent = '';
    }
  }

  /**
   * Demande conseil à Claude pour une décision ODIN
   */
  async consultForOdin(request: ConcertationRequest): Promise<ConcertationResponse> {
    const prompt = this.buildOdinPrompt(request);
    
    try {
      const { stdout } = await execAsync(
        `claude --print "${this.escapeForShell(prompt)}"`,
        { 
          cwd: this.repoRoot, 
          timeout: 180000,
          maxBuffer: 10 * 1024 * 1024 
        }
      );
      
      return this.parseResponse(stdout);
    } catch (error) {
      console.error('[CONCERTATION] Erreur Claude:', error);
      return {
        recommendation: 'Consultation échouée - Escalade humaine requise',
        confidence: 0,
        action: 'ESCALATE',
        reasoning: `Erreur: ${error.message}`
      };
    }
  }

  /**
   * Auto-diagnostic avec Claude
   */
  async selfDiagnose(issue: string): Promise<{
    diagnosis: string;
    solution: string;
    commands: string[];
    autoFix: boolean;
  }> {
    const prompt = `
CONTEXTE YGGDRASIL
==================
${this.claudeMdContent.substring(0, 2000)}

RÈGLES:
- Je ne suppose pas. Je vérifie.
- Sources officielles uniquement
- Auto-correction permise si risque < MEDIUM

SERVICES LOCAUX:
- Heimdall: localhost:3000
- Bifrost: localhost:3001
- PostgreSQL: localhost:54322
- Redis: localhost:6379

PROBLÈME DÉTECTÉ:
${issue}

TÂCHE:
1. Analyse le problème
2. Vérifie les fichiers/services concernés
3. Propose une solution
4. Indique si auto-fix possible (risque < MEDIUM)

RÉPONSE EN JSON:
{
  "diagnosis": "...",
  "solution": "...",
  "commands": ["...", "..."],
  "risk": "LOW|MEDIUM|HIGH",
  "autoFix": true/false,
  "files_affected": ["...", "..."]
}
`;

    try {
      const { stdout } = await execAsync(
        `claude --print "${this.escapeForShell(prompt)}"`,
        { cwd: this.repoRoot, timeout: 120000 }
      );
      
      const json = this.extractJson(stdout);
      const parsed = JSON.parse(json);
      
      return {
        diagnosis: parsed.diagnosis || 'Diagnostic non disponible',
        solution: parsed.solution || 'Solution non disponible',
        commands: parsed.commands || [],
        autoFix: parsed.autoFix === true && parsed.risk !== 'HIGH'
      };
    } catch (error) {
      return {
        diagnosis: `Erreur: ${error.message}`,
        solution: 'Intervention manuelle requise',
        commands: [],
        autoFix: false
      };
    }
  }

  /**
   * Vérifier le repo local ET distant
   */
  async checkRepoState(): Promise<{
    local: { branch: string; clean: boolean; ahead: number; behind: number };
    remote: { url: string; accessible: boolean };
    sync: boolean;
  }> {
    const results = {
      local: { branch: '', clean: false, ahead: 0, behind: 0 },
      remote: { url: '', accessible: false },
      sync: false
    };
    
    try {
      // Branch actuelle
      const { stdout: branch } = await execAsync('git branch --show-current', { cwd: this.repoRoot });
      results.local.branch = branch.trim();
      
      // État propre ?
      const { stdout: status } = await execAsync('git status --porcelain', { cwd: this.repoRoot });
      results.local.clean = status.trim() === '';
      
      // Ahead/Behind
      await execAsync('git fetch', { cwd: this.repoRoot });
      const { stdout: revList } = await execAsync(
        `git rev-list --left-right --count origin/${results.local.branch}...HEAD`,
        { cwd: this.repoRoot }
      ).catch(() => ({ stdout: '0\t0' }));
      
      const [behind, ahead] = revList.trim().split('\t').map(Number);
      results.local.ahead = ahead || 0;
      results.local.behind = behind || 0;
      
      // Remote URL
      const { stdout: remoteUrl } = await execAsync('git remote get-url origin', { cwd: this.repoRoot });
      results.remote.url = remoteUrl.trim();
      results.remote.accessible = true;
      
      // Sync ?
      results.sync = results.local.clean && results.local.ahead === 0 && results.local.behind === 0;
      
    } catch (error) {
      console.error('[REPO CHECK]', error);
    }
    
    return results;
  }

  private buildOdinPrompt(request: ConcertationRequest): string {
    return `
CONCERTATION ODIN ↔ CLAUDE
===========================

RÈGLES CLAUDE.MD (extrait):
${this.claudeMdContent.substring(0, 1500)}

VISION YGGDRASIL (extrait):
${this.visionContent.substring(0, 1000)}

ÉTAT YGGDRASIL:
- Confiance: ${request.yggdrasilState.confidence * 100}%
- Sources: ${request.yggdrasilState.sources.join(', ')}
- Raisonnement: ${request.yggdrasilState.reasoning}

CONTEXTE:
${request.context}

QUESTION:
${request.question}

URGENCE: ${request.urgency}

TU ES CONSEILLER D'ODIN. Ta réponse doit:
1. Valider ou invalider la décision YGGDRASIL
2. Proposer des modifications si nécessaire
3. Être alignée avec CLAUDE.md et la VISION

RÉPONSE EN JSON:
{
  "recommendation": "...",
  "confidence": 0.0-1.0,
  "action": "APPROVE|REJECT|MODIFY|ESCALATE",
  "modifications": "...",
  "reasoning": "..."
}
`;
  }

  private parseResponse(output: string): ConcertationResponse {
    try {
      const json = this.extractJson(output);
      return JSON.parse(json);
    } catch {
      return {
        recommendation: output.substring(0, 500),
        confidence: 0.5,
        action: 'ESCALATE',
        reasoning: 'Parsing JSON échoué'
      };
    }
  }

  private extractJson(text: string): string {
    const match = text.match(/\{[\s\S]*\}/);
    return match ? match[0] : '{}';
  }

  private escapeForShell(str: string): string {
    return str.replace(/"/g, '\\"').replace(/\n/g, '\\n');
  }
}
```

### 3.2 Intégration dans ODIN

**Fichier** : `packages/odin/src/odin-with-claude.service.ts`

```typescript
import { ClaudeConcertationService } from '@yggdrasil/shared';

export class OdinValidationService {
  private claudeAdvisor: ClaudeConcertationService;
  private confidenceThreshold = 0.70;

  constructor() {
    this.claudeAdvisor = new ClaudeConcertationService();
  }

  /**
   * Validation avec concertation Claude si nécessaire
   */
  async validate(
    response: string,
    sources: string[],
    confidence: number,
    reasoning: string
  ): Promise<{
    valid: boolean;
    finalResponse: string;
    claudeConsulted: boolean;
    reasoning: string;
  }> {
    // Étape 1: Validation standard
    const standardValidation = this.standardValidation(response, sources);
    
    // Étape 2: Si confiance < seuil OU validation standard échoue → consulter Claude
    const needsClaudeConsultation = 
      confidence < this.confidenceThreshold ||
      !standardValidation.valid ||
      this.hasUncertainty(response);

    if (!needsClaudeConsultation) {
      return {
        valid: true,
        finalResponse: response,
        claudeConsulted: false,
        reasoning: 'Validation standard OK'
      };
    }

    // Étape 3: Consultation Claude
    console.log('[ODIN] Confiance insuffisante, consultation Claude...');
    
    const claudeAdvice = await this.claudeAdvisor.consultForOdin({
      context: `Réponse YGGDRASIL à valider`,
      question: `Cette réponse est-elle valide et alignée avec la vision ?
      
Réponse: ${response.substring(0, 1000)}`,
      yggdrasilState: {
        confidence,
        sources,
        reasoning
      },
      urgency: confidence < 0.5 ? 'HIGH' : 'MEDIUM'
    });

    // Étape 4: Appliquer la recommandation
    switch (claudeAdvice.action) {
      case 'APPROVE':
        return {
          valid: true,
          finalResponse: response,
          claudeConsulted: true,
          reasoning: `Claude: ${claudeAdvice.reasoning}`
        };
      
      case 'MODIFY':
        return {
          valid: true,
          finalResponse: claudeAdvice.modifications || response,
          claudeConsulted: true,
          reasoning: `Modifié par Claude: ${claudeAdvice.reasoning}`
        };
      
      case 'REJECT':
        return {
          valid: false,
          finalResponse: `Je ne peux pas répondre avec certitude. ${claudeAdvice.recommendation}`,
          claudeConsulted: true,
          reasoning: `Rejeté par Claude: ${claudeAdvice.reasoning}`
        };
      
      case 'ESCALATE':
      default:
        return {
          valid: false,
          finalResponse: 'Cette question nécessite une vérification humaine.',
          claudeConsulted: true,
          reasoning: 'Escaladé pour intervention humaine'
        };
    }
  }

  private standardValidation(response: string, sources: string[]): { valid: boolean; issues: string[] } {
    const issues: string[] = [];
    
    // Check sources officielles
    const { SourceValidatorService } = require('@yggdrasil/shared');
    const sourceValidator = new SourceValidatorService();
    
    for (const source of sources) {
      const result = sourceValidator.isAllowed(source);
      if (!result.allowed) {
        issues.push(`Source non autorisée: ${source}`);
      }
    }
    
    // Check réponse vide ou trop courte
    if (response.length < 10) {
      issues.push('Réponse trop courte');
    }
    
    // Check cohérence
    if (this.hasContradiction(response)) {
      issues.push('Contradictions détectées dans la réponse');
    }
    
    return {
      valid: issues.length === 0,
      issues
    };
  }

  private hasUncertainty(response: string): boolean {
    const patterns = [
      /confiance.*[0-5]\d%/i,
      /non vérifié/i,
      /je ne (peux|suis) pas (certain|sûr)/i,
      /possiblement/i,
      /peut-être/i,
      /il semble/i
    ];
    return patterns.some(p => p.test(response));
  }

  private hasContradiction(response: string): boolean {
    // Détection basique de contradictions
    const sentences = response.split(/[.!?]+/);
    // ... logique de détection
    return false;
  }
}
```

---

## PARTIE 4 : INTÉGRATION MCP DOCKER DESKTOP

### 4.1 Script d'Interaction MCP

**Fichier** : `scripts/mcp-docker.ps1`

```powershell
# YGGDRASIL — Interaction MCP Docker Desktop
# Utilise les MCPs configurés dans Docker Desktop

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("status", "logs", "restart", "exec", "inspect")]
    [string]$Action,
    
    [string]$Container = "",
    [string]$Command = ""
)

$ErrorActionPreference = "Stop"

# Containers YGGDRASIL
$YggdrasilContainers = @(
    "yggdrasil-postgres",
    "yggdrasil-redis",
    "yggdrasil-heimdall",
    "yggdrasil-bifrost"
)

function Get-YggdrasilContainers {
    docker ps -a --filter "name=yggdrasil" --format "{{.Names}}\t{{.Status}}\t{{.Ports}}"
}

function Get-ContainerLogs {
    param([string]$Name, [int]$Lines = 50)
    docker logs --tail $Lines $Name 2>&1
}

function Restart-Container {
    param([string]$Name)
    Write-Host "Redémarrage de $Name..." -ForegroundColor Yellow
    docker restart $Name
    Start-Sleep -Seconds 3
    docker ps --filter "name=$Name" --format "{{.Names}}: {{.Status}}"
}

function Invoke-ContainerCommand {
    param([string]$Name, [string]$Cmd)
    docker exec -it $Name $Cmd
}

switch ($Action) {
    "status" {
        Write-Host "`n🐳 Status Containers YGGDRASIL" -ForegroundColor Cyan
        Write-Host "==============================" -ForegroundColor Cyan
        Get-YggdrasilContainers
    }
    
    "logs" {
        if (-not $Container) {
            Write-Host "Containers disponibles:" -ForegroundColor Yellow
            Get-YggdrasilContainers
            $Container = Read-Host "Container"
        }
        Get-ContainerLogs -Name $Container -Lines 100
    }
    
    "restart" {
        if (-not $Container) {
            $Container = Read-Host "Container à redémarrer"
        }
        Restart-Container -Name $Container
    }
    
    "exec" {
        if (-not $Container -or -not $Command) {
            Write-Host "Usage: .\mcp-docker.ps1 -Action exec -Container <name> -Command <cmd>"
            return
        }
        Invoke-ContainerCommand -Name $Container -Cmd $Command
    }
    
    "inspect" {
        if (-not $Container) {
            $Container = Read-Host "Container à inspecter"
        }
        docker inspect $Container | ConvertFrom-Json | Format-List
    }
}
```

### 4.2 Service Docker MCP

**Fichier** : `packages/shared/src/mcp/docker-mcp.service.ts`

```typescript
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface ContainerInfo {
  name: string;
  status: 'running' | 'stopped' | 'unknown';
  ports: string[];
  health: 'healthy' | 'unhealthy' | 'unknown';
}

export class DockerMcpService {
  private containers = [
    { name: 'yggdrasil-postgres', healthCheck: 'pg_isready' },
    { name: 'yggdrasil-redis', healthCheck: 'redis-cli ping' },
    { name: 'yggdrasil-heimdall', healthCheck: 'curl -s localhost:3000/health' },
    { name: 'yggdrasil-bifrost', healthCheck: 'curl -s localhost:3001' }
  ];

  /**
   * État de tous les containers YGGDRASIL
   */
  async getStatus(): Promise<ContainerInfo[]> {
    const results: ContainerInfo[] = [];
    
    for (const container of this.containers) {
      try {
        const { stdout } = await execAsync(
          `docker ps --filter "name=${container.name}" --format "{{.Status}}|{{.Ports}}"`
        );
        
        const [status, ports] = stdout.trim().split('|');
        
        results.push({
          name: container.name,
          status: status.includes('Up') ? 'running' : 'stopped',
          ports: ports ? ports.split(',').map(p => p.trim()) : [],
          health: await this.checkHealth(container)
        });
      } catch {
        results.push({
          name: container.name,
          status: 'unknown',
          ports: [],
          health: 'unknown'
        });
      }
    }
    
    return results;
  }

  /**
   * Redémarrer un container
   */
  async restart(containerName: string): Promise<boolean> {
    try {
      await execAsync(`docker restart ${containerName}`);
      // Attendre que le container soit prêt
      await new Promise(resolve => setTimeout(resolve, 5000));
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Récupérer les logs
   */
  async getLogs(containerName: string, lines = 100): Promise<string> {
    try {
      const { stdout, stderr } = await execAsync(
        `docker logs --tail ${lines} ${containerName} 2>&1`
      );
      return stdout + stderr;
    } catch (error) {
      return `Erreur: ${error.message}`;
    }
  }

  /**
   * Exécuter une commande dans un container
   */
  async exec(containerName: string, command: string): Promise<string> {
    try {
      const { stdout } = await execAsync(
        `docker exec ${containerName} ${command}`
      );
      return stdout;
    } catch (error) {
      return `Erreur: ${error.message}`;
    }
  }

  private async checkHealth(container: { name: string; healthCheck: string }): Promise<'healthy' | 'unhealthy' | 'unknown'> {
    try {
      await execAsync(`docker exec ${container.name} ${container.healthCheck}`);
      return 'healthy';
    } catch {
      return 'unhealthy';
    }
  }
}
```

---

## PARTIE 5 : SCRIPT PRINCIPAL D'AUTO-PILOTAGE

**Fichier** : `scripts/yggdrasil-autopilot.ps1`

```powershell
# YGGDRASIL — Script Principal d'Auto-Pilotage
# Ce script orchestre toutes les opérations autonomes

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet(
        "diagnose",      # Diagnostic complet
        "fix",           # Appliquer corrections
        "validate",      # Valider état actuel
        "sync",          # Sync local/remote
        "consult",       # Consulter Claude
        "full-cycle"     # Cycle complet
    )]
    [string]$Mode,
    
    [string]$Issue = "",
    [switch]$AutoFix = $false
)

$ErrorActionPreference = "Stop"
$RepoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $RepoRoot

# Couleurs
function Write-Step { param($msg) Write-Host "`n➡️  $msg" -ForegroundColor Cyan }
function Write-OK { param($msg) Write-Host "  ✅ $msg" -ForegroundColor Green }
function Write-Warn { param($msg) Write-Host "  ⚠️  $msg" -ForegroundColor Yellow }
function Write-Fail { param($msg) Write-Host "  ❌ $msg" -ForegroundColor Red }

# Charger contexte
function Get-Context {
    $context = @{
        ClaudeMd = Get-Content "CLAUDE.md" -Raw -ErrorAction SilentlyContinue
        Branch = git branch --show-current
        Clean = (git status --porcelain) -eq $null
        LastCommit = git log -1 --format="%h %s"
    }
    return $context
}

# Vérifier services
function Test-Services {
    Write-Step "Vérification des services"
    
    $services = @(
        @{Name="Heimdall"; Url="http://localhost:3000/health"},
        @{Name="Bifrost"; Url="http://localhost:3001"},
        @{Name="PostgreSQL"; Check={docker exec yggdrasil-postgres pg_isready -q}},
        @{Name="Redis"; Check={docker exec yggdrasil-redis redis-cli ping}}
    )
    
    $allOk = $true
    foreach ($svc in $services) {
        try {
            if ($svc.Url) {
                $null = Invoke-WebRequest -Uri $svc.Url -TimeoutSec 3 -ErrorAction Stop
            } else {
                & $svc.Check | Out-Null
            }
            Write-OK "$($svc.Name): UP"
        } catch {
            Write-Fail "$($svc.Name): DOWN"
            $allOk = $false
        }
    }
    return $allOk
}

# Diagnostic via Claude
function Invoke-Diagnosis {
    param([string]$Issue)
    
    Write-Step "Diagnostic via Claude"
    
    $prompt = @"
Tu es dans le repo YGGDRASIL.
Fichiers de référence: CLAUDE.md, docs/VISION.md
Services: Heimdall:3000, Bifrost:3001, PostgreSQL:54322, Redis:6379

PROBLÈME: $Issue

1. Analyse le problème
2. Vérifie les fichiers concernés
3. Propose solution
4. Indique si auto-fix possible (risque < MEDIUM)

Format JSON:
{"diagnosis":"...","solution":"...","commands":["..."],"risk":"LOW|MEDIUM|HIGH","autoFix":true/false}
"@

    $result = claude --print $prompt 2>&1
    return $result
}

# Appliquer fix
function Invoke-Fix {
    param([string]$Diagnosis)
    
    Write-Step "Application du fix"
    
    # Parser le JSON
    $json = $Diagnosis | Select-String -Pattern '\{[\s\S]*\}' | ForEach-Object { $_.Matches.Value }
    
    if (-not $json) {
        Write-Fail "Impossible de parser le diagnostic"
        return $false
    }
    
    $fix = $json | ConvertFrom-Json
    
    if ($fix.risk -eq "HIGH") {
        Write-Warn "Risque HIGH - Intervention manuelle requise"
        Write-Host "  Commandes suggérées:"
        $fix.commands | ForEach-Object { Write-Host "    $_" }
        return $false
    }
    
    if (-not $fix.autoFix) {
        Write-Warn "Auto-fix non recommandé"
        return $false
    }
    
    Write-Host "  Exécution des commandes:" -ForegroundColor Yellow
    foreach ($cmd in $fix.commands) {
        Write-Host "    > $cmd"
        try {
            Invoke-Expression $cmd
            Write-OK "Commande OK"
        } catch {
            Write-Fail "Échec: $_"
            return $false
        }
    }
    
    return $true
}

# Sync repos
function Sync-Repos {
    Write-Step "Synchronisation Local/Remote"
    
    # Fetch
    git fetch origin
    
    # Status
    $ahead = git rev-list --count HEAD..origin/main 2>$null
    $behind = git rev-list --count origin/main..HEAD 2>$null
    
    Write-Host "  Ahead: $ahead | Behind: $behind"
    
    if ($behind -gt 0) {
        Write-Warn "Commits non pushés"
    }
    
    if ($ahead -gt 0) {
        Write-Warn "Commits à pull"
    }
    
    if ($ahead -eq 0 -and $behind -eq 0) {
        Write-OK "Repos synchronisés"
    }
}

# Cycle complet
function Invoke-FullCycle {
    Write-Host "`n🌳 YGGDRASIL AUTO-PILOT - CYCLE COMPLET" -ForegroundColor Green
    Write-Host "=======================================" -ForegroundColor Green
    
    $context = Get-Context
    Write-Host "Branch: $($context.Branch)"
    Write-Host "Clean: $($context.Clean)"
    Write-Host "Last: $($context.LastCommit)"
    
    # 1. Services
    $servicesOk = Test-Services
    
    # 2. Tests
    Write-Step "Exécution des tests"
    $testResult = pnpm test 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-OK "Tests passent"
    } else {
        Write-Fail "Tests échouent"
        if ($AutoFix) {
            $diagnosis = Invoke-Diagnosis -Issue "Tests échouent: $testResult"
            Invoke-Fix -Diagnosis $diagnosis
        }
    }
    
    # 3. Lint
    Write-Step "Lint"
    $lintResult = pnpm lint 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-OK "Lint OK"
    } else {
        Write-Warn "Lint warnings/errors"
    }
    
    # 4. Sync
    Sync-Repos
    
    # 5. Résumé
    Write-Host "`n📊 RÉSUMÉ" -ForegroundColor Cyan
    Write-Host "Services: $(if($servicesOk){'✅'}else{'❌'})"
    Write-Host "Tests: $(if($LASTEXITCODE -eq 0){'✅'}else{'❌'})"
    Write-Host "Sync: Voir ci-dessus"
}

# Main
switch ($Mode) {
    "diagnose" {
        if (-not $Issue) {
            $Issue = Read-Host "Décrivez le problème"
        }
        Invoke-Diagnosis -Issue $Issue
    }
    "fix" {
        if (-not $Issue) {
            $Issue = Read-Host "Décrivez le problème à corriger"
        }
        $diagnosis = Invoke-Diagnosis -Issue $Issue
        Invoke-Fix -Diagnosis $diagnosis
    }
    "validate" {
        Test-Services
    }
    "sync" {
        Sync-Repos
    }
    "consult" {
        $question = Read-Host "Question pour Claude"
        claude $question
    }
    "full-cycle" {
        Invoke-FullCycle
    }
}
```

---

## PARTIE 6 : MISE À JOUR CLAUDE.md

Ajouter cette section à ton CLAUDE.md existant :

```markdown
## SYSTÈME AUTONOME

### Concertation Claude ↔ YGGDRASIL
- Claude peut être consulté via `claude` CLI
- ODIN consulte Claude si confiance < 70%
- Sources officielles uniquement (voir config/verified-sources.json)

### Auto-Pilotage
```powershell
.\scripts\yggdrasil-autopilot.ps1 -Mode full-cycle
.\scripts\yggdrasil-autopilot.ps1 -Mode diagnose -Issue "description"
.\scripts\yggdrasil-autopilot.ps1 -Mode fix -AutoFix
```

### Services Locaux
| Service | Port | Health |
|---------|------|--------|
| Heimdall | 3000 | /health |
| Bifrost | 3001 | / |
| PostgreSQL | 54322 | pg_isready |
| Redis | 6379 | redis-cli ping |

### Sources Autorisées
- Documentation officielle uniquement
- Blacklist: Reddit, StackOverflow, Medium, blogs
- Voir config/verified-sources.json
```

---

## RÉSUMÉ DES FICHIERS À CRÉER

| Fichier | Rôle |
|---------|------|
| `config/autopilot.json` | Configuration auto-pilotage |
| `config/verified-sources.json` | Whitelist sources officielles |
| `scripts/yggdrasil-autopilot.ps1` | Script principal |
| `scripts/mcp-docker.ps1` | Interaction Docker MCP |
| `packages/shared/src/sources/source-validator.service.ts` | Validation sources |
| `packages/shared/src/concertation/claude-concertation.service.ts` | Bridge Claude |
| `packages/shared/src/mcp/docker-mcp.service.ts` | Service Docker |
| `packages/odin/src/odin-with-claude.service.ts` | ODIN + Claude advisor |
