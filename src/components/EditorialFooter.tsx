import { Link } from "react-router-dom";
import { Instagram, Linkedin, Mail, ArrowRight } from "lucide-react";
import { useQuoteModal } from "@/components/QuoteModal";
import { useLang } from "@/i18n/LanguageContext";
import grsLogo from "@/assets/grs-step-logo.png?url";

const FooterCertificationLogos = () => (
  <div className="flex items-center justify-center gap-3">
    <img
      src={grsLogo}
      alt="Global Recycled Standard"
      className="w-[200px] md:w-[300px] bg-white object-contain"
    />
  </div>
);

const EditorialFooter = () => {
  const { open: openQuote } = useQuoteModal();
  const { t, lang, setLang } = useLang();
  return (
    <footer data-no-reveal className="bg-foreground text-background">
      <div className="editorial-container py-6 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-16">
{/* Brand */}
<div className="text-center md:text-left">
  <h3 className="font-serif text-xl md:text-2xl mb-2 md:mb-4">
    Dresdner Spitzen
  </h3>

  <p className="editorial-body-sm text-background/60 max-w-xs mx-auto md:mx-0">
    {t(
      "Made in Germany. Since 1884.",
      "Made in Germany. Seit 1884."
    )}
  </p>

  <p className="hidden md:block editorial-body-sm text-background/60 max-w-xs whitespace-pre-line mt-4">
    {t(
      "Your partner for high-quality textiles, developed and produced in Dresden.",
      "Ihr Partner für hochwertige Textilien, entwickelt und produziert in Dresden."
    )}
  </p>
</div>

          {/* Navigation */}
          <div className="hidden md:block">
            <p className="editorial-label text-background/40 mb-6">{t("Navigation", "Navigation")}</p>
            <div className="flex flex-col gap-3">
  <Link
    to="/"
    className="editorial-body-sm text-background/70 hover:text-background transition-colors"
  >
    {t("Home", "Startseite")}
  </Link>

  <Link
    to="/services"
    className="editorial-body-sm text-background/70 hover:text-background transition-colors"
  >
    {t("Production", "Produktion")}
  </Link>

  <Link
    to="/about"
    className="editorial-body-sm text-background/70 hover:text-background transition-colors"
  >
    {t("About", "Über uns")}
  </Link>

  <Link
    to="/contact"
    className="editorial-body-sm text-background/70 hover:text-background transition-colors"
  >
    {t("Contact", "Kontakt")}
  </Link>

  <div className="mt-1 flex flex-col items-start gap-1">
    <div className="w-16 h-px bg-background/20" />

     <button
      type="button"
      onClick={openQuote}
      className="inline-flex items-center gap-2 editorial-body-sm text-background hover:text-background/70 transition-colors"
    >
      {t("Enquiry", "Anfrage")}
      <ArrowRight size={14} />
    </button>
  </div>
</div>
          </div>

{/* Contact */}
<div>
  {/* Mobile compact contact */}
<div className="md:hidden text-center">
  <div className="mt-4 flex items-center justify-center gap-8">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setLang("de")}
          className={`editorial-label transition-colors ${
            lang === "de" ? "text-background" : "text-background/60 hover:text-background"
          }`}
          aria-pressed={lang === "de"}
        >
          DE
        </button>

        <span className="text-background/30">|</span>

        <button
          onClick={() => setLang("en")}
          className={`editorial-label transition-colors ${
            lang === "en" ? "text-background" : "text-background/60 hover:text-background"
          }`}
          aria-pressed={lang === "en"}
        >
          EN
        </button>
      </div>

      <div className="flex items-center gap-4">
  <a
    href="mailto:sales@dresdnerspitzen.com"
    aria-label="Email"
    className="text-background/70 hover:text-background transition-colors"
  >
    <Mail size={18} />
  </a>

  <a
    href="https://www.instagram.com/dresdnerspitzen/"
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label="Instagram"
          className="text-background/70 hover:text-background transition-colors"
        >
          <Instagram size={18} />
        </a>

        <a
          href="https://www.linkedin.com/company/dresdner-spitzen-gmbh"
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label="LinkedIn"
          className="text-background/70 hover:text-background transition-colors"
        >
          <Linkedin size={18} />
        </a>
      </div>
    </div>
  </div>

  {/* Desktop contact */}
  <div className="hidden md:block">
    <p className="editorial-label text-background/40 mb-6">{t("Contact", "Kontakt")}</p>

    <div className="flex flex-col gap-3 editorial-body-sm text-background/70">
      {/* Removed location */}

      <a className="hover:text-background transition-colors" href="mailto:sales@dresdnerspitzen.com">
        sales@dresdnerspitzen.com
      </a>

      <a
        href="https://www.instagram.com/dresdnerspitzen"
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="inline-flex items-center gap-2 hover:text-background transition-colors"
      >
        <Instagram size={16} /> Instagram
      </a>

      <a
        href="https://www.linkedin.com/company/dresdner-spitzen-gmbh"
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="inline-flex items-center gap-2 hover:text-background transition-colors"
      >
        <Linkedin size={16} /> LinkedIn
      </a>
    </div>

    <div className="mt-8 flex gap-4">
      <button
        onClick={() => setLang("de")}
        className={`editorial-label transition-colors ${
          lang === "de" ? "text-background" : "text-background/60 hover:text-background"
        }`}
        aria-pressed={lang === "de"}
      >
        DE
      </button>

      <span className="text-background/30">|</span>

      <button
        onClick={() => setLang("en")}
        className={`editorial-label transition-colors ${
          lang === "en" ? "text-background" : "text-background/60 hover:text-background"
        }`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  </div>
</div>
        </div>
      </div>

      <div className="bg-white pt-6 md:pt-10 pb-6 md:pb-10">
        <div className="editorial-container flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">

            <p className="editorial-body-sm text-primary">
              © {new Date().getFullYear()} Dresdner Spitzen. {t("All rights reserved.", "Alle Rechte vorbehalten.")}
            </p>
            <FooterCertificationLogos />
          </div>

          <div className="flex justify-center gap-4 md:gap-6">
            <Link to="/imprint" className="editorial-body-sm text-primary">{t("Imprint", "Impressum")}</Link>
            <Link to="/privacy" className="editorial-body-sm text-primary">{t("Privacy", "Datenschutz")}</Link>
          </div>
        </div>
      </div>
    </footer>);

};

export default EditorialFooter;
