import { Link } from "react-router-dom";
import { ArrowRight, Factory, PenTool, BadgeCheck, Truck } from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";
import SEO from "@/components/SEO";
import EditorialSection from "@/components/EditorialSection";
import heroVideo from "@/assets/hero-video.mp4.asset.json";
import logoWhite from "@/assets/dresdner-spitzen-logo-weiss.png?url";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Instagram, Linkedin, ChevronDown } from "lucide-react";
import logo from "@/assets/logo-white.png.asset.json";
import { useQuoteModal } from "@/components/QuoteModal";
import { useLang, type Lang } from "@/i18n/LanguageContext";

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
        className={`flex items-center gap-1 text-background transition-opacity ${
          isOpen ? "opacity-0 pointer-events-none" : ""
        } ${isHome && !scrolled ? "pointer-events-none" : ""}`}
        >
          <img
            ref={logoRef}
            src={logo.url}
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
  className="font-serif text-lg md:text-2xl lg:text-3xl tracking-wide text-background drop-shadow-md -ml-1"
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

import serviceCollections from "@/assets/service-collections.jpg.asset.json";
import serviceBespoke from "@/assets/service-bespoke.jpg.asset.json";
import serviceLaceCollections from "@/assets/seasonal-lace-collections.jpg.asset.json";
import serviceFunctional from "@/assets/functional-medical-fabric.jpg.asset.json";
import serviceDyeing from "@/assets/dyeing-finishing.jpg.asset.json";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import heritageThen from "@/assets/heritage-then.png.asset.json";
import heritageNow from "@/assets/heritage-now.jpg.asset.json";
import { useLang } from "@/i18n/LanguageContext";

