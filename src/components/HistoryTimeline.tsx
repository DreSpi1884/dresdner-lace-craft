import { useEffect, useRef, useState } from "react";

type Entry = {
  year: string;
  text: string;
};

const ENTRIES: Entry[] = [
  {
    year: "1884",
    text: "Our story began in 1884, when Georg Marwitz and Carl H. Siegel founded the Dresdner Gardinen- und Spitzen-Manufaktur. At a time when fine lace was almost exclusively imported from England, we introduced English bobbin machines to Germany and established the foundations of modern lace manufacturing in Dresden. ",
  },
  {
    year: "1900",
    text: "As demand for our lace and textiles increased, so did our ambitions. We expanded our textile production to a larger site in Dresden-Dobritz, invested in new manufacturing facilities and opened factories abroad. Even through wars, inflation and economic uncertainty, we continued to produce and export textiles worldwide. ",
  },
  {
    year: "1945",
    text: "After the Second World War, every machine in our factory was dismantled. Starting almost from nothing, we rebuilt our production with borrowed equipment, determination and the commitment of our employees. Within a year, textile manufacturing had resumed. This resilience became known as the Dregusgeist and continues to shape our company today. ",
  },
  {
    year: "1970",
    text: "The introduction of warp knitting technology transformed our production and established us as one of the leading lace manufacturers in East Germany. In 1982, we became the first company in the world to operate electronically controlled Raschel machines, setting new standards in textile manufacturing. ",
  },
  {
    year: "1995",
    text: "Following German reunification, we reinvented our business. Under the leadership of Manfred and Sascha Schröder, we modernised our facilities, expanded our capabilities and evolved from a traditional lace manufacturer into a producer of premium lace, warp-knitted fabrics and technical textiles for international markets. ",
  },
  {
    year: "Today",
    text: "Today, Dresdner Spitzen stands as an international partner for premium lace, warp-knitted fabrics and technical textiles. From our Dresden facility, we continue to combine more than 140 years of craftsmanship with modern manufacturing technology, serving customers in fashion, industry and medical applications worldwide.",
  },
];

