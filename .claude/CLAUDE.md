# 🌲 YGGDRASIL — Guide Complet pour Claude Code

> **L'Arbre-Monde de l'Intelligence Artificielle**
> *Une AGI éthique, souveraine et vérifiable — construite par l'humanité, pour l'humanité.*

---

## 📜 ORIGINE ET CONTEXTE DU PROJET

### Qui construit YGGDRASIL

**Julien Gelée** (GitHub: Krigsexe), fondateur d'**Alixia** — une plateforme SaaS suisse de marketing digital automation, positionnée comme alternative éthique aux géants anglo-saxons avec une identité "Swiss digital watchmaking".

Julien apporte une vision d'entrepreneur tech européen soucieux de :
- Souveraineté numérique
- Éthique de l'IA
- Open source comme bien commun
- Qualité suisse appliquée au logiciel

### L'Évolution du Projet : ODIN → AEGIS → YGGDRASIL

Le projet a évolué à travers plusieurs itérations de naming :

1. **ODIN** (premier nom) — Référence directe au dieu nordique de la sagesse
   - *Problème* : Nom trop générique, conflits potentiels, connotation guerrière

2. **AEGIS** (Autonomous Ethical General Intelligence System) — Bouclier protecteur
   - *Problème* : Trop acronyme tech, perd la dimension mythologique profonde

3. **YGGDRASIL** (nom final) — L'Arbre-Monde de la mythologie nordique
   - *Pourquoi* : Métaphore parfaite d'une architecture interconnectée
   - L'arbre cosmique qui connecte les neuf mondes
   - Ses racines puisent dans le puits de Mímir (la sagesse)
   - Ses branches abritent tous les êtres
   - Image d'un système vivant, croissant, nourri par la communauté

---

## 🎯 LA QUESTION FONDATRICE

Le projet est né d'une question philosophique et technique adressée conceptuellement à **Yann LeCun** :

> *« Étant donné votre position selon laquelle la véritable intelligence artificielle générale (AGI) nécessite un apprentissage autonome du modèle du monde et des agents orientés vers des objectifs, plutôt que de simples modèles de langage à grande échelle, comment évaluer le potentiel à long terme d'une « société de modèles spécialisés » rigoureusement conçue et coordonnée (vision, langage, planification, raisonnement formel, recherche d'information) contrôlée par un contrôleur central qui :*
>
> *- sépare strictement les connaissances scientifiques validées, la recherche exploratoire et les données Internet en temps réel afin d'éviter la contamination épistémique ;*
>
> *- ne délivre que des réponses pouvant être liées à des faits formellement vérifiés (en rejetant même un niveau de confiance de 99,9 % si ces réponses ne sont pas vérifiables) ;*
>
> *- maintient une mémoire chrono-sémantique persistante de toutes les interactions et décisions internes, conçue d'une manière analogue à la mémoire humaine (similaire à nos avancées inspirées par la nature en aéronautique) ?*
>
> *Pensez-vous qu'une telle architecture pourrait constituer une véritable voie de transition vers l'AGI, complémentaire aux agents avec des modèles mondes auto-apprenants, ou pensez-vous qu'il s'agit d'un échafaudage fondamentalement limité, destiné à être supplanté par un agent unique, plus unifié et auto-supervisé, basé sur un modèle mondial ? »*

Cette question capture l'essence de YGGDRASIL : **une architecture de transition vers l'AGI qui ne prétend pas remplacer les approches comme JEPA, mais les compléter.**

---

## 🔬 RECHERCHES ET ANALYSE PRÉALABLES

### Contexte de Recherche (Perplexity Deep Research)

Avant de formaliser YGGDRASIL, des recherches approfondies ont été menées sur :

1. **Agrégateurs de LLM existants** — Analyse des solutions comme :
   - OpenRouter (routing économique)
   - LangChain (orchestration)
   - AutoGPT, BabyAGI (agents autonomes)
   - ChatGPT Plugins, Perplexity (intégration web)

2. **Constats principaux** :
   - Aucun système n'implémente une **séparation épistémique stricte**
   - Les "fact-checking" actuels sont probabilistes, jamais 100% vérifiés
   - La mémoire est soit absente, soit primitive (simple RAG)
   - Tous dépendent de providers propriétaires sans souveraineté

3. **Gap identifié** — Il n'existe pas de système qui :
   - Distingue formellement le prouvé du probable du bruit
   - Refuse de répondre si non vérifiable
   - Maintient une mémoire structurée et réversible
   - Soit véritablement open-source et auto-hébergeable

### Complémentarité avec JEPA (Joint Embedding Predictive Architecture)

YGGDRASIL est conçu comme **complémentaire** à l'approche JEPA de Yann LeCun :

| Aspect | JEPA (LeCun) | YGGDRASIL |
|--------|--------------|-----------|
| **Approche** | Modèle monde auto-supervisé | Orchestration de spécialistes |
| **Apprentissage** | Apprend sa propre représentation du monde | Mutualise des modèles pré-entraînés |
| **Échelle** | Un seul agent unifié | Consortium coordonné |
| **Timing** | Horizon 10-20 ans | Réalisable maintenant |
| **Énergie** | Entraînement massif | Zéro entraînement |
| **Vérifiabilité** | Émergente | Architecturée |

