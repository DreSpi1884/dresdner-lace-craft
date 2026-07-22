import { useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import laceAsset from "@/assets/lace_tile_vertikal.png";
import history1995Asset from "@/assets/history-1995.jpg.asset.json";
import bobbinetManImage from "@/assets/bobbinet-2.jpg?url";
import factory1900Image from "@/assets/aereal-dregus.jpg?url";
import image1945 from "@/assets/bild-45.png?url";

type Entry = {
  year: string;
  date: string;
  text: string;
  image?: string;
  imageAlt?: string;
  imageClassName?: string;
  caption?: string;
};

const RIBBON_WIDTH = 72;

const HistoryTimeline = () => {
  const { t } = useLang();

  const entries: Entry[] = useMemo(
    () => [
      {
        year: t("Our Founding", "Unsere Gründung"),
        date: "1884",
        image: bobbinetManImage,
        imageAlt: t(
          "Worker operating a historic bobbinet machine",
          "Arbeiter an einer historischen Bobbinet-Maschine"
        ),
        imageClassName: "object-cover object-[50%_35%]",
        text: t(
          "Our story begins in 1884, when Georg Marwitz and Carl H. Siegel found the Dresdner Gardinen- und Spitzen-Manufaktur.\nAt a time when fine lace is almost exclusively imported from England, we introduce English bobbin machines to Germany and establish the foundations of modern lace manufacturing in Dresden.",
          "Unsere Geschichte beginnt 1884, als Georg Marwitz und Carl H. Siegel die Dresdner Gardinen- und Spitzen-Manufaktur gründen.\nZu einer Zeit, als feine Spitze fast ausschließlich aus England importiert wird, bringen sie englische Bobbinet-Maschinen nach Deutschland und legen den Grundstein für die moderne Spitzenherstellung in Dresden."
        ),
      },
      {
        year: t("New Location", "Neuer Standort"),
        date: "1900",
        image: factory1900Image,
        imageAlt: t(
          "Historic aerial view of the factory site in Dresden-Dobritz",
          "Historische Ansicht des Fabrikgeländes in Dresden-Dobritz"
        ),
        imageClassName: "object-cover object-center",
        text: t(
          "As demand for our lace and textiles increases, so do our ambitions.\nWe expand our textile production to a larger site in Dresden-Dobritz, invest in new manufacturing facilities and open factories abroad. Even through wars, inflation and economic uncertainty, we continue to produce and export textiles worldwide. We continue to produce at this site today.",
          "Mit wachsender Nachfrage wachsen auch unsere Ambitionen.\nWir verlagern unsere Produktion nach Dresden-Dobritz, investieren in neue Anlagen und eröffnen Werke im Ausland. Auch durch Kriege und wirtschaftliche Krisen hindurch produzieren und exportieren wir unsere Textilien weltweit. An diesem Standort produzieren wir auch heute noch."
        ),
      },
      {
        year: t("Reconstruction", "Wiederaufbau"),
        date: "1945",
        caption: t('“Glück Auf” (traditional miners greeting) — "wishing a good new journey, in true DREGUS tradition."', ""),
        image: image1945,
        imageAlt: t(
          "Historic machine after the Second World War",
          "Historische Maschine nach dem Zweiten Weltkrieg"
        ),
        imageClassName: "object-cover object-[45%_50%]",
        text: t(
          "After the Second World War, every machine in our factory is dismantled.\u00a0\nStarting almost from nothing, we rebuild our production with borrowed equipment, determination and the commitment of our employees. Within a year, we can produce again.",
          "Nach dem Zweiten Weltkrieg wird jede Maschine unserer Fabrik demontiert.\u00a0\nMit geliehenen Maschinen, Entschlossenheit und dem Einsatz unserer Mitarbeitenden bauen wir die Produktion wieder auf.\u00a0\nInnerhalb eines Jahres läuft die Textilproduktion erneut an."
        ),
      },
      {
        year: t("New Machinery", "Neue Maschinen"),
        date: "1980",
        image: history1995Asset.url,
        imageAlt: t(
          "1995 production facility",
          "Produktionsanlage 1995"
        ),
        imageClassName: "object-cover object-center",
        text: t(
          "The introduction of warp knitting technology transformes our production and establishes us as one of the leading lace manufacturers in East Germany.\u00a0\n1982, we become the first company in the world to operate electronically controlled Raschel machines.",
          "Die Einführung der Kettenwirktechnik verändert unsere Produktion grundlegend und etabliert uns als den führenden Spitzenhersteller in Ostdeutschland.\u00a0\n1982 sind wir das weltweit erste Unternehmen, das elektronisch gesteuerte Raschel-Maschinen einsetzt."
        ),
      },
      {
        year: t("New Beginning", "Neuanfang"),
        date: "1995",
        text: t(
          "After reunification, a new chapter begins for us. With determination, investment and trust in our employees, we modernise our production and gradually align Dresdner Spitzen with international markets.",
          "Nach der Wiedervereinigung beginnt für uns ein neues Kapitel. Mit Entschlossenheit, Investitionen und Vertrauen in unsere Mitarbeitenden modernisieren wir unsere Produktion und richten Dresdner Spitzen Schritt für Schritt auf internationale Märkte aus."
        ),
      },
      {
        year: t("140 Years Later", "140 Jahre Später"),
        date: t("Today", "Heute"),
        text: t(
          "Today, Dresdner Spitzen is shaped by the people who carry this knowledge forward every day.\nIn Dresden, we produce lace, warp-knitted fabrics and functional textiles for fashion, industry and medical applications.\nMore than 140 years of textile experience remain part of our daily work, alongside modern technology and attention to detail in every product.",
          "Heute wird Dresdner Spitzen von den Menschen geprägt, die dieses Wissen jeden Tag weitertragen.\nIn Dresden entstehen längst nicht mehr nur Spitzen, sondern auch Kettgewirke und funktionale Textilien für Mode, Industrie und medizinische Anwendungen.\nDabei verbinden wir über 140 Jahre Erfahrung mit moderner Technologie, Sorgfalt und Neugier."
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
      className="relative w-full bg-background py-12 text-primary md:py-16 lg:py-20"
    >
      {/* Lace ribbon */}
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

      <div className="relative z-10 px-1 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto w-full max-w-[1800px]">
          <div className="space-y-16 md:space-y-24 lg:space-y-28">
            {entries.map((entry, i) => {
              const isLeft = i % 2 === 0;
              const isVisible = visible[i] ?? false;
              const imageUrl = entry.image;

              return (
                <article
                  key={`${entry.date}-${i}`}
                  ref={(el) => {
                    entryRefs.current[i] = el;
                  }}
                  data-idx={i}
                  className="grid grid-cols-1 items-center gap-6 lg:min-h-[56vh] lg:grid-cols-[minmax(0,1fr)_110px_minmax(0,1fr)] lg:gap-12 xl:gap-20"
                >
                  {/* Text */}
                  <div
                    className={`order-2 text-left transition-all duration-700 ease-out lg:order-none ${
                      isLeft
                        ? "lg:col-start-1 lg:row-start-1"
                        : "lg:col-start-3 lg:row-start-1"
                    }`}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateY(0)" : "translateY(24px)",
                    }}
                  >
                    {/* Desktop headline */}
                    <h2 className="hidden text-[28px] leading-snug text-primary lg:mb-7 lg:block xl:text-[32px]">
                      {entry.year}
                    </h2>

                    <p className="max-w-[920px] whitespace-pre-line text-lg leading-[2.05] text-muted-foreground">
                      {entry.text}
                    </p>
                  </div>

                  {/* Image */}
                  <div
                    className={`relative order-1 transition-all delay-150 duration-700 ease-out lg:order-none ${
                      isLeft
                        ? "lg:col-start-3 lg:row-start-1"
                        : "lg:col-start-1 lg:row-start-1"
                    }`}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateY(0)" : "translateY(24px)",
                    }}
                  >
                    <div className="relative left-1/2 flex aspect-[4/3] w-screen -translate-x-1/2 items-center justify-center overflow-hidden border-y border-border bg-muted/20 lg:left-auto lg:w-full lg:translate-x-0 lg:border">
                      {i === 3 ? (
                        <img
                          src={history1995Asset.url}
                          alt={t("1995 production facility", "Produktionsanlage 1995")}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      ) : imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={entry.imageAlt ?? entry.year}
                          className={`absolute inset-0 h-full w-full ${
                            entry.imageClassName ?? "object-cover object-center"
                          }`}
                        />
                      ) : (
                        <span className="editorial-label text-muted-foreground/45">
                          {t("Image", "Bild")} {i + 1}
                        </span>
                      )}


                    {/* Date on image */}
                      <div
                        className="pointer-events-none absolute bottom-5 left-6 z-10 font-serif leading-none text-background drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)] lg:bottom-6 lg:left-7"
                        style={{
                          fontSize: "clamp(2.2rem, 8vw, 5.5rem)",
                          letterSpacing: "-0.04em",
                        }}
                      >
                        {entry.date}
                      </div>
                    </div>

                    {entry.caption && (
                      <p className="pointer-events-none absolute right-0 top-full mt-2 hidden text-right text-[11px] leading-[1.4] tracking-[0.08em] text-muted-foreground/70 lg:block">
                        {entry.caption}
                      </p>
                    )}
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
