<div align="center">

# 🌲 YGGDRASIL

### L'Arbre-Monde de l'Intelligence Artificielle

**Une AGI éthique, souveraine et vérifiable — construite par l'humanité, pour l'humanité.**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/Krigsexe/yggdrasil)

[Manifeste](MANIFESTO.md) · [Architecture](docs/architecture/OVERVIEW.md) · [Contribuer](CONTRIBUTING.md) · [Roadmap](ROADMAP.md)

</div>

---

## 🌑 Le Problème

L'IA actuelle est construite sur des fondations fragiles :

- **Hallucinations** — Les LLMs mentent avec confiance. 20-30% de fausses informations présentées comme vérités.
- **Opacité** — Personne ne comprend pourquoi un modèle répond ce qu'il répond.
- **Amnésie** — Chaque conversation repart de zéro. Aucune mémoire persistante.
- **Concentration** — Quelques corporations contrôlent les fondations de l'IA mondiale.
- **Gaspillage** — Des milliards dépensés pour entraîner des modèles redondants.

**La question fondamentale :** L'AGI — la technologie la plus transformatrice de l'histoire — doit-elle être développée par et pour des actionnaires, ou par et pour l'humanité ?

---

## 🌲 La Vision : YGGDRASIL

Dans la mythologie nordique, **Yggdrasil** est l'Arbre-Monde — le frêne cosmique qui connecte les neuf royaumes, dont les racines puisent dans le **puits de Mímir** (la sagesse absolue), et dont les branches abritent tous les êtres.

YGGDRASIL est une architecture d'AGI qui :

| Principe | Approche Actuelle | Approche YGGDRASIL |
|----------|-------------------|---------------------|
| **Vérité** | "Probablement vrai" | "Vérifié + sources" ou "Je ne sais pas" |
| **Mémoire** | Reset à chaque session | Mémoire chrono-sémantique persistante |
| **Sources** | Mélange opaque | Séparation stricte : Validé / Recherche / Internet |
| **Modèles** | Un géant monolithique | Consortium de spécialistes orchestrés |
| **Contrôle** | Corporations privées | Open-source, auto-hébergeable, fédérable |
| **Énergie** | Entraîner toujours plus | Mutualiser l'existant |

---

## ⚡ Les Sept Piliers

YGGDRASIL repose sur sept principes intransgressibles :

### 1. 🎯 Véracité Absolue
> *"Jamais de probabilité. La certitude ou le silence."*

YGGDRASIL dit "vérifié, voici les sources" ou "je ne sais pas". Jamais "c'est probablement vrai".

### 2. 🔍 Traçabilité Totale
> *"Chaque pensée a une origine. Chaque décision a une trace."*

Chaque réponse peut être auditée : d'où vient l'information, pourquoi cette décision, quel chemin de raisonnement.

### 3. 📚 Séparation Épistémique
> *"Le savoir, l'hypothèse et le bruit ne se mélangent jamais."*

Trois branches strictement séparées :
- **MÍMIR** — Connaissances scientifiquement prouvées
- **VÖLVA** — Hypothèses et théories en exploration
- **HUGIN** — Informations internet non vérifiées

### 4. 🧠 Mémoire Vivante
> *"Une intelligence sans mémoire n'est qu'un réflexe."*

YGGDRASIL se souvient : interactions passées, décisions prises, erreurs corrigées, contextes évolutifs.

### 5. ⏪ Réversibilité
> *"Aucune erreur n'est définitive."*

Rollback possible vers n'importe quel état passé. Correction des décisions basées sur des informations ultérieurement invalidées.

### 6. 🏛️ Souveraineté
> *"Les données de l'humanité appartiennent à l'humanité."*

Open-source, auto-hébergeable, fédérable, auditable. Aucune dépendance à un fournisseur unique.

### 7. 🌱 Soutenabilité
> *"Une intelligence qui détruit sa planète n'est pas intelligente."*

Mutualisation des modèles existants. Zéro entraînement de nouveaux modèles. Métriques de consommation transparentes.

---

## 🏗️ Architecture

```
MONDE → HEIMDALL → RATATOSK → [MÍMIR|VÖLVA|HUGIN] → THING → ODIN → MUNIN → RÉPONSE
        Gateway    Routage     Les Trois Branches    Conseil  Maestro Mémoire  Validée
```

### Les Composants

| Composant | Rôle | Inspiration |
|-----------|------|-------------|
| **HEIMDALL** | Gateway — Auth, rate limiting, audit | Le gardien du Bifröst qui voit et entend tout |
| **RATATOSK** | Routage — Classification, extraction de contexte | L'écureuil messager qui parcourt l'arbre |
| **MÍMIR** | Branche Validée — Connaissances prouvées (100%) | Le puits de sagesse où Odin sacrifia son œil |
| **VÖLVA** | Branche Recherche — Hypothèses, théories | La voyante qui explore l'inconnu |
| **HUGIN** | Branche Internet — Informations filtrées | "Pensée" — corbeau explorateur d'Odin |
| **THING** | Consortium — Délibération multi-modèles | L'assemblée où les dieux prennent les décisions |
| **ODIN** | Maestro — Validation finale, synthèse | Le Père-de-Tout, celui qui sait |
| **MUNIN** | Mémoire — Stockage chrono-sémantique | "Mémoire" — l'autre corbeau d'Odin |

