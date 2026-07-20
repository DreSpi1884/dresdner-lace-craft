import { useEffect, useLayoutEffect, useMemo, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { useLocation } from "react-router-dom";
import { ChevronDown, Info } from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";
import SEO from "@/components/SEO";
import { useQuoteModal } from "@/components/QuoteModal";
import { useLang } from "@/i18n/LanguageContext";
import ProductionAnchorNav from "@/components/ProductionAnchorNav";
import designImg1 from "@/assets/design-1.jpg?url";
import designImg2 from "@/assets/design-2.jpg?url";
import designImg3 from "@/assets/design-3.jpg?url";
import designImg4 from "@/assets/design-4.jpg?url";
import dyeingImg1 from "@/assets/faerberei.png?url";
import dyeingImg2 from "@/assets/farbkarte-blau.jpg?url";
import dyeingImg3 from "@/assets/farbkarte-gruen.png?url";
import dyeingImg4 from "@/assets/farbkarte-rot.png?url";
import rawMaterialImg1 from "@/assets/maschine-neu.png?url";
import rawMaterialImg2 from "@/assets/rohware-hand.png?url";
import functionalImg1 from "@/assets/wirkstoff-1.jpg?url";
import functionalImg2 from "@/assets/wirkstoff-2.jpg?url";
import functionalImg3 from "@/assets/wirkstoff-3.jpg?url";
import functionalImg4 from "@/assets/wirkstoff-4.jpg?url";


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

const InfoTooltip = ({ label }: { label: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative ml-1 inline-flex align-baseline group">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex translate-y-[2px] items-center justify-center text-primary/55 hover:text-primary focus:outline-none transition-colors"
        aria-label="Information"
      >
        <Info className="h-3.5 w-3.5" strokeWidth={1.7} />
      </button>

      <span
        className={`absolute left-full top-1/2 z-50 ml-1.5 w-[230px] -translate-y-1/2 rounded-sm bg-primary px-3 py-2 text-[11px] leading-[1.45] text-background shadow-lg ${
          open ? "block" : "hidden group-hover:block"
        }`}
      >
        {label}
        <span className="absolute right-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-r-primary" />
      </span>
    </span>
  );
};

// Fixed header height (h-20 mobile / h-24 desktop)

const Services = () => {
  const { t, lang } = useLang();
  const { open: openQuote } = useQuoteModal();
  const location = useLocation();
  const [productionImagesReady, setProductionImagesReady] = useState(false);
useEffect(() => {
  let active = true;

  const sources = [
    designImg1,
    designImg2,
    designImg3,
    designImg4,
    dyeingImg1,
    dyeingImg2,
    dyeingImg3,
    dyeingImg4,
    rawMaterialImg1,
    rawMaterialImg2,
    functionalImg1,
    functionalImg2,
    functionalImg3,
    functionalImg4,
  ];

  Promise.all(
    sources.map(
      (src) =>
        new Promise<void>((resolve) => {
          const image = new Image();

          const done = () => resolve();

          image.onload = done;
          image.onerror = done;
          image.src = src;

          if ("decode" in image) {
            image.decode().then(done).catch(done);
          }
        })
    )
  ).then(() => {
    if (active) setProductionImagesReady(true);
  });

  return () => {
    active = false;
  };
}, []);

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
    desktopImages?: string[];
    desktopImage?: string;
    mobileImage?: string;
  };

  const services = useMemo(
    (): ServiceItem[] => [
      {
        id: "design",
        nav: t("Design", "Design"),
        title: t("Design", "Design"),
        desktopImages: [designImg1, designImg2, designImg3, designImg4],
        mobileImage: designImg2,
        text: t(
          "Twice a year we develop new lace collections inspired by international fashion trends.\n\n\n\nWe also create custom elastic or inelastic lace and warp-knitted fabrics tailored to your specific requirements.",
          "Zweimal im Jahr entwickeln wir neue Spitzenkollektionen, inspiriert von internationalen Modetrends.\n\n\n\nNeben unseren saisonalen Kollektionen entwickeln wir maßgeschneiderte elastische und unelastische Spitzen und Kettengewirke nach Ihren individuellen Anforderungen.",
        ),
      },
      {
        id: "raw-material-production",
        nav: t("Raw Material Production", "Rohwarenproduktion"),
        title: t("Raw Material Production", "Rohwarenproduktion"),
        desktopImages: [rawMaterialImg1, rawMaterialImg2],
        mobileImage: rawMaterialImg1,
        text: t(
          "All production processes takes place under one roof in Dresden, Germany.\nOn Karl Mayer Raschel, Jacquardtronic® and Textronic® machines, we manufacture premium lace, elastic fabrics and technical textiles with over 140 years of textile expertise.",
          "Die gesamte Produktion findet unter einem Dach in Dresden statt.\nAuf Karl Mayer Raschel-, Jacquardtronic®- und Textronic®-Maschinen fertigen wir hochwertige Spitzen, elastische Stoffe und technische Textilien mit über 140 Jahren Textilexpertise.\u00a0",
        ),
      },
      {
        id: "dyeing-finishing",
        nav: t("Dyeing & Finishing", "Färbung & Ausrüstung"),
        title: t("Dyeing & Finishing", "Färbung & Ausrüstung"),
        desktopImages: [dyeingImg1, dyeingImg2, dyeingImg3, dyeingImg4],
        mobileImage: dyeingImg2,
        text: t(
          "Our in-house dyeing facilities offer precise color matching across the full spectrum, including solid and bicolor finishes.\nWe use jet dyeing technology, reducing water consumption by up to 70% compared to conventional dyeing methods.\nWe also provide finishing tailored to your intended application.\nHydrophilic | Hydrophobic | Antistatic | Flame Retardant | Soft Finish | Stiff Finish\n\nContract dyeing and finishing services available on request.",
          "Unsere hauseigene Färberei deckt das gesamte Farbspektrum ab, von zarten Pastelltönen bis zu tiefen Sattfarben, in Uni- und Bicolor-Ausführung.\nWir färben mittels Jet-Technologie, wobei wir bis zu 70% Wasser sparen im Vergleich zu herkömmlichen Färbemethoden.\n\nDarüber hinaus veredeln wir Textilien mit funktionellen Ausrüstungen:\u00a0\nHydrophil | Hydrophob | Antistatisch | Flammhemmend | Weichausrüstung | Steifausrüstung\nLohnfärberei und -ausrüstung auf Anfrage.",
        ),
      },
      {
        id: "functional-textiles",
        nav: t("Functional and Medical Textiles", "Funktions- und Medizintextilien"),
        title: t("Functional and Medical Textiles", "Funktions- und Medizintextilien"),
        desktopImages: [functionalImg1, functionalImg2, functionalImg3, functionalImg4],
        mobileImage: functionalImg1,
        text: t(
          "We develop functional warp-knitted fabrics for technical and medical applications.\u00a0\n\nOur textiles are used in compression garments and post-surgical products,\u00a0delivering consistent quality, comfort and reliable performance.",
          "Wir entwickeln funktionale Kettengewirke für technische und medizinische Anwendungen. Unsere Textilien werden beispielsweise in Kompressionsbekleidung und postoperativen Produkten eingesetzt und stehen für hohe Qualität, Tragekomfort und Langlebigkeit.",
        ),
      },
    ],
    [t, processSteps],
  );

const [mobileOpenId, setMobileOpenId] = useState<string | null>(null);

useLayoutEffect(() => {
  const hash = location.hash.replace("#", "");
  const exists = services.some((service) => service.id === hash);

  setMobileOpenId(exists ? hash : null);
}, [location.hash, services]);

const scrollMobileSectionToTop = (id: string) => {
  const element = document.getElementById(id);
  if (!element) return;

  const offset = 88;
  const top = element.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
  top,
  behavior: "auto",
});
};

