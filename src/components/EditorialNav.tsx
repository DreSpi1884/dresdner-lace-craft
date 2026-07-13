import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Instagram, Linkedin, ChevronDown } from "lucide-react";
import { useQuoteModal } from "@/components/QuoteModal";
import { useLang, type Lang } from "@/i18n/LanguageContext";
import logoWhite from "@/assets/dresdner-spitzen-logo-weiss.png?url";

const languages: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
];

const getHeroScale = (width: number) => {
  if (width < 640) return 3.45;
  if (width < 768) return 3.7;
  if (width < 1024) return 3.9;
  if (width < 1280) return 3.6;
  if (width < 1536) return 4.1;
  return 5;
};


const EditorialNav = () => {
  const { t, lang, setLang } = useLang();

  const navItems = [
    { key: "home", label: t("HOME", "START"), path: "/" },
    { key: "services", label: t("PRODUCTION", "PRODUKTION"), path: "/services" },
    { key: "about", label: t("ABOUT", "ÜBER UNS"), path: "/about" },
    { key: "contact", label: t("CONTACT", "KONTAKT"), path: "/contact" },
  ];

  const contactSections = [
    { label: t("CONTACT", "KONTAKT"), path: "/contact" },
    { label: t("CAREERS", "KARRIERE"), path: "/jobs" },
  ];

const aboutSections = [
  { label: t("HISTORY", "GESCHICHTE"), hash: "#history" },
  { label: t("SUSTAINABILITY", "NACHHALTIGKEIT"), hash: "#sustainability" },
  { label: t("VALUES", "WERTE"), hash: "#values" },
];
  const serviceSections = [
  { label: t("DESIGN", "DESIGN"), hash: "#design" },
  { label: t("RAW MATERIAL PRODUCTION", "ROHWARENPRODUKTION"), hash: "#raw-material-production" },
  { label: t("DYEING & FINISHING", "FÄRBUNG & AUSRÜSTUNG"), hash: "#dyeing-finishing" },
  { label: t("FUNCTIONAL & MEDICAL TEXTILES", "FUNKTIONS- UND MEDIZINTEXTILIEN"), hash: "#functional-textiles" },
];

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { open: openQuote } = useQuoteModal();

  const isHome = location.pathname === "/";


  const logoRef = useRef<HTMLImageElement>(null);
  const naturalCenter = useRef<{ cx: number; cy: number } | null>(null);
  const [logoStyle, setLogoStyle] = useState<React.CSSProperties>({});
  const [progress, setProgress] = useState(isHome ? 0 : 1);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Compute hero-position transform for the nav logo. When at top of home,
  // apply a large scaled/centered transform. On any scroll (or off home),
  // reset to identity and let CSS transition it smoothly into place.
  useLayoutEffect(() => {
    const measure = () => {
      const img = logoRef.current;
      if (!img) return;
      const prev = img.style.transform;
      img.style.transform = "none";
      const rect = img.getBoundingClientRect();
      img.style.transform = prev;
      naturalCenter.current = {
        cx: rect.left + rect.width / 2,
        cy: rect.top + rect.height / 2,
      };
      updateLogo();
    };
    const updateLogo = () => {
      const nc = naturalCenter.current;
      if (!nc) return;
      const atHeroTop = isHome && window.scrollY <= 0;
      if (!atHeroTop) {
        setLogoStyle({ transform: "none" });
        setProgress(1);
        return;
      }
    setLogoStyle({
    position: "fixed",
    left: "50%",
    top: "42vh",
    transform: `translate(-50%, -50%) scale(${getHeroScale(window.innerWidth)})`,
    transformOrigin: "center center",
  });
  setProgress(0);
    };
    measure();
    const onScroll = () => updateLogo();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [isHome]);


  // Smooth scroll to anchor on About page
  const handleAboutAnchor = (e: React.MouseEvent, hash: string) => {
    if (location.pathname === "/about") {
      e.preventDefault();
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      data-no-reveal
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isHome && !scrolled ? "bg-transparent" : "bg-foreground shadow-md"
      }`}
    >
      <nav className="flex items-center justify-between h-20 md:h-24 pl-2 md:pl-4 pr-4 md:pr-8">
        <Link 
          to="/"
        className={`flex items-center gap-2 md:gap-3 text-background transition-opacity ${
          isOpen ? "opacity-0 pointer-events-none" : ""
        } ${isHome && !scrolled ? "pointer-events-none" : ""}`}
        >
          <img
            ref={logoRef}
            src={logoWhite}
            alt="Dresdner Spitzen logo"
            className="h-16 md:h-20 w-auto pointer-events-none relative z-50"
            style={{
              transition: isHome && !scrolled
                ? "none"
                : "transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              willChange: "transform",
              ...logoStyle,
            }}
          />
<span
  className="font-serif text-base md:text-xl lg:text-2xl tracking-wide text-background drop-shadow-md"
  style={{
              opacity: isHome ? progress : 1,
              transition: isHome && !scrolled
                ? "none"
                : "opacity 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            Dresdner Spitzen
          </span>
        </Link>


        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            if (item.key === "about" || item.key === "contact" || item.key === "services") {
              const sections =
  item.key === "about"
    ? aboutSections
    : item.key === "services"
    ? serviceSections
    : contactSections;
              return (
                <div key={item.path} className="relative group">
                  <Link
                    to={item.path}
                    className={`editorial-body-sm transition-colors duration-300 drop-shadow-md hover:text-background/70 inline-flex items-center gap-1 ${
                      location.pathname === item.path ? "text-background" : "text-background/85"
                    }`}
                  >
                    {item.label}
                    <ChevronDown size={14} />
                  </Link>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="bg-foreground border border-background/10 min-w-[200px] py-2">
                      {sections.map((s) => {
                        const base =
  item.key === "services"
    ? "/services"
    : "/about";

const to = "hash" in s ? `${base}${s.hash}` : s.path;
                        const key = "hash" in s ? s.hash : s.path;
                        return (
                          <Link
                            key={key}
                            to={to}
                            onClick={
  "hash" in s
    ? (e) => {
        if (item.key === "about") {
          handleAboutAnchor(e, s.hash);
        }
      }
    : undefined
}
                            className="block px-5 py-2 editorial-body-sm text-background/80 hover:text-background hover:bg-background/5 transition-colors"
                          >
                            {s.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`editorial-body-sm transition-colors duration-300 drop-shadow-md hover:text-background/70 ${
                  location.pathname === item.path ? "text-background" : "text-background/85"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={openQuote}
            className="editorial-body-sm cta-lace border border-background/70 text-background px-5 py-2.5 hover:bg-background hover:text-foreground transition-colors duration-300"
          >
            {t("ENQUIRY", "ANFRAGE")}
          </button>


          {/* Social icons */}
          <a
            href="https://www.instagram.com/dresdnerspitzen"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-background drop-shadow-md hover:text-background/70 transition-colors"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://www.linkedin.com/company/dresdner-spitzen-gmbh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-background drop-shadow-md hover:text-background/70 transition-colors"
          >
            <Linkedin size={18} />
          </a>

          {/* Language switcher */}
          <div className="relative group">
            <button
              className="editorial-body-sm text-background drop-shadow-md inline-flex items-center gap-1 hover:text-background/70 transition-colors"
              aria-label="Language"
            >
              {lang.toUpperCase()}
              <ChevronDown size={14} />
            </button>
            <div className="absolute right-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="bg-foreground border border-background/10 min-w-[80px] py-2">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`block w-full text-left px-4 py-2 editorial-body-sm transition-colors hover:bg-background/5 ${
                      lang === l.code ? "text-background" : "text-background/70"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}

              </div>
            </div>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-background p-2 drop-shadow-md"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} strokeWidth={1.75} /> : <Menu size={20} />}
        </button>
      </nav>
{/* Mobile menu */}
{isOpen && (
  <div className="md:hidden bg-foreground/95 backdrop-blur-sm animate-fade-in">
    <div className="editorial-container py-8 flex flex-col gap-7">
      {navItems.map((item) => {
        const hasSections =
          item.key === "services" || item.key === "about" || item.key === "contact";

        const sections =
          item.key === "services"
            ? serviceSections
            : item.key === "about"
            ? aboutSections
            : item.key === "contact"
            ? contactSections
            : [];

        if (!hasSections) {
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`w-full text-background/80 ${
                location.pathname === item.path ? "text-background" : "text-background/80"
              }`}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "13px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              {item.label}
            </Link>
          );
        }

        return (
          <div key={item.path} className="flex flex-col gap-3">
            <Link
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`w-full text-background/80 ${
                location.pathname === item.path ? "text-background" : "text-background/80"
              }`}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "13px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              {item.label}
            </Link>

            <div className="ml-4 flex flex-col gap-2">
              {sections.map((s) => {
                const to = "hash" in s ? `${item.path}${s.hash}` : s.path;
                const key = "hash" in s ? s.hash : s.path;

                return (
                  <Link
                    key={key}
                    to={to}
                    onClick={() => setIsOpen(false)}
                    className="text-background/55 hover:text-background transition-colors pl-2"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "14px",
                      lineHeight: 1.8,
                    }}
                  >
                    {s.label}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}

      <button
        type="button"
        onClick={() => {
          setIsOpen(false);
          openQuote();
        }}
        className="editorial-body cta-lace border border-background text-background px-5 py-3 text-center mt-2"
      >
        {t("ENQUIRY", "ANFRAGE")}
      </button>

      <div className="flex gap-4 pt-2">
        {languages.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            className={`editorial-body-sm ${
              lang === l.code ? "text-background" : "text-background/60"
            }`}
          >
            {l.label}
          </button>
        ))}

        <a
          href="https://www.instagram.com/dresdnerspitzen"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="ml-auto text-background"
        >
          <Instagram size={20} />
        </a>

        <a
          href="https://www.linkedin.com/company/dresdner-spitzen-gmbh"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-background"
        >
          <Linkedin size={20} />
        </a>
      </div>
    </div>
  </div>
)}

    </header>
  );
};

export default EditorialNav;
