import { useLayoutEffect, useMemo, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { useLocation, Link } from "react-router-dom";
import { ChevronDown, Info } from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";
import SEO from "@/components/SEO";
import { useQuoteModal } from "@/components/QuoteModal";
import { useLang } from "@/i18n/LanguageContext";
import ProductionAnchorNav from "@/components/ProductionAnchorNav";
import { getAnchorScrollOffset } from "@/lib/scrollNav";

import designImg1 from "@/assets/design-1.jpg?url";
import designImg2 from "@/assets/design-4.jpg?url";
import designImg3 from "@/assets/design-3.jpg?url";
import designImg4 from "@/assets/design-2.jpg?url";
import dyeingImg1 from "@/assets/faerberei.png?url";
import dyeingImg2 from "@/assets/dyeing-1.jpg?url";
import dyeingImg3 from "@/assets/farbkarte-gruen.png?url";
import dyeingImg4 from "@/assets/farbkarte-blau.jpg?url";
import rawMaterialImg1 from "@/assets/maschine-roh-2.png?url";
import rawMaterialImg2 from "@/assets/maschine-roh-1.png?url";
import functionalImg1 from "@/assets/wirkstoff-1.jpg?url";
import functionalImg2 from "@/assets/funktion-1.jpg?url";
import functionalImg3 from "@/assets/funktion-2.png?url";
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
  className="inline border-b border-primary/40 pb-0.5 text-primary transition-colors hover:border-primary"
  style={{
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
    letterSpacing: "inherit",
    textTransform: "inherit",
    lineHeight: "inherit",
  }}
>
  {link}
</button>
      {parts[1]}
    </>
  );
};

// Inline link helper that turns a specific word in a paragraph into a router link.
const TextWithRouterLink = ({ text, link, to }: { text: string; link: string; to: string }): ReactNode => {
  const parts = text.split(link);
  if (parts.length !== 2) return <>{text}</>;
  return (
    <>
      {parts[0]}
      <Link
        to={to}
        className="inline underline underline-offset-4 text-primary hover:opacity-80 transition-opacity"
      >
        {link}
      </Link>
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

const ProductionImageTile = ({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) => (
  <div
    data-no-reveal
    className="relative h-full min-h-0 w-full overflow-hidden bg-muted"
    style={{
      opacity: 1,
      transform: "none",
      transition: "none",
      animation: "none",
    }}
  >
    <img
      data-no-reveal
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover"
      style={{
        opacity: 1,
        transform: "none",
        transition: "none",
        animation: "none",
      }}
    />
  </div>
);

// Fixed header height (h-20 mobile / h-24 desktop)

const Services = () => {
  const { t, lang } = useLang();
  const { open: openQuote } = useQuoteModal();
  const location = useLocation();
  

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
        desc: lang === "de" ? (
          <TextWithRouterLink
            text={"Ihre Bestellung wird nach zertifizierten\u00a0Standards produziert."}
            link="zertifizierten"
            to="/about#sustainability"
          />
        ) : (
          <TextWithRouterLink
            text="Your order is produced according to certified standards."
            link="certified"
            to="/about#sustainability"
          />
        ),
      },
      {
        step: "04",
        title: t("Delivery", "Lieferung"),
        desc: t("We deliver reliably and on schedule.", "Wir liefern zuverlässig nach Ihrem Zeitplan."),
      },
    ],
    [t, lang],
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
          "In our Dresden studio, seasonal lace collections are created, inspired by current trends.\n\n\n\nWe also create custom elastic or inelastic lace and warp-knitted fabrics tailored to your specific requirements.",
          "In unserem Dresdner Atelier entstehen saisonale Spitzenkollektionen, inspiriert von aktuellen Trends.\n\n\n\nNeben unseren saisonalen Kollektionen entwickeln wir auch elastische, unelastische Spitzen und Kettgewirke nach Ihren individuellen Anforderungen.",
        ),
      },
      {
        id: "raw-material-production",
        nav: t("Production", "Produktion"),
        title: t("Production", "Produktion"),
        desktopImages: [rawMaterialImg1, rawMaterialImg2],
        mobileImage: rawMaterialImg1,
        text: t(
          "Our entire production takes place under one roof in Dresden, Germany.\nOn Karl Mayer Raschel, Jacquardtronic® and Textronic® machines, we manufacture premium lace, elastic fabrics and technical textiles with over 140 years of textile expertise.",
          "Unsere gesamte Produktion findet unter einem Dach in Dresden statt.\nAuf Karl Mayer Raschel-, Jacquardtronic®- und Textronic®-Maschinen fertigen wir hochwertige Spitzen, elastische Stoffe und technische Textilien mit über 140 Jahren Textilexpertise.\u00a0",
        ),
      },
      {
        id: "dyeing-finishing",
        nav: t("Dyeing & Finishing", "Färbung & Ausrüstung"),
        title: t("Dyeing & Finishing", "Färbung & Ausrüstung"),
        desktopImages: [dyeingImg1, dyeingImg2, dyeingImg3, dyeingImg4],
        mobileImage: dyeingImg2,
        text: t(
          "Our in-house dyeing facilities cover the full color spectrum, from delicate pastels to deep saturated shades, in solid and bicolor finishes.\nWith modern jet dyeing technology, we can save up to 70% water compared with high-liquor dyeing.\nContract dyeing and finishing services available on request.",
          "Unsere hauseigene Färberei deckt das gesamte Farbspektrum ab, von zarten Pastelltönen bis zu tiefen Sattfarben, in Uni- und Bicolor-Ausführung.\nMit moderner Jet-Technologie können wir beim Färben bis zu 70 % Wasser einsparen im Vergleich zur herkömmlichen Hochflottenfärbung.\nLohnfärberei und -ausrüstung auf Anfrage.",
        ),
      },
      {
        id: "functional-textiles",
        nav: t("Technical Textiles", "Technische Textilien"),
        title: t("Technical Textiles", "Technische Textilien"),
        desktopImages: [functionalImg1, functionalImg2, functionalImg3, functionalImg4],
        mobileImage: functionalImg1,
        text: t(
        "We develop functional warp-knitted fabrics for technical and medical applications.\n\nOur textiles are used in compression garments and post-surgical products, delivering consistent quality, comfort and reliable performance.",
        "Wir entwickeln funktionale Kettgewirke für technische und medizinische Anwendungen.\n\nUnsere Textilien werden beispielsweise in Kompressionsbekleidung und postoperativen Produkten eingesetzt und stehen für hohe Qualität, Tragekomfort und Langlebigkeit.",
      ),
    },
    ],
    [t, processSteps],
  );

