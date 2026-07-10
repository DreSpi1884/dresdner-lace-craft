import { useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";

type Entry = {
  year: string;
  text: string;
};

const RIBBON_WIDTH = 96;
const TILE_HEIGHT = 220;

const LaceTile = ({ y }: { y: number }) => (
  <g transform={`translate(0 ${y})`} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    {/* fine net mesh background (hexagonal-ish tulle) */}
    <g opacity="0.18" strokeWidth="0.35">
      {Array.from({ length: 11 }).map((_, r) =>
        Array.from({ length: 7 }).map((_, c) => {
          const cx = 8 + c * 13 + (r % 2 ? 6.5 : 0);
          const cy = 10 + r * 20;
          return <circle key={`m-${r}-${c}`} cx={cx} cy={cy} r="4.5" />;
        })
      )}
    </g>

    {/* scalloped selvedge — left */}
    <path
      d="M 4 0 Q 10 12 4 22 Q -2 32 4 44 Q 10 56 4 68 Q -2 80 4 92 Q 10 104 4 116 Q -2 128 4 140 Q 10 152 4 164 Q -2 176 4 188 Q 10 200 4 212 Q -2 220 4 220"
      strokeWidth="0.9"
      opacity="0.75"
    />
    {/* scalloped selvedge — right */}
    <path
      d="M 92 0 Q 86 12 92 22 Q 98 32 92 44 Q 86 56 92 68 Q 98 80 92 92 Q 86 104 92 116 Q 98 128 92 140 Q 86 152 92 164 Q 98 176 92 188 Q 86 200 92 212 Q 98 220 92 220"
      strokeWidth="0.9"
      opacity="0.75"
    />

    {/* picot dots along the scallops */}
    {[11, 33, 55, 77, 99, 121, 143, 165, 187, 209].map((cy, i) => (
      <g key={`p-${i}`} fill="currentColor" stroke="none" opacity="0.55">
        <circle cx={i % 2 ? 1 : 7} cy={cy} r="0.7" />
        <circle cx={i % 2 ? 95 : 89} cy={cy} r="0.7" />
      </g>
    ))}

    {/* central twisting vine */}
    <path
      d="M 48 -4 C 30 20, 66 40, 48 64 C 30 88, 66 108, 48 132 C 30 156, 66 176, 48 200 C 40 212, 48 220, 48 224"
      strokeWidth="0.75"
      opacity="0.55"
    />

    {/* large flower — top */}
    <g transform="translate(48 50)" opacity="0.85">
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse
          key={a}
          cx="0"
          cy="-11"
          rx="4.5"
          ry="10"
          strokeWidth="0.8"
          transform={`rotate(${a})`}
        />
      ))}
      <circle cx="0" cy="0" r="3.2" strokeWidth="0.8" />
      <circle cx="0" cy="0" r="1.2" fill="currentColor" stroke="none" />
    </g>

    {/* medallion — middle */}
    <g transform="translate(48 110)" opacity="0.7">
      <circle r="14" strokeWidth="0.75" />
      <circle r="9" strokeWidth="0.55" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <line
          key={a}
          x1="0"
          y1="-14"
          x2="0"
          y2="-9"
          strokeWidth="0.55"
          transform={`rotate(${a})`}
        />
      ))}
      {[0, 90, 180, 270].map((a) => (
        <circle
          key={a}
          cx="0"
          cy="-14"
          r="1.4"
          fill="currentColor"
          stroke="none"
          transform={`rotate(${a})`}
        />
      ))}
    </g>

    {/* leafy sprig — lower flower */}
    <g transform="translate(48 170)" opacity="0.85">
      {[0, 72, 144, 216, 288].map((a) => (
        <path
          key={a}
          d="M 0 0 C -3 -6, -3 -12, 0 -16 C 3 -12, 3 -6, 0 0 Z"
          strokeWidth="0.75"
          transform={`rotate(${a})`}
        />
      ))}
      <circle r="2.2" strokeWidth="0.7" />
      <circle r="0.9" fill="currentColor" stroke="none" />
    </g>

    {/* connecting curls & tendrils */}
    <g opacity="0.5" strokeWidth="0.55">
      <path d="M 20 30 Q 34 40, 30 55 Q 26 68, 34 78" />
      <path d="M 76 30 Q 62 40, 66 55 Q 70 68, 62 78" />
      <path d="M 22 140 Q 34 150, 30 164 Q 26 178, 36 188" />
      <path d="M 74 140 Q 62 150, 66 164 Q 70 178, 60 188" />
    </g>

    {/* scattered tiny eyelets */}
    {[
      [22, 20], [74, 20], [16, 88], [80, 88],
      [22, 200], [74, 200], [30, 128], [66, 128],
    ].map(([cx, cy], i) => (
      <circle key={`e-${i}`} cx={cx} cy={cy} r="1.1" strokeWidth="0.5" opacity="0.55" />
    ))}
  </g>
);

