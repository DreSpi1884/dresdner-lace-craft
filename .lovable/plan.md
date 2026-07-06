# Full site translation (EN / DE)

Currently the DE/EN buttons in the footer are decorative — clicking them does nothing, and every page's text is hardcoded English. I'll wire up a real translation system so the entire site switches between English and German.

## Approach

Use a lightweight in-house i18n setup (no extra dependencies needed):

1. **`LanguageProvider`** — React context storing the current language (`en` | `de`), persisted to `localStorage` (`ds-lang`), with `<html lang="…">` updated on change. Default: `en`.
2. **`useT()` hook** — returns a `t(key)` function that looks up strings in a nested dictionary based on the active language.
3. **`src/i18n/translations.ts`** — one dictionary with an `en` and `de` tree covering every user-visible string on the site.
4. **Footer toggle** — the existing `DE` / `EN` buttons become real buttons that call `setLanguage(...)`; the active language is highlighted.
5. **Replace hardcoded strings** in every page and shared component with `t("…")` calls.

## Pages and components to translate

- Nav: `EditorialNav` (menu items: Services, About, Careers, Contact, Request a Quote)
- Footer: `EditorialFooter` (all labels, address, copyright, legal links)
- Home: `Index` (hero, keywords banner, services cards, heritage block, careers CTA)
- `Services` (all four service sections + intros)
- `About` (intro, values, production steps, timeline copy in `HistoryTimeline`)
- `Jobs` (intro, apprenticeships list, application block)
- `Contact` (headings, form labels/placeholders, address)
- `Imprint`, `Privacy` (legal copy — professional German translation)
- `NotFound` (404 copy)
- `QuoteModal` (all 5 questions, options, tooltips, buttons, success message)
- `CookieConsent` (banner text + buttons)
- `SEO` per-page `title` / `description` (localized)

## German translation quality

- Use formal register (Sie-Form), consistent with a premium B2B brand.
- Keep proper nouns untouched: "Dresdner Spitzen", "DreGuS", street names, email addresses.
- Adapt idioms rather than translating literally (e.g. "The Art of Textiles" → "Die Kunst der Textilien"; "Request a Quote" → "Angebot anfragen"; "Careers" → "Karriere"; "Made in Germany" stays as-is).
- Legal pages (Imprint/Privacy) get proper German legal wording ("Impressum", "Datenschutzerklärung").

## Technical notes

- Wrap `<App />` in `LanguageProvider` inside `src/main.tsx` (or top of `App.tsx`).
- Keys are organized by area: `nav.services`, `home.hero.title`, `services.dyeing.desc`, `quote.q1.title`, etc.
- `t(key)` returns the key itself if missing, so nothing crashes during rollout.
- No routing changes — same URLs serve both languages; language is a client-side preference.
- No new npm packages.

## Out of scope

- Server-side rendering / SEO hreflang tags (site is a Vite SPA).
- Translating dynamic user input (quote form free-text answers stay as entered).
- A third language.

Once you approve, I'll implement it in one pass.
