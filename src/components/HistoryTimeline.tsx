import { useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import laceAsset from "@/assets/lace_tile_vertikal.png";

type Entry = {
  year: string;
  text: string;
};

const RIBBON_WIDTH = 72;




const HistoryTimeline = () => {
  const { t } = useLang();

  const entries: Entry[] = useMemo(
    () => [
      {
        year: "1884",
        text: t(
          "Our story began in 1884, when Georg Marwitz and Carl H. Siegel founded the Dresdner Gardinen- und Spitzen-Manufaktur.\u00a0\nAt a time when fine lace was almost exclusively imported from England, we introduced English bobbin machines to Germany and established the foundations of modern lace manufacturing in Dresden.",
          "Unsere Geschichte beginnt 1884, als Georg Marwitz and Carl H. Siegel founded the Dresdner Gardinen- und Spitzen-Manufaktur.\u00a0\nZu einer Zeit, als feine Spitze fast ausschließlich aus England importiert wird, bringen sie englische Bobbinet-Maschinen nach Deutschland und legen den Grundstein für die moderne Spitzenherstellung in Dresden."
        ),
      },
      {
        year: "1900",
        text: t(
          "As demand for our lace and textiles increased, so did our ambitions.\u00a0\nWe expanded our textile production to a larger site in Dresden-Dobritz, invested in new manufacturing facilities and opened factories abroad. Even through wars, inflation and economic uncertainty, we continued to produce and export textiles worldwide.",
          "Mit wachsender Nachfrage wachsen auch unsere Ambitionen.\u00a0\nWir verlagern unsere Produktion nach Dresden-Dobritz, investieren in neue Anlagen und eröffnen Werke im Ausland. Auch durch Kriege und wirtschaftliche Krisen hindurch produzieren und exportieren wir unsere Textilien weltweit."
        ),
      },
      {
        year: "1945",
        text: t(
          "After the Second World War, every machine in our factory was dismantled.\u00a0\nStarting almost from nothing, we rebuilt our production with borrowed equipment, determination and the commitment of our employees.\u00a0\nWithin a year, textile manufacturing had resumed.",
          "Nach dem Zweiten Weltkrieg wird jede Maschine unserer Fabrik demontiert.\u00a0\nMit geliehenen Maschinen, Entschlossenheit und dem Einsatz unserer Mitarbeitenden bauen wir die Produktion wieder auf.\u00a0\nInnerhalb eines Jahres läuft die Textilproduktion erneut an."
        ),
      },
      {
        year: "1970",
        text: t(
          "The introduction of warp knitting technology transformed our production and established us as one of the leading lace manufacturers in East Germany.\u00a0\n1982, we became the first company in the world to operate electronically controlled Raschel machines.",
          "Die Einführung der Kettenwirktechnik verändert unsere Produktion grundlegend und etabliert uns als einen der führenden Spitzenhersteller in Ostdeutschland.\u00a0\n1982 sind wir das weltweit erste Unternehmen, das elektronisch gesteuerte Raschel-Maschinen einsetzt."
        ),
      },
      {
        year: "1995",
        text: t(
          "After reunification, a new chapter begins for us.\u00a0\nWith determination, investment and trust in our employees, we modernise our production and gradually align Dresdner Spitzen with international markets.",
          "Nach der Wiedervereinigung beginnt für uns ein neues Kapitel.\u00a0\nMit Entschlossenheit, Investitionen und Vertrauen in unsere Mitarbeitenden modernisieren wir unsere Produktion und richten Dresdner Spitzen Schritt für Schritt auf internationale Märkte aus."
        ),
      },
      {
        year: t("Today", "Heute"),
        text: t(
          "Today, Dresdner Spitzen is shaped by the people who carry this knowledge forward every day.\u00a0\nIn Dresden, we create not only lace, but also warp-knitted fabrics and functional textiles for fashion, industry and medical applications,\u00a0\ncombining over 140 years of experience with modern technology, care and curiosity.",
          "Heute wird Dresdner Spitzen von den Menschen geprägt, die dieses Wissen jeden Tag weitertragen.\u00a0\nIn Dresden entstehen längst nicht mehr nur Spitzen, sondern auch Kettengewirke und funktionale Textilien für Mode, Industrie und medizinische Anwendungen.\u00a0\nDabei verbinden wir über 140 Jahre Erfahrung mit moderner Technologie, Sorgfalt und Neugier."
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
      // Shift the seamless tile so the ribbon appears to scroll with the page.
      setLaceOffset(rect.top);
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
      className="relative bg-background text-primary w-full py-12 md:py-16 lg:py-20"
    >
      {/* lace ribbon — sticky, seamless vertical tile with strong top/bottom fade */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 z-0 hidden lg:block"
        aria-hidden="true"
        style={{ height: "calc(100% + 35vh)" }}
      >
        <div
          className="sticky left-1/2 -translate-x-1/2"
          style={{
            top: 0,
            height: "100vh",
            width: `${RIBBON_WIDTH}px`,
            backgroundImage: `url(${laceAsset})`,
            backgroundRepeat: "repeat-y",
            backgroundPosition: `center ${laceOffset}px`,
            backgroundSize: `${RIBBON_WIDTH}px auto`,
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 40%, black 50%, transparent 55%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 40%, black 50%, transparent 55%)",
          }}
        />
      </div>


      <div className="relative z-10 px-3 md:px-8 lg:px-12 xl:px-16">
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
      className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_110px_minmax(0,1fr)] lg:gap-12 xl:gap-20 items-center lg:min-h-[56vh]"
    >
      {/* Text */}
      <div
        className={`order-2 ${
          isLeft ? "lg:col-start-1" : "lg:col-start-3"
        } text-left transition-all duration-700 ease-out`}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(24px)",
        }}
      >
        {/* Desktop year */}
        <div
          className="hidden lg:block font-serif leading-none text-foreground mb-8 md:mb-10"
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

      {/* Image */}
      <div
        className={`order-1 ${
          isLeft ? "lg:col-start-3" : "lg:col-start-1 lg:row-start-1"
        } transition-all duration-700 ease-out delay-150`}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(24px)",
        }}
      >
        <div className="relative left-1/2 aspect-[4/3] w-screen -translate-x-1/2 overflow-hidden border-y border-border bg-muted/20 flex items-center justify-center lg:left-auto lg:w-full lg:translate-x-0 lg:border">
          <span className="editorial-label text-muted-foreground/45">
            {t("Image", "Bild")} {i + 1}
          </span>

          {/* Mobile year on image */}
          <div
            className="absolute bottom-5 left-6 z-10 lg:hidden font-serif leading-none text-background"
            style={{
              fontSize: "clamp(2.2rem, 13vw, 4rem)",
              letterSpacing: "-0.04em",
            }}
          >
            {entry.year}
          </div>
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