**Thèse centrale** : YGGDRASIL peut servir de "système cognitif externe" pendant que JEPA et approches similaires mûrissent. Quand un vrai modèle monde émergera, YGGDRASIL pourra l'intégrer comme membre du THING Council plutôt que d'être rendu obsolète.

**Analogie biomimétique** : Comme l'aéronautique s'est inspirée des oiseaux sans les copier exactement, YGGDRASIL s'inspire de la cognition humaine (mémoire épisodique, séparation des sources, raisonnement délibératif) sans prétendre la répliquer.

---

## 🌑 LE DIAGNOSTIC : Pourquoi YGGDRASIL ?

### La Triple Course Actuelle

L'industrie de l'IA est engagée dans trois courses simultanées et problématiques :

1. **Course à la Puissance** — Toujours plus de paramètres, de données, de compute
2. **Course à la Vitesse** — Répondre le plus vite, quitte à halluciner
3. **Course au Contrôle** — Quelques corporations veulent dominer l'AGI

### Les Conséquences Directes

| Problème | Réalité | Impact |
|----------|---------|--------|
| **Hallucinations** | 20-30% de fausses informations présentées comme vérités | Désinformation systémique |
| **Opacité** | Impossible de savoir pourquoi un modèle répond X | Aucune responsabilité |
| **Amnésie** | Chaque conversation repart de zéro | Inefficacité, répétition |
| **Dépendance** | Quelques APIs propriétaires | Fragilité, vendor lock-in |
| **Inégalité** | L'IA la plus avancée = la plus chère | Fossé numérique |
| **Souveraineté** | Données traitées hors juridiction | Risques légaux et éthiques |

### La Vraie Question

> **L'AGI — la technologie la plus transformatrice de l'histoire humaine — doit-elle être développée par et pour des actionnaires, ou par et pour l'humanité ?**

---

## ✨ LA VISION : Une IA qui dit "vérifié + sources" ou "je ne sais pas"

### Le Slogan Fondateur

> **« Une IA qui dit 'vérifié + sources' ou 'je ne sais pas' — jamais 'probablement vrai' »**

### Comparaison Paradigmatique

| Principe | Approche Actuelle | Approche YGGDRASIL |
|----------|-------------------|---------------------|
| **Vérité** | "Probablement vrai" | "Vérifié + sources" ou "Je ne sais pas" |
| **Mémoire** | Reset à chaque session | Mémoire chrono-sémantique persistante |
| **Sources** | Mélange opaque | Séparation stricte : Validé / Recherche / Internet |
| **Modèles** | Un géant monolithique | Consortium de spécialistes orchestrés |
| **Contrôle** | Corporations privées | Open-source, auto-hébergeable, fédérable |
| **Énergie** | Entraîner toujours plus | Mutualiser l'existant |

### Les Trois Innovations Clés

1. **Séparation Épistémique** — Jamais de mélange entre prouvé, hypothétique et bruit
2. **Validation 100%** — Soit ancré dans des sources, soit silence
3. **Mémoire Vivante** — Comme la mémoire humaine, pas comme une base de données

---

## 🌲 SYMBOLIQUE NORDIQUE : L'Arbre-Monde

### Pourquoi la Mythologie Nordique ?

La mythologie nordique offre un cadre symbolique parfait pour une architecture d'IA éthique :

- **Yggdrasil** lui-même — L'arbre cosmique qui connecte tous les mondes
- **Symbolisme de croissance** — L'arbre grandit avec ceux qui le nourrissent
- **Équilibre des forces** — Dieux, géants, humains, tous connectés
- **Sagesse par sacrifice** — Odin sacrifie son œil pour la connaissance
- **Communauté de décision** — Le Thing, assemblée démocratique

### Mapping Complet des Composants

| Composant | Rôle | Inspiration Nordique |
|-----------|------|----------------------|
| **HEIMDALL** | Gateway — Auth, rate limiting, audit | Le gardien du Bifröst qui voit et entend tout |
| **RATATOSK** | Routage — Classification, extraction | L'écureuil messager qui parcourt l'arbre |
| **MÍMIR** | Branche Validée — Connaissances 100% | Le puits de sagesse où Odin sacrifia son œil |
| **VÖLVA** | Branche Recherche — Hypothèses | La voyante qui explore l'inconnu |
| **HUGIN** | Branche Internet — Info non vérifiée | "Pensée" — corbeau explorateur d'Odin |
| **THING** | Consortium — Délibération multi-modèles | L'assemblée où les dieux décident |
| **ODIN** | Maestro — Validation finale, synthèse | Le Père-de-Tout, celui qui sait |
| **MUNIN** | Mémoire — Stockage chrono-sémantique | "Mémoire" — l'autre corbeau d'Odin |

### Les Corbeaux d'Odin

Dans la mythologie, Odin envoie chaque matin ses deux corbeaux :
- **Hugin** (Pensée) explore le monde et rapporte les nouvelles
- **Munin** (Mémoire) se souvient de tout

Dans YGGDRASIL :
- **HUGIN** explore Internet et rapporte les informations (non vérifiées)
- **MUNIN** stocke la mémoire de toutes les interactions et décisions

---

## ⚡ LES SEPT PILIERS

YGGDRASIL repose sur sept principes **intransgressibles** :

