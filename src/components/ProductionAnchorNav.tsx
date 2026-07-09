import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const ProductionAnchorNav = () => {
  const { t } = useLang();

  const [activeSection, setActiveSection] = useState("design");
  const [openSection, setOpenSection] = useState<string | null>(null);

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
    setOpenSection(id);

    const offset = 180;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: "smooth" });
    window.history.replaceState(null, "", `#${id}`);
  };

  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      const isValidHash = sections.some((section) => section.id === hash);

      if (!isValidHash) return;

      window.setTimeout(() => {
        const element = document.getElementById(hash);
        if (!element) return;

        setActiveSection(hash);
        setOpenSection(hash);

        const offset = 180;
        const top = element.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({ top, behavior: "smooth" });
      }, 100);
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);

    return () => window.removeEventListener("hashchange", openFromHash);
  }, [sections]);

  useEffect(() => {
    const observer = new IntersectionObserver(
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
    <nav className="sticky top-20 md:top-24 z-40 bg-background/95 backdrop-blur border-b border-primary/10">
      {/* Mobile accordion navigation */}
      <div className="lg:hidden border-t border-border">
        {sections.map((section) => {
          const isOpen = openSection === section.id;
          const isActive = activeSection === section.id;

          return (
            <div key={section.id} className="border-b border-border">
              <button
                type="button"
                onClick={() => scrollToSection(section.id)}
                className={`flex w-full items-center justify-between px-6 py-4 text-left editorial-label tracking-[0.22em] transition-colors ${
                  isActive ? "text-primary" : "text-primary/45 hover:text-primary"
                }`}
              >
                <span>{section.label}</span>

                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  isOpen ? "max-h-16 opacity-100 pb-4" : "max-h-0 opacity-0 pb-0"
                }`}
              >
                <div className="px-6">
                  <div className="h-px w-full bg-primary/30" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

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
