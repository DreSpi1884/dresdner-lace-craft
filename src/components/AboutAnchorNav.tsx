import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const AboutAnchorNav = () => {
  const { t } = useLang();
  const [activeSection, setActiveSection] = useState("history");
  const [isOpen, setIsOpen] = useState(false);

  const sections = useMemo(
    () => [
      { id: "history", label: t("History", "Geschichte") },
      { id: "sustainability", label: t("Sustainability", "Nachhaltigkeit") },
      { id: "values", label: t("Values", "Werte") },
    ],
    [t]
  );

  const currentSection =
    sections.find((section) => section.id === activeSection) || sections[0];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    setIsOpen(false);
    setActiveSection(id);

    const offset = 140;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });

    window.history.replaceState(null, "", `#${id}`);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);

        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      {
        threshold: 0.25,
        rootMargin: "-25% 0px -60% 0px",
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
      {/* Mobile accordion */}
      <div className="lg:hidden px-6">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full items-center justify-between py-4 text-left text-primary"
        >
          <span className="editorial-label tracking-[0.22em]">
            {currentSection.label}
          </span>

          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${
            isOpen ? "max-h-48 opacity-100 pb-4" : "max-h-0 opacity-0 pb-0"
          }`}
        >
          <div className="space-y-3 border-t border-border pt-4">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id)}
                className={`block w-full text-left editorial-label tracking-[0.22em] transition-colors ${
                  activeSection === section.id
                    ? "text-primary"
                    : "text-primary/45 hover:text-primary"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop navigation */}
      <div className="hidden lg:flex items-center gap-12 px-[60px] overflow-x-auto no-scrollbar">
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
