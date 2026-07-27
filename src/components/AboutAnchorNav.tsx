import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { getAnchorScrollOffset, getAnchorSectionTop } from "@/lib/scrollNav";

const AboutAnchorNav = () => {
  const { t } = useLang();
  const location = useLocation();

  const sections = useMemo(
    () => [
      { id: "history", label: t("History", "Geschichte") },
      { id: "sustainability", label: t("Sustainability", "Nachhaltigkeit") },
      { id: "values", label: t("Values", "Werte") },
    ],
    [t]
  );

  const [activeSection, setActiveSection] = useState(() => {
    const hash = location.hash.replace("#", "");
    return sections.some((s) => s.id === hash) ? hash : "history";
  });

  const scrollToSection = (id: string, behavior: ScrollBehavior = "auto") => {
    const top = getAnchorSectionTop(id, location.pathname);
    if (top === null) return;
    setActiveSection(id);
    const offset = getAnchorScrollOffset(id);
    window.scrollTo({ top: top - offset, behavior });
    window.history.replaceState(null, "", `#${id}`);
  };

  useEffect(() => {
    if (window.innerWidth < 1024) return;
    const updateActiveSection = () => {
      const anchorLine = window.scrollY + getAnchorScrollOffset() + 8;
      let current = sections[0].id;
      sections.forEach((section) => {
        const top = getAnchorSectionTop(section.id, location.pathname);
        if (top !== null && top <= anchorLine) current = section.id;
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

export default AboutAnchorNav;