### 1. 🎯 Véracité Absolue
> *« Jamais de probabilité. La certitude ou le silence. »*

YGGDRASIL dit "vérifié, voici les sources" ou "je ne sais pas". Jamais "c'est probablement vrai".

### 2. 🔍 Traçabilité Totale
> *« Chaque pensée a une origine. Chaque décision a une trace. »*

Chaque réponse peut être auditée : d'où vient l'information, pourquoi cette décision, quel chemin de raisonnement.

### 3. 📚 Séparation Épistémique
> *« Le savoir, l'hypothèse et le bruit ne se mélangent jamais. »*

Trois branches strictement séparées :
- **MÍMIR** — Connaissances scientifiquement prouvées
- **VÖLVA** — Hypothèses et théories en exploration
- **HUGIN** — Informations internet non vérifiées

### 4. 🧠 Mémoire Vivante
> *« Une intelligence sans mémoire n'est qu'un réflexe. »*

YGGDRASIL se souvient : interactions passées, décisions prises, erreurs corrigées, contextes évolutifs.

### 5. ⏪ Réversibilité
> *« Aucune erreur n'est définitive. »*

Rollback possible vers n'importe quel état passé. Correction des décisions basées sur des informations ultérieurement invalidées.

### 6. 🏛️ Souveraineté
> *« Les données de l'humanité appartiennent à l'humanité. »*

Open-source, auto-hébergeable, fédérable, auditable. Aucune dépendance à un fournisseur unique.

### 7. 🌱 Soutenabilité
> *« Une intelligence qui détruit sa planète n'est pas intelligente. »*

Mutualisation des modèles existants. Zéro entraînement de nouveaux modèles. Métriques de consommation transparentes.

---

## ⚖️ LES SEPT LOIS

Au-delà des piliers (principes), les lois sont des **règles impératives** qui gouvernent le comportement du système :

### Loi 1 : Primauté de la Vérité
```
SI confidence < 100% ET NOT ancré_dans_source_vérifiée
ALORS réponse = "Je ne sais pas" + raison
```

### Loi 2 : Transparence Absolue
```
POUR CHAQUE réponse:
  INCLURE trace_complète {
    sources_consultées,
    chemins_de_raisonnement,
    modèles_impliqués,
    décisions_intermédiaires
  }
```

### Loi 3 : Séparation des Savoirs
```
JAMAIS mélanger:
  - MÍMIR (prouvé) avec VÖLVA (hypothèse)
  - VÖLVA (hypothèse) avec HUGIN (bruit)
  - HUGIN (bruit) avec MÍMIR (prouvé)
```

### Loi 4 : Oubli Sélectif
```
SI information_invalidée:
  ALORS propager_invalidation(toutes_décisions_dérivées)
  ET marquer_comme_obsolète
  ET notifier_utilisateurs_concernés
```

### Loi 5 : Souveraineté des Données
```
TOUTES les données personnelles:
  - RESTENT sous juridiction de l'utilisateur
  - PEUVENT être exportées à tout moment
  - PEUVENT être supprimées définitivement
  - NE SONT JAMAIS vendues ou partagées
```

### Loi 6 : Sobriété Computationnelle
```
POUR CHAQUE requête:
  - UTILISER le minimum de ressources nécessaires
  - RAPPORTER la consommation (tokens, énergie estimée)
  - PRIVILÉGIER les modèles locaux quand pertinent
```

### Loi 7 : Ouverture Perpétuelle
```
LE CODE de YGGDRASIL:
  - EST ET RESTERA open-source
  - NE PEUT être fermé, breveté ou privatisé
  - APPARTIENT à l'humanité
```

---

## 🏗️ ARCHITECTURE COMPLÈTE

### Vue d'Ensemble

```
MONDE → HEIMDALL → RATATOSK → [MÍMIR|VÖLVA|HUGIN] → THING → ODIN → MUNIN → RÉPONSE
        Gateway    Routage     Les Trois Branches    Conseil  Maestro Mémoire  Validée
```

### Flux de Traitement Détaillé

```mermaid
graph TD
    U[Utilisateur] -->|Requête| H[HEIMDALL<br/>Gateway]
    H -->|Auth OK| R[RATATOSK<br/>Routeur]
    
    R -->|Fait scientifique| M[MÍMIR<br/>Validé]
    R -->|Hypothèse/Théorie| V[VÖLVA<br/>Recherche]
    R -->|Info actuelle| HU[HUGIN<br/>Internet]
    
    M --> T[THING<br/>Conseil]
    V --> T
    HU --> T
    
    T -->|Délibération| O[ODIN<br/>Maestro]
    O -->|Validation 100%| MU[MUNIN<br/>Mémoire]
    MU -->|Réponse| U
    
    O -->|Rejet| REJ[Réponse:<br/>Je ne sais pas]
    REJ --> U
```

### Les 8 Composants

#### 1. HEIMDALL — Le Gardien (Gateway)

**Responsabilités :**
- Authentification (JWT, OAuth2/OIDC)
- Rate limiting (protection contre abus)
- Audit logging (traçabilité de toutes les requêtes)
- Validation des entrées
- TLS/mTLS

**Package :** `@yggdrasil/heimdall`