const HistoryTimeline = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState<boolean[]>(() => ENTRIES.map(() => false));
  const entryRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let rafId = 0;
    let ticking = false;
    const compute = () => {
      ticking = false;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = -rect.height + vh * 0.2;
      const total = start - end;
      const p = (start - rect.top) / total;
      setProgress(Math.max(0, Math.min(1, p)));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = Number((e.target as HTMLElement).dataset.idx);
          if (e.isIntersecting) {
            setVisible((prev) => {
              if (prev[idx]) return prev;
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );
    entryRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background text-foreground w-full overflow-hidden py-16 md:py-20"
    >
      {/* Heading */}
      <div className="editorial-container text-center mb-12 md:mb-16">
        <p className="editorial-body text-muted-foreground max-w-2xl mx-auto">
          For more than 140 years, we have been shaping textile manufacturing in Germany.
        </p>
      </div>

      {/* Spool at the top — rotates with scroll, ribbon unrolls from its bottom */}
      <div className="relative flex justify-center -mb-6 z-10">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          className="text-foreground"
          aria-hidden="true"
          style={{
            transform: `rotate(${progress * 720}deg)`,
            transformOrigin: "60px 60px",
            willChange: "transform",
          }}
        >
          {/* outer rim */}
          <circle cx="60" cy="60" r="46" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="1.5" />
          {/* wound thread rings */}
          <circle cx="60" cy="60" r="38" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.55" />
          <circle cx="60" cy="60" r="32" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.45" />
          <circle cx="60" cy="60" r="26" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
          {/* spokes — make rotation visible */}
          <g stroke="currentColor" strokeWidth="0.8" opacity="0.7">
            <line x1="60" y1="16" x2="60" y2="104" />
            <line x1="16" y1="60" x2="104" y2="60" />
            <line x1="29" y1="29" x2="91" y2="91" />
            <line x1="91" y1="29" x2="29" y2="91" />
          </g>
          {/* central hub */}
          <circle cx="60" cy="60" r="6" fill="currentColor" />
          <circle cx="60" cy="60" r="2.5" fill="hsl(var(--background))" />
          {/* tiny notch marker so rotation is unmistakable */}
          <circle cx="60" cy="20" r="2" fill="currentColor" />
        </svg>
      </div>


      {/* Timeline */}
      <div className="relative w-full px-6 md:px-20 lg:px-24 xl:px-28">
        {/* SVG lace ribbon, absolute centered. 60px wide tile, repeating 60x80 */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[60px] pointer-events-none"
          aria-hidden="true"
        >
          {/* Faded full ribbon underneath for context */}
          <svg
            width="60"
            height="100%"
            viewBox="0 0 60 2000"
            preserveAspectRatio="xMidYMin slice"
            className="absolute inset-0 text-foreground block w-full h-full opacity-[0.07]"
          >
            <rect width="60" height="2000" fill="url(#laceTile)" />
          </svg>

          {/* Revealed ribbon, clipped by progress */}
          <div
            className="absolute inset-0 overflow-hidden transition-[height] duration-150 ease-out"
            style={{ height: `${progress * 100}%` }}
          >
            <svg
              width="60"
              height="100%"
              viewBox="0 0 60 2000"
              preserveAspectRatio="xMidYMin slice"
              className="text-foreground block w-full h-full"
            >
              <defs>
                <pattern
                  id="laceTile"
                  x="0"
                  y="0"
                  width="60"
                  height="80"
                  patternUnits="userSpaceOnUse"
                >
                  {/* Scalloped left edge: connected arcs */}
                  <path
                    d="M 6 0 A 4 10 0 0 1 6 20 A 4 10 0 0 0 6 40 A 4 10 0 0 1 6 60 A 4 10 0 0 0 6 80"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  {/* Scalloped right edge: connected arcs */}
                  <path
                    d="M 54 0 A 4 10 0 0 0 54 20 A 4 10 0 0 1 54 40 A 4 10 0 0 0 54 60 A 4 10 0 0 1 54 80"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />

                  {/* Diamond mesh: diagonal crossing threads */}
                  <g stroke="currentColor" strokeWidth="0.4" opacity="0.55" fill="none">
                    <path d="M 10 0 L 50 40 L 10 80" />
                    <path d="M 50 0 L 10 40 L 50 80" />
                    <path d="M 30 0 L 10 20 L 30 40 L 50 20 Z" />
                    <path d="M 30 40 L 10 60 L 30 80 L 50 60 Z" />
                  </g>

                  {/* Eyelets at diamond intersections */}
                  <g stroke="currentColor" strokeWidth="0.6" fill="hsl(var(--background))">
                    <circle cx="30" cy="0" r="2" />
                    <circle cx="30" cy="40" r="2" />
                    <circle cx="30" cy="80" r="2" />
                    <circle cx="10" cy="20" r="1.6" />
                    <circle cx="50" cy="20" r="1.6" />
                    <circle cx="10" cy="60" r="1.6" />
                    <circle cx="50" cy="60" r="1.6" />
                  </g>

                  {/* Central vertical thread */}
                  <line
                    x1="30"
                    y1="0"
                    x2="30"
                    y2="80"
                    stroke="currentColor"
                    strokeWidth="0.6"
                    opacity="0.85"
                  />

                  {/* Floral / leaf motif at tile center, made of petal curves */}
                  <g
                    transform="translate(30 40)"
                    stroke="currentColor"
                    strokeWidth="0.55"
                    fill="none"
                  >
                    <path d="M 0 -10 C 5 -6 5 -2 0 0 C -5 -2 -5 -6 0 -10 Z" />
                    <path d="M 0 10 C 5 6 5 2 0 0 C -5 2 -5 6 0 10 Z" />
                    <path d="M -10 0 C -6 -4 -2 -4 0 0 C -2 4 -6 4 -10 0 Z" />
                    <path d="M 10 0 C 6 -4 2 -4 0 0 C 2 4 6 4 10 0 Z" />
                    <circle r="1.3" fill="currentColor" stroke="none" />
                  </g>
                </pattern>
              </defs>
              <rect width="60" height="2000" fill="url(#laceTile)" />
            </svg>
          </div>
        </div>

        {/* Entries */}
        <div className="relative">
          {ENTRIES.map((entry, i) => {
            const isLeft = i % 2 === 0;
            const isVisible = visible[i];
            return (
              <div
                key={entry.year}
                ref={(el) => (entryRefs.current[i] = el)}
                data-idx={i}
                className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 items-center py-20 md:py-28"
              >
                {/* Side A: IMAGE */}
                <div
                  className={`${isLeft ? "md:order-1 md:pr-16 md:items-end" : "md:order-2 md:pl-16 md:items-start"} flex flex-col transition-all duration-700 ease-out`}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? "translateX(0)"
                      : `translateX(${isLeft ? "-40px" : "40px"})`,
                  }}
                >
                  <div className="w-full max-w-sm aspect-[4/3] bg-muted border border-border flex items-center justify-center text-muted-foreground/40 editorial-label">
                    Image {i + 1}
                  </div>
                </div>

                {/* Side B: YEAR + TEXT */}
                <div
                  className={`${isLeft ? "md:order-2 md:text-left md:pl-16 md:items-start" : "md:order-1 md:text-right md:pr-16 md:items-end"} flex flex-col gap-6 transition-all duration-700 ease-out delay-150`}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? "translateX(0)"
                      : `translateX(${isLeft ? "40px" : "-40px"})`,
                  }}
                >
                  <div
                    className="font-serif leading-none text-foreground"
                    style={{ fontSize: "clamp(4rem, 9vw, 8rem)", letterSpacing: "-0.02em" }}
                  >
                    {entry.year}
                  </div>
                  <p className="editorial-body text-muted-foreground max-w-md">
                    {entry.text}
                  </p>
                </div>

                {/* Decorative medallion on ribbon — widens the band at each entry */}
                <div
                  className="hidden md:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 transition-opacity duration-500"
                  style={{ opacity: isVisible ? 1 : 0.25 }}
                  aria-hidden="true"
                >
                  <svg width="110" height="110" viewBox="0 0 110 110" className="text-foreground block">
                    {/* outer scalloped medallion */}
                    <g transform="translate(55 55)" fill="none" stroke="currentColor">
                      <circle r="44" strokeWidth="0.6" opacity="0.4" />
                      <circle r="36" strokeWidth="0.8" fill="hsl(var(--background))" />
                      {/* scallop ring */}
                      {Array.from({ length: 16 }).map((_, k) => {
                        const a = (k * 360) / 16;
                        return (
                          <circle
                            key={k}
                            cx={Math.cos((a * Math.PI) / 180) * 36}
                            cy={Math.sin((a * Math.PI) / 180) * 36}
                            r="3"
                            strokeWidth="0.6"
                            fill="hsl(var(--background))"
                          />
                        );
                      })}
                      <circle r="26" strokeWidth="0.5" opacity="0.7" />
                      <circle r="18" strokeWidth="0.5" opacity="0.5" />
                      {/* petals */}
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                        <path
                          key={a}
                          d="M 0 -26 C 4 -18 4 -10 0 -6 C -4 -10 -4 -18 0 -26 Z"
                          strokeWidth="0.6"
                          transform={`rotate(${a})`}
                        />
                      ))}
                      <circle r="3" fill="currentColor" stroke="none" />
                    </g>
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};

export default HistoryTimeline;