const [mobileOpenId, setMobileOpenId] = useState<string | null>(null);

useLayoutEffect(() => {
  const hash = location.hash.replace("#", "");
  const exists = services.some((service) => service.id === hash);

  flushSync(() => {
    setMobileOpenId(exists ? hash : null);
  });

  if (exists && typeof window !== "undefined" && window.innerWidth < 1024) {
    // Layout is now flushed (previous accordion closed, target opened).
    // Scroll once, before paint, so the image sits crisp under the header
    // with no visible jump.
    scrollMobileSectionToTop(hash);
  }
}, [location.hash, location.key, services]);

const scrollMobileSectionToTop = (id: string) => {
  const element = document.getElementById(id);
  if (!element) return;
  const offset = getAnchorScrollOffset(id);
  const top = element.getBoundingClientRect().top + window.scrollY - offset;

  const html = document.documentElement;
  const body = document.body;
  const prevHtml = html.style.scrollBehavior;
  const prevBody = body.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  body.style.scrollBehavior = "auto";
  window.scrollTo({ top: Math.max(top, 0), left: 0, behavior: "auto" });
  window.requestAnimationFrame(() => {
    html.style.scrollBehavior = prevHtml;
    body.style.scrollBehavior = prevBody;
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

  // Zwei Frames warten, bis das Layout final steht (z.B. wenn eine andere
  // Section gleichzeitig zuklappt), dann NUR EINMAL scrollen - kein
  // sichtbares Nachkorrigieren.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      scrollMobileSectionToTop(id);
    });
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
                {t("Custom Designs", "INDIVIDUELL ENTWICKELTE DESIGNS")}
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

              <div className="pb-6 mb-6 border-b border-primary/15 max-w-none mt-8">
                <div className="space-y-5">
                  {processSteps.map((item) => (
                    <div
                      key={item.step}
                      className="group grid grid-cols-[34px_1fr] gap-x-5"
                    >
                      <span
                        className="italic opacity-45 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                          fontFamily: "'Bodoni Moda', serif",
                          fontSize: "18px",
                          lineHeight: 1.2,
                          color: "hsl(var(--primary))",
                        }}
                      >
                        {item.step}
                      </span>
              
                      <div>
                        <h3
                          className="mb-1.5"
                          style={{
                            fontFamily: "'Jost', sans-serif",
                            fontSize: "14px",
                            letterSpacing: "1.2px",
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
                            fontSize: "14px",
                            lineHeight: 1.65,
                            color: "hsl(var(--muted-foreground) / 0.9)",
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          );
        })()}

        <p className="mt-8 text-[13px] font-medium uppercase tracking-[0.16em] text-primary">
  <TextWithLink
    text={t(
      "Samples are available on request.",
      "Muster sind auf Anfrage erhältlich."
    )}
    link={lang === "de" ? "Anfrage" : "request"}
    onClick={openQuote}
  />
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

    <div className="mt-10 border-t border-primary/15 pt-7">
      <p
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "clamp(15px, 1vw, 18px)",
          lineHeight: 1.75,
          color: "hsl(var(--muted-foreground))",
        }}
      >
        {t(
          "We also finish textiles according to their intended use:",
          "Wir veredeln Textilien nach Einsatzzweck:"
        )}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2.5">
        {[
          t("Hydrophilic", "Hydrophil"),
          t("Hydrophobic", "Hydrophob"),
          t("Antistatic", "Antistatisch"),
          t("Flame retardant", "Flammhemmend"),
          t("Soft finish", "Weichausrüstung"),
          t("Stiff finish", "Steifausrüstung"),
        ].map((item) => (
          <li
            key={item}
            className="border border-primary/20 px-3.5 py-2 text-[12px] uppercase leading-none tracking-[0.12em] text-primary"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>

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
       ) : s.id === "functional-textiles" ||
        s.id === "raw-material-production" ? (
      <>
        {s.text.split("\n").map((line, li) =>
          line ? (
            <p
              key={`${s.id}-${lang}-${li}`}
              className={li > 0 ? "mt-3" : ""}
            >
              {line}
            </p>
          ) : (
            <div
              key={`${s.id}-${lang}-${li}`}
              className="h-4"
            />
          )
        )}

        <div className="mt-10 border-t border-primary/15 pt-7">
          <p>
            {s.id === "raw-material-production"
              ? t(
                  "In our finishing department, the lace ribbons are separated and the fine scalloped edges are scalloped by hand. Afterwards, all our textiles are carefully checked for quality by us.",
                  "In unserer Endfertigung werden die Spitzenbänder getrennt und die feinen Bogenkanten von Hand gezäckelt. Danach werden all unsere Textilien sorgfältig von uns auf Qualität geprüft.",
                )
              : t(
                  "We would be pleased to develop the right textile for your requirements together with you.",
                  "Gerne entwickeln wir mit Ihnen das passende Textil für Ihre Anforderungen.",
                )}
          </p>

          <button
            type="button"
            onClick={openQuote}
            className="mt-6 inline-flex border-b border-primary/40 pb-1 text-[13px] font-medium uppercase tracking-[0.16em] text-primary transition-colors hover:border-primary"
          >
            {t("Enquire now", "Jetzt anfragen")}
          </button>
        </div>
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
          "Production, Dyeing and Textile Finishing",
          "Produktion, Färbung und Textilveredelung"
        )}
        description={t(
          "From lace design to production, dyeing, finishing and functional textiles, Dresdner Spitzen offers integrated textile manufacturing in Dresden.",
          "Von Spitzendesign über Produktion, Färbung und Ausrüstung bis zu funktionalen Textilien bietet Dresdner Spitzen integrierte Textilfertigung in Dresden."
        )}
        path="/services"
      />

<ProductionAnchorNav />

<section className="w-full pb-32 md:pb-48 lg:pb-64">
  {services.map((s, i) => {
    const isOpen = mobileOpenId === s.id;

    return (
      <article
      key={s.id}
      id={s.id}
      data-no-reveal
      className={`scroll-mt-36 ${
        i < services.length - 1 ? "border-b-2 border-primary/40" : ""
      }`}
      >


{/* Mobile accordion section */}
<div data-no-reveal className="lg:hidden px-6">
{s.mobileImage && (
  <div data-no-reveal className="-mx-6 aspect-[4/3] overflow-hidden bg-muted">
    <ProductionImageTile
      src={s.mobileImage}
      alt={s.title}
      priority={i < 2}
    />
  </div>
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
    {s.desktopImages ? (
      <div
        data-no-reveal
        className={
          s.id === "raw-material-production"
            ? "grid h-full min-h-[760px] grid-cols-1 grid-rows-2 gap-0"
            : "grid h-full min-h-[760px] grid-cols-2 grid-rows-2 gap-0"
        }
        style={{
          opacity: 1,
          transform: "none",
          transition: "none",
          animation: "none",
        }}
      >
        {s.desktopImages.map((img, idx) => (
          <ProductionImageTile
            key={`${s.id}-${idx}`}
            src={img}
            alt={`${s.title} ${idx + 1}`}
            priority={i < 2}
          />
        ))}
      </div>
    ) : (
      <div className="relative flex h-full min-h-[760px] w-full items-center justify-center overflow-hidden bg-muted">
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