```typescript
interface HeimdallConfig {
  jwt: {
    secret: string;
    expiresIn: string;
    refreshExpiresIn: string;
  };
  rateLimit: {
    windowMs: number;
    maxRequests: number;
    bypassRoles: Role[];
  };
  audit: {
    enabled: boolean;
    retention: string;
    sensitiveFields: string[];
  };
}
```

#### 2. RATATOSK — Le Messager (Routeur)

**Responsabilités :**
- Classification des requêtes (type, domaine, complexité)
- Extraction du contexte
- Routage vers la branche appropriée
- Détection d'intention

**Package :** `@yggdrasil/ratatosk`

```typescript
interface RouteDecision {
  primaryBranch: EpistemicBranch;
  secondaryBranches?: EpistemicBranch[];
  complexity: 'simple' | 'moderate' | 'complex';
  requiredCouncilMembers: CouncilMember[];
  estimatedTokens: number;
}
```

#### 3. MÍMIR — Le Puits de Sagesse (Branche Validée)

**Responsabilités :**
- Connaissances scientifiquement prouvées uniquement
- Sources : arXiv, PubMed, ISO, RFC, Wikidata vérifié
- Confiance : 100% ou rejet
- Jamais d'interpolation ou d'extrapolation

**Package :** `@yggdrasil/mimir`

```typescript
interface MimirSource {
  type: 'arxiv' | 'pubmed' | 'iso' | 'rfc' | 'wikidata';
  identifier: string;
  url: string;
  verificationDate: Date;
  trustScore: 100; // Toujours 100 pour MÍMIR
}
```

#### 4. VÖLVA — La Voyante (Branche Recherche)

**Responsabilités :**
- Hypothèses et théories en cours d'exploration
- Preprints, working papers, recherche active
- Confiance : 50-99% (jamais présenté comme certain)
- Marquage explicite du statut hypothétique

**Package :** `@yggdrasil/volva`

```typescript
interface VolvaHypothesis {
  statement: string;
  confidence: number; // 50-99
  supportingEvidence: Source[];
  contradictingEvidence: Source[];
  status: 'emerging' | 'debated' | 'promising' | 'declining';
}
```

#### 5. HUGIN — Le Corbeau Pensée (Branche Internet)

**Responsabilités :**
- Informations web en temps réel
- Actualités, données live, tendances
- Confiance : 0-49% (toujours traité avec prudence)
- Filtrage des sources douteuses

**Package :** `@yggdrasil/hugin`

```typescript
interface HuginWebContent {
  url: string;
  fetchedAt: Date;
  trustScore: number; // 0-49
  biasIndicators: BiasIndicator[];
  factCheckStatus: 'unchecked' | 'disputed' | 'partially_verified';
}
```

#### 6. THING — L'Assemblée (Conseil Multi-Modèles)

**Responsabilités :**
- Délibération entre modèles spécialisés
- Chaque membre apporte sa perspective
- LOKI challenge systématiquement
- TYR arbitre les conflits

**Package :** `@yggdrasil/thing`

**Membres du Conseil :**

| Membre | Spécialité | Modèle Suggéré | Rôle |
|--------|------------|----------------|------|
| **KVASIR** | Raisonnement profond | Claude | Le sage qui pense longuement |
| **BRAGI** | Créativité, éloquence | Grok | Le poète qui trouve les mots |
| **NORNES** | Calcul, logique formelle | DeepSeek | Les tisseuses du destin logique |
| **SAGA** | Connaissance générale | Llama | La conteuse qui sait tout |
| **SÝN** | Vision multimodale | Gemini | La gardienne qui voit tout |
| **LOKI** | Critique, adversarial | Red team | Le trickster qui doute |
| **TYR** | Arbitrage, consensus | Voting system | Le juge qui tranche |

> **Note importante :** SÝN (déesse gardienne qui "voit" les demandes) remplace l'ancien nom HEIMDALL pour la vision multimodale, évitant le conflit avec HEIMDALL le Gateway.

```typescript
interface CouncilDeliberation {
  query: string;
  responses: Map<CouncilMember, CouncilResponse>;
  lokiChallenges: Challenge[];
  tyrVerdict: Verdict;
  consensusLevel: 'unanimous' | 'majority' | 'split' | 'deadlock';
  finalProposal: string;
}
```

#### 7. ODIN — Le Père-de-Tout (Maestro)

**Responsabilités :**
- Validation finale de chaque réponse
- Synthèse des délibérations du THING
- Application des Sept Lois
- Décision finale : approuver ou rejeter

**Package :** `@yggdrasil/odin`

```typescript
interface OdinDecision {
  approved: boolean;
  confidence: number;
  validationTrace: ValidationStep[];
  anchoredSources: Source[];
  rejectionReason?: RejectionReason;
  responseIfApproved?: string;
  alternativeIfRejected: string; // "Je ne sais pas car..."
}
```

#### 8. MUNIN — Le Corbeau Mémoire (Stockage)

**Responsabilités :**
- Mémoire chrono-sémantique persistante
- Stockage de toutes les interactions
- Checkpoints pour rollback
- Propagation des invalidations

**Package :** `@yggdrasil/munin`

