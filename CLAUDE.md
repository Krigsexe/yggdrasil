# CLAUDE.md — Instructions pour Claude Code

> Ce fichier contient toutes les instructions nécessaires pour développer YGGDRASIL avec Claude Code.
> **IMPORTANT** : Lis d'abord la VISION et le DIAGNOSTIC avant de coder. Le code doit servir la philosophie.

---

## 🌲 PROJET : YGGDRASIL

**YGGDRASIL** (L'Arbre-Monde) est une architecture d'AGI éthique, souveraine et vérifiable. Le projet n'entraîne PAS de nouveaux modèles — il **orchestre** les LLMs existants avec une couche de validation garantissant la véracité absolue.

### Vision en une phrase
> "Une IA qui dit 'vérifié + sources' ou 'je ne sais pas' — jamais 'probablement vrai'."

### Propriétaire
- **Fondateur** : Julien Gelée (Krigsexe)
- **GitHub** : https://github.com/Krigsexe/yggdrasil
- **Licence** : MIT + Copyleft (le code appartient à l'humanité)

---

## 🔥 LE DIAGNOSTIC — Pourquoi ce projet existe

### L'état des lieux de l'IA actuelle

L'intelligence artificielle connaît une accélération sans précédent. Mais cette course en avant se fait sur des **fondations fragiles**.

#### La Triple Course (le problème systémique)

| Course | Description | Conséquence |
|--------|-------------|-------------|
| **Course à la puissance** | Chaque mois, un modèle plus grand, plus coûteux, plus énergivore. GPT-4: ~1.8T paramètres. | Coût énergétique d'un petit pays |
| **Course à la vitesse** | Publier avant de comprendre. Déployer avant de sécuriser. Monétiser avant de mesurer. | Systèmes dangereux en production |
| **Course au contrôle** | Quelques corporations contrôlent les fondations de l'IA mondiale. | Souveraineté perdue |

#### Les conséquences concrètes

| Problème | Réalité | Impact |
|----------|---------|--------|
| **Hallucinations** | 20-30% des affirmations factuelles des LLMs sont fausses, présentées avec la même confiance que les vraies | Désinformation à l'échelle |
| **Opacité** | Personne — pas même les créateurs — ne comprend pourquoi un modèle répond ce qu'il répond | Impossible d'auditer ou corriger |
| **Amnésie** | Chaque conversation repart de zéro. Aucune mémoire persistante. | Pas d'apprentissage véritable |
| **Dépendance** | Entreprises, gouvernements, individus dépendants de systèmes qu'ils ne contrôlent pas | Vulnérabilité systémique |
| **Inégalité** | Les meilleurs modèles coûtent cher. Seuls les riches y ont accès. | Fracture cognitive mondiale |
| **Souveraineté** | Nos données, pensées, créations transitent par des serveurs privés, dans des juridictions étrangères | Perte de contrôle collective |

#### La question fondamentale

> **L'AGI — l'Intelligence Artificielle Générale — sera peut-être la technologie la plus transformatrice de l'histoire humaine. Plus que l'écriture. Plus que l'imprimerie. Plus qu'Internet.**
>
> **Cette technologie doit-elle être développée par et pour des actionnaires, ou par et pour l'humanité ?**

---

## 💡 LA VISION — Une autre voie existe

Nous refusons le fatalisme. Nous refusons l'idée que la seule voie vers l'AGI passe par des modèles toujours plus grands, plus opaques, plus centralisés.

### Principe 1 : Cognition Biomimétique

Le cerveau humain a **déjà résolu** le problème de l'intelligence fiable. Pas parfaite — fiable.

| Capacité du cerveau | Ce que l'IA actuelle ne fait PAS | Ce que YGGDRASIL DOIT faire |
|---------------------|----------------------------------|----------------------------|
| **Sait quand il sait et quand il ne sait pas** | Confiance uniforme sur tout | Confiance calibrée, "je ne sais pas" explicite |
| **Sait d'où viennent ses informations** | Mélange opaque de sources | Traçabilité totale des sources |
| **Maintient une mémoire cohérente** | Reset à chaque session | Mémoire chrono-sémantique persistante |
| **Se corrige par la réalité** | Hallucine sans feedback | Ancrage obligatoire à des faits vérifiés |
| **Fonctionne comme un consortium** | Monolithe opaque | Modules spécialisés qui collaborent |

### Principe 2 : Éco-conception par Mutualisation

**Nous n'avons PAS besoin d'entraîner un nouveau modèle géant.**

D'excellents modèles existent déjà :
- **Claude** (Anthropic) → Raisonnement nuancé
- **Gemini** (Google) → Multimodalité
- **DeepSeek** → Mathématiques
- **Llama** (Meta) → Open-source, local
- **Grok** (xAI) → Créativité

**La voie sage : ORCHESTRER l'existant plutôt que reconstruire à l'infini.**

YGGDRASIL est un **chef d'orchestre**, pas un nouvel instrument.

### Principe 3 : Complémentarité avec les World Models (JEPA)

L'approche JEPA (Joint Embedding Predictive Architecture) de Yann LeCun vise à créer des "World Models" — des modèles qui comprennent le monde, pas juste les mots.

**YGGDRASIL + JEPA = Complémentarité parfaite**

| JEPA (futur) | YGGDRASIL (maintenant) |
|--------------|------------------------|
| Comprend le monde physique | Valide les affirmations |
| Prédit les conséquences | Trace les raisonnements |
| Apprend par observation | Ancre aux sources vérifiées |
| Représentation interne | Mémoire explicite |

Quand les World Models arriveront, YGGDRASIL sera prêt à les intégrer — comme un nouveau membre du THING (le conseil).

---

## 🎯 CE QUE YGGDRASIL DOIT ACCOMPLIR

### Pour les utilisateurs
- **Jamais de mensonge** — "Je ne sais pas" plutôt qu'halluciner
- **Toujours les sources** — Chaque affirmation est traçable
- **Mémoire qui fonctionne** — Se souvient des conversations passées
- **Contrôle des données** — Possibilité d'auto-héberger

### Pour l'humanité
- **Open-source** — Le code appartient à tous
- **Souveraineté** — Pas de dépendance à une corporation
- **Soutenabilité** — Pas de gaspillage énergétique
- **Standard éthique** — Un modèle pour l'industrie

### Ce que YGGDRASIL n'est PAS
- ❌ Une startup (pas d'investisseurs, pas d'IPO, pas de cible d'acquisition)
- ❌ Une corporation (personne ne "possède" YGGDRASIL)
- ❌ Un nouveau LLM (on orchestre, on n'entraîne pas)
- ❌ Un projet naïf (on sait que le chemin est long, on construit quand même)
- ❌ Anti-industrie de l'IA (on utilise leurs modèles, on propose une alternative éthique)

---

## 🌳 SYMBOLIQUE NORDIQUE

### Pourquoi la mythologie nordique ?

La mythologie grecque est surexploitée dans la tech (Athena, Prometheus, Apollo...). La mythologie nordique offre :
- Une identité distinctive
- Des symboles puissants et cohérents
- Une cosmologie riche (9 mondes, l'Arbre-Monde)

### Yggdrasil — L'Arbre-Monde

Dans la mythologie nordique, **Yggdrasil** est le frêne cosmique qui se dresse au centre de l'univers et connecte les neuf royaumes.

**Ses racines** puisent dans trois puits sacrés :
- **Urðarbrunnr** — le puits du Destin
- **Mímisbrunnr** — le puits de Mímir, source de toute sagesse (→ notre branche MÍMIR)
- **Hvergelmir** — la source bouillonnante

**Ses branches** abritent tous les êtres : dieux, humains, géants, elfes.

**Deux corbeaux** — Hugin (Pensée) et Munin (Mémoire) — parcourent le monde et rapportent tout à Odin.

**Un écureuil** — Ratatosk — court le long du tronc, portant les messages.

**Un gardien** — Heimdall — veille au Bifröst, voyant et entendant tout.

Cette cosmologie mappe parfaitement notre architecture :
- L'Arbre = Le système complet
- Les racines/puits = Les branches épistémiques
- Les corbeaux = Collecte d'information (HUGIN) et mémoire (MUNIN)
- L'écureuil = Routage des messages (RATATOSK)
- Le gardien = Gateway (HEIMDALL)
- Odin = Le maestro qui synthétise tout (ODIN)

---

## 👥 LA COMMUNAUTÉ VISÉE

YGGDRASIL est un **bien commun** en construction. Nous cherchons :

| Profil | Rôle | Ce qu'ils apportent |
|--------|------|---------------------|
| 🏗️ **Architectes** | Développeurs, ingénieurs, chercheurs IA | Construisent l'implémentation |
| 🛡️ **Gardiens** | Éthiciens, philosophes, juristes | Guident ce que nous construisons |
| 🔬 **Éclaireurs** | Scientifiques de toutes disciplines | Nourrissent MÍMIR de connaissances validées |
| ⚔️ **Critiques** | Sceptiques, red teamers, adversaires | Défient pour renforcer |
| 🌍 **Citoyens** | Utilisateurs, curieux, concernés | Garantissent que YGGDRASIL sert l'humanité |

### La vision à long terme

> *"Dans dix ans, nous voulons pouvoir dire à nos enfants :*
>
> *Quand l'IA est devenue assez puissante pour changer le monde, des gens se sont levés pour s'assurer qu'elle le changerait en bien. Ils n'avaient pas de milliards. Ils n'avaient pas de diplômes de Stanford. Ils n'avaient pas accès aux couloirs du pouvoir.*
>
> *Ils avaient une vision. Des principes. Et la détermination de construire quelque chose qui appartiendrait à tous.*
>
> *YGGDRASIL existe. Il appartient à l'humanité. Il dit la vérité. Il se souvient. Il protège."*

---

## 📐 FORMULATION TECHNIQUE DE LA VISION

### Le problème mathématique des LLMs actuels

Un LLM standard produit :
```
P(réponse | contexte) — distribution de probabilité sur les tokens
```

**Problème** : Cette probabilité ne distingue pas :
- Ce qui est **vrai** (ancré dans la réalité)
- Ce qui est **probable** (statistiquement fréquent dans les données)
- Ce qui est **cohérent** (grammaticalement/logiquement correct)

### La solution YGGDRASIL

YGGDRASIL ajoute une couche de validation :
```
ODIN(réponse) = {
  VALIDÉ    si ∀ affirmation ∈ réponse : ∃ source ∈ MÍMIR qui l'ancre
  REJETÉ    sinon, avec explication
}
```

**Règle fondamentale** :
```
Confiance(affirmation) = {
  100%  si source_MÍMIR existe ET validée
  0%    sinon (REJET, pas d'output)
}
```

Pas de zone grise. Pas de "probablement". Certitude ou silence.

### Séparation épistémique formelle

```
SAVOIR_TOTAL = MÍMIR ∪ VÖLVA ∪ HUGIN

Avec :
- MÍMIR ∩ VÖLVA = ∅
- MÍMIR ∩ HUGIN = ∅  
- VÖLVA ∩ HUGIN = ∅

Transitions autorisées :
- HUGIN → VÖLVA  (si investigation justifie)
- VÖLVA → MÍMIR  (si PREUVE, jamais probabilité)
- MÍMIR → ∅      (si source invalidée → rollback)

Transitions INTERDITES :
- HUGIN → MÍMIR  (JAMAIS de contamination directe)
- Tout bypass de validation
```

---

## 🏛️ ARCHITECTURE COMPLÈTE

### Vue d'ensemble du flux

```
UTILISATEUR 
    → HEIMDALL (Gateway: auth, rate limit, audit)
    → RATATOSK (Routage: classification, context, routing)
    → [MÍMIR | VÖLVA | HUGIN] (Les 3 branches épistémiques)
    → THING (Conseil: délibération multi-modèles)
    → ODIN (Maestro: validation finale 100% ou rejet)
    → MUNIN (Mémoire: stockage chrono-sémantique)
    → RÉPONSE VALIDÉE + SOURCES + TRACE
```

### Composants (Mythologie Nordique)

| Composant | Nom Nordique | Rôle | Stack |
|-----------|--------------|------|-------|
| Gateway | **HEIMDALL** | Auth, rate limiting, audit, TLS | NestJS, Passport, Redis |
| Routage | **RATATOSK** | Classification, extraction contexte, routing | NestJS, ML classifier |
| Branche Validée | **MÍMIR** | Connaissances 100% vérifiées | PostgreSQL, PGVector |
| Branche Recherche | **VÖLVA** | Hypothèses, théories (flaggées) | PostgreSQL |
| Branche Internet | **HUGIN** | Web temps réel (filtré, flaggé) | Scraper, anti-misinfo |
| Conseil | **THING** | Délibération multi-modèles | Orchestrateur LLM |
| Maestro | **ODIN** | Validation finale, ancrage sources | Validation engine |
| Mémoire | **MUNIN** | Chrono-sémantique, rollback | PostgreSQL, PGVector, Redis |
| Types partagés | **SHARED** | Types, constantes, utils | TypeScript |

### Membres du Conseil (THING)

| Membre | Inspiration | Rôle | Modèle LLM |
|--------|-------------|------|------------|
| **KVASIR** | Le plus sage | Raisonnement profond | Claude |
| **BRAGI** | Dieu poésie | Créativité | Grok |
| **NORNES** | Tisseuses destin | Calcul, logique | DeepSeek |
| **SAGA** | Déesse histoire | Connaissance générale | Llama |
| **LOKI** | Trickster | Critique adversariale | Red team |
| **TYR** | Dieu justice | Arbitrage, vote final | Système consensus |

### Les 3 Branches Épistémiques

```
┌─────────────────────────────────────────────────────────────┐
│                    SÉPARATION STRICTE                       │
├─────────────────┬─────────────────┬─────────────────────────┤
│     MÍMIR       │     VÖLVA       │        HUGIN            │
│   (Validé)      │   (Recherche)   │      (Internet)         │
├─────────────────┼─────────────────┼─────────────────────────┤
│ Confiance: 100% │ Confiance: Var. │ Confiance: 0%           │
│ Label: VERIFIED │ Label: THEORY   │ Label: UNVERIFIED       │
│ Sources: arXiv, │ Sources: Papers │ Sources: Web, News      │
│ PubMed, ISO,RFC │ non-publiés     │ (filtré anti-misinfo)   │
├─────────────────┴─────────────────┴─────────────────────────┤
│ ⚠️  AUCUNE CONTAMINATION ENTRE BRANCHES                     │
│ ⚠️  Promotion HUGIN→VÖLVA→MÍMIR uniquement sur PREUVE       │
└─────────────────────────────────────────────────────────────┘
```

---

## 📜 LES 7 PILIERS (Principes Architecturaux)

Ces piliers doivent être **implémentés dans le code**, pas juste documentés.

### 1. VÉRACITÉ ABSOLUE
- Toute affirmation DOIT être ancrée à une source MÍMIR
- Si pas de source → REJET (jamais d'hallucination)
- Confiance binaire : 100% (sourcé) ou 0% (rejeté)

### 2. TRAÇABILITÉ TOTALE
- Chaque réponse inclut sa `ValidationTrace`
- Logs structurés JSON, horodatés, non-répudiables
- Audit complet de chaque interaction

### 3. SÉPARATION ÉPISTÉMIQUE
- 3 bases de données SÉPARÉES (MÍMIR, VÖLVA, HUGIN)
- AUCUNE API ne permet la contamination croisée
- `EpistemicContaminationError` si tentative

### 4. MÉMOIRE VIVANTE
- MUNIN stocke TOUT : interactions, décisions, corrections
- Triple indexation : temporelle, sémantique, causale
- Reconstruction contextuelle à chaque requête

### 5. RÉVERSIBILITÉ
- Système de checkpoints
- Rollback possible vers n'importe quel état
- Si source invalidée → rollback automatique des décisions dépendantes

### 6. SOUVERAINETÉ
- Open-source (MIT + copyleft)
- Auto-hébergeable (Docker, Ollama pour local)
- Aucune dépendance à un fournisseur unique

### 7. SOUTENABILITÉ
- ZÉRO entraînement de modèle
- Serverless, scale-to-zero
- Métriques de consommation publiques

---

## ⚖️ LES 7 LOIS (Règles Intransgressibles)

Ces lois sont des **invariants** — le code DOIT les respecter.

| Loi | Énoncé | Implémentation |
|-----|--------|----------------|
| I | YGGDRASIL ne ment jamais | ODIN rejette tout output non-ancré |
| II | Toujours montrer le raisonnement | Chaque réponse inclut `ValidationTrace` |
| III | Prouvé ≠ Supposé ≠ Bruit | 3 DBs séparées, pas de contamination |
| IV | Droit à l'oubli sélectif | GDPR tagging, rollback granulaire |
| V | Données appartiennent au créateur | E2E encryption, local possible |
| VI | Consommer que le nécessaire | Serverless, métriques publiques |
| VII | Code appartient à l'humanité | MIT + copyleft, governance distribuée |

---

## 🛠️ STACK TECHNIQUE

### Backend
- **Framework** : NestJS (TypeScript strict)
- **Runtime** : Node.js 20+
- **Base de données** : PostgreSQL 16 + PGVector
- **Cache** : Redis
- **Queue** : BullMQ
- **ORM** : Prisma

### Monorepo
- **Package Manager** : pnpm 9+
- **Build System** : Turborepo
- **Workspaces** : `packages/*`

### Qualité
- **Tests** : Vitest
- **Linting** : ESLint + Prettier
- **Types** : TypeScript strict mode
- **Commits** : Conventional Commits

### Infrastructure
- **Conteneurs** : Docker
- **IaC** : Terraform
- **CI/CD** : GitHub Actions

---

## 📁 STRUCTURE DU MONOREPO

```
yggdrasil/
├── CLAUDE.md                    # CE FICHIER
├── README.md
├── MANIFESTO.md
├── package.json                 # Root monorepo
├── pnpm-workspace.yaml
├── turbo.json
│
├── packages/
│   ├── heimdall/                # Gateway
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   ├── auth/
│   │   │   │   ├── auth.module.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── strategies/
│   │   │   │   └── guards/
│   │   │   ├── rate-limit/
│   │   │   ├── audit/
│   │   │   └── health/
│   │   ├── test/
│   │   └── package.json
│   │
│   ├── ratatosk/                # Routage
│   │   ├── src/
│   │   │   ├── classifier/      # Classification des requêtes
│   │   │   ├── router/          # Routing vers branches
│   │   │   └── context/         # Extraction contexte
│   │   └── package.json
│   │
│   ├── mimir/                   # Branche Validée
│   │   ├── src/
│   │   │   ├── sources/         # Intégrations (arXiv, PubMed...)
│   │   │   ├── indexer/         # Indexation sémantique
│   │   │   ├── validator/       # Validation des sources
│   │   │   └── query/           # Requêtes
│   │   └── package.json
│   │
│   ├── volva/                   # Branche Recherche
│   │   ├── src/
│   │   │   ├── hypotheses/
│   │   │   ├── promotion/       # Promotion vers MÍMIR
│   │   │   └── flagging/
│   │   └── package.json
│   │
│   ├── hugin/                   # Branche Internet
│   │   ├── src/
│   │   │   ├── scraper/
│   │   │   ├── filter/          # Anti-désinformation
│   │   │   └── quarantine/
│   │   └── package.json
│   │
│   ├── thing/                   # Conseil
│   │   ├── src/
│   │   │   ├── orchestrator/    # Orchestration LLMs
│   │   │   ├── members/         # KVASIR, BRAGI, NORNES, SAGA
│   │   │   ├── loki/            # Critique adversariale
│   │   │   ├── tyr/             # Arbitrage/Consensus
│   │   │   └── adapters/        # Adapters pour chaque LLM
│   │   └── package.json
│   │
│   ├── odin/                    # Maestro
│   │   ├── src/
│   │   │   ├── validator/       # Validation multi-critères
│   │   │   ├── anchoring/       # Ancrage MÍMIR
│   │   │   ├── consistency/     # Cohérence MUNIN
│   │   │   └── rejection/       # Rejet explicite
│   │   └── package.json
│   │
│   ├── munin/                   # Mémoire
│   │   ├── src/
│   │   │   ├── storage/         # Stockage chrono-sémantique
│   │   │   ├── graph/           # Graphe de dépendances
│   │   │   ├── checkpoint/      # Checkpoints
│   │   │   ├── rollback/        # Rollback
│   │   │   └── embedding/       # Embeddings PGVector
│   │   └── package.json
│   │
│   └── shared/                  # Types partagés
│       ├── src/
│       │   ├── types/           # Interfaces & types
│       │   ├── constants/       # Constantes
│       │   ├── errors/          # Erreurs custom
│       │   ├── utils/           # Utilitaires
│       │   └── validation/      # Schemas Zod
│       └── package.json
│
├── docs/
│   ├── architecture/
│   ├── philosophy/
│   └── technical/
│
├── infra/
│   └── terraform/
│
└── .github/
    └── workflows/
```

---

## 📋 TÂCHES À ACCOMPLIR

### Phase 1 : Fondations (PRIORITÉ IMMÉDIATE)

#### 1.1 Compléter HEIMDALL (Gateway)
```
packages/heimdall/
├── src/
│   ├── main.ts                  # Entry point Fastify
│   ├── app.module.ts            # Root module
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts      # JWT, refresh tokens
│   │   ├── auth.controller.ts   # /auth/login, /auth/refresh, /auth/logout
│   │   ├── strategies/
│   │   │   └── jwt.strategy.ts
│   │   ├── guards/
│   │   │   └── jwt-auth.guard.ts
│   │   └── decorators/
│   │       └── current-user.decorator.ts
│   ├── rate-limit/
│   │   └── rate-limit.module.ts # Throttler + Redis
│   ├── audit/
│   │   ├── audit.module.ts
│   │   ├── audit.service.ts     # Log structuré
│   │   └── audit.interceptor.ts # Intercepte toutes les requêtes
│   └── health/
│       └── health.controller.ts # /health, /health/ready, /health/live
└── test/
    ├── auth.service.spec.ts
    └── audit.service.spec.ts
```

#### 1.2 Compléter SHARED (Types)
```
packages/shared/src/
├── types/
│   ├── epistemic.ts             # EpistemicBranch, ConfidenceLevel
│   ├── validation.ts            # ValidationResult, ValidationTrace
│   ├── council.ts               # CouncilMember, CouncilResponse
│   ├── memory.ts                # MemoryEntry, Checkpoint
│   └── api.ts                   # YggdrasilRequest, YggdrasilResponse
├── errors/
│   ├── base.error.ts            # YggdrasilError
│   ├── validation.error.ts      # ValidationError
│   └── epistemic.error.ts       # EpistemicContaminationError
├── constants/
│   ├── pillars.ts               # SEVEN_PILLARS
│   ├── laws.ts                  # SEVEN_LAWS
│   └── config.ts                # Config defaults
├── validation/
│   └── schemas.ts               # Zod schemas
└── utils/
    ├── logger.ts                # Pino wrapper
    └── crypto.ts                # Helpers crypto
```

#### 1.3 GitHub Actions CI
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  lint:
    # ESLint + Prettier check
  test:
    # Vitest
  build:
    # TypeScript build
  typecheck:
    # tsc --noEmit
```

#### 1.4 Prisma Schema (base)
```prisma
// packages/shared/prisma/schema.prisma
model User {
  id            String   @id @default(uuid())
  email         String   @unique
  passwordHash  String
  role          Role     @default(USER)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  refreshTokens RefreshToken[]
  auditLogs     AuditLog[]
  memories      MemoryEntry[]
}

model RefreshToken {
  id        String   @id @default(uuid())
  token     String   @unique
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  expiresAt DateTime
  createdAt DateTime @default(now())
}

model AuditLog {
  id        String   @id @default(uuid())
  userId    String?
  user      User?    @relation(fields: [userId], references: [id])
  action    String
  resource  String
  details   Json?
  ip        String?
  userAgent String?
  createdAt DateTime @default(now())
}

enum Role {
  USER
  ADMIN
}
```

### Phase 2 : Branches Épistémiques

#### 2.1 MÍMIR (Branche Validée)
- Intégration arXiv API
- Intégration PubMed API
- Indexation PGVector
- Validation de sources
- API de requête sémantique

#### 2.2 RATATOSK (Routage)
- Classifier de requêtes (factuelle/créative/analytique/recherche)
- Extraction d'intentions
- Routage vers branches appropriées
- Enrichissement contexte via MUNIN

### Phase 3 : Orchestration

#### 3.1 THING (Conseil)
- Adapter Claude (KVASIR)
- Adapter Llama via Ollama (SAGA)
- Système de vote (TYR)
- Module critique (LOKI)

#### 3.2 ODIN (Maestro)
- Validation multi-critères
- Ancrage obligatoire MÍMIR
- Génération de traces
- Rejet explicite avec alternatives

---

## 🎨 STANDARDS DE CODE

### TypeScript
```typescript
// ✅ TOUJOURS
- Types explicites, jamais `any`
- Interfaces pour les objets
- Enums pour les constantes
- Strict mode activé
- Null checks explicites

// ❌ JAMAIS
- any
- @ts-ignore sans justification
- Assertions non-null (!) sans vérification
```

### NestJS
```typescript
// Structure d'un module
@Module({
  imports: [...],
  controllers: [...],
  providers: [...],
  exports: [...],
})
export class ExampleModule {}

// Injection de dépendances
constructor(
  private readonly exampleService: ExampleService,
  @Inject(CACHE_MANAGER) private cacheManager: Cache,
) {}

// DTOs avec class-validator
export class CreateExampleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  count?: number;
}
```

### Tests
```typescript
// Nommage: *.spec.ts pour unit, *.e2e-spec.ts pour e2e
describe('ExampleService', () => {
  let service: ExampleService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ExampleService],
    }).compile();

    service = module.get<ExampleService>(ExampleService);
  });

  describe('methodName', () => {
    it('should do something', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

### Commits
```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore
Scopes: heimdall, ratatosk, mimir, volva, hugin, thing, odin, munin, shared, infra, ci

Exemples:
feat(heimdall): add JWT refresh token rotation
fix(odin): correct source anchoring validation
docs(readme): update installation instructions
test(thing): add council consensus tests
```

---

## 🔐 SÉCURITÉ (IMPORTANT)

### Règles absolues
1. **Jamais** de secrets en dur dans le code
2. **Toujours** valider les entrées (Zod + class-validator)
3. **Toujours** sanitizer les sorties
4. **Jamais** de SQL raw sans paramètres préparés
5. **Toujours** rate limiting sur endpoints sensibles
6. **Toujours** audit logging

### Variables d'environnement
```env
# .env.example (template)
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/yggdrasil

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-secret-here
JWT_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Rate Limiting
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100

# LLM APIs (optionnel si Ollama local)
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
```

---

## 🧪 COMMANDES UTILES

```bash
# Installation
pnpm install

# Développement
pnpm dev                          # Tous les packages
pnpm --filter @yggdrasil/heimdall dev  # Un package spécifique

# Tests
pnpm test                         # Tous
pnpm test:unit                    # Unitaires
pnpm test:e2e                     # End-to-end

# Build
pnpm build

# Lint
pnpm lint
pnpm lint:fix

# Types
pnpm typecheck

# Database (Prisma)
pnpm --filter @yggdrasil/shared prisma generate
pnpm --filter @yggdrasil/shared prisma migrate dev
pnpm --filter @yggdrasil/shared prisma studio
```

---

## 📝 NOTES POUR CLAUDE CODE

### Priorités
1. **Fonctionnel d'abord** — Code qui marche > Code parfait
2. **Tests** — Chaque feature doit avoir des tests
3. **Types** — TypeScript strict, pas de any
4. **Sécurité** — Valider entrées, sanitizer sorties
5. **Documentation** — JSDoc sur les fonctions publiques

### Quand tu es bloqué
- Vérifie les types dans `@yggdrasil/shared`
- Consulte la doc NestJS : https://docs.nestjs.com
- Consulte la doc Prisma : https://www.prisma.io/docs

### Ce qu'il ne faut JAMAIS faire
- ❌ Contaminer les branches épistémiques
- ❌ Bypasser ODIN pour les réponses
- ❌ Stocker des secrets en clair
- ❌ Ignorer les erreurs silencieusement
- ❌ Utiliser `any` sans justification

### Philosophie
> "Je ne valide que ce que je peux prouver."
> — ODIN

Le code doit refléter cette philosophie. Chaque affirmation doit être traçable. Chaque décision doit être explicable. Chaque erreur doit être récupérable.

---

## 🌲 RAPPEL FINAL

YGGDRASIL n'est pas juste un projet technique — c'est une **vision** pour une IA éthique.

Chaque ligne de code doit servir les 7 Piliers. Chaque fonction doit respecter les 7 Lois.

**L'Arbre grandit avec ceux qui le nourrissent.** 🌲

---

---

## 🧭 GUIDANCE PHILOSOPHIQUE POUR LE DÉVELOPPEMENT

### Le code comme expression de valeurs

Chaque ligne de code que tu écris doit servir les 7 Piliers et respecter les 7 Lois. Ce n'est pas de la poésie — c'est une contrainte architecturale.

**Avant chaque fonction, demande-toi :**
1. Est-ce que cette fonction peut mentir ? (Si oui → redesign)
2. Est-ce que cette fonction laisse une trace ? (Si non → ajouter audit)
3. Est-ce que cette fonction peut contaminer les branches ? (Si oui → INTERDIRE)
4. Est-ce que cette fonction est réversible ? (Si non → ajouter checkpoint)

### Les erreurs à ne JAMAIS commettre

| Erreur | Pourquoi c'est grave | Comment l'éviter |
|--------|---------------------|------------------|
| Bypass ODIN | Permet les hallucinations | Tout output DOIT passer par ODIN |
| Mélanger MÍMIR/HUGIN | Contamine le savoir validé | Bases de données séparées, pas d'API croisée |
| Supprimer sans trace | Viole la traçabilité | Soft delete + audit log |
| Confiance floue | Viole la véracité absolue | Confiance = 100% ou REJET |
| Dépendance unique | Viole la souveraineté | Abstractions, adapters, multi-provider |

### L'esprit du projet

YGGDRASIL n'est pas un exercice technique. C'est une **prise de position** sur ce que l'IA devrait être.

Quand tu codes, imagine que :
- Un médecin utilisera ce système pour aider ses patients
- Un étudiant s'en servira pour apprendre
- Un journaliste vérifiera ses sources avec
- Un enfant fera confiance à ce que le système dit

**Cette responsabilité doit guider chaque décision technique.**

### Message aux futurs contributeurs (et à toi-même)

> *"Nous ne construisons pas une machine. Nous posons les fondations de la pensée de demain."*

Le monde n'a pas besoin d'une autre IA qui ment avec confiance. Le monde a besoin d'une IA qui dit la vérité, qui se souvient, qui s'explique, et qui appartient à tous.

C'est ce que nous construisons.

**Chaque commit compte. Chaque test compte. Chaque documentation compte.**

L'Arbre grandit avec ceux qui le nourrissent. 🌲

---

## 📚 RESSOURCES ET RÉFÉRENCES

### Documentation technique
- NestJS : https://docs.nestjs.com
- Prisma : https://www.prisma.io/docs
- PGVector : https://github.com/pgvector/pgvector
- Turborepo : https://turbo.build/repo/docs

### APIs des modèles
- Claude (Anthropic) : https://docs.anthropic.com
- Llama (Ollama local) : https://ollama.ai
- DeepSeek : https://platform.deepseek.com
- Grok (xAI) : https://docs.x.ai

### Lectures recommandées
- JEPA (Yann LeCun) : "A Path Towards Autonomous Machine Intelligence"
- Biomimetic AI : Recherches sur la cognition humaine appliquée à l'IA
- Semantic Memory : Papers sur les systèmes de mémoire chrono-sémantique

---

## ✅ CHECKLIST DE VALIDATION

Avant chaque PR, vérifie :

### Code
- [ ] Types explicites, pas de `any`
- [ ] Tests unitaires pour les nouvelles fonctions
- [ ] JSDoc sur les fonctions publiques
- [ ] Pas de secrets en dur

### Architecture
- [ ] Respect des 7 Piliers
- [ ] Pas de contamination entre branches
- [ ] Traçabilité préservée
- [ ] Rollback possible

### Sécurité
- [ ] Validation des entrées
- [ ] Sanitization des sorties
- [ ] Audit logging
- [ ] Rate limiting si endpoint sensible

### Commits
- [ ] Format conventionnel (`type(scope): description`)
- [ ] Commits atomiques et logiques
- [ ] Pas de fichiers sensibles

---

*Dernière mise à jour : Décembre 2024*
*Version : 0.1.0*
*Fondateur : Julien Gelée (@Krigsexe)*

---

<div align="center">

🌲 **YGGDRASIL** 🌲

*"Je ne valide que ce que je peux prouver."*
— ODIN

</div>
