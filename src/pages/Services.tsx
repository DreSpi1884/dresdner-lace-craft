import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";
import SEO from "@/components/SEO";
import { useQuoteModal } from "@/components/QuoteModal";
import { useLang } from "@/i18n/LanguageContext";
import ProductionAnchorNav from "@/components/ProductionAnchorNav";

// Inline link helper that turns a specific word in a paragraph into a button.
const TextWithLink = ({ text, link, onClick }: { text: string; link: string; onClick: () => void }): ReactNode => {
  const parts = text.split(link);
  if (parts.length !== 2) return <>{text}</>;
  return (
    <>
      {parts[0]}
      <button
        type="button"
        onClick={onClick}
        className="inline underline underline-offset-4 text-primary hover:opacity-80 transition-opacity"
      >
        {link}
      </button>
      {parts[1]}
    </>
  );
};

// Fixed header height (h-20 mobile / h-24 desktop)
const NAV_OFFSET = 96;

const Services = () => {
  const { t, lang } = useLang();
  const { open: openQuote } = useQuoteModal();

  const processSteps = useMemo(
    () => [
      {
        step: "01",
        title: t("CONSULTATION", "BERATUNG"),
        desc: t("We discuss your project and requirements.", "Wir besprechen Ihre Anforderungen."),
      },
      {
        step: "02",
        title: t("Plan", "PLANUNG"),
        desc: t(
          "We develop the right solution for your project.",
          "Wir entwickeln eine Lösung, die exakt zu Ihrem Projekt passt.",
        ),
      },
      {
        step: "03",
        title: t("PRODUCTION", "PRODUKTION"),
        desc: t(
          "Your order is produced to certified standards.",
          "Ihre Bestellung wird nachhaltig zertifiziert produziert.",
        ),
      },
      {
        step: "04",
        title: t("Delivery", "Lieferung"),
        desc: t("We deliver reliably and on schedule.", "Wir liefern zuverlässig nach Ihrem Zeitplan."),
      },
    ],
    [t],
  );

  type ServiceItem = {
    id: string;
    nav: string;
    title: string;
    text: string;
    process?: typeof processSteps;
  };

  const services = useMemo(
    (): ServiceItem[] => [
      {
        id: "design",
        nav: t("Design", "Design"),
        title: t("Design", "Design"),
        text: t(
          "Twice a year we develop new lace collections inspired by international fashion trends, alongside warp-knitted fabrics for technical and medical applications.\n\n\n\nWe also create custom elastic or inelastic lace and warp-knitted fabrics tailored to your specific requirements.",
          "Zweimal im Jahr entwickeln wir neue Spitzenkollektionen, inspiriert von internationalen Modetrends, sowie Kettengewirke für technische und medizinische Anwendungen.\n\n\n\nNeben unseren saisonalen Kollektionen entwickeln wir maßgeschneiderte elastische und unelastische Spitzen und Kettengewirke nach Ihren individuellen Anforderungen.",
        ),
      },
      {
        id: "raw-material-production",
        nav: t("Raw Material Production", "Rohwarenproduktion"),
        title: t("Raw Material Production", "Rohwarenproduktion"),
        text: t(
          "All production processes takes place under one roof in Dresden, Germany.\nOn Karl Mayer Raschel, Jacquardtronic® and Textronic® machines, we manufacture premium lace, elastic fabrics and technical textiles with over 140 years of textile expertise.",
          "Die gesamte Produktion findet unter einem Dach in Dresden statt.\nAuf Karl Mayer Raschel-, Jacquardtronic®- und Textronic®-Maschinen fertigen wir hochwertige Spitzen, elastische Stoffe und technische Textilien mit über 140 Jahren Textilexpertise.\u00a0",
        ),
      },
      {
        id: "dyeing-finishing",
        nav: t("Dyeing & Finishing", "Färbung & Ausrüstung"),
        title: t("Dyeing & Finishing", "Färbung & Ausrüstung"),
        text: t(
          "Our in-house dyeing facilities offer precise color matching across the full spectrum, including solid and bicolor finishes.\nWe use jet dyeing technology, reducing water consumption by up to 70% compared to conventional dyeing methods.\nWe also provide finishing tailored to your intended application.\nHydrophilic | Hydrophobic | Antistatic | Flame Retardant | Soft Finish | Stiff Finish\n\nContract dyeing and finishing services available on request.",
          "Unsere hauseigene Färberei deckt das gesamte Farbspektrum ab, von zarten Pastelltönen bis zu tiefen Sattfarben, in Uni- und Bicolor-Ausführung.\nWir färben mittels Jet-Technologie, wobei wir bis zu 70% Wasser sparen im Vergleich zu herkömmlichen Färbemethoden.\n\nDarüber hinaus veredeln wir Textilien mit funktionellen Ausrüstungen:\u00a0\nHydrophil | Hydrophob | Antistatisch | Flammhemmend | Weichausrüstung | Steifausrüstung\nLohnfärberei und -ausrüstung auf Anfrage.",
        ),
      },
      {
        id: "functional-textiles",
        nav: t("Functional and Medical Textiles", "Funktions- und Medizintextilien"),
        title: t("Functional and Medical Textiles", "Funktions- und Medizintextilien"),
        text: t(
          "We develop functional warp-knitted fabrics for technical and medical applications. Our textiles are used in compression garments and post-surgical products,\u00a0delivering consistent quality, comfort and reliable performance.",
          "Wir entwickeln funktionale Kettengewirke für technische und medizinische Anwendungen. Unsere Textilien werden beispielsweise in Kompressionsbekleidung und postoperativen Produkten eingesetzt und stehen für hohe Qualität, Tragekomfort und Langlebigkeit.",
        ),
      },
    ],
    [t, processSteps],
  );

  const [activeIdx, setActiveIdx] = useState(0);
  const [mobileOpenIdx, setMobileOpenIdx] = useState(-1);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    let ticking = false;
    const compute = () => {
      ticking = false;
      const activationY = NAV_OFFSET + (window.innerHeight - NAV_OFFSET) * 0.35;
      let current = 0;
      for (let i = 0; i < sectionsRef.current.length; i++) {
        const el = sectionsRef.current[i];
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= activationY) current = i;
        else break;
      }
      setActiveIdx((prev) => (prev === current ? prev : current));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollTo = (idx: number) => {
    const el = sectionsRef.current[idx];
    if (!el) return;
    setMobileOpenIdx(idx);
    const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET - 24;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const toggleMobile = (idx: number) => {
    setMobileOpenIdx((prev) => (prev === idx ? -1 : idx));
  };

  const renderBody = (s: ServiceItem) => (
    <div
      style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: "clamp(15px, 1vw, 18px)",
        lineHeight: 1.75,
        maxWidth: "900px",
        color: "hsl(var(--muted-foreground))",
      }}
    >
      {s.id === "design" ? (
        <>
          {(() => {
            const [intro, customIntro] = s.text.split("\n\n\n\n");
            return (
              <>
                {intro.split("\n").map((line, li, array) => (
                  <div key={`collections-intro-${lang}-${li}`}>
                    {line ? <p className={li > 0 && array[li - 1] ? "mt-3" : ""}>{line}</p> : <div className="h-4" />}
                  </div>
                ))}
                <h3
                  className="mt-8 mb-6"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "12px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color: "hsl(var(--primary))",
                  }}
                >
                  {t("Custom Designs", "MASSGESCHNEIDERTE DESIGNS")}
                </h3>
                {customIntro?.split("\n").map((line, li, array) => (
                  <div key={`collections-custom-${lang}-${li}`}>
                    {line ? <p className={li > 0 && array[li - 1] ? "mt-3" : ""}>{line}</p> : <div className="h-4" />}
                  </div>
                ))}
                <div className="pb-8 mb-8 border-b border-primary/15 max-w-none mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 lg:gap-8">
                    {processSteps.map((item) => (
                      <div key={item.step} className="group flex flex-col">
                        <span
                          className="mb-4 italic transition-opacity duration-300 opacity-30 group-hover:opacity-100"
                          style={{
                            fontFamily: "'Bodoni Moda', serif",
                            fontSize: "30px",
                            lineHeight: 1,
                            color: "hsl(var(--primary))",
                          }}
                        >
                          {item.step}
                        </span>
                        <h3
                          className="mb-3"
                          style={{
                            fontFamily: "'Jost', sans-serif",
                            fontSize: "15px",
                            letterSpacing: "0.5px",
                            textTransform: "uppercase",
                            fontWeight: 600,
                            color: "hsl(var(--primary))",
                          }}
                        >
                          {item.title}
                        </h3>
                        <p
                          style={{
                            fontFamily: "'Jost', sans-serif",
                            fontSize: "13px",
                            lineHeight: 1.6,
                            color: "hsl(var(--muted-foreground) / 0.9)",
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            );
          })()}
          <p className="mt-8">
            <TextWithLink
              text={t("Samples are available on request.", "Muster sind auf Anfrage erhältlich.")}
              link={lang === "de" ? "Anfrage" : "request"}
              onClick={openQuote}
            />
          </p>
        </>
      ) : s.id === "raw-materials-production" ? (
        <>
          {s.text.split("\n").map((line, li) => (
            <p key={`${s.id}-${lang}-${li}`} className={li > 0 ? "mt-3" : ""}>
              {line}
            </p>
          ))}
          <p
            className="mt-8"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "12px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "hsl(var(--primary))",
            }}
          >
            {t("Contract manufacturing available on request.", "LOHNFERTIGUNG AUF ANFRAGE.")}
          </p>
        </>
      ) : s.id === "dyeing-finishing" ? (
        <>
          {s.text
            .split("\n")
            .slice(0, -1)
            .map((line, li) => (
              <p key={`${s.id}-${lang}-${li}`} className={li > 0 ? "mt-3" : ""}>
                {line}
              </p>
            ))}
          <p
            className="mt-8"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "12px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "hsl(var(--primary))",
            }}
          >
            {s.text.split("\n").slice(-1)[0]}
          </p>
        </>
      ) : (
        s.text.split("\n").map((line, li) => (
          <p key={`${s.id}-${lang}-${li}`} className={li > 0 ? "mt-3" : ""}>
            {line}
          </p>
        ))
      )}
    </div>
  );

  const renderProcess = (s: ServiceItem) =>
    s.process && (
      <div className="mt-8 pt-8 border-t border-primary/15 max-w-none">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 lg:gap-8">
          {s.process.map((item) => (
            <div key={item.step} className="group flex flex-col">
              <span
                className="mb-4 italic transition-opacity duration-300 opacity-30 group-hover:opacity-100"
                style={{
                  fontFamily: "'Bodoni Moda', serif",
                  fontSize: "30px",
                  lineHeight: 1,
                  color: "hsl(var(--primary))",
                }}
              >
                {item.step}
              </span>
              <h3
                className="mb-3"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "15px",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: "hsl(var(--primary))",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "13px",
                  lineHeight: 1.6,
                  color: "hsl(var(--muted-foreground) / 0.9)",
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    );

    return (
    <EditorialLayout title={t("Production", "Produktion")} heroCompact>
      <SEO
        title={t(
          "Services — Lace, Production & Finishing",
          "Leistungen — Spitzen, Produktion & Veredelung",
        )}
        description={t(
          "Seasonal lace collections, bespoke designs, in-house dyeing and finishing, and functional or medical textiles — engineered in Germany.",
          "Saisonale Spitzenkollektionen, maßgeschneiderte Entwürfe, hauseigenes Färben und Veredeln sowie funktionale und medizinische Textilien — entwickelt in Deutschland.",
        )}
        path="/services"
      />

      <section className="w-full">
        {/* Desktop navigation */}
<nav
  aria-label={t("Services navigation", "Leistungsnavigation")}
  className="sticky z-30 hidden border-b border-primary/10 bg-background/95 backdrop-blur lg:block"
  style={{ top: `${NAV_OFFSET}px` }}
>
  <div className="flex items-center gap-12 px-[60px]">
    {services.map((s, i) => {
      const active = activeIdx === i;

      return (
        <button
          key={s.id}
          type="button"
          onClick={() => scrollTo(i)}
          className="relative py-5 transition-colors"
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
          {s.nav}
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-px transition-all duration-300"
            style={{
              width: active ? "100%" : "0%",
              background: "hsl(var(--primary))",
            }}
          />
        </button>
      );
    })}
  </div>
</nav>

        {/* Mobile accordion */}
        <div className="lg:hidden px-6 pb-20 pt-8">
          {services.map((s, i) => {
            const open = mobileOpenIdx === i;

            return (
              <article
                key={s.id}
                id={s.id}
                data-idx={i}
                className="border-b border-primary/15"
                style={{ scrollMarginTop: `${NAV_OFFSET + 24}px` }}
              >
                <button
                  type="button"
                  onClick={() => toggleMobile(i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between py-6 text-left"
                >
                  <span className="flex items-baseline gap-4">
                    <span
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "10px",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        color: "hsl(var(--muted-foreground) / 0.7)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span
                      className="leading-[1.1]"
                      style={{
                        fontFamily: "'Bodoni Moda', serif",
                        fontSize: "clamp(24px, 6vw, 32px)",
                        color: "hsl(var(--primary))",
                        fontWeight: 500,
                      }}
                    >
                      {s.title}
                    </span>
                  </span>

                  <ChevronDown
                    size={20}
                    className="ml-4 shrink-0 transition-transform duration-300"
                    style={{
                      color: "hsl(var(--primary))",
                      transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>

                <div
                  className="overflow-hidden transition-all duration-300 ease-out"
                  style={{
                    maxHeight: open ? "2200px" : "0px",
                    opacity: open ? 1 : 0,
                  }}
                >
                  <div className="pb-8 pr-4">
                    {renderBody(s)}
                    {renderProcess(s)}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Desktop split sections */}
        <div className="hidden lg:block">
          {services.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              data-idx={i}
              ref={(el) => {
                sectionsRef.current[i] = el;
              }}
              className="grid grid-cols-2 border-b border-primary/10"
              style={{ scrollMarginTop: `${NAV_OFFSET + 88}px` }}
            >
              <div className="flex min-h-[760px] items-start pl-[40px] pr-8 pt-20 pb-20">
                <div className="w-full max-w-none">
                 
                  <h2
                    className="mb-20 leading-[1.1]"
                    style={{
                      fontFamily: "'Bodoni Moda', serif",
                      fontSize: "clamp(34px, 4vw, 48px)",
                      color: "hsl(var(--primary))",
                      fontWeight: 500,
                    }}
                  >
                    {s.title}
                  </h2>

                  {renderBody(s)}
                  {renderProcess(s)}
                </div>
              </div>

              <div className="min-h-[760px] bg-muted">
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/20 to-primary/5" />
                  <span
                    className="relative text-center"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "11px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: "hsl(var(--muted-foreground) / 0.6)",
                    }}
                  >
                    {t("Image placeholder", "Bildplatzhalter")}{" "}
                    {String(i + 1).padStart(2, "0")}
                    <br />
                    {s.title}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </EditorialLayout>
  );
  };

export default Services;