```typescript
interface MemoryEntry {
  id: string;
  userId: string;
  type: 'interaction' | 'decision' | 'correction' | 'checkpoint';
  content: unknown;
  embedding: number[]; // Pour recherche sémantique
  createdAt: Date;
  validUntil?: Date;
  invalidatedBy?: string;
  dependencies: string[]; // Chaîne de causalité
}
```

---

## 📐 FORMULATION TECHNIQUE DU PROBLÈME

### Le Problème Central

L'IA générative actuelle optimise :

```
P(réponse|contexte) → max
```

Ce qui maximise la vraisemblance de la réponse, pas sa véracité.

### La Solution YGGDRASIL

YGGDRASIL introduit une couche de validation qui transforme :

```
réponse_finale = ODIN(
  THING(
    MÍMIR(contexte) ∪ VÖLVA(contexte) ∪ HUGIN(contexte)
  ),
  mémoire = MUNIN(userId)
)

où:
  réponse_finale ∈ {réponse_validée, "Je ne sais pas"}
```

### Règles de Séparation Épistémique

```typescript
// La contamination est INTERDITE
type EpistemicRule = 
  | { from: 'MIMIR', to: 'VOLVA', allowed: false }
  | { from: 'MIMIR', to: 'HUGIN', allowed: false }
  | { from: 'VOLVA', to: 'MIMIR', allowed: false }
  | { from: 'VOLVA', to: 'HUGIN', allowed: false }
  | { from: 'HUGIN', to: 'MIMIR', allowed: false }
  | { from: 'HUGIN', to: 'VOLVA', allowed: false };

// Seule direction autorisée : élévation avec preuve
type Elevation = {
  from: 'HUGIN',
  to: 'VOLVA',
  requires: 'peer_review' | 'multiple_independent_sources'
} | {
  from: 'VOLVA',
  to: 'MIMIR',
  requires: 'published_peer_reviewed' | 'replicated_experiment'
};
```

---

## 🛠️ STACK TECHNIQUE

### Technologies Core

| Couche | Technologie | Justification |
|--------|-------------|---------------|
| **Runtime** | Node.js 20+ (LTS) | Écosystème mature, performance |
| **Framework** | NestJS | Architecture modulaire, DI, patterns enterprise |
| **Language** | TypeScript (strict) | Type safety, maintenabilité |
| **Build** | pnpm + Turborepo | Monorepo efficace, cache partagé |
| **Database** | PostgreSQL 16+ | Robuste, JSONB, extensions |
| **Vectors** | pgvector | Embeddings dans PostgreSQL |
| **Cache** | Redis | Sessions, rate limiting, cache |
| **Queue** | BullMQ | Jobs asynchrones, retries |
| **ORM** | Prisma | Type-safe, migrations, introspection |
| **Validation** | Zod | Runtime validation, TypeScript-first |
| **Tests** | Vitest | Rapide, compatible Jest, ESM natif |
| **E2E** | Playwright | Tests cross-browser |
| **Docs** | TypeDoc + Docusaurus | API docs + site |

### Configuration TypeScript

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true,
    "noPropertyAccessFromIndexSignature": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

---

## 📁 STRUCTURE DU MONOREPO

```
yggdrasil/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml              # Lint, test, build
│   │   ├── cd-staging.yml      # Deploy staging
│   │   └── cd-prod.yml         # Deploy production
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md
│       ├── feature_request.md
│       └── security_report.md
│
├── docs/
│   ├── architecture/
│   │   ├── OVERVIEW.md
│   │   ├── SEVEN_PILLARS.md
│   │   └── SEVEN_LAWS.md
│   ├── technical/
│   │   ├── GETTING_STARTED.md
│   │   ├── API.md
│   │   └── DEPLOYMENT.md
│   └── contributing/
│       └── DEVELOPMENT.md
│
├── packages/
│   ├── heimdall/               # Gateway
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   ├── auth/
│   │   │   ├── rate-limit/
│   │   │   ├── audit/
│   │   │   └── health/
│   │   ├── test/
│   │   └── package.json
│   │
│   ├── ratatosk/               # Router
│   │   ├── src/
│   │   │   ├── classifier/
│   │   │   ├── context/
│   │   │   └── router/
│   │   └── package.json
│   │
│   ├── mimir/                  # Validated Branch
│   │   ├── src/
│   │   │   ├── sources/
│   │   │   ├── validation/
│   │   │   └── index/
│   │   └── package.json
│   │
│   ├── volva/                  # Research Branch
│   │   ├── src/
│   │   │   ├── hypotheses/
│   │   │   └── papers/
│   │   └── package.json
│   │
│   ├── hugin/                  # Internet Branch
│   │   ├── src/
│   │   │   ├── crawler/
│   │   │   ├── filter/
│   │   │   └── trust/
│   │   └── package.json
│   │
│   ├── thing/                  # Council
│   │   ├── src/
│   │   │   ├── members/
│   │   │   │   ├── kvasir.ts
│   │   │   │   ├── bragi.ts
│   │   │   │   ├── nornes.ts
│   │   │   │   ├── saga.ts
│   │   │   │   ├── syn.ts
│   │   │   │   ├── loki.ts
│   │   │   │   └── tyr.ts
│   │   │   ├── deliberation/
│   │   │   └── voting/
│   │   └── package.json
│   │
│   ├── odin/                   # Maestro
│   │   ├── src/
│   │   │   ├── validation/
│   │   │   ├── synthesis/
│   │   │   └── decision/
│   │   └── package.json
│   │
│   ├── munin/                  # Memory
│   │   ├── src/
│   │   │   ├── storage/
│   │   │   ├── retrieval/
│   │   │   ├── checkpoint/
│   │   │   └── invalidation/
│   │   └── package.json
│   │
│   └── shared/                 # Shared utilities
│       ├── src/
│       │   ├── types/
│       │   ├── constants/
│       │   ├── errors/
│       │   └── utils/
│       └── package.json
│
├── infra/                      # Terraform
│   ├── modules/
│   │   ├── network/
│   │   ├── database/
│   │   ├── compute/
│   │   └── monitoring/
│   ├── environments/
│   │   ├── staging/
│   │   └── production/
│   └── main.tf
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── scripts/
│   ├── setup.sh
│   ├── dev.sh
│   └── deploy.sh
│
├── .env.example
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.json
├── README.md
├── MANIFESTO.md
├── CONTRIBUTING.md
├── LICENSE
├── SECURITY.md
├── ROADMAP.md
└── CLAUDE.md                   # CE FICHIER
```

