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

// Ribbon geometry
const RIBBON_WIDTH = 44; // px, narrow realistic lace ribbon
const ROLL_HEIGHT = 56; // px, cylinder thickness
const ROLL_WIDTH = 180; // px, cylinder length
const TILE_HEIGHT = 80; // px, one repeat of the lace pattern

const HistoryTimeline = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ribbonAreaRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..1 across ribbon area
  const [ribbonHeight, setRibbonHeight] = useState(0); // total px of ribbon track
  const [visible, setVisible] = useState<boolean[]>(() => ENTRIES.map(() => false));
  const entryRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let rafId = 0;
    let targetProgress = 0;
    let currentProgress = 0;
    let animating = false;

    // Smootherstep — soft accel/decel, no linear stiffness at the ends
    const ease = (t: number) => {
      const x = Math.max(0, Math.min(1, t));
      return x * x * x * (x * (x * 6 - 15) + 10);
    };

    const measure = () => {
      const area = ribbonAreaRef.current;
      if (!area) return;
      const rect = area.getBoundingClientRect();
      setRibbonHeight(rect.height);
      const vh = window.innerHeight;
      // Reveal window: starts when area top hits 35% of viewport,
      // completes a bit before the section's bottom leaves.
      const start = vh * 0.35;
      const traveled = start - rect.top;
      const total = Math.max(1, rect.height - vh * 0.3);
      targetProgress = Math.max(0, Math.min(1, traveled / total));
    };

    const tick = () => {
      // Frame-rate independent smoothing — same feel at any scroll speed
      const delta = targetProgress - currentProgress;
      currentProgress += delta * 0.12;
      if (Math.abs(delta) < 0.0005) {
        currentProgress = targetProgress;
        animating = false;
        setProgress(ease(currentProgress));
        return;
      }
      setProgress(ease(currentProgress));
      rafId = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!animating) {
        animating = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    const onScroll = () => {
      measure();
      kick();
    };

    measure();
    currentProgress = targetProgress;
    setProgress(ease(currentProgress));

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

  // Revealed ribbon length in px
  const revealed = Math.max(0, progress * ribbonHeight);
  // Rotation: full turn per TILE_HEIGHT of unrolled ribbon (natural feel)
  const rotation = (revealed / TILE_HEIGHT) * 360;

  return (
    <section
      ref={sectionRef}
      className="relative bg-background text-foreground w-full overflow-hidden pt-10 md:pt-16 pb-16 md:pb-20"
    >
      {/* Horizontal fabric roll — sits at the top of the section and scrolls away with it */}
      <div
        className="relative mx-auto flex justify-center"
        style={{ width: ROLL_WIDTH, height: ROLL_HEIGHT, marginBottom: -ROLL_HEIGHT / 2 }}
        aria-hidden="true"
      >
        <svg
          width={ROLL_WIDTH}
          height={ROLL_HEIGHT}
          viewBox={`0 0 ${ROLL_WIDTH} ${ROLL_HEIGHT}`}
          className="text-foreground block"
        >
          <defs>
            {/* Cylindrical shading */}
            <linearGradient id="rollShade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="1" />
              <stop offset="45%" stopColor="hsl(var(--background))" stopOpacity="1" />
              <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="1" />
            </linearGradient>
            {/* Wound-thread stripes that rotate to imply spin */}
            <pattern
              id="woundThread"
              x="0"
              y="0"
              width="6"
              height={ROLL_HEIGHT}
              patternUnits="userSpaceOnUse"
              patternTransform={`rotate(${rotation * 0.15})`}
            >
              <rect width="6" height={ROLL_HEIGHT} fill="transparent" />
              <line
                x1="0"
                y1="0"
                x2="0"
                y2={ROLL_HEIGHT}
                stroke="currentColor"
                strokeWidth="0.35"
                opacity="0.35"
              />
            </pattern>
            {/* End cap radial */}
            <radialGradient id="capShade" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="hsl(var(--background))" />
              <stop offset="80%" stopColor="hsl(var(--muted))" />
              <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0.35" />
            </radialGradient>
          </defs>

          {/* Body */}
          <rect
            x={ROLL_HEIGHT / 2}
            y="0"
            width={ROLL_WIDTH - ROLL_HEIGHT}
            height={ROLL_HEIGHT}
            fill="url(#rollShade)"
          />
          <rect
            x={ROLL_HEIGHT / 2}
            y="0"
            width={ROLL_WIDTH - ROLL_HEIGHT}
            height={ROLL_HEIGHT}
            fill="url(#woundThread)"
          />

          {/* End caps (ellipses) */}
          <ellipse
            cx={ROLL_HEIGHT / 2}
            cy={ROLL_HEIGHT / 2}
            rx={ROLL_HEIGHT / 2}
            ry={ROLL_HEIGHT / 2}
            fill="url(#capShade)"
            stroke="currentColor"
            strokeWidth="0.6"
          />
          <ellipse
            cx={ROLL_WIDTH - ROLL_HEIGHT / 2}
            cy={ROLL_HEIGHT / 2}
            rx={ROLL_HEIGHT / 2}
            ry={ROLL_HEIGHT / 2}
            fill="url(#capShade)"
            stroke="currentColor"
            strokeWidth="0.6"
          />

          {/* Cap spin markers — rotate to show the roll turning */}
          <g
            transform={`translate(${ROLL_HEIGHT / 2} ${ROLL_HEIGHT / 2}) rotate(${rotation})`}
            opacity="0.55"
          >
            <line
              x1={-ROLL_HEIGHT / 2 + 6}
              y1="0"
              x2={ROLL_HEIGHT / 2 - 6}
              y2="0"
              stroke="currentColor"
              strokeWidth="0.6"
            />
            <circle r="2" fill="currentColor" />
          </g>
          <g
            transform={`translate(${ROLL_WIDTH - ROLL_HEIGHT / 2} ${ROLL_HEIGHT / 2}) rotate(${-rotation})`}
            opacity="0.55"
          >
            <line
              x1={-ROLL_HEIGHT / 2 + 6}
              y1="0"
              x2={ROLL_HEIGHT / 2 - 6}
              y2="0"
              stroke="currentColor"
              strokeWidth="0.6"
            />
            <circle r="2" fill="currentColor" />
          </g>

          {/* Top and bottom edge highlights to sell cylindricality */}
          <line
            x1={ROLL_HEIGHT / 2}
            y1="0.5"
            x2={ROLL_WIDTH - ROLL_HEIGHT / 2}
            y2="0.5"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.4"
          />
          <line
            x1={ROLL_HEIGHT / 2}
            y1={ROLL_HEIGHT - 0.5}
            x2={ROLL_WIDTH - ROLL_HEIGHT / 2}
            y2={ROLL_HEIGHT - 0.5}
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Ribbon area — spans the entries and holds the unrolled lace */}
      <div className="relative w-full px-6 md:px-20 lg:px-24 xl:px-28">
        <div ref={ribbonAreaRef} className="relative">
          {/* Ribbon column, absolute-centered, only visible portion is drawn */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none"
            style={{ width: RIBBON_WIDTH, height: revealed, overflow: "hidden" }}
            aria-hidden="true"
          >
            {/* Fixed-size SVG that tiles vertically — never stretches */}
            <svg
              width={RIBBON_WIDTH}
              height={ribbonHeight || 0}
              viewBox={`0 0 ${RIBBON_WIDTH} ${ribbonHeight || 0}`}
              preserveAspectRatio="xMidYMin"
              className="text-foreground block"
              style={{ display: "block" }}
            >
              <defs>
                <pattern
                  id="laceTileHoriz"
                  x="0"
                  y="0"
                  width={RIBBON_WIDTH}
                  height={TILE_HEIGHT}
                  patternUnits="userSpaceOnUse"
                >
                  {/* Scalloped edges */}
                  <path
                    d={`M 4 0 A 3 10 0 0 1 4 20 A 3 10 0 0 0 4 40 A 3 10 0 0 1 4 60 A 3 10 0 0 0 4 80`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.9"
                    strokeLinecap="round"
                  />
                  <path
                    d={`M ${RIBBON_WIDTH - 4} 0 A 3 10 0 0 0 ${RIBBON_WIDTH - 4} 20 A 3 10 0 0 1 ${RIBBON_WIDTH - 4} 40 A 3 10 0 0 0 ${RIBBON_WIDTH - 4} 60 A 3 10 0 0 1 ${RIBBON_WIDTH - 4} 80`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.9"
                    strokeLinecap="round"
                  />
                  {/* Diamond mesh */}
                  <g stroke="currentColor" strokeWidth="0.35" opacity="0.55" fill="none">
                    <path d={`M 8 0 L ${RIBBON_WIDTH - 8} 40 L 8 80`} />
                    <path d={`M ${RIBBON_WIDTH - 8} 0 L 8 40 L ${RIBBON_WIDTH - 8} 80`} />
                  </g>
                  {/* Central thread */}
                  <line
                    x1={RIBBON_WIDTH / 2}
                    y1="0"
                    x2={RIBBON_WIDTH / 2}
                    y2="80"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    opacity="0.7"
                  />
                  {/* Eyelets */}
                  <g stroke="currentColor" strokeWidth="0.5" fill="hsl(var(--background))">
                    <circle cx={RIBBON_WIDTH / 2} cy="0" r="1.6" />
                    <circle cx={RIBBON_WIDTH / 2} cy="40" r="1.6" />
                    <circle cx={RIBBON_WIDTH / 2} cy="80" r="1.6" />
                  </g>
                  {/* Small floral motif */}
                  <g
                    transform={`translate(${RIBBON_WIDTH / 2} 40)`}
                    stroke="currentColor"
                    strokeWidth="0.45"
                    fill="none"
                  >
                    <path d="M 0 -8 C 4 -5 4 -1 0 0 C -4 -1 -4 -5 0 -8 Z" />
                    <path d="M 0 8 C 4 5 4 1 0 0 C -4 1 -4 5 0 8 Z" />
                    <path d="M -8 0 C -5 -3 -1 -3 0 0 C -1 3 -5 3 -8 0 Z" />
                    <path d="M 8 0 C 5 -3 1 -3 0 0 C 1 3 5 3 8 0 Z" />
                  </g>
                </pattern>
              </defs>
              <rect
                x="0"
                y="0"
                width={RIBBON_WIDTH}
                height={ribbonHeight || 0}
                fill="url(#laceTileHoriz)"
              />
            </svg>
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
                  {/* Image side */}
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

                  {/* Text side */}
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;
