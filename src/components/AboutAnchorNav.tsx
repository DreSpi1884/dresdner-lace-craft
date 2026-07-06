import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "history", label: "History" },
  { id: "sustainability", label: "Sustainability" },
  { id: "values", label: "Values" },
  { id: "production", label: "Production" },
];

const AboutAnchorNav = () => {
  const [activeId, setActiveId] = useState<string>(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
                    active
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
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