---

## 🎯 PHASE 1 : TÂCHES IMMÉDIATES

### Objectif Phase 1

Créer un **prototype fonctionnel minimal** :
- HEIMDALL opérationnel (auth + rate limit + audit)
- Types partagés complets
- CI/CD configuré
- Base de données avec schéma initial

### Tâches Détaillées

#### 1.1 HEIMDALL Gateway

```bash
# Dans packages/heimdall/
pnpm install
```

**Fichiers à créer :**

```typescript
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new FastifyAdapter({ logger: true })
  );
  
  // Helmet pour sécurité headers
  // CORS strict
  // Global validation pipe
  
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
```

```typescript
// src/app.module.ts
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    AuthModule,
    AuditModule,
    HealthModule,
  ],
})
export class AppModule {}
```

```typescript
// src/auth/auth.service.ts
@Injectable()
export class AuthService {
  async validateUser(email: string, password: string): Promise<User | null>;
  async login(user: User): Promise<TokenPair>;
  async refresh(refreshToken: string): Promise<TokenPair>;
  async logout(userId: string): Promise<void>;
}
```

```typescript
// src/audit/audit.interceptor.ts
@Injectable()
export class AuditInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const startTime = Date.now();
    
    return next.handle().pipe(
      tap(() => {
        this.auditService.log({
          userId: request.user?.id,
          method: request.method,
          path: request.url,
          statusCode: response.statusCode,
          duration: Date.now() - startTime,
          timestamp: new Date(),
        });
      })
    );
  }
}
```

#### 1.2 Types Partagés (@yggdrasil/shared)

Déjà créés dans `packages/shared/src/index.ts` — voir le fichier existant.

#### 1.3 Schéma Prisma

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================================================
// AUTH
// ============================================================================

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String
  role          Role      @default(USER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  refreshTokens RefreshToken[]
  memories      Memory[]
  auditLogs     AuditLog[]
  
  @@map("users")
}

enum Role {
  USER
  ADMIN
  SYSTEM
}

model RefreshToken {
  id        String   @id @default(cuid())
  token     String   @unique
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  createdAt DateTime @default(now())
  
  @@map("refresh_tokens")
}

// ============================================================================
// MEMORY (MUNIN)
// ============================================================================

model Memory {
  id           String       @id @default(cuid())
  userId       String
  user         User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  type         MemoryType
  content      Json
  embedding    Unsupported("vector(1536)")?
  createdAt    DateTime     @default(now())
  updatedAt    DateTime     @updatedAt
  validUntil   DateTime?
  invalidatedAt DateTime?
  invalidatedBy String?
  
  dependencies MemoryDependency[] @relation("MemoryDependencies")
  dependents   MemoryDependency[] @relation("DependentMemories")
  
  @@index([userId, type])
  @@map("memories")
}

enum MemoryType {
  INTERACTION
  DECISION
  CORRECTION
  CHECKPOINT
}

model MemoryDependency {
  id          String @id @default(cuid())
  memoryId    String
  memory      Memory @relation("MemoryDependencies", fields: [memoryId], references: [id], onDelete: Cascade)
  dependsOnId String
  dependsOn   Memory @relation("DependentMemories", fields: [dependsOnId], references: [id], onDelete: Cascade)
  
  @@unique([memoryId, dependsOnId])
  @@map("memory_dependencies")
}

// ============================================================================
// SOURCES
// ============================================================================

model Source {
  id           String       @id @default(cuid())
  type         SourceType
  identifier   String       // DOI, arXiv ID, URL, etc.
  url          String
  title        String
  authors      String[]
  publishedAt  DateTime?
  fetchedAt    DateTime     @default(now())
  trustScore   Int          // 0-100
  branch       EpistemicBranch
  metadata     Json?
  
  validations  ValidationSource[]
  
  @@unique([type, identifier])
  @@index([branch, trustScore])
  @@map("sources")
}

enum SourceType {
  ARXIV
  PUBMED
  ISO
  RFC
  WIKIDATA
  WEB
  OTHER
}

enum EpistemicBranch {
  MIMIR   // Validated, 100% confidence
  VOLVA   // Research, 50-99% confidence  
  HUGIN   // Internet, 0-49% confidence
}

