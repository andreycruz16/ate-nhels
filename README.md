# Ate Nhel's

A responsive React + Vite menu site for Ate Nhel's catering offerings.

Live sites:

| Environment | Status | URL |
| --- | --- | --- |
| Production | [![Vercel Deploy](https://deploy-badge.vercel.app/vercel/ate-nhels)](https://ate-nhels.vercel.app/) | https://ate-nhels.vercel.app/ |
| Production | [![Netlify Status](https://api.netlify.com/api/v1/badges/37e5ec33-b435-477b-ab41-768a93525e7b/deploy-status)](https://app.netlify.com/projects/ate-nhels/deploys) | https://ate-nhels.netlify.app/ |
| Development preview | [![Vercel Deploy](https://deploy-badge.vercel.app/vercel/dev-ate-nhels)](https://dev-ate-nhels.vercel.app/) | https://dev-ate-nhels.vercel.app/ |

## Overview

This project renders a mobile-friendly catering menu from a local JSON data source. The app includes:

- Section-based navigation with active tab highlighting
- Compact responsive menu tables for mobile and desktop
- Contact cards with one-tap copy support
- A single source of truth for menu content in `src/data/menu.json`

## Tech Stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4

## Getting Started

### Install dependencies

```bash
npm install
```

### Start the dev server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Project Structure

```text
.
├── src/
│   ├── App.tsx           # Main menu page UI
│   ├── data/menu.json    # Brand, contacts, menu sections, prices
│   ├── index.css         # Theme tokens and global styles
│   └── main.tsx          # App entry point
├── package.json
└── vite.config.ts
```

## Updating Menu Content

Most content changes can be done by editing `src/data/menu.json`.

Key fields:

- `brand`: business name shown in the header
- `lastUpdated`: label shown near the top of the page
- `contacts`: contact methods displayed in the contact section
- `menuSections`: menu categories, serving sizes, item names, notes, and prices
- `extraTables`: optional secondary pricing tables inside a section

Example item:

```json
{
  "name": "Spaghetti",
  "prices": ["₱ 1,000", "₱ 1,300"]
}
```

## Design and Content Sources

- Canva design reference: https://www.canva.com/design/DAFb6wsxGFg/iWLoBWC532u8953ATJWJrg/edit
- Cloudinary media library: https://console.cloudinary.com/app/c-28ffda95682960d1f4977f1355507c/assets/media_library/

## Notes

- The app currently reads menu content from local JSON rather than a CMS or database.
- `@cloudinary/react` and `@cloudinary/url-gen` are installed dependencies if media integration is expanded later.
