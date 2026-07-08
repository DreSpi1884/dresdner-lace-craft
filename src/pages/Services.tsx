import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";
import SEO from "@/components/SEO";
import { useQuoteModal } from "@/components/QuoteModal";
import { useLang } from "@/i18n/LanguageContext";

// Inline link helper that turns a specific word in a paragraph into a button.
const TextWithLink = ({
  text,
  link,
  onClick,
}: {
  text: string;
  link: string;
  onClick: () => void;
}): ReactNode => {
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


  const processSteps = useMemo(() => [
    { step: "01", title: t("Consult", "BERATUNG"), desc: t("Share your project requirements and applications with us.", "Teilen Sie uns Ihre Projektanforderungen und Anwendungen mit.") },
    { step: "02", title: t("Plan", "PLANUNG"), desc: t("We develop textile solutions tailored to your needs.", "Wir entwickeln textile Lösungen, die auf Ihre Bedürfnisse zugeschnitten sind.") },
    { step: "03", title: t("Produce", "PRODUKTION"), desc: t("Your order is produced to certified quality standards.", "Ihre Bestellung wird nach zertifizierten Qualitätsstandards produziert.") },
    { step: "04", title: t("Delivery", "Lieferung"), desc: t("We deliver reliably to your schedule", "Wir liefern zuverlässig nach Ihrem Zeitplan") },
  ], [t]);

  type ServiceItem = {
    id: string;
    nav: string;
    title: string;
    text: string;
    process?: typeof processSteps;
  };

  const services = useMemo((): ServiceItem[] => [
    {
      id: "collections",
      nav: t("Design", "Design"),
      title: t("Design", "Design"),
      text: t(
        "Twice a year we develop new lace collections inspired by international fashion trends, alongside custom warp-knitted fabrics for technical and medical applications.\n\n\nOur Portfolio\nBeyond our seasonal collections, we develop custom designs tailored to your exact specifications. Whether you need a specific pattern, weight or construction, we translate your vision into finished textile.",
        "Zweimal im Jahr entwickeln wir neue Spitzenkollektionen, inspiriert von internationalen Modetrends, sowie maßgeschneiderte Kettengewirke für technische und medizinische Anwendungen.\n\n\nUnser Portfolio\nÜber unsere saisonalen Kollektionen hinaus entwickeln wir maßgeschneiderte Designs, die genau auf Ihre Spezifikationen zugeschnitten sind. Ob Sie ein bestimmtes Muster, Gewicht oder eine bestimmte Konstruktion benötigen, wir setzen Ihre Vision in ein fertiges Textil um."
      ),
    },
    {
      id: "custom-designs",
      nav: t("Raw Material Production", "Rohwarenproduktion"),
      title: t("Raw Material Production", "Rohwarenproduktion"),
      text: t(
        "All production takes place under one roof in Dresden. Our Karl Mayer Raschel, Jacquardtronic® and Textronic® machines combine the latest warp knitting technology with over 140 years of textile expertise to produce premium lace, elastic fabrics and technical textiles.",
        "Die gesamte Produktion findet unter einem Dach in Dresden statt. Unsere Karl Mayer Raschel-, Jacquardtronic®- und Textronic®-Maschinen kombinieren modernste Wirktechnologie mit über 140 Jahren Textilexpertise zur Herstellung hochwertiger Spitzen, elastischer Stoffe und technischer Textilien."
      ),
    },
    {
      id: "dyeing-finishing",
      nav: t("Dyeing & Finishing", "Färbung & Ausrüstung"),
      title: t("Dyeing & Finishing", "Färbung & Ausrüstung"),
      text: t(
        "Our in-house dyeing facilities offer precise color matching across the full spectrum, including solid and bicolor finishes. We also provide finishing tailored to your intended application.\nhydrophilic | hydrophobic\u00a0 | antistatic | flame retardant | softening | stiffening",
        "Unsere hauseigene Färberei deckt das gesamte Farbspektrum ab, von zarten Pastelltönen bis zu tiefen Sattfarben, in Uni- und Bicolor-Ausführung. Darüber hinaus veredeln wir Textilien mit funktionellen Ausrüstungen: schmutz- und ölabweisend, hydrophil, hydrophob, antistatisch, weichmachend, flammhemmend und versteifend. Lohnfärberei und Lohnveredelung auf Anfrage verfügbar."
      ),
    },
    {
      id: "functional-treatments",
      nav: t("Functional and Medical Textiles", "Funktions- und Medizintextilien"),
      title: t("Functional and Medical Textiles", "Funktions- und Medizintextilien"),
      text: t(
        "We develop functional warp-knitted fabrics for technical and medical applications. Our textiles are used in compression garments and post-surgical products where consistent quality is essential.",
        "Wir entwickeln funktionale Kettengewirke für technische und medizinische Anwendungen. Unsere Textilien werden beispielsweise in Kompressionsbekleidung, postoperativen Produkten eingesetzt, wo zuverlässige Qualität entscheidend ist."
      ),
    },
  ], [t, processSteps]);

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
        fontSize: "15px",
        lineHeight: 1.65,
        maxWidth: "560px",
        color: "hsl(var(--muted-foreground))",
      }}
    >
      {s.id === "collections" ? (
        <>
          {s.text.split('\n').map((line, li, array) => {
            const isBeyondLine = line.trim().startsWith("Beyond") || line.trim().startsWith("Über");
            return (
              <div key={`collections-${lang}-${li}`}>
                {isBeyondLine && (
                  <h3
                    className="mb-6"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "12px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      color: "hsl(var(--primary))",
                    }}
                  >
                    {t("ELASTIC LACE | INELASTIC LACE | WARP KNITTED FABRICS", "ELASTISCHE SPITZE | UNELASTISCHE SPITZE | KETTENGEWIRKE")}
                  </h3>
                )}
                {line ? (
                  <p className={li > 0 && array[li-1] ? "mt-3" : ""}>{line}</p>
                ) : (
                  <div className="h-4" />
                )}
              </div>
            );
          })}
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
          <div className="pb-8 mb-8 border-b border-primary/15 max-w-none">
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
          <p>
            <TextWithLink
              text={t("Samples are available on request.", "Muster sind auf Anfrage erhältlich.")}
              link={lang === "de" ? "Anfrage" : "request"}
              onClick={openQuote}
            />
          </p>
        </>
      ) : s.id === "custom-designs" ? (
        <>
          {s.text.split('\n').map((line, li) => (
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
      ) : (
        s.text.split('\n').map((line, li) => (
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
    <EditorialLayout title={t("Our Production", "Unsere Produktion")} heroCompact>
      <SEO
        title={t("Our Production — Lace, Bespoke Designs & Finishing", "Unsere Produktion — Spitzen, Maßanfertigungen & Veredelung")}
        description={t(
          "Seasonal lace collections, bespoke designs, in-house dyeing and finishing, and functional or medical textiles — engineered in Germany.",
          "Saisonale Spitzenkollektionen, maßgeschneiderte Entwürfe, hauseigenes Färben und Veredeln sowie funktionale und medizinische Textilien — entwickelt in Deutschland."
        )}
        path="/services"
      />
      <section className="mx-auto w-full max-w-[1280px] px-6 lg:px-12 pt-12 md:pt-16 pb-24 lg:pb-28">
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-24">
          <aside className="hidden lg:block">
            <nav
              aria-label={t("Services navigation", "Leistungsnavigation")}
              className="sticky flex flex-col gap-8"
              style={{ top: `calc(50vh - 120px)` }}
            >
              <span aria-hidden="true" className="absolute left-0 top-2 bottom-2 w-px bg-border" />
              {services.map((s, i) => {
                const active = activeIdx === i;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => scrollTo(i)}
                    className="text-left pl-6 relative"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "12px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      fontWeight: active ? 600 : 400,
                      color: active ? "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.6)",
                      transition: "color 400ms ease, font-weight 400ms ease",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-0 bottom-0"
                      style={{
                        width: "2px",
                        background: "hsl(var(--primary))",
                        opacity: active ? 1 : 0,
                        transition: "opacity 400ms ease",
                      }}
                    />
                    {s.nav}
                  </button>
                );
              })}
            </nav>
          </aside>

          <div className="min-w-0">
            {/* Mobile accordion (below lg breakpoint) */}
            <div className="lg:hidden">
              {services.map((s, i) => {
                const open = mobileOpenIdx === i;
                return (
                  <article
                    key={s.id}
                    id={s.id}
                    data-idx={i}
                    ref={(el) => { sectionsRef.current[i] = el; }}
                    className="border-b border-primary/15"
                    style={{ scrollMarginTop: `${NAV_OFFSET + 24}px` }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleMobile(i)}
                      aria-expanded={open}
                      className="w-full flex items-center justify-between py-6 text-left"
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
                        className="shrink-0 ml-4 transition-transform duration-300"
                        style={{
                          color: "hsl(var(--primary))",
                          transform: open ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-300 ease-out"
                      style={{
                        maxHeight: open ? "1000px" : "0px",
                        opacity: open ? 1 : 0,
                      }}
                    >
                      <div className="pb-6 pr-8">
                        {renderBody(s)}
                        {renderProcess(s)}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Desktop layout (lg and above) */}
            <div className="hidden lg:block">
              {services.map((s, i) => (
                <article
                  key={s.id}
                  id={s.id}
                  data-idx={i}
                  ref={(el) => { sectionsRef.current[i] = el; }}
                  className={`${s.id === "collections" || s.process ? "max-w-4xl" : "max-w-2xl"} py-16 md:py-24 first:pt-0 last:pb-0`}
                  style={{ scrollMarginTop: `${NAV_OFFSET + 24}px` }}
                >
                  <p
                    className="mb-5"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "10px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: "hsl(var(--muted-foreground) / 0.7)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                  </p>
                  <h2
                    className="mb-6 leading-[1.1]"
                    style={{
                      fontFamily: "'Bodoni Moda', serif",
                      fontSize: "clamp(30px, 4vw, 42px)",
                      color: "hsl(var(--primary))",
                      fontWeight: 500,
                    }}
                  >
                    {s.title}
                  </h2>
                  {renderBody(s)}
                  {renderProcess(s)}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-40">
        {services.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={s.nav}
            onClick={() => scrollTo(i)}
            className="rounded-full transition-all"
            style={{
              width: activeIdx === i ? "24px" : "8px",
              height: "8px",
              background: activeIdx === i ? "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.35)",
            }}
          />
        ))}
      </div>
    </EditorialLayout>
  );
};

export default Services;
