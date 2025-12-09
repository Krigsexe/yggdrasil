# 🏗️ Architecture YGGDRASIL

> *"Yggdrasil, le frêne toujours vert, se dresse au centre de l'univers, ses branches s'étendant sur tous les mondes."*

## Vue d'Ensemble

YGGDRASIL est une architecture d'orchestration d'IA conçue pour garantir la véracité, la traçabilité et la souveraineté. Elle ne crée pas de nouveau modèle — elle orchestre l'existant avec une couche de validation inviolable.

```mermaid
flowchart TB
    subgraph ENTRÉE
        U[🌍 Utilisateur]
    end
    
    subgraph GATEWAY
        H[🛡️ HEIMDALL<br/>Gateway]
    end
    
    subgraph ROUTAGE
        R[🐿️ RATATOSK<br/>Routage]
    end
    
    subgraph BRANCHES["LES TROIS BRANCHES"]
        M[📚 MÍMIR<br/>Validé 100%]
        V[🔮 VÖLVA<br/>Recherche]
        HU[🦅 HUGIN<br/>Internet]
    end
    
    subgraph CONSEIL["LE CONSEIL (THING)"]
        K[🧠 KVASIR<br/>Raisonnement]
        B[🎭 BRAGI<br/>Créativité]
        N[⚖️ NORNES<br/>Calcul]
        S[📖 SAGA<br/>Connaissance]
        L[🃏 LOKI<br/>Critique]
        T[⚔️ TYR<br/>Arbitrage]
    end
    
    subgraph VALIDATION
        O[👁️ ODIN<br/>Maestro]
    end
    
    subgraph MÉMOIRE
        MU[🦅 MUNIN<br/>Mémoire]
    end
    
    subgraph SORTIE
        OUT[✅ Réponse Validée]
        REJ[❌ Rejet Explicite]
    end
    
    U --> H
    H --> R
    R --> M & V & HU
    M & V & HU --> K & B & N & S
    K & B & N & S --> L
    L --> T
    T --> O
    O --> MU
    MU --> O
    O --> OUT & REJ
```

---

## Composants Détaillés

### 🛡️ HEIMDALL — Le Gardien

**Inspiration :** Le dieu qui garde le Bifröst, capable de voir à cent lieues et d'entendre l'herbe pousser.

**Responsabilités :**
- Authentification et autorisation
- Rate limiting et protection DDoS  
- Chiffrement TLS/mTLS
- Audit logging de toutes les requêtes
- Validation des entrées

**Stack technique :**
- NestJS avec Passport
- Redis pour le rate limiting
- PostgreSQL pour l'audit log

```mermaid
flowchart LR
    subgraph HEIMDALL
        AUTH[Auth Module]
        RATE[Rate Limiter]
        AUDIT[Audit Logger]
        TLS[TLS Termination]
    end
    
    IN[Request] --> TLS --> AUTH --> RATE --> AUDIT --> OUT[To Ratatosk]
```

---

### 🐿️ RATATOSK — Le Messager

**Inspiration :** L'écureuil qui court le long d'Yggdrasil, portant les messages entre les mondes.

**Responsabilités :**
- Classification de la requête (factuelle, créative, analytique, etc.)
- Extraction du contexte et des intentions
- Routage vers la/les branches appropriées
- Enrichissement avec le contexte de MUNIN

**Algorithme de routage :**

```mermaid
flowchart TD
    Q[Query] --> CLASSIFY{Classification}
    CLASSIFY -->|Factuelle| F[Fact Check]
    CLASSIFY -->|Créative| C[Creative]
    CLASSIFY -->|Analytique| A[Analysis]
    CLASSIFY -->|Recherche| R[Research]
    
    F --> MIMIR[📚 MÍMIR]
    C --> THING[🏛️ THING]
    A --> MIMIR & THING
    R --> VOLVA[🔮 VÖLVA] & HUGIN[🦅 HUGIN]
```

---

### 📚 MÍMIR — Le Puits de Sagesse

**Inspiration :** Le puits gardé par Mímir où Odin sacrifia un œil pour une gorgée de sagesse.

**Responsabilités :**
- Stocker les connaissances **100% vérifiées**
- Indexation sémantique des sources
- Vérification de la validité temporelle
- Mise à jour continue avec validation

**Sources intégrées :**
| Source | Type | Domaine |
|--------|------|---------|
| arXiv | Preprints | Sciences |
| PubMed | Peer-reviewed | Médical |
| ISO | Standards | Technique |
| RFC | Standards | Internet |
| Wikidata | Structured | Général |

**Architecture de données :**

