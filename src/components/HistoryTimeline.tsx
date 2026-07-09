import { useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import laceNavy from "@/assets/lace_navy.png";

type Entry = {
  year: string;
  text: string;
};

const BAND_WIDTH = 72;

const HistoryTimeline = () => {
  const { t } = useLang();

  const ENTRIES: Entry[] = useMemo(
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
          "Mit wachsender Nachfrage wachsen auch unsere Ambitionen. Wir verlagern unsere Produktion nach Dresden-Dobritz, investieren in neue Anlagen und eröffnen Werke im Ausland.\nAuch durch Kriege und wirtschaftliche Krisen hindurch produzieren und exportieren wir unsere Textilien weltweit."
        ),
      },
      {
        year: "1945",
        text: t(
          "After the Second World War, every machine in our factory was dismantled. Starting almost from nothing, we rebuilt our production with borrowed equipment, determination and the commitment of our employees. Within a year, textile manufacturing had resumed. This resilience became known as the Dregusgeist and continues to shape our company today.",
          "Nach dem Zweiten Weltkrieg wird jede Maschine unserer Fabrik demontiert. Mit leeren Händen bauen wir unsere Produktion mit geliehenen Maschinen, Entschlossenheit und dem Einsatz unserer Mitarbeitenden wieder auf. Innerhalb eines Jahres läuft die Textilproduktion wieder. Diese Widerstandskraft wird als Dregusgeist bekannt und prägt unser Unternehmen bis heute."
        ),
      },
      {
        year: "1970",
        text: t(
          "The introduction of warp knitting technology transformed our production and established us as one of the leading lace manufacturers in East Germany. In 1982, we became the first company in the world to operate electronically controlled Raschel machines, setting new standards in textile manufacturing.",
          "Die Einführung der Kettenwirktechnik verändert unsere Produktion grundlegend und etabliert uns als einen der führenden Spitzenhersteller in Ostdeutschland.\n1982 sind wir das weltweit erste Unternehmen, das elektronisch gesteuerte Raschel-Maschinen einsetzt, und setzen damit neue Maßstäbe in der Textilherstellung."
        ),
      },
      {
        year: "1995",
        text: t(
          "Following German reunification, we reinvented our business. Under the leadership of Manfred and Sascha Schröder, we modernised our facilities, expanded our capabilities and evolved from a traditional lace manufacturer into a producer of premium lace, warp-knitted fabrics and technical textiles for international markets.",
          "Nach der Wiedervereinigung erfinden wir unser Unternehmen neu. Unter der Leitung von Manfred und Sascha Schröder modernisieren wir unsere Anlagen und erweitern unsere Kompetenzen. Aus dem traditionellen Spitzenhersteller wird ein Produzent von Premium-Spitzen, Kettengewirken und technischen Textilien für internationale Märkte."
        ),
      },
      {
        year: t("Today", "Heute"),
        text: t(
          "Today, Dresdner Spitzen is an international manufacturer of premium lace, warp-knitted fabrics and technical textiles. From Dresden, we combine over 140 years of craftsmanship with modern manufacturing technology, serving customers in fashion, lingerie, industry and medical applications worldwide.",
          "Heute steht Dresdner Spitzen als internationaler Partner für Premium-Spitzen, Kettengewirke und technische Textilien. Von unserem Dresdner Standort aus verbinden wir über 140 Jahre Handwerkskunst mit moderner Fertigungstechnologie und beliefern Kunden aus Mode, Industrie und Medizin weltweit."
        ),
      },
    ],
    [t]
  );

const [visible, setVisible] = useState<boolean[]>(() => ENTRIES.map(() => false));
const entryRefs = useRef<(HTMLDivElement | null)[]>([]);
const sectionRef = useRef<HTMLElement | null>(null);
const [laceOffset, setLaceOffset] = useState(0);

