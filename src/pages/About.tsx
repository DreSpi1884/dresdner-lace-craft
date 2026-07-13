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
import grsLogo from "@/assets/GRS_freigestellt.jpg?url";
import oekoTexLogo from "@/assets/oeko-tex.png?url";

const SustainabilityLogos = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-row items-center gap-3 md:gap-5 ${className}`}>
    <img
      src={grsLogo}
      alt="Global Recycled Standard certified by Control Union"
      className="w-[118px] md:w-[190px] lg:w-[220px] bg-white object-contain"
    />
    <img
      src={oekoTexLogo}
      alt="OEKO-TEX STeP certification"
      className="w-[138px] md:w-[230px] lg:w-[260px] bg-white object-contain"
    />
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
  <div className="space-y-8 text-lg md:text-xl leading-[2] text-muted-foreground">
    <p>
      {t(
        "Our production is supported by an energy management system and certified according to internationally recognised standards, including OEKO-TEX® Standard 100, OEKO-TEX® STeP Level 3 and the Global Recycled Standard (GRS).",
        "Unsere Produktion wird durch ein Energiemanagementsystem unterstützt und ist nach international anerkannten Standards zertifiziert, darunter OEKO-TEX® Standard 100, OEKO-TEX® STeP Level 3 sowie Global Recycled Standard (GRS)."
      )}
    </p>

    <SustainabilityLogos className="my-8" />

    <p>
      {t(
        "These certifications reflect our commitment to responsible textile manufacturing, transparent supply chains and sustainable production processes.",
        "Diese Zertifizierungen stehen für unser Engagement für verantwortungsvolle Textilherstellung, transparente Lieferketten und nachhaltige Produktionsprozesse."
      )}
    </p>

    <p>
      {t(
        "We generate part of our electricity through our own solar power systems on our production site in Dresden.",
        "Einen Teil unseres Stroms erzeugen wir durch eigene Solaranlagen auf unserem Produktionsgelände in Dresden."
      )}
    </p>
  </div>
)}

            {section.id === "values" && (
              <div className="grid grid-cols-1 gap-10">
                {[
                  {
                    title: t("Tradition", "Tradition"),
                    desc: t("More than 140 years of textile craftsmanship.", "Über 140 Jahre textiles Handwerk."),
                  },
                  {
                    title: t("Innovation", "Innovation"),
                    desc: t("Driven by new ideas and modern manufacturing.", "Angetrieben von neuen Ideen und moderner Fertigung."),
                  },
                  {
                    title: t("Quality", "Qualität"),
                    desc: t("Strict quality standards throughout the entire production.", "Strenge Qualitätsstandards entlang der gesamten Produktion."),
                  },
                  {
                    title: t("Precision", "Präzision"),
                    desc: t("Meticulous attention to detail in every product.", "Höchste Sorgfalt im Detail bei jedem Produkt."),
                  },
                  {
                    title: t("Flexibility", "Flexibilität"),
                    desc: t("Tailored solutions for every project.", "Maßgeschneiderte Lösungen für jedes Projekt."),
                  },
                  {
                    title: t("Reliability", "Zuverlässigkeit"),
                    desc: t("A trusted partner from development to delivery.", "Ein verlässlicher Partner von der Entwicklung bis zur Lieferung."),
                  },
                ].map((item) => (
                  <div key={item.title} className="border-t border-border pt-6">
                    <h3 className="editorial-heading-sm text-foreground mb-4">
                      {item.title}
                    </h3>
                    <p className="text-base md:text-lg leading-[1.9] text-muted-foreground">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
  <h2 className="editorial-heading-lg text-foreground mb-8">
    {t("Sustainability", "Nachhaltigkeit")}
  </h2>

  <SustainabilityLogos />
</div>

            <div className="space-y-8 text-lg md:text-xl leading-[2] text-muted-foreground">
              <p className="whitespace-pre-line">
                {t(
                  "Our production is supported by an energy management system and certified according to internationally recognised standards, including OEKO-TEX® Standard 100, OEKO-TEX® STeP Level 3 and the Global Recycled Standard (GRS).\u00a0\n\nThese certifications reflect our commitment to responsible textile manufacturing, transparent supply chains and sustainable production processes.\u00a0\n\nWe generate part of our electricity through our own solar power systems on our production site in Dresden.",
                  "Unsere Produktion wird durch ein Energiemanagementsystem unterstützt und ist nach international anerkannten Standards zertifiziert, darunter OEKO-TEX® Standard 100, OEKO-TEX® STeP Level 3 sowie Global Recycled Standard (GRS).\u00a0\n\nDiese Zertifizierungen stehen für unser Engagement für verantwortungsvolle Textilherstellung, transparente Lieferketten und nachhaltige Produktionsprozesse.\u00a0\n\nEinen Teil unseres Stroms erzeugen wir durch eigene Solaranlagen auf unserem Produktionsgelände in Dresden."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <EditorialSection id="values" className="hidden lg:block bg-card scroll-mt-32">
        <div className="editorial-container editorial-section">
          <h2 className="editorial-heading-lg text-foreground mb-4 text-center">
            {t("Our Values", "Unsere Werte")}
          </h2>
          <p className="editorial-label text-primary mb-16 text-center">
            {t("WHAT DRIVES US EVERYDAY", "WAS UNS TÄGLICH ANTREIBT")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { title: t("Tradition", "Tradition"), desc: t("More than 140 years of textile craftsmanship.", "Über 140 Jahre textiles Handwerk.") },
              { title: t("Innovation", "Innovation"), desc: t("Driven by new ideas and modern manufacturing.", "Angetrieben von neuen Ideen und moderner Fertigung.") },
              { title: t("Quality", "Qualität"), desc: t("Strict quality standards throughout the entire production.", "Strenge Qualitätsstandards entlang der gesamten Produktion.") },
              { title: t("Precision", "Präzision"), desc: t("Meticulous attention to detail in every product.", "Höchste Sorgfalt im Detail bei jedem Produkt.") },
              { title: t("Flexibility", "Flexibilität"), desc: t("Tailored solutions for every project.", "Maßgeschneiderte Lösungen für jedes Projekt.") },
              { title: t("Reliability", "Zuverlässigkeit"), desc: t("A trusted partner from development to delivery.", "Ein verlässlicher Partner von der Entwicklung bis zur Lieferung.") },
            ].map((item) =>
              <div key={item.title} className="border-t border-border pt-6">
                <h3 className="editorial-heading-sm text-foreground mb-4">{item.title}</h3>
                <p className="text-base md:text-lg leading-[1.9] text-muted-foreground">{item.desc}</p>
              </div>
            )}
          </div>
        </div>
      </EditorialSection>

     
    </EditorialLayout>);
};

export default About;