// ============================================================================
// VALIDATION
// ============================================================================

model Validation {
  id              String             @id @default(cuid())
  requestId       String
  content         String
  isValid         Boolean
  confidence      Int
  rejectionReason RejectionReason?
  trace           Json
  createdAt       DateTime           @default(now())
  
  sources         ValidationSource[]
  
  @@map("validations")
}

model ValidationSource {
  id           String     @id @default(cuid())
  validationId String
  validation   Validation @relation(fields: [validationId], references: [id], onDelete: Cascade)
  sourceId     String
  source       Source     @relation(fields: [sourceId], references: [id])
  
  @@unique([validationId, sourceId])
  @@map("validation_sources")
}

enum RejectionReason {
  NO_SOURCE
  CONTRADICTS_MEMORY
  FAILED_CRITIQUE
  NO_CONSENSUS
  INSUFFICIENT_CONFIDENCE
  CONTAMINATION_DETECTED
}

// ============================================================================
// AUDIT
// ============================================================================

model AuditLog {
  id         String   @id @default(cuid())
  userId     String?
  user       User?    @relation(fields: [userId], references: [id], onDelete: SetNull)
  action     String
  resource   String
  resourceId String?
  method     String
  path       String
  statusCode Int
  duration   Int      // milliseconds
  metadata   Json?
  createdAt  DateTime @default(now())
  
  @@index([userId, createdAt])
  @@index([resource, action])
  @@map("audit_logs")
}
```

#### 1.4 GitHub Actions CI

```yaml
# .github/workflows/ci.yml

name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint

  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: yggdrasil_test
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      redis:
        image: redis:7
        ports:
          - 6379:6379
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm prisma generate
      - run: pnpm prisma migrate deploy
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/yggdrasil_test
      - run: pnpm test
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/yggdrasil_test
          REDIS_URL: redis://localhost:6379

  build:
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - run: pnpm typecheck
```

---

## 📏 STANDARDS DE CODE

### Conventions TypeScript

```typescript
// ✅ BON : Types explicites, nommage clair
interface UserCreationInput {
  email: string;
  password: string;
  role?: Role;
}

async function createUser(input: UserCreationInput): Promise<User> {
  // ...
}

// ❌ MAUVAIS : any, nommage vague
async function create(data: any) {
  // ...
}
```

### Conventions NestJS

```typescript
// ✅ BON : Injection de dépendances, décorateurs explicites
@Injectable()
export class ValidationService {
  constructor(
    private readonly sourceRepository: SourceRepository,
    private readonly logger: Logger,
  ) {}
  
  @Transactional()
  async validate(content: string): Promise<ValidationResult> {
    // ...
  }
}
```

### Conventions de Tests

```typescript
// ✅ BON : Tests descriptifs, AAA pattern
describe('ValidationService', () => {
  describe('validate', () => {
    it('should reject content without anchored sources', async () => {
      // Arrange
      const content = 'Some unverifiable claim';
      
      // Act
      const result = await service.validate(content);
      
      // Assert
      expect(result.isValid).toBe(false);
      expect(result.rejectionReason).toBe('NO_SOURCE');
    });
  });
});
```

### Commits (Conventional Commits)

```bash
# Format
<type>(<scope>): <description>

# Types
feat:     Nouvelle fonctionnalité
fix:      Correction de bug
docs:     Documentation
style:    Formatage (pas de changement de code)
refactor: Refactoring
perf:     Amélioration de performance
test:     Ajout/modification de tests
chore:    Maintenance, dépendances
ci:       Configuration CI/CD

