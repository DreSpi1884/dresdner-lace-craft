import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";

const DESKTOP_SCROLL_OFFSET = 130;

const AboutAnchorNav = () => {
  const { t } = useLang();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("history");

  const sections = useMemo(
    () => [
      { id: "history", label: t("History", "Geschichte") },
      { id: "sustainability", label: t("Sustainability", "Nachhaltigkeit") },
      { id: "values", label: t("Values", "Werte") },
    ],
    [t]
  );

  const getSectionTop = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return null;

    return element.getBoundingClientRect().top + window.scrollY;
  };

  const scrollToSection = (id: string, behavior: ScrollBehavior = "smooth") => {
    const top = getSectionTop(id);
    if (top === null) return;

    setActiveSection(id);

    window.scrollTo({
      top: top - DESKTOP_SCROLL_OFFSET,
      behavior,
    });

    window.history.replaceState(null, "", `#${id}`);
  };

  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const hash = location.hash.replace("#", "");
    const isValidHash = sections.some((section) => section.id === hash);

    if (!isValidHash) return;

    const timer = window.setTimeout(() => {
      scrollToSection(hash, "auto");
    }, 120);

    return () => window.clearTimeout(timer);
  }, [location.hash, sections]);

  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const updateActiveSection = () => {
      const anchorLine = window.scrollY + DESKTOP_SCROLL_OFFSET + 8;

      let current = sections[0].id;

      sections.forEach((section) => {
        const top = getSectionTop(section.id);

        if (top !== null && top <= anchorLine) {
          current = section.id;
        }
      });

      setActiveSection(current);
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sections]);

  return (
    <nav className="sticky top-24 z-40 hidden bg-background/95 backdrop-blur border-b border-primary/10 lg:block">
      <div className="flex items-center gap-12 px-[60px] overflow-x-auto no-scrollbar">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => scrollToSection(section.id)}
            className={`relative py-5 editorial-label tracking-[0.22em] transition-colors whitespace-nowrap ${
              activeSection === section.id
                ? "text-primary"
                : "text-primary/45 hover:text-primary"
            }`}
          >
            {section.label}

            {activeSection === section.id && (
              <span className="absolute bottom-0 left-0 h-px w-full bg-primary" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default AboutAnchorNav;
