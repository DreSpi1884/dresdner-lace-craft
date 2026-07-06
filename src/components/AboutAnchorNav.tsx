import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useLang } from "@/i18n/LanguageContext";

const NAV_HEIGHT = 96;

const AboutAnchorNav = () => {
  const { t } = useLang();
  const sections = useMemo(() => [
    { id: "history", label: t("History", "Geschichte") },
    { id: "sustainability", label: t("Sustainability", "Nachhaltigkeit") },
    { id: "values", label: t("Values", "Werte") },
    { id: "production", label: t("Production", "Produktion") },
  ], [t]);

  const [activeId, setActiveId] = useState<string>(sections[0].id);
  const clickActiveRef = useRef<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (clickActiveRef.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-35% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    setActiveId(id);
    clickActiveRef.current = id;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      clickActiveRef.current = null;
    }, 800);

    const navOffset = NAV_HEIGHT + 24;
    const y = el.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <nav className="sticky top-20 md:top-24 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="editorial-container">
        <ul className="flex items-center gap-6 md:gap-10 py-4 md:py-5 overflow-x-auto no-scrollbar">
          {sections.map(({ id, label }) => {
            const active = activeId === id;
            return (
              <li key={id} className="shrink-0">
                <a
                  href={`#${id}`}
                  onClick={(e) => handleClick(e, id)}
                  className={cn(
                    "editorial-label relative block transition-colors duration-300",
                    active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {label}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-4 md:-bottom-5 left-0 right-0 h-px bg-primary"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default AboutAnchorNav;