### Le Conseil (THING)

| Membre | Spécialité | Modèle |
|--------|------------|--------|
| **KVASIR** | Raisonnement profond | Claude |
| **BRAGI** | Créativité, éloquence | Grok |
| **NORNES** | Calcul, logique formelle | DeepSeek |
| **SAGA** | Connaissance générale | Llama |
| **LOKI** | Critique, adversarial | Red team |
| **TYR** | Arbitrage, consensus | Voting system |

---

## 🚀 Quick Start

```bash
# Cloner le repository
git clone https://github.com/Krigsexe/yggdrasil.git
cd yggdrasil

# Installation
pnpm install

# Configuration
cp .env.example .env
# Éditer .env avec vos clés API

# Lancement en développement
pnpm dev
```

### Avec Docker

```bash
docker-compose up -d
```

### Auto-hébergement complet (avec Ollama pour modèles locaux)

```bash
# Mode souverain — aucune donnée ne quitte votre infrastructure
pnpm run sovereign
```

---

## 📖 Documentation

- [**Manifeste**](MANIFESTO.md) — La vision complète et les principes fondateurs
- [**Architecture**](docs/architecture/OVERVIEW.md) — Vue technique détaillée
- [**Les Sept Piliers**](docs/architecture/SEVEN_PILLARS.md) — Principes en profondeur
- [**Les Sept Lois**](docs/architecture/SEVEN_LAWS.md) — Règles intransgressibles
- [**Guide de Démarrage**](docs/technical/GETTING_STARTED.md) — Installation pas à pas
- [**API**](docs/technical/API.md) — Spécifications de l'API
- [**Contribuer**](CONTRIBUTING.md) — Comment participer

---

## 🤝 Contribuer

YGGDRASIL est un projet communautaire. Nous cherchons :

| Profil | Contribution |
|--------|--------------|
| 🏗️ **Architectes** | Développeurs, ingénieurs, chercheurs IA |
| 🛡️ **Gardiens** | Éthiciens, philosophes, juristes |
| 🔬 **Éclaireurs** | Scientifiques de toutes disciplines |
| ⚔️ **Critiques** | Sceptiques, red teamers, adversaires |
| 🌍 **Citoyens** | Utilisateurs, curieux, concernés |

**Lire le [Guide de Contribution](CONTRIBUTING.md)** pour commencer.

---

## 🗺️ Roadmap

### Phase 1 : Fondations (2024-2025) *← Nous sommes ici*
- [x] Publication du Manifeste
- [x] Repository public
- [ ] Documentation complète
- [ ] Premiers contributeurs
- [ ] Prototype fonctionnel (orchestration + validation basique)

### Phase 2 : Construction (2025-2026)
- [ ] MÍMIR : Intégration sources scientifiques (arXiv, PubMed)
- [ ] THING : Consortium multi-modèles fonctionnel
- [ ] ODIN : Maestro avec validation 100%
- [ ] MUNIN : Mémoire chrono-sémantique
- [ ] Tests publics et bug bounty

### Phase 3 : Ouverture (2026-2027)
- [ ] API publique
- [ ] Instances fédérées
- [ ] Gouvernance communautaire formalisée
- [ ] Partenariats académiques
- [ ] Audit externe indépendant

### Phase 4 : Expansion (2027+)
- [ ] Multilingue complet
- [ ] Domaines spécialisés (médical, juridique, scientifique)
- [ ] Standard international proposé
- [ ] YGGDRASIL comme infrastructure mondiale

---

## 📜 Licence

YGGDRASIL est distribué sous [Licence MIT](LICENSE) avec clause copyleft pour les dérivés.

Le code appartient à l'humanité. Aucune entité ne peut fermer, breveter, ou privatiser YGGDRASIL.

---

## 💬 Citation

```bibtex
@software{yggdrasil2024,
  author = {Gelée, Julien and Contributors},
  title = {YGGDRASIL: L'Arbre-Monde de l'Intelligence Artificielle},
  year = {2024},
  url = {https://github.com/Krigsexe/yggdrasil}
}
```

---

<div align="center">

**"Nous ne construisons pas une machine. Nous posons les fondations de la pensée de demain."**

🌲 *L'Arbre grandit avec ceux qui le nourrissent.* 🌲

[Rejoindre la communauté](https://github.com/Krigsexe/yggdrasil/discussions) · [Signaler un bug](https://github.com/Krigsexe/yggdrasil/issues) · [Proposer une feature](https://github.com/Krigsexe/yggdrasil/issues/new)

</div>