```mermaid
erDiagram
    SOURCE {
        uuid id PK
        string name
        string url
        string type
        float trust_score
        timestamp last_validated
    }
    
    FACT {
        uuid id PK
        text content
        uuid source_id FK
        jsonb metadata
        timestamp created_at
        timestamp valid_until
    }
    
    VALIDATION {
        uuid id PK
        uuid fact_id FK
        string method
        float confidence
        timestamp validated_at
    }
    
    SOURCE ||--o{ FACT : provides
    FACT ||--o{ VALIDATION : has
```

---

### 🔮 VÖLVA — La Voyante

**Inspiration :** Les prophétesses nordiques qui exploraient l'inconnu et conseillaient les dieux.

**Responsabilités :**
- Stocker les hypothèses et théories
- Tracker le niveau de preuve
- Gérer la promotion vers MÍMIR
- Flaguer systématiquement comme `THEORETICAL`

**États d'une hypothèse :**

```mermaid
stateDiagram-v2
    [*] --> PROPOSED: Nouvelle hypothèse
    PROPOSED --> EXPLORING: Investigation
    EXPLORING --> SUPPORTED: Preuves partielles
    EXPLORING --> REJECTED: Contre-preuves
    SUPPORTED --> VALIDATED: Preuves complètes
    SUPPORTED --> REJECTED: Contre-preuves
    VALIDATED --> MIMIR: Promotion
    REJECTED --> [*]
```

---

### 🦅 HUGIN — La Pensée

**Inspiration :** Un des deux corbeaux d'Odin qui parcourt le monde pour lui rapporter ce qu'il voit.

**Responsabilités :**
- Interface avec le web en temps réel
- Filtrage anti-désinformation
- Détection de sources douteuses
- Tagging systématique `UNVERIFIED`

**Pipeline de filtrage :**

```mermaid
flowchart LR
    WEB[🌐 Web] --> FETCH[Fetch]
    FETCH --> CLEAN[Clean HTML]
    CLEAN --> DETECT[Detect<br/>Misinfo]
    DETECT -->|Suspect| QUARANTINE[🔒 Quarantine]
    DETECT -->|Clean| TAG[Tag UNVERIFIED]
    TAG --> OUT[To THING]
```

---

### 🏛️ THING — L'Assemblée

**Inspiration :** L'assemblée viking où les décisions collectives étaient prises.

**Responsabilités :**
- Orchestrer les modèles spécialisés
- Agréger les réponses
- Gérer le consensus
- Soumettre à la critique de LOKI

**Membres du conseil :**

| Membre | Modèle | Spécialité | Poids |
|--------|--------|------------|-------|
| KVASIR | Claude | Raisonnement | Variable |
| BRAGI | Grok | Créativité | Variable |
| NORNES | DeepSeek | Calcul | Variable |
| SAGA | Llama | Connaissance | Variable |
| LOKI | Adversarial | Critique | Veto power |
| TYR | Voting | Arbitrage | Final |

**Processus de délibération :**

```mermaid
sequenceDiagram
    participant R as RATATOSK
    participant K as KVASIR
    participant B as BRAGI
    participant N as NORNES
    participant S as SAGA
    participant L as LOKI
    participant T as TYR
    participant O as ODIN

    R->>K: Query + Context
    R->>B: Query + Context
    R->>N: Query + Context
    R->>S: Query + Context
    
    K-->>T: Response + Confidence
    B-->>T: Response + Confidence
    N-->>T: Response + Confidence
    S-->>T: Response + Confidence
    
    T->>L: Aggregated Response
    L-->>T: Challenges
    T->>T: Resolve Conflicts
    T->>O: Final Proposal
```

---

### 👁️ ODIN — Le Maestro

**Inspiration :** Le Père-de-Tout, qui a sacrifié un œil pour la sagesse et s'est pendu à Yggdrasil pour la connaissance.

**Responsabilités :**
- Validation finale de chaque affirmation
- Ancrage obligatoire à MÍMIR
- Vérification de cohérence avec MUNIN
- Rejet explicite avec raison si <100%

**Critères de validation :**

```mermaid
flowchart TD
    INPUT[Proposition<br/>du THING] --> CHECK1{Ancrage<br/>MÍMIR ?}
    CHECK1 -->|Non| REJ1[❌ Rejet:<br/>Non sourcé]
    CHECK1 -->|Oui| CHECK2{Cohérent<br/>MUNIN ?}
    CHECK2 -->|Non| REJ2[❌ Rejet:<br/>Contradiction]
    CHECK2 -->|Oui| CHECK3{Survit<br/>LOKI ?}
    CHECK3 -->|Non| REJ3[❌ Rejet:<br/>Critique valide]
    CHECK3 -->|Oui| CHECK4{Consensus<br/>TYR ?}
    CHECK4 -->|Non| REJ4[❌ Rejet:<br/>Pas de consensus]
    CHECK4 -->|Oui| VALID[✅ VALIDÉ]
    
    VALID --> OUT[Réponse + Sources + Trace]
    REJ1 & REJ2 & REJ3 & REJ4 --> EXPLAIN[Rejet + Raison + Alternatives]
```

