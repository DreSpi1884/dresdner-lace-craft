import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useLang } from "@/i18n/LanguageContext";

const NAV_HEIGHT = 96;

const AboutAnchorNav = () => {
  const { t } = useLang();
  const sections = useMemo(
  () => [
    { id: "history", label: t("History", "Geschichte") },
    { id: "sustainability", label: t("Sustainability", "Nachhaltigkeit") },
    { id: "values", label: t("Values", "Werte") },
  ],
  [t]
);

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
  <nav className="sticky top-20 md:top-24 z-40 bg-background/95 backdrop-blur border-b border-primary/10">
    <div className="flex items-center gap-12 px-[60px] overflow-x-auto no-scrollbar">
      {sections.map(({ id, label }) => {
        const active = activeId === id;

        return (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => handleClick(e, id)}
            className="relative shrink-0 py-5 transition-colors"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "12px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: active ? 600 : 400,
              color: active
                ? "hsl(var(--primary))"
                : "hsl(var(--muted-foreground) / 0.65)",
            }}
          >
            {label}

            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-px transition-all duration-300"
              style={{
                width: active ? "100%" : "0%",
                background: "hsl(var(--primary))",
              }}
            />
          </a>
        );
      })}
    </div>
  </nav>
);
};

export default AboutAnchorNav;
