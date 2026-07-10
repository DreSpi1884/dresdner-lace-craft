import { useEffect, useMemo, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";

const ProductionAnchorNav = () => {
  const { t } = useLang();

  const [activeSection, setActiveSection] = useState("design");

  const sections = useMemo(
    () => [
      { id: "design", label: t("Design", "Design") },
      {
        id: "raw-material-production",
        label: t("Raw material production", "Rohwarenproduktion"),
      },
      {
        id: "dyeing-finishing",
        label: t("Dyeing & finishing", "Färbung & Ausrüstung"),
      },
      {
        id: "functional-textiles",
        label: t("Functional & medical textiles", "Funktions- & Medizintextilien"),
      },
    ],
    [t]
  );

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    setActiveSection(id);
 
    const offset = 180;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: "smooth" });
    window.history.replaceState(null, "", `#${id}`);
  };

useEffect(() => {
  if (window.innerWidth < 1024) return;

  const hash = window.location.hash.replace("#", "");
  const isValidHash = sections.some((section) => section.id === hash);

  if (isValidHash) {
    setActiveSection(hash);
  }
}, [sections]);

  useEffect(() => {
    const observer = new IntersectionObserver(
        if (window.innerWidth < 1024) return;
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "-20% 0px -65% 0px",
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="sticky top-24 z-40 hidden lg:block bg-background/95 backdrop-blur border-b border-primary/10">


      {/* Desktop navigation */}
      <div className="hidden lg:flex items-center gap-12 px-[60px] overflow-x-auto no-scrollbar">
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