**Règle d'or :** *"Je ne valide que ce que je peux prouver."*

---

### 🦅 MUNIN — La Mémoire

**Inspiration :** Le corbeau de la mémoire, celui qu'Odin craignait de perdre plus que Hugin.

**Responsabilités :**
- Mémoire chrono-sémantique persistante
- Graphe de dépendances entre décisions
- Système de checkpoints
- Rollback sur erreur détectée

**Architecture de stockage :**

```mermaid
erDiagram
    INTERACTION {
        uuid id PK
        uuid user_id FK
        text query
        text response
        jsonb context
        timestamp created_at
    }
    
    DECISION {
        uuid id PK
        uuid interaction_id FK
        text decision
        jsonb reasoning
        uuid[] source_ids
    }
    
    CHECKPOINT {
        uuid id PK
        uuid user_id FK
        jsonb state_snapshot
        timestamp created_at
    }
    
    DEPENDENCY {
        uuid id PK
        uuid decision_id FK
        uuid depends_on_id FK
        string dependency_type
    }
    
    INTERACTION ||--o{ DECISION : contains
    DECISION ||--o{ DEPENDENCY : has
    CHECKPOINT ||--o{ INTERACTION : captures
```

**Triple indexation :**
- **Temporelle** : Quand ?
- **Sémantique** : À propos de quoi ? (PGVector)
- **Causale** : À cause de quoi ?

---

## Flux Complet

```mermaid
sequenceDiagram
    actor User
    participant H as HEIMDALL
    participant R as RATATOSK
    participant M as MÍMIR
    participant V as VÖLVA
    participant HU as HUGIN
    participant TH as THING
    participant O as ODIN
    participant MU as MUNIN

    User->>H: Query
    H->>H: Auth + Audit
    H->>R: Validated Query
    
    R->>MU: Get Context
    MU-->>R: User Context
    
    R->>R: Classify + Route
    
    par Parallel Fetch
        R->>M: Factual Data
        R->>V: Hypotheses
        R->>HU: Real-time Info
    end
    
    M-->>TH: Verified Facts
    V-->>TH: Theories (flagged)
    HU-->>TH: Web Info (flagged)
    
    TH->>TH: Multi-model Deliberation
    TH->>O: Proposal
    
    O->>M: Verify Sources
    M-->>O: Source Confirmation
    O->>MU: Check Consistency
    MU-->>O: Memory State
    
    alt Validation OK
        O->>MU: Store Decision
        O->>User: ✅ Response + Sources + Trace
    else Validation Failed
        O->>User: ❌ Rejection + Reason + Alternatives
    end
```

---

## Stack Technique

### Backend
- **Framework** : NestJS (TypeScript)
- **Base de données** : PostgreSQL + PGVector
- **Cache** : Redis
- **Queue** : BullMQ
- **ORM** : Prisma

### Infrastructure
- **Conteneurs** : Docker
- **Orchestration** : Kubernetes (optionnel)
- **IaC** : Terraform
- **CI/CD** : GitHub Actions

### Modèles IA
- **Claude** : Via API Anthropic
- **Llama** : Via Ollama (local) ou API
- **DeepSeek** : Via API
- **Grok** : Via API xAI

### Observabilité
- **Logs** : Structured JSON (Pino)
- **Metrics** : Prometheus
- **Traces** : OpenTelemetry
- **Dashboards** : Grafana

---

## Sécurité

### Chiffrement
- TLS 1.3 pour toutes les communications
- mTLS entre services internes
- Chiffrement at-rest pour les données sensibles

### Authentification
- JWT avec refresh tokens
- Support OAuth2/OIDC
- Rate limiting par utilisateur et IP

### Audit
- Logging immutable de toutes les requêtes
- Traçabilité complète des décisions
- Retention configurable

---

## Prochaines Étapes

1. **Implémenter HEIMDALL** — Gateway de base
2. **Implémenter RATATOSK** — Routage simple
3. **Intégrer MÍMIR** — Avec arXiv comme première source
4. **Construire THING** — Orchestration de 2 modèles
5. **Développer ODIN** — Validation basique

---

<div align="center">

*"L'architecture est le squelette. Les principes sont l'âme."*

🌲

</div>