const openMobileSection = (id: string) => {
  if (mobileOpenId === id) {
    flushSync(() => {
      setMobileOpenId(null);
    });

    window.history.replaceState(null, "", location.pathname);
    return;
  }

  flushSync(() => {
    setMobileOpenId(id);
  });

  window.history.replaceState(null, "", `#${id}`);

requestAnimationFrame(() => {
  scrollMobileSectionToTop(id);
});
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
                  {line ? (
                    <p className={li > 0 && array[li - 1] ? "mt-3" : ""}>
                      {line}
                    </p>
                  ) : (
                    <div className="h-4" />
                  )}
                </div>
              ))}

              <h3
                className="mt-8 mb-6"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "14px",
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
                  {line ? (
                    <p className={li > 0 && array[li - 1] ? "mt-3" : ""}>
                      {line}
                    </p>
                  ) : (
                    <div className="h-4" />
                  )}
                </div>
              ))}

              <div className="pb-6 mb-6 border-b border-primary/15 max-w-none mt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-4 lg:gap-8">
                  {processSteps.map((item) => (
                    <div key={item.step} className="group">
                      <div className="mb-2 flex items-baseline gap-3">
                        <span
                          className="italic opacity-40 transition-opacity duration-300 group-hover:opacity-100"
                          style={{
                            fontFamily: "'Bodoni Moda', serif",
                            fontSize: "24px",
                            lineHeight: 1,
                            color: "hsl(var(--primary))",
                          }}
                        >
                          {item.step}
                        </span>

                        <h3
                          style={{
                            fontFamily: "'Jost', sans-serif",
                            fontSize: "18px",
                            letterSpacing: "0.5px",
                            textTransform: "uppercase",
                            fontWeight: 600,
                            color: "hsl(var(--primary))",
                          }}
                        >
                          {item.title}
                        </h3>
                      </div>

                      <p
                        className="pl-[42px] md:pl-0"
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          fontSize: "14px",
                          lineHeight: 1.55,
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
    ) : s.id === "raw-material-production" ? (
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
              {li === 1 && (
  <InfoTooltip
    label={t(
      "Compared with high-liquor dyeing.",
      "Im Vergleich zu Hochflotten-Färbung."
    )}
        />
      )}
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

<ProductionAnchorNav />

<section className="w-full">
  {services.map((s, i) => {
    const isOpen = mobileOpenId === s.id;

    return (
      <article
      key={s.id}
      id={s.id}
      data-no-reveal
      className="border-b border-primary/10 scroll-mt-36"
      >


{/* Mobile accordion section */}
<div data-no-reveal className="lg:hidden px-6">
{s.mobileImage && (
  <div
    data-no-reveal
    role="img"
    aria-label={s.title}
    className="-mx-6 aspect-[4/3] overflow-hidden bg-muted bg-cover bg-center"
    style={{
      backgroundImage: productionImagesReady
        ? `url(${s.mobileImage})`
        : "none",
      opacity: 1,
      transform: "none",
      transition: "none",
      animation: "none",
    }}
  />
)}

  <button
    type="button"
    onClick={() => openMobileSection(s.id)}
    aria-expanded={isOpen}
    className="flex w-full items-center justify-between py-6 text-left"
  >
    <span className="editorial-label tracking-[0.22em] text-primary">
      {s.nav}
    </span>

    <ChevronDown
      className={`ml-4 h-5 w-5 shrink-0 transition-transform duration-150 ${
        isOpen ? "rotate-180" : ""
      }`}
      style={{ color: "hsl(var(--primary))" }}
    />
  </button>

  <div hidden={!isOpen} className="pb-10 pt-0">
    {renderBody(s)}
    {renderProcess(s)}
  </div>
</div>

        {/* Desktop split section */}
        <div data-no-reveal className="hidden lg:grid lg:grid-cols-2">
          <div className="flex min-h-[760px] items-start lg:pl-[48px] lg:pr-10 py-20">
            <div className="w-full max-w-none">
              <h2
                className="mb-16 leading-[1.1]"
                style={{
                  fontFamily: "'Bodoni Moda', serif",
                  fontSize: "clamp(30px, 4vw, 46px)",
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

            <div data-no-reveal className="min-h-[760px] bg-muted">
  {!productionImagesReady ? (
    <div
      data-no-reveal
      className="h-full min-h-[760px] w-full bg-muted"
      style={{
        opacity: 1,
        transform: "none",
        transition: "none",
        animation: "none",
      }}
    />
  ) : s.id === "raw-material-production" && s.desktopImages ? (
    <div
      data-no-reveal
      className="grid h-full min-h-[760px] grid-cols-1 grid-rows-2 gap-0"
    >
      {s.desktopImages.map((img, idx) => (
        <div
          key={idx}
          data-no-reveal
          role="img"
          aria-label={`${s.title} ${idx + 1}`}
          className="overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: `url(${img})`,
            opacity: 1,
            transform: "none",
            transition: "none",
            animation: "none",
          }}
        />
      ))}
    </div>
  ) : s.desktopImages ? (
    <div
      data-no-reveal
      className="grid h-full min-h-[760px] grid-cols-2 grid-rows-2 gap-0"
    >
      {s.desktopImages.map((img, idx) => (
        <div
          key={idx}
          data-no-reveal
          role="img"
          aria-label={`${s.title} ${idx + 1}`}
          className="overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: `url(${img})`,
            opacity: 1,
            transform: "none",
            transition: "none",
            animation: "none",
          }}
        />
      ))}
    </div>
  ) : (
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
  )}
</div>

        </div>
      </article>
    );
  })}
</section>
      
    </EditorialLayout>
  );
  };

export default Services;
