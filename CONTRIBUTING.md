# 🤝 Guide de Contribution à YGGDRASIL

Merci de votre intérêt pour YGGDRASIL ! Ce guide vous aidera à contribuer efficacement au projet.

## 📋 Table des Matières

- [Code de Conduite](#code-de-conduite)
- [Comment Contribuer](#comment-contribuer)
- [Types de Contributions](#types-de-contributions)
- [Processus de Développement](#processus-de-développement)
- [Standards de Code](#standards-de-code)
- [Commits et Pull Requests](#commits-et-pull-requests)
- [Revue de Code](#revue-de-code)
- [Reconnaissance](#reconnaissance)

---

## 📜 Code de Conduite

En participant à ce projet, vous acceptez de respecter notre [Code de Conduite](CODE_OF_CONDUCT.md). 

**En résumé :** Soyez respectueux, inclusif, et constructif. YGGDRASIL est un projet pour l'humanité — agissons en conséquence.

---

## 🚀 Comment Contribuer

### 1. Trouvez votre voie

| Vous êtes... | Vous pouvez... |
|--------------|----------------|
| 🏗️ **Développeur** | Coder, reviewer, architecturer |
| 🔬 **Chercheur IA** | Proposer des algorithmes, valider des approches |
| 📚 **Scientifique** | Alimenter MÍMIR, vérifier des sources |
| ⚖️ **Éthicien/Juriste** | Guider la gouvernance, les limites |
| 🎨 **Designer** | Améliorer l'UX, la documentation |
| 🌍 **Traducteur** | Internationaliser le projet |
| 🧪 **Testeur** | QA, red team, tests adversariaux |
| 📣 **Communicant** | Documenter, expliquer, évangéliser |

### 2. Premiers pas

```bash
# 1. Fork le repository
# Cliquez sur "Fork" sur GitHub

# 2. Clonez votre fork
git clone https://github.com/VOTRE_USERNAME/yggdrasil.git
cd yggdrasil

# 3. Ajoutez l'upstream
git remote add upstream https://github.com/Krigsexe/yggdrasil.git

# 4. Installez les dépendances
pnpm install

# 5. Créez une branche pour votre contribution
git checkout -b feature/ma-contribution
```

### 3. Avant de coder

- **Vérifiez les issues existantes** — Votre idée est peut-être déjà en discussion
- **Ouvrez une issue** si vous proposez quelque chose de nouveau
- **Discutez** dans les issues avant de commencer un gros travail

---

## 🎯 Types de Contributions

### 🐛 Rapporter un Bug

1. Vérifiez qu'il n'existe pas déjà une issue similaire
2. Utilisez le template de bug report
3. Incluez :
   - Version de YGGDRASIL
   - Étapes pour reproduire
   - Comportement attendu vs observé
   - Logs pertinents

### 💡 Proposer une Feature

1. Ouvrez une issue avec le template "Feature Request"
2. Expliquez :
   - Le problème que ça résout
   - La solution proposée
   - Les alternatives considérées
   - L'impact sur les Sept Piliers

### 📝 Améliorer la Documentation

La documentation est aussi importante que le code !

- Corrections de typos → PR directe
- Nouvelles sections → Issue d'abord
- Traductions → Voir `docs/translations/`

### 🧪 Contribuer au Code

Voir [Processus de Développement](#processus-de-développement)

---

## 🔄 Processus de Développement

### Structure du Monorepo

```
packages/
├── heimdall/      # Gateway
├── ratatosk/      # Routage
├── mimir/         # Branche Validée
├── volva/         # Branche Recherche
├── hugin/         # Branche Internet
├── thing/         # Consortium
├── odin/          # Maestro
├── mnemosyne/     # Mémoire
└── shared/        # Utilitaires communs
```

### Workflow de développement

```bash
# 1. Synchronisez avec upstream
git fetch upstream
git checkout main
git merge upstream/main

# 2. Créez une branche
git checkout -b type/description
# Types: feature/, fix/, docs/, refactor/, test/

# 3. Développez avec des commits atomiques
git add .
git commit -m "type(scope): description"

# 4. Testez
pnpm test
pnpm lint

# 5. Push et créez une PR
git push origin type/description
```

### Environnement de développement

```bash
# Lancer tous les services en dev
pnpm dev

# Lancer un package spécifique
pnpm --filter @yggdrasil/heimdall dev

# Tests
pnpm test              # Tous les tests
pnpm test:unit         # Tests unitaires
pnpm test:integration  # Tests d'intégration
pnpm test:e2e          # Tests end-to-end

# Linting
pnpm lint              # Vérifier
pnpm lint:fix          # Corriger automatiquement
```

---

## 📏 Standards de Code

### TypeScript

```typescript
// ✅ Bon
interface ValidationResult {
  isValid: boolean;
  confidence: number;
  sources: Source[];
  trace: DecisionTrace;
}

async function validateClaim(
  claim: string,
  context: QueryContext
): Promise<ValidationResult> {
  // Implémentation
}

// ❌ Mauvais
function validate(c: any): any {
  // ...
}
```

### Principes

1. **Typage strict** — Pas de `any`, utilisez des types précis
2. **Immutabilité** — Préférez `const` et les structures immutables
3. **Fonctions pures** — Minimisez les effets de bord
4. **Nommage explicite** — Le code doit être auto-documenté
5. **Tests** — Chaque feature doit avoir des tests

### Structure des fichiers

```
package/
├── src/
│   ├── index.ts           # Export public
│   ├── module.ts          # Module NestJS
│   ├── controller.ts      # Contrôleurs
│   ├── service.ts         # Services
│   ├── dto/               # Data Transfer Objects
│   ├── entities/          # Entités
│   └── utils/             # Utilitaires
├── test/
│   ├── unit/
│   └── integration/
└── README.md
```

---

## 📝 Commits et Pull Requests

### Format des commits

Nous utilisons [Conventional Commits](https://www.conventionalcommits.org/) :

```
type(scope): description courte

Corps optionnel avec plus de détails.

Refs: #123
```

**Types :**
- `feat` — Nouvelle fonctionnalité
- `fix` — Correction de bug
- `docs` — Documentation
- `style` — Formatage (pas de changement de code)
- `refactor` — Refactoring
- `test` — Ajout/modification de tests
- `chore` — Maintenance

**Scopes :** `heimdall`, `ratatosk`, `mimir`, `volva`, `hugin`, `thing`, `odin`, `munin`, `shared`, `docs`, `ci`

### Exemples

```bash
feat(mimir): add arXiv source integration
fix(odin): correct validation threshold calculation
docs(readme): update installation instructions
test(thing): add consensus algorithm tests
```

### Pull Requests

Votre PR doit :

1. ✅ Avoir un titre clair suivant le format des commits
2. ✅ Référencer l'issue associée
3. ✅ Inclure une description de ce qui change et pourquoi
4. ✅ Passer tous les tests CI
5. ✅ Avoir au moins une review approuvée
6. ✅ Ne pas avoir de conflits avec `main`

**Template de PR :**

```markdown
## Description
Qu'est-ce que cette PR fait ?

## Motivation
Pourquoi ce changement ?

## Type de changement
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation

## Checklist
- [ ] J'ai lu le CONTRIBUTING.md
- [ ] Mon code suit les standards du projet
- [ ] J'ai ajouté des tests
- [ ] J'ai mis à jour la documentation
- [ ] Mes commits suivent le format conventionnel

## Issue liée
Fixes #(numéro)
```

---

## 👀 Revue de Code

### En tant qu'auteur

- Répondez aux commentaires de manière constructive
- Expliquez vos choix si nécessaire
- Mettez à jour votre PR suite aux retours
- Demandez des clarifications si un commentaire n'est pas clair

### En tant que reviewer

- Soyez respectueux et constructif
- Expliquez le "pourquoi" de vos suggestions
- Distinguez les blockers des suggestions
- Approuvez quand c'est prêt, même si ce n'est pas "parfait"

**Légende des commentaires :**
- `[BLOCKER]` — Doit être corrigé avant merge
- `[SUGGESTION]` — Amélioration optionnelle
- `[QUESTION]` — Demande de clarification
- `[NIT]` — Détail mineur (typo, style)

---

## 🏆 Reconnaissance

Tous les contributeurs sont reconnus :

1. **Dans le code** — Auteurs des commits
2. **Dans README** — Section Contributors
3. **Dans CHANGELOG** — Crédit par version
4. **Sur le site** — Hall of Fame (à venir)

### Niveaux de contribution

| Niveau | Critères |
|--------|----------|
| 🌱 **Pousse** | Première contribution acceptée |
| 🌿 **Branche** | 5+ contributions significatives |
| 🌳 **Tronc** | Contributeur régulier, reviewer |
| 🌲 **Gardien** | Maintainer, décisions architecturales |

---

## ❓ Questions ?

- **Discord** : [À venir]
- **Discussions GitHub** : [github.com/Krigsexe/yggdrasil/discussions](https://github.com/Krigsexe/yggdrasil/discussions)
- **Email** : contact@yggdrasil.dev (placeholder)

---

<div align="center">

**Merci de contribuer à YGGDRASIL !** 🌲

*L'Arbre grandit avec ceux qui le nourrissent.*

</div>
