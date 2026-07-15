import { useLayoutEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";
import EditorialSection from "@/components/EditorialSection";
import HistoryTimeline from "@/components/HistoryTimeline";
import AboutAnchorNav from "@/components/AboutAnchorNav";
import SEO from "@/components/SEO";
import { useLang } from "@/i18n/LanguageContext";
import grsLogo from "@/assets/GRS_freigestellt.png?url";
import oekoTexLogo from "@/assets/oeko-tex.png?url";
import umweltallianzLogo from "@/assets/Umweltallianz Sachsen.png?url";
import solarRoofImg from "@/assets/solaranlage.jpg?url";


const SolarImageCard = ({
  mobileText,
  desktopText,
  alt,
}: {
  mobileText: string;
  desktopText: string;
  alt: string;
}) => (
  <figure className="group relative -mx-6 overflow-hidden bg-muted lg:mx-0">
    <img
      data-no-reveal
      src={solarRoofImg}
      alt={alt}
      className="block h-[220px] w-full object-cover sm:h-[250px] lg:h-[460px] xl:h-[520px]"
    />

    <figcaption className="absolute inset-0 flex items-end bg-foreground/45 px-6 py-6 opacity-100 transition-opacity duration-500 lg:items-end lg:px-8 lg:py-7 lg:opacity-0 lg:group-hover:opacity-100">
      <>
        <p className="mx-auto max-w-[28ch] text-left text-[15px] leading-[1.55] text-background drop-shadow-md lg:hidden">
          {mobileText}
        </p>

        <p className="hidden max-w-[54ch] xl:max-w-[75ch] 2xl:max-w-[90ch] text-left text-[17px] leading-[1.65] text-background drop-shadow-md lg:block">
          {desktopText}
        </p>
      </>
    </figcaption>
  </figure>
);

const SustainabilityLogos = ({
  className = "",
  excludeUmweltallianz = false,
}: {
  className?: string;
  excludeUmweltallianz?: boolean;
}) => (
  <div
    data-no-reveal
    className={`flex w-full flex-row flex-wrap items-center justify-center gap-4 md:flex-nowrap md:gap-5 ${className}`}
  >
    <img
      data-no-reveal
      src={grsLogo}
      alt="Global Recycled Standard certified by Control Union"
      className="w-[104px] shrink-0 bg-white object-contain md:w-[140px] lg:w-[145px] xl:w-[165px]"
    />

    <img
      data-no-reveal
      src={oekoTexLogo}
      alt="OEKO-TEX STeP certification"
      className="w-[124px] shrink-0 bg-white object-contain md:w-[165px] lg:w-[170px] xl:w-[195px]"
    />

    {!excludeUmweltallianz && (
      <img
        data-no-reveal
        src={umweltallianzLogo}
        alt="Umwelt- und Klimaallianz Sachsen"
        className="w-[70px] shrink-0 object-contain md:w-[90px] lg:w-[86px] xl:w-[100px]"
      />
    )}
  </div>
);

const About = () => {
  const { t } = useLang();
  const location = useLocation();
  const [mobileOpenId, setMobileOpenId] = useState<string | null>(null);
const scrollMobileSectionToTop = (id: string) => {
  const element = document.getElementById(`mobile-${id}`);
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

useLayoutEffect(() => {
  const hash = location.hash.replace("#", "");
  const validIds = ["history", "sustainability", "values"];

  if (!validIds.includes(hash)) return;

  setMobileOpenId(hash);
}, [location.hash]);
  
  return (
    <EditorialLayout title={t("About Us", "Über uns")} heroCompact>
      <SEO
        title={t("About Us — 140 Years of German Textile Craft", "Über uns — 140 Jahre deutsche Textilkunst")}
        description={t(
          "Since 1884, Dresdner Spitzen has shaped textile manufacturing in Germany with tradition, innovation and sustainable production.",
          "Seit 1884 prägt Dresdner Spitzen die Textilherstellung in Deutschland mit Tradition, Innovation und nachhaltiger Produktion."
        )}
        path="/about"
      />
      <AboutAnchorNav />
    
{/* Mobile accordion */}
<section className="lg:hidden border-t border-primary/10">
  {[
    { id: "history", label: t("History", "Geschichte") },
    { id: "sustainability", label: t("Sustainability", "Nachhaltigkeit") },
    { id: "values", label: t("Values", "Werte") },
  ].map((section) => {
    const isOpen = mobileOpenId === section.id;

    return (
      <article
        key={section.id}
        id={`mobile-${section.id}`}
        className="border-b border-primary/10 scroll-mt-36"
      >
        <button
          type="button"
          onClick={() => openMobileSection(section.id)}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between px-6 py-6 text-left"
        >
          <span className="editorial-label tracking-[0.22em] text-primary">
            {section.label}
          </span>

          <ChevronDown
            className={`ml-4 h-5 w-5 shrink-0 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="px-6 pt-2 pb-10">
            {section.id === "history" && <HistoryTimeline />}

           {section.id === "sustainability" && (
  <div className="space-y-8 text-left text-[17px] leading-[1.9] text-muted-foreground">
    <p>
      {t(
        "Our production is supported by an energy management system and certified according to internationally recognised standards, including OEKO-TEX® Standard 100, OEKO-TEX® STeP Level 3 and the Global Recycled Standard (GRS).",
        "Unsere Produktion wird durch ein Energiemanagementsystem unterstützt und ist nach international anerkannten Standards zertifiziert, darunter OEKO-TEX® Standard 100, OEKO-TEX® STeP Level 3 sowie Global Recycled Standard (GRS)."
      )}
    </p>

    <SustainabilityLogos 
      className="my-8 justify-center" 
    />

    <p>
      {t(
        "These certifications reflect our commitment to responsible textile manufacturing, transparent supply chains and sustainable production processes.",
        "Diese Zertifizierungen stehen für unser Engagement für verantwortungsvolle Textilherstellung, transparente Lieferketten und nachhaltige Produktionsprozesse."
      )}
    </p>

    <SolarImageCard
      mobileText={t(
        "Solar power from our production site.",
        "Solarstrom von unserem Produktionsstandort."
      )}
      desktopText={t(
        "We generate part of our electricity through solar power systems on our production site in Dresden.",
        "Einen Teil unseres Stroms erzeugen wir durch Solaranlagen auf unserem Produktionsgelände in Dresden."
      )}
      alt={t(
        "Solar panels on the roof of the Dresden production site",
        "Solaranlagen auf dem Dach des Produktionsstandorts in Dresden"
      )}
    />

    <p>
      {t(
        "For our commitment to the environment, climate and energy efficiency, we were honored by the Umweltallianz Sachsen.",
        "Für unser Engagement für Umwelt, Klima und Energieeffizienz wurden wir durch die Umweltallianz Sachsen ausgezeichnet."
      )}
    </p>
  </div>
)}

           {section.id === "values" && (
  <div className="divide-y divide-primary/15">
    {[
      {
        title: t("Tradition & Innovation", "Tradition & Innovation"),
        desc: t(
          "We combine over 140 years of textile experience with new ideas and modern manufacturing.",
          "Wir verbinden über 140 Jahre textile Erfahrung mit neuen Ideen und moderner Fertigung."
        ),
      },
      {
        title: t("Quality & Precision", "Qualität & Präzision"),
        desc: t(
          "We work with high standards, careful control and attention to detail.",
          "Wir arbeiten mit hohen Standards, sorgfältiger Kontrolle und Liebe zum Detail."
        ),
      },
      {
        title: t("Flexibility & Reliability", "Flexibilität & Zuverlässigkeit"),
        desc: t(
          "We develop tailored solutions and reliably support projects through to delivery.",
          "Wir entwickeln individuelle Lösungen und begleiten Projekte verlässlich bis zur Lieferung."
        ),
      },
    ].map((item) => (
      <div key={item.title} className="py-7 first:pt-0 last:pb-0">
        <h3
          className="text-primary"
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "12px",
            letterSpacing: "1.8px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {item.title}
        </h3>

        <p className="mt-4 text-[16px] leading-[1.8] text-muted-foreground">
          {item.desc}
        </p>
      </div>
    ))}
  </div>
)}
          </div>
        )}
      </article>
    );
  })}
</section>

      <div id="history" className="hidden lg:block scroll-mt-32">
        <HistoryTimeline />
      </div>

      <section id="sustainability" className="hidden lg:block editorial-section scroll-mt-32">
  <div className="editorial-container">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
      {/* Left column: headline + solar image */}
      <div>
        <h2 className="editorial-heading-lg text-foreground mb-0">
          {t("Sustainability", "Nachhaltigkeit")}
        </h2>

        <div className="mt-10 xl:mt-12">
          <SolarImageCard
            mobileText={t(
              "Solar power generated directly on our production site.",
              "Solarstrom direkt vom eigenen Produktionsstandort."
            )}
            desktopText={t(
              "We generate part of our electricity through our own solar power systems on our production site in Dresden.",
              "Einen Teil unseres Stroms erzeugen wir durch eigene Solaranlagen auf unserem Produktionsgelände in Dresden."
            )}
            alt={t(
              "Solar panels on the roof of the Dresden production site",
              "Solaranlagen auf dem Dach des Produktionsstandorts in Dresden"
            )}
          />
        </div>
      </div>

      {/* Right column: text + logos */}
      {/* Right column: text + logos */}
      <div className="text-left text-lg leading-[1.85] text-muted-foreground lg:pt-32 xl:pt-36">
        <p>
          {t(
            "Our production is supported by an energy management system and certified according to internationally recognised standards, including OEKO-TEX® Standard 100, OEKO-TEX® STeP Level 3 and the Global Recycled Standard (GRS).",
            "Unsere Produktion wird durch ein Energiemanagementsystem unterstützt und ist nach international anerkannten Standards zertifiziert, darunter OEKO-TEX® Standard 100, OEKO-TEX® STeP Level 3 sowie Global Recycled Standard (GRS)."
          )}
        </p>

        <SustainabilityLogos
          className="mt-8 mb-6 md:justify-center"
        />

        <p>
          {t(
            "These certifications reflect our commitment to responsible textile manufacturing, transparent supply chains and sustainable production processes.",
            "Diese Zertifizierungen stehen für unser Engagement für verantwortungsvolle Textilherstellung, transparente Lieferketten und nachhaltige Produktionsprozesse."
          )}
        </p>


        <p>
          {t(
            "For our commitment to the environment, climate and energy efficiency, we were honored by the Umweltallianz Sachsen.",
            "Für unser Engagement für Umwelt, Klima und Energieeffizienz wurden wir durch die Umweltallianz Sachsen ausgezeichnet."
          )}
        </p>
      </div>
    </div>
  </div>
</section>

    <EditorialSection id="values" className="hidden lg:block bg-card scroll-mt-32">
    <div className="editorial-container py-24 xl:py-32">
    <div className="w-full text-center">
      <h2 className="editorial-heading-lg text-foreground mb-4">
        {t("Our Values", "Unsere Werte")}
      </h2>

      <p className="editorial-label text-primary mb-20">
        {t("WHAT DRIVES US EVERYDAY", "WAS UNS TÄGLICH ANTREIBT")}
      </p>

      <div className="divide-y divide-primary/15">
        {[
          {
            title: t("Tradition & Innovation", "Tradition & Innovation"),
            desc: t(
              "We combine over 140 years of textile experience with new ideas and modern manufacturing.",
              "Wir verbinden über 140 Jahre textile Erfahrung mit neuen Ideen und moderner Fertigung."
            ),
          },
          {
            title: t("Quality & Precision", "Qualität & Präzision"),
            desc: t(
              "We work with high standards, careful control and attention to detail.",
              "Wir arbeiten mit hohen Standards, sorgfältiger Kontrolle und Liebe zum Detail."
            ),
          },
          {
            title: t("Flexibility & Reliability", "Flexibilität & Zuverlässigkeit"),
            desc: t(
              "We develop tailored solutions and reliably support projects through to delivery.",
              "Wir entwickeln individuelle Lösungen und begleiten Projekte verlässlich bis zur Lieferung."
            ),
          },
        ].map((item) => (
          <div key={item.title} className="py-12 first:pt-0 last:pb-0">
            <h3
              className="text-primary"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "clamp(20px, 2vw, 28px)",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontWeight: 600,
                lineHeight: 1.3,
              }}
            >
              {item.title}
            </h3>

            <p className="mt-6 w-full text-lg leading-[1.9] text-muted-foreground">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</EditorialSection>

     
    </EditorialLayout>);
};

export default About;
