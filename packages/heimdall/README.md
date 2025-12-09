# 🛡️ HEIMDALL

> *"Heimdall voit à cent lieues, de jour comme de nuit. Il entend l'herbe pousser sur la terre et la laine sur les moutons."*

## Description

HEIMDALL est le **Gateway** de YGGDRASIL — le gardien qui protège l'entrée de l'Arbre-Monde.

## Responsabilités

- 🔐 **Authentification** — JWT, OAuth2/OIDC
- 🚦 **Rate Limiting** — Protection contre les abus
- 📝 **Audit Logging** — Traçabilité de toutes les requêtes
- 🔒 **TLS/mTLS** — Chiffrement des communications
- ✅ **Validation** — Vérification des entrées

## Installation

```bash
pnpm install
```

## Développement

```bash
# Démarrer en mode watch
pnpm dev

# Lancer les tests
pnpm test

# Build
pnpm build
```

## Configuration

Variables d'environnement :

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Port d'écoute | `3000` |
| `JWT_SECRET` | Clé secrète JWT | — |
| `JWT_EXPIRY` | Durée de validité | `15m` |
| `REDIS_URL` | URL Redis | `redis://localhost:6379` |
| `RATE_LIMIT_TTL` | Fenêtre de rate limit | `60` |
| `RATE_LIMIT_MAX` | Requêtes max par fenêtre | `100` |

## API

### Authentification

```
POST /auth/login
POST /auth/refresh
POST /auth/logout
```

### Health

```
GET /health
GET /health/ready
GET /health/live
```

## Architecture

```
heimdall/
├── src/
│   ├── main.ts              # Entry point
│   ├── app.module.ts        # Root module
│   ├── auth/                # Authentication
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── auth.controller.ts
│   │   ├── jwt.strategy.ts
│   │   └── guards/
│   ├── rate-limit/          # Rate limiting
│   │   └── rate-limit.module.ts
│   ├── audit/               # Audit logging
│   │   ├── audit.module.ts
│   │   ├── audit.service.ts
│   │   └── audit.interceptor.ts
│   └── health/              # Health checks
│       └── health.controller.ts
└── test/
    └── ...
```

## Sécurité

HEIMDALL implémente les protections suivantes :

- ✅ Helmet (headers de sécurité)
- ✅ CORS strict
- ✅ Rate limiting par IP et par utilisateur
- ✅ Validation des entrées (class-validator)
- ✅ Sanitization des sorties
- ✅ Audit immutable

---

<div align="center">

*"Je suis le gardien. Nul ne passe sans être vu."*

🛡️

</div>