useEffect(() => {
  const observer = new IntersectionObserver(
    (items) => {
      items.forEach((item) => {
        const idx = Number((item.target as HTMLElement).dataset.idx);

        if (item.isIntersecting) {
          setVisible((prev) => {
            if (prev[idx]) return prev;

            const next = [...prev];
            next[idx] = true;
            return next;
          });
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -12% 0px" }
  );

  entryRefs.current.forEach((el) => el && observer.observe(el));

  return () => observer.disconnect();
}, []);

useEffect(() => {
  let rafId = 0;

  const updateLace = () => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;

    const progress = Math.max(
      0,
      Math.min(1, (vh - rect.top) / (rect.height + vh))
    );

    setLaceOffset(progress * -260);
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
    className="relative overflow-hidden bg-background text-primary w-full py-10 md:py-16"
  >
{/* Desktop moving lace band */}
<div
  className="pointer-events-none absolute inset-y-0 left-1/2 z-0 hidden -translate-x-1/2 lg:block"
  style={{ width: `${BAND_WIDTH}px` }}
>
  <div
    className="sticky top-24 h-[calc(100vh-6rem)] overflow-hidden"
    style={{
      maskImage:
        "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
      WebkitMaskImage:
        "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
      opacity: 0.75,
    }}
  >
    <img
      src={laceNavy}
      alt=""
      aria-hidden="true"
      className="h-[115%] w-full object-cover"
      style={{
        transform: `translateY(${laceOffset * 0.18}px)`,
        transition: "transform 80ms linear",
      }}
    />
  </div>
</div>
    
    <div className="relative z-10 px-6 md:px-10 lg:px-12 xl:px-16">
      <div className="mx-auto w-full max-w-[1800px]">
        <div className="space-y-16 md:space-y-24 lg:space-y-28">
          {ENTRIES.map((entry, i) => {
            const isLeft = i % 2 === 0;
            const isVisible = visible[i];

            return (
              <article
                key={entry.year}
                ref={(el) => {
                  entryRefs.current[i] = el;
                }}
                data-idx={i}
                className="relative grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_90px_minmax(0,1fr)] lg:gap-12 xl:gap-20 items-center min-h-[62vh]"
              >
                {/* Text */}
                <div
                className={`${
                  isLeft
                    ? "lg:col-start-1"
                    : "lg:col-start-3"
                } text-left transition-all duration-700 ease-out`}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(24px)",
                  }}
                >
                  <div
                    className="font-serif leading-none text-foreground mb-6"
                    style={{
                      fontSize: "clamp(2.6rem, 5vw, 5rem)",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {entry.year}
                  </div>

                  <p className="editorial-body text-muted-foreground whitespace-pre-line max-w-[900px]">
                    {entry.text}
                  </p>
                </div>

                {/* Center marker */}
                <div className="relative hidden lg:flex justify-center lg:col-start-2">
                  <div className="h-3 w-3 rounded-full bg-primary shadow-[0_0_0_12px_hsl(var(--background))]" />
                </div>

                {/* Image / placeholder */}
                <div
                  className={`${
                    isLeft
                      ? "lg:col-start-3"
                      : "lg:col-start-1 lg:row-start-1"
                  } transition-all duration-700 ease-out delay-150`}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(24px)",
                  }}
                >
                  <div className="aspect-[4/3] lg:aspect-[5/4] w-full overflow-hidden border border-border bg-muted/30 flex items-center justify-center">
                    <span className="editorial-label text-muted-foreground/40">
                      {t("Image", "Bild")} {i + 1}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="pt-24 md:pt-32 text-center">
          <div
            className="mx-auto mb-10 h-28 w-[88px] opacity-60"
            style={{
              backgroundImage: `url(${laceNavy})`,
              backgroundRepeat: "repeat-y",
              backgroundSize: "88px auto",
              backgroundPosition: "center top",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
            }}
          />

        </div>
      </div>
    </div>
  </section>
);

};

export default HistoryTimeline;

