import { useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";

type Entry = {
  year: string;
  text: string;
};


// Ribbon geometry
const RIBBON_WIDTH = 44; // px, narrow realistic lace ribbon
const ROLL_HEIGHT = 56; // px, cylinder thickness
const CAP_EXTRA = 9; // px, thin end caps that stick out past the lace on each side
const ROLL_WIDTH = RIBBON_WIDTH + CAP_EXTRA * 2; // roll only as wide as the lace + caps
const TILE_HEIGHT = 80; // px, one repeat of the lace pattern
const INITIAL_REVEAL = 34; // px, short lace piece pre-visible between the caps at load
const STICKY_TOP = 96; // px, where the roll pins in the viewport as you scroll



const HistoryTimeline = () => {
  const { t } = useLang();
  const ENTRIES: Entry[] = useMemo(() => [
    {
      year: "1884",
      text: t(
        "Our story began in 1884, when Georg Marwitz and Carl H. Siegel founded the Dresdner Gardinen- und Spitzen-Manufaktur. At a time when fine lace was almost exclusively imported from England, we introduced English bobbin machines to Germany and established the foundations of modern lace manufacturing in Dresden.",
        "Unsere Geschichte begann 1884, als Georg Marwitz und Carl H. Siegel die Dresdner Gardinen- und Spitzen-Manufaktur gründeten. Zu einer Zeit, als feine Spitze fast ausschließlich aus England importiert wurde, brachten sie englische Bobbinet-Maschinen nach Deutschland und legten den Grundstein für die moderne Spitzenherstellung in Dresden."
      ),
    },
    {
      year: "1900",
      text: t(
        "As demand for our lace and textiles increased, so did our ambitions. We expanded our textile production to a larger site in Dresden-Dobritz, invested in new manufacturing facilities and opened factories abroad. Even through wars, inflation and economic uncertainty, we continued to produce and export textiles worldwide.",
        "Mit der wachsenden Nachfrage nach unseren Spitzen und Textilien wuchsen auch unsere Ambitionen. Wir verlagerten unsere Produktion an einen größeren Standort in Dresden-Dobritz, investierten in neue Fertigungsanlagen und eröffneten Werke im Ausland. Selbst durch Kriege, Inflation und wirtschaftliche Unsicherheit hindurch produzierten und exportierten wir unsere Textilien weltweit."
      ),
    },
    {
      year: "1945",
      text: t(
        "After the Second World War, every machine in our factory was dismantled. Starting almost from nothing, we rebuilt our production with borrowed equipment, determination and the commitment of our employees. Within a year, textile manufacturing had resumed. This resilience became known as the Dregusgeist and continues to shape our company today.",
        "Nach dem Zweiten Weltkrieg wurde jede Maschine unserer Fabrik demontiert. Fast bei null beginnend, haben wir unsere Produktion mit geliehenen Maschinen, Entschlossenheit und dem Einsatz unserer Mitarbeitenden wieder aufgebaut. Innerhalb eines Jahres lief die Textilproduktion wieder. Diese Widerstandskraft wurde als Dregusgeist bekannt und prägt unser Unternehmen bis heute."
      ),
    },
    {
      year: "1970",
      text: t(
        "The introduction of warp knitting technology transformed our production and established us as one of the leading lace manufacturers in East Germany. In 1982, we became the first company in the world to operate electronically controlled Raschel machines, setting new standards in textile manufacturing.",
        "Die Einführung der Kettenwirktechnik veränderte unsere Produktion grundlegend und etablierte uns als einen der führenden Spitzenhersteller in Ostdeutschland. 1982 waren wir das weltweit erste Unternehmen, das elektronisch gesteuerte Raschel-Maschinen einsetzte, und setzten damit neue Maßstäbe in der Textilherstellung."
      ),
    },
    {
      year: "1995",
      text: t(
        "Following German reunification, we reinvented our business. Under the leadership of Manfred and Sascha Schröder, we modernised our facilities, expanded our capabilities and evolved from a traditional lace manufacturer into a producer of premium lace, warp-knitted fabrics and technical textiles for international markets.",
        "Nach der Wiedervereinigung erfanden wir unser Unternehmen neu. Unter der Leitung von Manfred und Sascha Schröder modernisierten wir unsere Anlagen, erweiterten unsere Kompetenzen und entwickelten uns vom traditionellen Spitzenhersteller zum Produzenten von Premium-Spitzen, Kettengewirken und technischen Textilien für internationale Märkte."
      ),
    },
    {
      year: t("Today", "Heute"),
      text: t(
        "Today, Dresdner Spitzen stands as an international partner for premium lace, warp-knitted fabrics and technical textiles. From our Dresden facility, we continue to combine more than 140 years of craftsmanship with modern manufacturing technology, serving customers in fashion, industry and medical applications worldwide.",
        "Heute steht Dresdner Spitzen als internationaler Partner für Premium-Spitzen, Kettengewirke und technische Textilien. Von unserem Dresdner Standort aus verbinden wir über 140 Jahre Handwerkskunst mit moderner Fertigungstechnologie und beliefern Kunden aus Mode, Industrie und Medizin weltweit."
      ),
    },
  ], [t]);

  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const entriesAreaRef = useRef<HTMLDivElement>(null);
  const [unrollProgress, setUnrollProgress] = useState(0); // 0..1 across the timeline scroll
  const [viewportH, setViewportH] = useState(typeof window !== "undefined" ? window.innerHeight : 800);
  const [visible, setVisible] = useState<boolean[]>(() => ENTRIES.map(() => false));
  const entryRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let rafId = 0;
    let ticking = false;
    const compute = () => {
      ticking = false;
      const timeline = timelineRef.current;
      if (!timeline) return;
      const vh = window.innerHeight;
      setViewportH(vh);
      const rect = timeline.getBoundingClientRect();
      // Unroll begins when timeline top passes the sticky offset,
      // completes when the bottom leaves the viewport.
      const start = STICKY_TOP;
      const total = Math.max(1, rect.height - (vh - STICKY_TOP));
      const scrolled = Math.max(0, start - rect.top);
      const p = Math.max(0, Math.min(1, scrolled / total));
      setUnrollProgress(p);
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

  // Max ribbon length while sticky — fills most of the viewport below the roll
  const maxRibbon = Math.max(INITIAL_REVEAL + 80, viewportH - STICKY_TOP - ROLL_HEIGHT - 80);
  const revealed = INITIAL_REVEAL + unrollProgress * (maxRibbon - INITIAL_REVEAL);
  // Rotation: full turn per TILE_HEIGHT of unrolled ribbon (natural feel)
  const rotation = (revealed / TILE_HEIGHT) * 360;



  return (
    <section
      ref={sectionRef}
      className="relative bg-background text-primary w-full pt-10 md:pt-16 pb-16 md:pb-20"
    >
      {/* Timeline column: sticky roll + unrolling ribbon overlays the entries */}
      <div ref={timelineRef} className="relative w-full px-6 md:px-20 lg:px-24 xl:px-28">
        <div
          className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 z-10 hidden md:block"
          style={{ width: ROLL_WIDTH }}
          aria-hidden="true"
        >
          <div
            className="flex flex-col items-center"
            style={{ position: "sticky", top: STICKY_TOP }}
          >
            {/* Roll */}
            <div style={{ width: ROLL_WIDTH, height: ROLL_HEIGHT }}>
              <svg
                width={ROLL_WIDTH}
                height={ROLL_HEIGHT}
                viewBox={`0 0 ${ROLL_WIDTH} ${ROLL_HEIGHT}`}
                className="text-primary block overflow-visible"
              >

            <defs>
              {/* Cylindrical shading for the wound-lace body */}
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
              {/* Thin end-cap flange gradient */}
              <linearGradient id="capFlange" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--muted))" />
                <stop offset="50%" stopColor="hsl(var(--foreground))" stopOpacity="0.55" />
                <stop offset="100%" stopColor="hsl(var(--muted))" />
              </linearGradient>
            </defs>

            {/* Wound-lace body — only as wide as the ribbon */}
            <rect
              x={CAP_EXTRA}
              y="0"
              width={RIBBON_WIDTH}
              height={ROLL_HEIGHT}
              fill="url(#rollShade)"
            />
            <rect
              x={CAP_EXTRA}
              y="0"
              width={RIBBON_WIDTH}
              height={ROLL_HEIGHT}
              fill="url(#woundThread)"
            />

            {/* Left end cap (thin flange sticking out past the lace) */}
            <ellipse
              cx={CAP_EXTRA / 2}
              cy={ROLL_HEIGHT / 2}
              rx={CAP_EXTRA / 2}
              ry={ROLL_HEIGHT / 2 + 3}
              fill="url(#capFlange)"
              stroke="currentColor"
              strokeWidth="0.6"
            />
            {/* Right end cap */}
            <ellipse
              cx={ROLL_WIDTH - CAP_EXTRA / 2}
              cy={ROLL_HEIGHT / 2}
              rx={CAP_EXTRA / 2}
              ry={ROLL_HEIGHT / 2 + 3}
              fill="url(#capFlange)"
              stroke="currentColor"
              strokeWidth="0.6"
            />

            {/* Cap spin markers — tiny centered dots that rotate with the roll */}
            <g
              transform={`translate(${CAP_EXTRA / 2} ${ROLL_HEIGHT / 2}) rotate(${rotation})`}
              opacity="0.65"
            >
              <circle r="1.5" fill="currentColor" />
            </g>
            <g
              transform={`translate(${ROLL_WIDTH - CAP_EXTRA / 2} ${ROLL_HEIGHT / 2}) rotate(${-rotation})`}
              opacity="0.65"
            >
              <circle r="1.5" fill="currentColor" />
            </g>

            {/* Top and bottom edge highlights to sell cylindricality */}
            <line
              x1={CAP_EXTRA}
              y1="0.5"
              x2={ROLL_WIDTH - CAP_EXTRA}
              y2="0.5"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.4"
            />
            <line
              x1={CAP_EXTRA}
              y1={ROLL_HEIGHT - 0.5}
              x2={ROLL_WIDTH - CAP_EXTRA}
              y2={ROLL_HEIGHT - 0.5}
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.4"
            />
              </svg>
            </div>

            {/* Ribbon — grows downward from the underside of the roll */}
            <div
              className="overflow-hidden"
              style={{
                width: RIBBON_WIDTH,
                height: revealed,
                transition: "height 120ms linear",
              }}
            >
              <svg
                width={RIBBON_WIDTH}
                height={maxRibbon}
                viewBox={`0 0 ${RIBBON_WIDTH} ${maxRibbon}`}
                preserveAspectRatio="xMidYMin"
                className="text-primary block"
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
                  height={maxRibbon}
                  fill="url(#laceTileHoriz)"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Entries area — flows normally under the sticky roll + ribbon */}
        <div
          ref={entriesAreaRef}
          className="relative"
          style={{ paddingTop: ROLL_HEIGHT + INITIAL_REVEAL + 24 }}
        >

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
                    {t("Image", "Bild")} {i + 1}
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

