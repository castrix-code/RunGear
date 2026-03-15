# RunGear

A Next.js website that helps runners discover gear via an interactive quiz and filterable catalog.

## Features

- **Quiz** — Answer questions about running style, distance, terrain, budget, and priority categories to get personalized gear recommendations
- **Catalog** — Filter gear by category, brand, and price. Sort by name or price
- **Product details** — View full descriptions and attributes for each item

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/          — Pages and layouts
components/   — Reusable UI (Header, Footer, GearCard, FilterBar, QuizFlow)
lib/          — Data loading, recommendations, types
data/         — gear.json seed data
```