const Index = () => {
  const { t } = useLang();
  return (
    <EditorialLayout heroAtTop>
      <SEO
        title={t(
          "Dresdner Spitzen | Premium German Textile Manufacturer since 1884",
          "Dresdner Spitzen | Deutscher Premium-Textilhersteller seit 1884",
        )}
        description={t(
          "Dresdner Spitzen since 1884: German manufacturer of lace, warp-knitted & functional textiles. Offering seasonal collections & bespoke custom solutions.",
          "Dresdner Spitzen seit 1884: Deutscher Hersteller von Spitze, Wirkwaren & Funktionstextilien. Wir bieten saisonale Kollektionen & maßgeschneiderte Lösungen.",
        )}
        path="/"
      />
      {/* HERO */}
      <section data-no-reveal className="relative overflow-hidden min-h-screen flex items-center justify-center">
        <video
          src={heroVideo.url}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/30" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-[clamp(1rem,4vw,4rem)] pt-[24vh] py-[clamp(2rem,5vh,5rem)] w-full">
          <img
            src={logoWhite}
            alt="Dresdner Spitzen"
            className="mx-auto mb-[clamp(0.75rem,2vh,1.5rem)] w-[clamp(96px,12.5vw,240px)] object-contain"
          />
          <h1
            className="font-serif text-background leading-[1.1] tracking-[-0.01em] pb-2 [text-wrap:balance]"
            style={{ fontSize: "clamp(36px, 8vw, 64px)" }}
          >
            {t("The Art of Textiles", "The Art of Textiles")}
          </h1>
          <p
            className="editorial-label text-background/90 tracking-[0.3em] mt-[clamp(0.5rem,1.5vh,1rem)]"
            style={{ fontSize: "clamp(13px, 2vw, 18px)" }}
          >
            MADE IN GERMANY
          </p>
        </div>
      </section>

      {/* KEYWORDS BANNER */}
<section className="w-full bg-background border-b border-border py-5 md:py-6">
  <div className="editorial-container">
    <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x divide-primary/30">
      {[
        {
          text: t("IN-HOUSE PRODUCTION", "INTEGRIERTE PRODUKTION"),
          icon: Factory,
        },
        {
          text: t("TAILORED DESIGNS", "MASSGESCHNEIDERTE DESIGNS"),
          icon: PenTool,
        },
        {
          text: t("CERTIFIED SUSTAINABLE PRODUCTION", "ZERTIFIZIERTE NACHHALTIGKEIT"),
          icon: BadgeCheck,
        },
        {
          text: t("JUST-IN-TIME DELIVERY", "JUST-IN-TIME-LIEFERUNG"),
          icon: Truck,
        },
      ].map(({ text, icon: Icon }) => (
        <div
          key={text}
          className="flex min-h-[4rem] items-center justify-center gap-3 px-3 py-3 text-left md:min-h-[3rem] md:px-6 md:py-0 md:text-center"
        >
          <Icon
            className="h-5 w-5 shrink-0 text-primary md:hidden"
            strokeWidth={1.5}
            aria-hidden="true"
          />

          <span
            className="editorial-label text-primary leading-tight"
            style={{ fontSize: "clamp(9px, 1vw, 13px)" }}
          >
            {text}
          </span>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* OUR SERVICES */}
      <EditorialSection className="bg-background text-foreground">
        <div className="py-10 md:py-14 lg:py-[4.5rem]">
          <div className="editorial-container text-center mb-8 md:mb-10">
            <h2 className="editorial-heading-lg text-foreground mb-4">{t("Our Services", "Unsere Leistungen")}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 w-full">
            {[
              {
                title: t("Seasonal Lace Collections", "Saisonale Spitzenkollektionen"),
                desc: t(
                  "Twice a year, we develop designs that combine international fashion trends with our lace expertise.",
                  "Zweimal im Jahr entwickeln wir Designs, die internationale Modetrends mit unserer Spitzenkompetenz verbinden.",
                ),
                image: serviceLaceCollections.url,
                anchor: "design",
              },
              {
                title: t("Bespoke Designs", "Maßgeschneiderte Designs"),
                desc: t(
                  "Have a specific idea? We'll translate it into fabric, quickly and flexibly.",
                  "Sie haben eine konkrete Idee? Wir setzen sie schnell und flexibel in Textil um.",
                ),
                image: serviceCollections.url,
                anchor: "design",
              },
              {
                title: t("Dyeing and Finishing", "Färben & Ausrüsten"),
                desc: t(
                  "Our in-house dyeing facility covers the full colour spectrum in uni or bicolour.",
                  "Unsere hauseigene Färberei deckt das gesamte Farbspektrum in Uni oder Bicolor ab.",
                ),
                image: serviceDyeing.url,
                anchor: "dyeing-finishing",
              },
              {
                title: t("Functional and Medical Textiles", "Funktions- und Medizintextilien"),
                desc: t(
                  "We develop warp-knitted fabrics for medical and technical use.",
                  "Wir entwickeln Kettengewirke für medizinische und technische Anwendungen.\n",
                ),
                image: serviceFunctional.url,
                anchor: "functional-textiles",
              },
            ].map((item) => (
<Link
  key={item.title}
  to={`/services#${item.anchor}`}
  className="group block"
>
{/* Mobile version */}
<div className="lg:hidden relative aspect-[4/5] overflow-hidden">
  <img
    src={item.image}
    alt={item.title}
    className="absolute inset-0 h-full w-full object-cover"
  />

  <div className="absolute inset-x-0 bottom-0 p-6">
    <h3
      className="font-serif text-background whitespace-nowrap text-[clamp(23px,6.2vw,32px)] leading-none mb-4"
      style={{
        textShadow: "0 2px 12px rgba(0,0,0,0.75)",
      }}
    >
      {item.title}
    </h3>

    <p
      className="text-background whitespace-pre-line text-[18px] leading-[1.6]"
      style={{
        fontFamily: "'Jost', sans-serif",
        textShadow: "0 2px 10px rgba(0,0,0,0.8)",
      }}
    >
      {item.desc}
    </p>
  </div>
</div>

  {/* Desktop version */}
  <div className="hidden lg:block relative overflow-hidden aspect-[3/4] cursor-pointer">
    <img
      src={item.image}
      alt={item.title}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 p-6 z-10">
      <h3 className="editorial-heading-sm text-background">{item.title}</h3>
    </div>
    <div className="absolute inset-0 bg-foreground/85 flex items-center p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
      <div>
        <h3 className="editorial-heading-sm text-background mb-3">{item.title}</h3>
        <p className="editorial-body-sm text-background/80 whitespace-pre-line">
          {item.desc}
        </p>
      </div>
    </div>
  </div>
</Link>
            ))}
          </div>

          <div className="editorial-container text-center mt-8">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 cta-lace editorial-body-sm font-medium transition-colors duration-300"
            >
              {t("Learn More", "Mehr erfahren")} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </EditorialSection>

{/* HERITAGE + INNOVATION */}
<section className="py-16 md:py-20 overflow-hidden">
  <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
  <div className="w-full aspect-[4/3] lg:aspect-[16/10] overflow-hidden">
    <BeforeAfterSlider
        beforeImage={heritageThen.url}
        afterImage={heritageNow.url}
        beforeAlt="Historic Dresdner Spitzen weaving hall"
        afterAlt="Modern Dresdner Spitzen production facility"
      />
    </div>

    <div className="px-6 pt-10 md:px-[60px] md:pt-12 lg:px-[80px] lg:pt-0 text-center flex flex-col items-center">
  <h2 className="editorial-heading-lg text-foreground mb-6">
    {t("Our Story", "Unsere Geschichte")}
  </h2>

  <div className="space-y-4 editorial-body text-muted-foreground max-w-2xl mx-auto">
    <p>
      {t(
        "Every piece of fabric tells a story. Ours began in 1884 and continues today through new ideas, skilled craftsmanship and a passion for textile innovation.",
        "Mehr als 140 Jahre Geschichte erzählen von Wandel und Innovationsgeist. Geblieben ist unsere Leidenschaft und unser Anspruch an hochwertige Textilien.",
      )}
    </p>
  </div>

  <Link
    to="/about"
    className="inline-flex items-center justify-center gap-2 text-primary editorial-body-sm font-medium mt-8 hover:gap-3 transition-all duration-300"
  >
    {t("From 1884 to today", "Von 1884 bis heute")} <ArrowRight size={16} />
  </Link>
</div>
  </div>
</section>
      
    </EditorialLayout>
  );
};

export default Index;
