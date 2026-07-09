import { useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";

type Entry = {
  year: string;
  text: string;
};

const RIBBON_WIDTH = 110;
const TILE_HEIGHT = 160;

const LaceRibbon = ({ offset }: { offset: number }) => (
  <svg
    width={RIBBON_WIDTH}
    height="100%"
    viewBox={`0 0 ${RIBBON_WIDTH} 1800`}
    preserveAspectRatio="none"
    className="block text-primary"
    aria-hidden="true"
  >
    <defs>
      <pattern
        id="lacePattern"
        x="0"
        y="0"
        width={RIBBON_WIDTH}
        height={TILE_HEIGHT}
        patternUnits="userSpaceOnUse"
        patternTransform={`translate(0 ${offset})`}
      >
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          {/* scalloped outer edges */}
          <path
            d="M 18 0
               Q 6 10 18 20
               Q 30 30 18 40
               Q 6 50 18 60
               Q 30 70 18 80
               Q 6 90 18 100
               Q 30 110 18 120
               Q 6 130 18 140
               Q 30 150 18 160"
            strokeWidth="1.4"
            opacity="0.7"
          />
          <path
            d={`M ${RIBBON_WIDTH - 18} 0
               Q ${RIBBON_WIDTH - 6} 10 ${RIBBON_WIDTH - 18} 20
               Q ${RIBBON_WIDTH - 30} 30 ${RIBBON_WIDTH - 18} 40
               Q ${RIBBON_WIDTH - 6} 50 ${RIBBON_WIDTH - 18} 60
               Q ${RIBBON_WIDTH - 30} 70 ${RIBBON_WIDTH - 18} 80
               Q ${RIBBON_WIDTH - 6} 90 ${RIBBON_WIDTH - 18} 100
               Q ${RIBBON_WIDTH - 30} 110 ${RIBBON_WIDTH - 18} 120
               Q ${RIBBON_WIDTH - 6} 130 ${RIBBON_WIDTH - 18} 140
               Q ${RIBBON_WIDTH - 30} 150 ${RIBBON_WIDTH - 18} 160`}
            strokeWidth="1.4"
            opacity="0.7"
          />

          {/* inner flowing lines */}
          <path
            d="M 28 0
               Q 56 20 28 40
               Q 56 60 28 80
               Q 56 100 28 120
               Q 56 140 28 160"
            strokeWidth="0.9"
            opacity="0.35"
          />
          <path
            d={`M ${RIBBON_WIDTH - 28} 0
               Q ${RIBBON_WIDTH - 56} 20 ${RIBBON_WIDTH - 28} 40
               Q ${RIBBON_WIDTH - 56} 60 ${RIBBON_WIDTH - 28} 80
               Q ${RIBBON_WIDTH - 56} 100 ${RIBBON_WIDTH - 28} 120
               Q ${RIBBON_WIDTH - 56} 140 ${RIBBON_WIDTH - 28} 160`}
            strokeWidth="0.9"
            opacity="0.35"
          />

          {/* centre vine */}
          <path
            d={`M ${RIBBON_WIDTH / 2} 0
               Q ${RIBBON_WIDTH / 2 - 8} 20 ${RIBBON_WIDTH / 2} 40
               Q ${RIBBON_WIDTH / 2 + 8} 60 ${RIBBON_WIDTH / 2} 80
               Q ${RIBBON_WIDTH / 2 - 8} 100 ${RIBBON_WIDTH / 2} 120
               Q ${RIBBON_WIDTH / 2 + 8} 140 ${RIBBON_WIDTH / 2} 160`}
            strokeWidth="0.8"
            opacity="0.3"
          />

          {/* rounded motifs */}
          {[40, 120].map((cy) => (
            <g key={cy} opacity="0.65">
              <ellipse
                cx={RIBBON_WIDTH / 2}
                cy={cy}
                rx="13"
                ry="18"
                strokeWidth="1"
              />
              <ellipse
                cx={RIBBON_WIDTH / 2}
                cy={cy}
                rx="6"
                ry="8"
                strokeWidth="0.8"
                opacity="0.7"
              />
              <ellipse
                cx={RIBBON_WIDTH / 2 - 16}
                cy={cy}
                rx="5"
                ry="8"
                strokeWidth="0.8"
              />
              <ellipse
                cx={RIBBON_WIDTH / 2 + 16}
                cy={cy}
                rx="5"
                ry="8"
                strokeWidth="0.8"
              />
              <circle cx={RIBBON_WIDTH / 2} cy={cy} r="2.2" fill="currentColor" stroke="none" />
            </g>
          ))}

          {/* tiny eyelets */}
          {[20, 60, 100, 140].map((cy) => (
            <g key={cy} opacity="0.45">
              <circle cx="33" cy={cy} r="1.8" />
              <circle cx={RIBBON_WIDTH - 33} cy={cy} r="1.8" />
            </g>
          ))}
        </g>
      </pattern>
    </defs>

    <rect x="0" y="0" width={RIBBON_WIDTH} height="1800" fill="url(#lacePattern)" />
  </svg>
);

const HistoryTimeline = () => {
  const { t } = useLang();

  const entries: Entry[] = useMemo(
    () => [
      {
        year: "1884",
        text: t(
          "Our story began in 1884, when Georg Marwitz and Carl H. Siegel founded the Dresdner Gardinen- und Spitzen-Manufaktur. At a time when fine lace was almost exclusively imported from England, we introduced English bobbin machines to Germany and established the foundations of modern lace manufacturing in Dresden.",
          "Unsere Geschichte beginnt 1884, als Georg Marwitz und Carl H. Siegel die Dresdner Gardinen- und Spitzen-Manufaktur gründen. Zu einer Zeit, als feine Spitze fast ausschließlich aus England importiert wird, bringen sie englische Bobbinet-Maschinen nach Deutschland und legen den Grundstein für die moderne Spitzenherstellung in Dresden."
        ),
      },
      {
        year: "1900",
        text: t(
          "As demand for our lace and textiles increased, so did our ambitions. We expanded our textile production to a larger site in Dresden-Dobritz, invested in new manufacturing facilities and opened factories abroad. Even through wars, inflation and economic uncertainty, we continued to produce and export textiles worldwide.",
          "Mit wachsender Nachfrage wachsen auch unsere Ambitionen. Wir verlagern unsere Produktion nach Dresden-Dobritz, investieren in neue Anlagen und eröffnen Werke im Ausland. Auch durch Kriege und wirtschaftliche Krisen hindurch produzieren und exportieren wir unsere Textilien weltweit."
        ),
      },
      {
        year: "1945",
        text: t(
          "After the Second World War, every machine in our factory was dismantled. Starting almost from nothing, we rebuilt our production with borrowed equipment, determination and the commitment of our employees. Within a year, textile manufacturing had resumed.",
          "Nach dem Zweiten Weltkrieg wird jede Maschine unserer Fabrik demontiert. Mit geliehenen Maschinen, Entschlossenheit und dem Einsatz unserer Mitarbeitenden bauen wir die Produktion wieder auf. Innerhalb eines Jahres läuft die Textilproduktion erneut an."
        ),
      },
      {
        year: "1970",
        text: t(
          "The introduction of warp knitting technology transformed our production and established us as one of the leading lace manufacturers in East Germany. In 1982, we became the first company in the world to operate electronically controlled Raschel machines.",
          "Die Einführung der Kettenwirktechnik verändert unsere Produktion grundlegend und etabliert uns als einen der führenden Spitzenhersteller in Ostdeutschland. 1982 sind wir das weltweit erste Unternehmen, das elektronisch gesteuerte Raschel-Maschinen einsetzt."
        ),
      },
      {
        year: "1995",
        text: t(
          "Following German reunification, we reinvented our business. We modernised our facilities, expanded our capabilities and evolved from a traditional lace manufacturer into a producer of premium lace, warp-knitted fabrics and technical textiles for international markets.",
          "Nach der Wiedervereinigung erfinden wir unser Unternehmen neu. Wir modernisieren unsere Anlagen, erweitern unsere Kompetenzen und entwickeln uns vom traditionellen Spitzenhersteller zu einem Produzenten von Premium-Spitzen, Kettengewirken und technischen Textilien für internationale Märkte."
        ),
      },
      {
        year: t("Today", "Heute"),
        text: t(
          "Today, Dresdner Spitzen combines more than 140 years of craftsmanship with modern manufacturing technology, serving customers in fashion, lingerie, industry and medical applications worldwide.",
          "Heute verbindet Dresdner Spitzen mehr als 140 Jahre Handwerkskunst mit moderner Fertigungstechnologie und beliefert Kunden aus Mode, Industrie und Medizin weltweit."
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
      setLaceOffset(-progress * 220);
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
          className="sticky top-24 h-[calc(100vh-6rem)] overflow-hidden opacity-75"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
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
                      className="font-serif leading-none text-foreground mb-6"
                      style={{
                        fontSize: "clamp(2.2rem, 4vw, 4rem)",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      {entry.year}
                    </div>

                    <p className="editorial-body text-muted-foreground whitespace-pre-line max-w-[820px]">
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

