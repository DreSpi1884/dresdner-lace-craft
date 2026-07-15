import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Instagram, Linkedin, ChevronDown } from "lucide-react";
import { useQuoteModal } from "@/components/QuoteModal";
import { useLang, type Lang } from "@/i18n/LanguageContext";
import logoAsset from "@/assets/dresdner-spitzen-logo-weiss.png.asset.json";

const logoWhite = logoAsset.url;

const languages: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
];

const getHeroScale = (width: number) => {
  if (width < 640) return 7.2;
  if (width < 768) return 7.5;
  if (width < 1024) return 7.8;
  if (width < 1280) return 7;
  if (width < 1536) return 8;
  return 9;
};

const EditorialNav = () => {
  const { t, lang, setLang } = useLang();
  const location = useLocation();
  const { open: openQuote } = useQuoteModal();

  const isHome = location.pathname === "/";

  const navItems = [
    { key: "home", label: t("HOME", "START"), path: "/" },
    { key: "services", label: t("PRODUCTION", "PRODUKTION"), path: "/services" },
    { key: "about", label: t("ABOUT", "ÜBER UNS"), path: "/about" },
    { key: "contact", label: t("CONTACT", "KONTAKT"), path: "/contact" },
  ];

  const aboutSections = [
    { label: t("HISTORY", "GESCHICHTE"), hash: "#history" },
    { label: t("SUSTAINABILITY", "NACHHALTIGKEIT"), hash: "#sustainability" },
    { label: t("VALUES", "WERTE"), hash: "#values" },
  ];

  const serviceSections = [
    { label: t("DESIGN", "DESIGN"), hash: "#design" },
    {
      label: t("RAW MATERIAL PRODUCTION", "ROHWARENPRODUKTION"),
      hash: "#raw-material-production",
    },
    {
      label: t("DYEING & FINISHING", "FÄRBUNG & AUSRÜSTUNG"),
      hash: "#dyeing-finishing",
    },
    {
      label: t("FUNCTIONAL & MEDICAL TEXTILES", "FUNKTIONS- UND MEDIZINTEXTILIEN"),
      hash: "#functional-textiles",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const logoRef = useRef<HTMLImageElement>(null);
  const naturalCenter = useRef<{ cx: number; cy: number } | null>(null);
  const [logoStyle, setLogoStyle] = useState<CSSProperties>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    const updateLogo = () => {
      const nc = naturalCenter.current;
      if (!nc) return;

      const atHeroTop = isHome && window.scrollY <= 0;

      if (!atHeroTop) {
        setLogoStyle({
          transform: "none",
          transformOrigin: "center center",
        });
        return;
      }

      const scale = getHeroScale(window.innerWidth);
      const targetX = window.innerWidth / 2;
      const targetY = window.innerHeight * 0.45;

      const dx = targetX - nc.cx;
      const dy = targetY - nc.cy;

      setLogoStyle({
        transform: `translate(${dx}px, ${dy}px) scale(${scale})`,
        transformOrigin: "center center",
      });
    };

    const measure = () => {
      const img = logoRef.current;
      if (!img) return;

      const prevTransform = img.style.transform;
      const prevTransition = img.style.transition;

      img.style.transition = "none";
      img.style.transform = "none";

      const rect = img.getBoundingClientRect();

      img.style.transform = prevTransform;
      img.style.transition = prevTransition;

      naturalCenter.current = {
        cx: rect.left + rect.width / 2,
        cy: rect.top + rect.height / 2,
      };

      updateLogo();
    };

    const img = logoRef.current;
    const frame = window.requestAnimationFrame(measure);

    img?.addEventListener("load", measure);

    const onScroll = () => updateLogo();
    const onResize = () => measure();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.cancelAnimationFrame(frame);
      img?.removeEventListener("load", measure);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [isHome]);

  const handleAboutAnchor = (e: MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (location.pathname === "/about") {
      e.preventDefault();

      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
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
          className={`flex items-center text-background transition-opacity ${
            isOpen ? "opacity-0 pointer-events-none" : ""
          } ${isHome && !scrolled ? "pointer-events-none" : ""}`}
        >
          <img
            ref={logoRef}
            src={logoWhite}
            alt="Dresdner Spitzen logo"
            className="h-16 md:h-20 w-auto pointer-events-none relative z-50 object-contain"
            style={{
              transition: "transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              willChange: "transform",
              ...logoStyle,
            }}
          />

          <span className="sr-only">Dresdner Spitzen</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            if (item.key === "about" || item.key === "services") {
              const sections = item.key === "about" ? aboutSections : serviceSections;
              const base = item.key === "services" ? "/services" : "/about";

              return (
                <div key={item.path} className="relative group">
                  <Link
                    to={item.path}
                    className={`editorial-body-sm transition-colors duration-300 drop-shadow-md hover:text-background/70 inline-flex items-center gap-1 ${
                      location.pathname === item.path
                        ? "text-background"
                        : "text-background/85"
                    }`}
                  >
                    {item.label}
                    <ChevronDown size={14} />
                  </Link>

                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="bg-foreground border border-background/10 min-w-[200px] py-2">
                      {sections.map((s) => (
                        <Link
                          key={s.hash}
                          to={`${base}${s.hash}`}
                          onClick={(e) => {
                            if (item.key === "about") {
                              handleAboutAnchor(e, s.hash);
                            }
                          }}
                          className="block px-5 py-2 editorial-body-sm text-background/80 hover:text-background hover:bg-background/5 transition-colors"
                        >
                          {s.label}
                        </Link>
                      ))}
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
                  location.pathname === item.path
                    ? "text-background"
                    : "text-background/85"
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
          type="button"
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
              const hasSections = item.key === "services" || item.key === "about";
              const sections = item.key === "services" ? serviceSections : aboutSections;

              if (!hasSections) {
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`w-full text-background/80 ${
                      location.pathname === item.path
                        ? "text-background"
                        : "text-background/80"
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
                      location.pathname === item.path
                        ? "text-background"
                        : "text-background/80"
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
                    {sections.map((s) => (
                      <Link
                        key={s.hash}
                        to={`${item.path}${s.hash}`}
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
                    ))}
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
                  type="button"
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
