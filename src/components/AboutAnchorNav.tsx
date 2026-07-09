import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";

const AboutAnchorNav = () => {
  const { t } = useLang();
  const location = useLocation();

  const [activeSection, setActiveSection] = useState("history");
  const [openSection, setOpenSection] = useState<string | null>(null);

  const sections = useMemo(
    () => [
      { id: "history", label: t("History", "Geschichte") },
      { id: "sustainability", label: t("Sustainability", "Nachhaltigkeit") },
      { id: "values", label: t("Values", "Werte") },
    ],
    [t]
  );

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    setActiveSection(id);
    setOpenSection(id);

    const offset = 140;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });

    window.history.replaceState(null, "", `#${id}`);
  };

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    const isValidHash = sections.some((section) => section.id === hash);

    if (!isValidHash) return;

    const timer = window.setTimeout(() => {
      const element = document.getElementById(hash);
      if (!element) return;

      setActiveSection(hash);
      setOpenSection(hash);

      const offset = 140;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }, 80);

    return () => window.clearTimeout(timer);
  }, [location.hash, sections]);

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
  <nav className="sticky top-24 z-40 hidden bg-background/95 backdrop-blur border-b border-primary/10 lg:block">
     

      {/* Desktop navigation */}
       <div className="flex items-center gap-12 px-[60px] overflow-x-auto no-scrollbar">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => scrollToSection(section.id)}
            className={`relative py-5 editorial-label tracking-[0.22em] transition-colors ${
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
