# Dresdner Spitzen Website

Unternehmenswebsite von Dresdner Spitzen, umgesetzt mit React, TypeScript,
Vite und Tailwind CSS.

## Lokale Entwicklung

Voraussetzungen:

- Node.js
- npm

```bash
npm install
npm run dev
```

## Qualitätsprüfungen

```bash
npm run lint
npm run test
npm run build
```

## Produktionsvorschau

```bash
npm run build
npm run preview
```

## Wichtige Konfiguration

- Allgemeine Kontaktdaten und Website-URL: `src/config/site.ts`
- SEO-Metadaten: `src/components/SEO.tsx`
- Produktionsvariablen: `.env.production`
- Sitemap: `public/sitemap.xml`
- Robots-Datei: `public/robots.txt`

Vor einem Deployment müssen die primäre Domain, der Hosting-Anbieter,
Formularversand und die Datenschutzerklärung aufeinander abgestimmt sein.
