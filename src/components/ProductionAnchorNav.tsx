import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { getAnchorScrollOffset, getAnchorSectionTop } from "@/lib/scrollNav";

const ProductionAnchorNav = () => {
  const { t } = useLang();
  const location = useLocation();
  const suppressUntilRef = useRef(0);

  const sections = useMemo(
    () => [
      { id: "design", label: t("Design", "Design") },
      {
        id: "raw-material-production",
        label: t("Production", "Produktion"),
      },
      {
        id: "dyeing-finishing",
        label: t("Dyeing & finishing", "Färbung & Ausrüstung"),
      },
      {
        id: "functional-textiles",
        label: t("Technical Textiles", "TECHNISCHE TEXTILIEN"),
      },
    ],
    [t]
  );

  const [activeSection, setActiveSection] = useState(() => {
    const hash = location.hash.replace("#", "");
    const matches = sections.some((s) => s.id === hash);
    if (matches) {
      // Beim Reinlinken von außen braucht ScrollToTop einen Moment, bis der
      // Ziel-Scroll abgeschlossen ist - solange den Listener nicht ran lassen.
      suppressUntilRef.current = Date.now() + 700;
      return hash;
    }
    return "design";
  });

  const scrollToSection = (id: string, behavior: ScrollBehavior = "auto") => {
    const top = getAnchorSectionTop(id, location.pathname);
    if (top === null) return;
    setActiveSection(id);
    // Scroll-Listener für kurze Zeit ignorieren, damit er die gerade
    // gesetzte Markierung nicht sofort wieder überschreibt.
    suppressUntilRef.current = Date.now() + 700;
    const offset = getAnchorScrollOffset(id);
    window.scrollTo({ top: top - offset, behavior });
    window.history.replaceState(null, "", `#${id}`);
  };

  useEffect(() => {
    if (window.innerWidth < 1024) return;
    const updateActiveSection = () => {
      if (Date.now() < suppressUntilRef.current) return;
      const scrollPos = window.scrollY;
      let current = sections[0].id;
      sections.forEach((section) => {
        const top = getAnchorSectionTop(section.id, location.pathname);
        if (top === null) return;
        const threshold = top - getAnchorScrollOffset(section.id);
        if (threshold <= scrollPos) current = section.id;
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
  }, [sections, location.pathname]);

  return (
    <nav
      data-anchor-subnav
      className="sticky top-24 z-40 hidden bg-background/95 backdrop-blur border-b border-primary/10 lg:block"
    >
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

export default ProductionAnchorNav;
