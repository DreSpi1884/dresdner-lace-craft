import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Instagram, ChevronDown } from "lucide-react";
import logo from "@/assets/logo-white.png.asset.json";

const navItems = [
  { label: "HOME", path: "/" },
  { label: "SERVICES", path: "/services" },
  { label: "ABOUT", path: "/about" },
  { label: "CONTACT", path: "/contact" },
];

const contactSections = [
  { label: "CONTACT", path: "/contact" },
  { label: "CAREERS", path: "/jobs" },
];

const aboutSections = [
  { label: "HISTORY", hash: "#history" },
  { label: "VALUES", hash: "#values" },
  { label: "SUSTAINABILITY", hash: "#sustainability" },
  { label: "PRODUCTION", hash: "#production" },
];

const languages = ["EN", "DE", "FR"];

const HERO_SCALE = 4.5;

const EditorialNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState("EN");
  const location = useLocation();

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

  // Measure natural nav logo center (with no transform applied)
  useLayoutEffect(() => {
    const measure = () => {
      const img = logoRef.current;
      if (!img) return;
      // Temporarily clear transform to get natural rect
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
      if (!isHome) {
        setLogoStyle({ transform: "none" });
        setProgress(1);
        return;
      }
      const rawP = Math.max(0, Math.min(1, window.scrollY / 150));
      const p = 1 - Math.pow(1 - rawP, 3); // easeOut cubic
      const heroCx = window.innerWidth / 2;
      const heroCy = window.innerHeight * 0.42;
      const scale = 1 + (HERO_SCALE - 1) * (1 - p);
      const dx = (heroCx - nc.cx) * (1 - p);
      const dy = (heroCy - nc.cy) * (1 - p);
      setLogoStyle({
        transform: `translate(${dx}px, ${dy}px) scale(${scale})`,
        transformOrigin: "center center",
        willChange: "transform",
      });
      setProgress(p);
    };
    measure();
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        updateLogo();
      });
    };
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
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isHome && !scrolled ? "bg-transparent" : "bg-foreground shadow-md"
      }`}
    >
      <nav className="flex items-center justify-between h-20 md:h-24 pl-2 md:pl-4 pr-4 md:pr-8">
        <Link to="/" className="flex items-center gap-1 text-background">
          <img
            ref={logoRef}
            src={logo.url}
            alt="Dresdner Spitzen logo"
            className="h-16 md:h-20 w-auto pointer-events-none relative z-50"
            style={logoStyle}
          />
          <span
            className="font-serif text-sm md:text-base tracking-wide text-background drop-shadow-md -ml-1 transition-opacity duration-200"
            style={{ opacity: isHome ? progress : 1 }}
          >
            Dresdner Spitzen
          </span>
        </Link>


        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            if (item.label === "ABOUT") {
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
                      {aboutSections.map((s) => (
                        <Link
                          key={s.hash}
                          to={`/about${s.hash}`}
                          onClick={(e) => handleAboutAnchor(e, s.hash)}
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
            if (item.label === "CONTACT") {
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
                      {contactSections.map((s) => (
                        <Link
                          key={s.path}
                          to={s.path}
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
                  location.pathname === item.path ? "text-background" : "text-background/85"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            to="/quote"
            className="editorial-body-sm cta-lace border border-background/70 text-background px-5 py-2.5 hover:bg-background hover:text-foreground transition-colors duration-300"
          >
            ENQUIRY{"\n"}
          </Link>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/dresdnerspitzen"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-background drop-shadow-md hover:text-background/70 transition-colors"
          >
            <Instagram size={18} />
          </a>

          {/* Language switcher */}
          <div className="relative group">
            <button
              className="editorial-body-sm text-background drop-shadow-md inline-flex items-center gap-1 hover:text-background/70 transition-colors"
              aria-label="Language"
            >
              {lang}
              <ChevronDown size={14} />
            </button>
            <div className="absolute right-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="bg-foreground border border-background/10 min-w-[80px] py-2">
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`block w-full text-left px-4 py-2 editorial-body-sm transition-colors hover:bg-background/5 ${
                      lang === l ? "text-background" : "text-background/70"
                    }`}
                  >
                    {l}
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
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-foreground/95 backdrop-blur-sm animate-fade-in">
          <div className="editorial-container py-8 flex flex-col gap-6">
            {navItems.map((item) => (
              <div key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`editorial-heading-sm ${
                    location.pathname === item.path ? "text-background" : "text-background/80"
                  }`}
                >
                  {item.label}
                </Link>
                {item.label === "CONTACT" && (
                  <div className="mt-2 ml-4 flex flex-col gap-2">
                    {contactSections.map((s) => (
                      <Link
                        key={s.path}
                        to={s.path}
                        onClick={() => setIsOpen(false)}
                        className="editorial-body-sm text-background/70 hover:text-background transition-colors"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/quote"
              onClick={() => setIsOpen(false)}
              className="editorial-body cta-lace border border-background text-background px-5 py-3 text-center mt-2"
            >
              ENQUIRY{"\n"}
            </Link>
            <div className="flex gap-4 pt-2">
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`editorial-body-sm ${lang === l ? "text-background" : "text-background/60"}`}
                >
                  {l}
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
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default EditorialNav;
