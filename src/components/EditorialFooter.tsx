import { Link } from "react-router-dom";
import { Instagram, Linkedin, Mail, ArrowRight } from "lucide-react";
import { useQuoteModal } from "@/components/QuoteModal";
import { useLang } from "@/i18n/LanguageContext";
import grsLogo from "@/assets/GRS_weiss.png?url";
import oekoTexLogo from "@/assets/oeko-tex.png?url";

const FooterCertificationLogos = () => (
  <div className="mt-4 flex items-center justify-center gap-3 md:justify-start">
    <img
      src={grsLogo}
      alt="Global Recycled Standard"
      className="w-[72px] md:w-[88px] object-contain"
    />
    <img
      src={oekoTexLogo}
      alt="OEKO-TEX STeP"
      className="w-[86px] md:w-[104px] bg-white object-contain"
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
      "Tradition meets Textile Innovation. Since 1884.",
      "Tradition trifft Textile Innovation. Seit 1884."
    )}
  </p>

  <FooterCertificationLogos />

  <p className="hidden md:block editorial-body-sm text-background/60 max-w-xs whitespace-pre-line mt-4">
    {t(
      "Your partner for high-quality lace, warp-knitted fabrics and functional textiles, developed and produced in Dresden.",
      "Ihr Partner für hochwertige Spitzen, Kettengewirke und funktionale Textilien, entwickelt und produziert in Dresden."
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

  <Link
    to="/jobs"
    className="editorial-body-sm text-background/70 hover:text-background transition-colors"
  >
    {t("Careers", "Karriere")}
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
      <p>{t("Dresden, Germany", "Dresden, Deutschland")}</p>

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

      <div className="mt-6 md:mt-16 pt-4 md:pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-center md:text-left">
          <p className="editorial-body-sm text-background/40">
            © {new Date().getFullYear()} Dresdner Spitzen. {t("All rights reserved.", "Alle Rechte vorbehalten.")}
          </p>
          <div className="flex justify-center gap-4 md:gap-6">
            <Link to="/imprint" className="editorial-body-sm text-background/40 hover:text-background/70 transition-colors">{t("Imprint", "Impressum")}</Link>
            <Link to="/privacy" className="editorial-body-sm text-background/40 hover:text-background/70 transition-colors">{t("Privacy", "Datenschutz")}</Link>
          </div>
        </div>
      </div>
    </footer>);

};

export default EditorialFooter;
