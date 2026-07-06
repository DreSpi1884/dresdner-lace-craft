import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const STORAGE_KEY = "ds-cookie-consent-v1";

type Consent = {
  essential: true;
  analytics: boolean;
  timestamp: string;
};

export const getConsent = (): Consent | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
};

export const resetConsent = () => {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("cookie-consent-reset"));
};

const saveConsent = (analytics: boolean) => {
  const consent: Consent = {
    essential: true,
    analytics,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  window.dispatchEvent(
    new CustomEvent("cookie-consent-changed", { detail: consent }),
  );
};

const CookieConsent = () => {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    if (!getConsent()) setVisible(true);
    const onReset = () => setVisible(true);
    window.addEventListener("cookie-consent-reset", onReset);
    return () => window.removeEventListener("cookie-consent-reset", onReset);
  }, []);

  if (!visible) return null;

  const handleAcceptAll = () => {
    saveConsent(true);
    setVisible(false);
  };

  const handleRejectAll = () => {
    saveConsent(false);
    setVisible(false);
  };

  const handleSavePrefs = () => {
    saveConsent(analytics);
    setShowPrefs(false);
    setVisible(false);
  };

  return (
    <>
      <div
        role="dialog"
        aria-live="polite"
        aria-label={t("Cookie consent", "Cookie-Einwilligung")}
        className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 sm:px-6 sm:pb-6"
      >
        <div className="mx-auto max-w-4xl bg-background border border-border shadow-[var(--shadow-editorial)]">
          <div className="p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-3">
              {t("We value your privacy", "Wir respektieren Ihre Privatsphäre")}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-2xl">
              {t(
                "We use essential cookies to ensure this website functions properly. With your consent, we also use analytics cookies to understand how visitors use our website. See our ",
                "Wir verwenden essenzielle Cookies, damit diese Website ordnungsgemäß funktioniert. Mit Ihrer Einwilligung nutzen wir zusätzlich Analyse-Cookies, um zu verstehen, wie Besucher unsere Website nutzen. Siehe unsere "
              )}
              <Link to="/privacy" className="underline underline-offset-4 hover:text-foreground">
                {t("Privacy Policy", "Datenschutzerklärung")}
              </Link>{" "}
              {t("and", "und")}{" "}
              <Link to="/imprint" className="underline underline-offset-4 hover:text-foreground">
                {t("Imprint", "Impressum")}
              </Link>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAcceptAll}
                className="px-6 py-3 bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors"
              >
                {t("Accept All", "Alle akzeptieren")}
              </button>
              <button
                onClick={handleRejectAll}
                className="px-6 py-3 border border-border text-foreground text-xs tracking-[0.2em] uppercase hover:bg-muted transition-colors"
              >
                {t("Reject All", "Alle ablehnen")}
              </button>
              <button
                onClick={() => setShowPrefs(true)}
                className="px-6 py-3 text-foreground text-xs tracking-[0.2em] uppercase underline underline-offset-4 hover:text-primary transition-colors"
              >
                {t("Manage Preferences", "Einstellungen verwalten")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPrefs && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t("Cookie preferences", "Cookie-Einstellungen")}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-foreground/40 p-4"
          onClick={() => setShowPrefs(false)}
        >
          <div
            className="w-full max-w-lg bg-background border border-border shadow-[var(--shadow-editorial)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="font-serif text-xl text-foreground">
                {t("Cookie Preferences", "Cookie-Einstellungen")}
              </h3>
              <button
                onClick={() => setShowPrefs(false)}
                aria-label={t("Close", "Schließen")}
                className="text-muted-foreground hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-foreground mb-1">
                    {t("Essential", "Essenziell")}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(
                      "Required for the website to function. Always active.",
                      "Für den Betrieb der Website erforderlich. Immer aktiv."
                    )}
                  </p>
                </div>
                <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground pt-1">
                  {t("Always On", "Immer aktiv")}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-foreground mb-1">
                    {t("Analytics", "Analyse")}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(
                      "Help us understand how visitors use our website.",
                      "Hilft uns zu verstehen, wie Besucher unsere Website nutzen."
                    )}
                  </p>
                </div>
                <label className="inline-flex items-center cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="sr-only peer"
                  />
                  <span className="relative w-10 h-5 bg-border peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-background after:w-4 after:h-4 peer-checked:after:translate-x-5 after:transition-transform" />
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-border">
              <button
                onClick={() => setShowPrefs(false)}
                className="px-5 py-2.5 text-xs tracking-[0.2em] uppercase text-foreground hover:text-primary"
              >
                {t("Cancel", "Abbrechen")}
              </button>
              <button
                onClick={handleSavePrefs}
                className="px-5 py-2.5 bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors"
              >
                {t("Save Preferences", "Einstellungen speichern")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
