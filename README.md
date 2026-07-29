# Bienvenue, Mini Scuba ⚡️

> Quelques sats aujourd’hui, un petit morceau de liberté pour demain.

Site public de la cagnotte Bitcoin de Mini Scuba, conçu pour GitHub Pages.

## Ce que contient le projet

- une page narrative responsive ;
- cinq illustrations optimisées en WebP ;
- deux cartes de contribution Bitcoin et Lightning ;
- des boutons de copie activés uniquement lorsque les adresses sont ajoutées ;
- aucun cookie, compte, formulaire, traceur ou collecte de données ;
- un déploiement automatique avec GitHub Actions.

## Ajouter les adresses et QR codes

Ouvrir `src/donation-config.ts`, puis compléter :

```ts
export const donationConfig = {
  bitcoinAddress: "bc1q…",
  lightningAddress: "adresse@lightning…",
  bitcoinQr: "./assets/qr/bitcoin.webp",
  lightningQr: "./assets/qr/lightning.webp",
};
```

Déposer ensuite les QR codes dans :

```text
public/assets/qr/bitcoin.webp
public/assets/qr/lightning.webp
```

Ne jamais publier de clé privée, de seed, de fichier de sauvegarde de
portefeuille ou d’autre secret dans ce dépôt. Seules les adresses publiques de
réception doivent y figurer.

## Dimensions des illustrations

| Fichier | Dimensions intégrées | Usage |
|---|---:|---|
| `hero.webp` | 1920 × 1072 | Image principale et partage social |
| `profil.webp` | 720 × 720 | Portrait carré |
| `aventure.webp` | 1600 × 995 | Section du berceau |
| `premiers-sats.webp` | 1600 × 995 | Section de l’épargne |
| `horizon.webp` | 1600 × 893 | Conclusion panoramique |
| QR codes | 640 × 640 | Cartes de contribution |

Les images sont déjà incluses et optimisées. Il n’est pas nécessaire de les
reconvertir.

## Développement local

Prérequis : Node.js 22 et npm.

```bash
npm install
npm run dev
```

Vérifier la version de production :

```bash
npm run build
npm run preview
```

## Publication sur GitHub Pages

1. créer un dépôt public vide ;
2. copier tout le contenu de ce projet dans le dépôt local ;
3. effectuer le premier commit et le pousser sur `main` ;
4. ouvrir **Settings → Pages** ;
5. choisir **GitHub Actions** dans **Build and deployment**.

Le workflow `.github/workflows/deploy-pages.yml` construit et publie ensuite le
site automatiquement à chaque push sur `main`.

## Confidentialité

Le dépôt ne contient :

- aucun nom civil ;
- aucune adresse postale ;
- aucune date de naissance ;
- aucune donnée médicale ;
- aucune photographie originale ;
- aucune clé ou information privée liée à un portefeuille.

Avant chaque publication, vérifier qu’aucune information personnelle n’a été
ajoutée accidentellement.

## Droits

Les textes, illustrations, personnages et éléments graphiques restent la
propriété de leurs auteurs. Leur présence dans un dépôt public n’accorde aucun
droit de reproduction ou de réutilisation.