# Exemples
feat(heimdall): add JWT refresh token rotation
fix(mimir): correct source verification logic
docs(readme): update installation instructions
```

---

## 🔐 SÉCURITÉ — Règles Absolues

### Ce qui NE DOIT JAMAIS arriver

1. **Secrets dans le code**
   ```typescript
   // ❌ INTERDIT
   const JWT_SECRET = 'mon-secret-en-dur';
   
   // ✅ OBLIGATOIRE
   const JWT_SECRET = process.env.JWT_SECRET;
   ```

2. **Injection SQL**
   ```typescript
   // ❌ INTERDIT
   const query = `SELECT * FROM users WHERE id = '${userId}'`;
   
   // ✅ OBLIGATOIRE (Prisma le fait automatiquement)
   const user = await prisma.user.findUnique({ where: { id: userId } });
   ```

3. **Données sensibles dans les logs**
   ```typescript
   // ❌ INTERDIT
   logger.info('User login', { password: user.password });
   
   // ✅ OBLIGATOIRE
   logger.info('User login', { userId: user.id });
   ```

4. **CORS ouvert**
   ```typescript
   // ❌ INTERDIT
   app.enableCors({ origin: '*' });
   
   // ✅ OBLIGATOIRE
   app.enableCors({ 
     origin: process.env.ALLOWED_ORIGINS?.split(','),
     credentials: true,
   });
   ```

5. **Rate limiting absent**
   ```typescript
   // ❌ INTERDIT : Endpoints publics sans rate limit
   
   // ✅ OBLIGATOIRE
   @Throttle({ default: { limit: 5, ttl: 60000 } })
   @Post('login')
   async login() { }
   ```

---

## 🧭 PHILOSOPHIE DE DÉVELOPPEMENT

### Le Code comme Expression des Valeurs

Chaque ligne de code doit refléter les Sept Piliers :

1. **Véracité** → Jamais de données mockées présentées comme réelles
2. **Traçabilité** → Logs structurés, traces complètes
3. **Séparation** → Modules isolés, responsabilités claires
4. **Mémoire** → Historique préservé, pas de données volatiles critiques
5. **Réversibilité** → Migrations réversibles, soft delete
6. **Souveraineté** → Pas de vendor lock-in, standards ouverts
7. **Soutenabilité** → Code maintenable, dette technique traquée

### Erreurs à Ne Jamais Commettre

| Erreur | Pourquoi c'est grave | Alternative |
|--------|---------------------|-------------|
| Mélanger les branches épistémiques | Viole le pilier 3 | Séparation stricte des sources |
| Répondre sans source | Viole le pilier 1 | "Je ne sais pas" |
| Supprimer l'historique | Viole le pilier 4 | Soft delete + archive |
| Dépendre d'un seul provider | Viole le pilier 6 | Abstractions, interfaces |
| Optimiser prématurément | Viole le pilier 7 | Code lisible d'abord |

### L'Esprit du Projet

> *« Nous ne construisons pas une machine. Nous posons les fondations de la pensée de demain. »*

Chaque contribution doit se demander :
- Est-ce que ça rend l'IA plus honnête ?
- Est-ce que ça donne plus de contrôle aux humains ?
- Est-ce que c'est compréhensible par un non-expert ?
- Est-ce que ça pourrait être utilisé à mauvais escient ?

---

## 👥 COMMUNAUTÉ

### Profils de Contributeurs

| Profil | Contribution | Compétences recherchées |
|--------|--------------|-------------------------|
| 🏗️ **Architectes** | Code, système, infra | NestJS, PostgreSQL, distributed systems |
| 🛡️ **Gardiens** | Éthique, gouvernance, review | Philosophie, droit, éthique IA |
| 🔬 **Éclaireurs** | Recherche, sources, validation | Sciences, peer review, fact-checking |
| ⚔️ **Critiques** | Red team, sécurité, adversarial | Pentest, attack vectors, stress test |
| 🌍 **Citoyens** | Tests, feedback, documentation | Curiosité, communication, pédagogie |

### Comment Contribuer

1. **Lire** le Manifeste et ce CLAUDE.md
2. **Choisir** une issue ou proposer une idée
3. **Discuter** dans les GitHub Discussions
4. **Forker** et créer une branche feature
5. **Coder** en respectant les standards
6. **Tester** (unit + integration)
7. **Pull Request** avec description détaillée
8. **Review** collaborative
9. **Merge** avec Conventional Commit

---

## 🔮 VISION LONG TERME

### Message aux Enfants de Demain

> *« Quand vous lirez ces lignes, l'Intelligence Artificielle Générale existera peut-être. Nous avons voulu qu'elle naisse dans la lumière — open-source, vérifiable, au service de l'humanité entière.*
>
> *Nous avons choisi la vérité plutôt que la probabilité. La transparence plutôt que l'opacité. La souveraineté plutôt que la dépendance. La soutenabilité plutôt que la croissance infinie.*
>
> *YGGDRASIL est un arbre. Il grandit avec ceux qui le nourrissent. S'il a grandi jusqu'à vous, c'est que des milliers de mains l'ont cultivé.*
>
> *Prenez-en soin. Faites-le grandir. Et n'oubliez jamais : une intelligence qui ment n'est pas intelligente. Une intelligence qui oublie n'est pas sage. Une intelligence qui détruit n'est pas vive.*
>
> *L'arbre est à vous maintenant. »*

---

## 📚 RESSOURCES ADDITIONNELLES

### Lectures Recommandées

- [JEPA: Joint Embedding Predictive Architecture](https://openreview.net/forum?id=BZ5a1r-kVsf) — Yann LeCun
- [Constitutional AI](https://arxiv.org/abs/2212.08073) — Anthropic
- [The Bitter Lesson](http://www.incompleteideas.net/IncIdeas/BitterLesson.html) — Rich Sutton
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762) — Vaswani et al.

### Projets Inspirants

- [LangChain](https://github.com/langchain-ai/langchain) — Orchestration LLM
- [AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) — Agents autonomes
- [Ollama](https://github.com/ollama/ollama) — Modèles locaux

### Standards Suivis

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [The Twelve-Factor App](https://12factor.net/)

---

## ✅ CHECKLIST POUR CLAUDE CODE

Avant chaque session de développement, vérifier :

- [ ] J'ai lu les Sept Piliers
- [ ] J'ai lu les Sept Lois
- [ ] Je sais quel composant je modifie
- [ ] Je comprends les interfaces avec les autres composants
- [ ] Je vais écrire des tests
- [ ] Je vais faire des commits conventionnels
- [ ] Je ne mets pas de secrets dans le code
- [ ] Je documente les décisions importantes

---

<div align="center">

🌲 **YGGDRASIL** 🌲

*L'Arbre grandit avec ceux qui le nourrissent.*

**« Vérifié + sources » ou « Je ne sais pas » — Jamais « Probablement vrai »**

</div>