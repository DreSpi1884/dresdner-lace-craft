#!/usr/bin/env bash
set -euo pipefail

# Dresdner Spitzen – Lovable cleanup
# Aus dem Stammverzeichnis des Repositorys ausführen:
#   bash remove-lovable-cleanup.sh

required_files=("package.json" "vite.config.ts" "index.html")
for file in "${required_files[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "Fehler: $file nicht gefunden. Bitte im Repository-Stamm ausführen." >&2
    exit 1
  fi
done

timestamp="$(date +%Y%m%d-%H%M%S)"
backup_dir=".cleanup-backup-$timestamp"
mkdir -p "$backup_dir"

for file in package.json vite.config.ts index.html README.md playwright.config.ts; do
  [[ -f "$file" ]] && cp "$file" "$backup_dir/"
done
[[ -d .lovable ]] && cp -R .lovable "$backup_dir/"

python3 <<'PY'
import json
from pathlib import Path

package_path = Path("package.json")
package = json.loads(package_path.read_text(encoding="utf-8"))
for section in ("dependencies", "devDependencies", "optionalDependencies"):
    deps = package.get(section)
    if isinstance(deps, dict):
        deps.pop("lovable-tagger", None)
package_path.write_text(
    json.dumps(package, ensure_ascii=False, indent=2) + "\n",
    encoding="utf-8",
)

vite_path = Path("vite.config.ts")
vite = vite_path.read_text(encoding="utf-8")
vite = vite.replace('import { componentTagger } from "lovable-tagger";\n', "")
vite = vite.replace(
    "export default defineConfig(({ mode }) => ({",
    "export default defineConfig({",
)
vite = vite.replace(
    '  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),',
    "  plugins: [react()],",
)
if vite.rstrip().endswith("}));"):
    vite = vite.rstrip()[:-3] + "});\n"
vite_path.write_text(vite, encoding="utf-8")

index_path = Path("index.html")
index = index_path.read_text(encoding="utf-8")
old_image = (
    "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/"
    "6091ceac-22b1-45f0-97f7-7161c48ce35f/"
    "id-preview-10a3df69--7f9e3b33-3695-4d37-9167-b83aebdaddf9."
    "lovable.app-1782285246910.png"
)
index = index.replace(
    old_image,
    "https://www.dresdnerspitzen.de/og-image.jpeg",
)
index = index.replace(
    '<meta property="og:url" content="/" />',
    '<meta property="og:url" content="https://www.dresdnerspitzen.de/" />',
)
index_path.write_text(index, encoding="utf-8")

playwright_path = Path("playwright.config.ts")
if playwright_path.exists():
    playwright_config = """import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run build && npm run preview -- --host 127.0.0.1",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
  },
});
"""
    playwright_path.write_text(playwright_config, encoding="utf-8")

readme = """# Dresdner Spitzen Website

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
"""
Path("README.md").write_text(readme, encoding="utf-8")
PY

rm -rf .lovable

if [[ -f package-lock.json ]]; then
  if command -v npm >/dev/null 2>&1; then
    echo "Aktualisiere package-lock.json …"
    npm install --package-lock-only --ignore-scripts
  else
    echo "Hinweis: npm fehlt. Bitte später 'npm install --package-lock-only --ignore-scripts' ausführen."
  fi
fi

echo
echo "Verbleibende Lovable-Treffer (Bilderordner wird nicht automatisch gelöscht):"
grep -RIn \
  --exclude-dir=.git \
  --exclude-dir=node_modules \
  --exclude-dir='public/lovable-uploads' \
  --exclude='bun.lock' \
  --exclude='bun.lockb' \
  -E 'lovable|lovable\.dev|lovable\.app|lovable-tagger' . || true

echo
echo "Fertig. Backup: $backup_dir"
echo "Als Nächstes:"
echo "  npm install"
echo "  npm run lint"
echo "  npm run test"
echo "  npm run build"
echo
echo "Falls Bun-Lockdateien im Repository bleiben, mit 'bun install' aktualisieren"
echo "oder sie entfernen, wenn das Projekt ausschließlich npm verwendet."