const LaceRibbon = ({ offset }: { offset: number }) => {
  const shift = -(((offset % TILE_HEIGHT) + TILE_HEIGHT) % TILE_HEIGHT);

  return (
    <svg
      width={RIBBON_WIDTH}
      height="100%"
      viewBox={`0 0 ${RIBBON_WIDTH} 2000`}
      preserveAspectRatio="none"
      className="block text-primary"
      aria-hidden="true"
    >
      <g transform={`translate(0 ${shift})`}>
        {Array.from({ length: 14 }).map((_, i) => (
          <LaceTile key={i} y={i * TILE_HEIGHT - TILE_HEIGHT} />
        ))}
      </g>
    </svg>
  );
};


const HistoryTimeline = () => {
  const { t } = useLang();

  const entries: Entry[] = useMemo(
    () => [
      {
        year: "1884",
        text: t(
          "Our story began in 1884, when Georg Marwitz and\u00a0\nCarl H. Siegel founded the Dresdner Gardinen- und Spitzen-Manufaktur.\u00a0\n\nAt a time when fine lace was almost exclusively imported from England, we introduced English bobbin machines to Germany and established the foundations of modern lace manufacturing in Dresden.",
          "Unsere Geschichte beginnt 1884, als Georg Marwitz und\u00a0\nCarl H. Siegel die Dresdner Gardinen- und Spitzen-Manufaktur gründen.\u00a0\n\nZu einer Zeit, als feine Spitze fast ausschließlich aus England importiert wird, bringen sie englische Bobbinet-Maschinen nach Deutschland und legen den Grundstein für die moderne Spitzenherstellung in Dresden."
        ),
      },
      {
        year: "1900",
        text: t(
          "As demand for our lace and textiles increased, so did our ambitions.\u00a0\n\nWe expanded our textile production to a larger site in Dresden-Dobritz, invested in new manufacturing facilities and opened factories abroad.\u00a0\n\nEven through wars, inflation and economic uncertainty, we continued to produce and export textiles worldwide.",
          "Mit wachsender Nachfrage wachsen auch unsere Ambitionen.\u00a0\n\nWir verlagern unsere Produktion nach Dresden-Dobritz, investieren in neue Anlagen und eröffnen Werke im Ausland.\u00a0\n\nAuch durch Kriege und wirtschaftliche Krisen hindurch produzieren und exportieren wir unsere Textilien weltweit."
        ),
      },
      {
        year: "1945",
        text: t(
          "After the Second World War, every machine in our factory was dismantled.\u00a0\n\nStarting almost from nothing, we rebuilt our production with borrowed equipment, determination and the commitment of our employees.\u00a0\nWithin a year, textile manufacturing had resumed.",
          "Nach dem Zweiten Weltkrieg wird jede Maschine unserer Fabrik demontiert.\u00a0\nMit geliehenen Maschinen, Entschlossenheit und dem Einsatz unserer Mitarbeitenden bauen wir die Produktion wieder auf.\u00a0\nInnerhalb eines Jahres läuft die Textilproduktion erneut an."
        ),
      },
      {
        year: "1970",
        text: t(
          "The introduction of warp knitting technology transformed our production and established us as one of the leading lace manufacturers in East Germany.\u00a0\n\n1982, we became the first company in the world to operate electronically controlled Raschel machines.",
          "Die Einführung der Kettenwirktechnik verändert unsere Produktion grundlegend und etabliert uns als einen der führenden Spitzenhersteller in Ostdeutschland.\u00a0\n1982 sind wir das weltweit erste Unternehmen, das elektronisch gesteuerte Raschel-Maschinen einsetzt."
        ),
      },
      {
        year: "1995",
        text: t(
          "After reunification, a new chapter begins for us.\u00a0\n\nWith determination, investment and trust in our employees, we modernise our production and gradually align Dresdner Spitzen with international markets.",
          "Nach der Wiedervereinigung beginnt für uns ein neues Kapitel.\u00a0\n\nMit Entschlossenheit, Investitionen und Vertrauen in unsere Mitarbeitenden modernisieren wir unsere Produktion und richten Dresdner Spitzen Schritt für Schritt auf internationale Märkte aus."
        ),
      },
      {
        year: t("Today", "Heute"),
        text: t(
          "Today, Dresdner Spitzen is shaped by the people who carry this knowledge forward every day.\u00a0\n\nIn Dresden, we create not only lace, but also warp-knitted fabrics and functional textiles for fashion, industry and medical applications,\u00a0\ncombining over 140 years of experience with modern technology, care and curiosity.",
          "Heute wird Dresdner Spitzen von den Menschen geprägt, die dieses Wissen jeden Tag weitertragen.\u00a0\n\nIn Dresden entstehen längst nicht mehr nur Spitzen, sondern auch Kettengewirke und funktionale Textilien für Mode, Industrie und medizinische Anwendungen.\u00a0\n\nDabei verbinden wir über 140 Jahre Erfahrung mit moderner Technologie, Sorgfalt und Neugier."
        ),
      },
    ],
    [t]
  );

  const [visible, setVisible] = useState<boolean[]>([]);
  const [laceOffset, setLaceOffset] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const entryRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    setVisible(entries.map(() => false));
  }, [entries]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (items) => {
        items.forEach((item) => {
          const idx = Number((item.target as HTMLElement).dataset.idx);

          if (item.isIntersecting) {
            setVisible((prev) => {
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    entryRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, [entries]);

  useEffect(() => {
    let rafId = 0;

    const updateLace = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (rect.height + vh)));
      setLaceOffset(window.scrollY * 0.55);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateLace);
    };

    updateLace();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background text-primary w-full py-12 md:py-16 lg:py-20"
    >
  {/* moving lace band desktop */}
  <div
    className="pointer-events-none absolute inset-y-0 left-1/2 z-0 hidden -translate-x-1/2 lg:block"
    style={{ width: `${RIBBON_WIDTH}px` }}
  >
    <div
      className="sticky top-1/2 h-[68vh] -translate-y-1/2 overflow-hidden opacity-55"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
      }}
    >
      <LaceRibbon offset={laceOffset} />
    </div>
  </div>

      <div className="relative z-10 px-6 md:px-10 lg:px-12 xl:px-16">
        <div className="mx-auto w-full max-w-[1800px]">
          <div className="space-y-16 md:space-y-24 lg:space-y-28">
            {entries.map((entry, i) => {
              const isLeft = i % 2 === 0;
              const isVisible = visible[i] ?? false;

              return (
                <article
                  key={entry.year}
                  ref={(el) => {
                    entryRefs.current[i] = el;
                  }}
                  data-idx={i}
                  className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_110px_minmax(0,1fr)] lg:gap-12 xl:gap-20 items-center min-h-[56vh]"
                >
                  <div
                    className={`${isLeft ? "lg:col-start-1" : "lg:col-start-3"} text-left transition-all duration-700 ease-out`}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateY(0)" : "translateY(24px)",
                    }}
                  >
                    <div
                      className="font-serif leading-none text-foreground mb-8 md:mb-10"
                      style={{
                        fontSize: "clamp(2.2rem, 4vw, 4rem)",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      {entry.year}
                    </div>

                    <p className="text-lg md:text-xl leading-[2.15] text-muted-foreground whitespace-pre-line max-w-[920px]">
                      {entry.text}
                    </p>
                  </div>

                  <div
                    className={`${isLeft ? "lg:col-start-3" : "lg:col-start-1 lg:row-start-1"} transition-all duration-700 ease-out delay-150`}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateY(0)" : "translateY(24px)",
                    }}
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden border border-border bg-muted/20 flex items-center justify-center">
                      <span className="editorial-label text-muted-foreground/45">
                        {t("Image", "Bild")} {i + 1}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;

