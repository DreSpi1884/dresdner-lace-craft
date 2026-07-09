import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";
import EditorialSection from "@/components/EditorialSection";
import HistoryTimeline from "@/components/HistoryTimeline";
import AboutAnchorNav from "@/components/AboutAnchorNav";
import SEO from "@/components/SEO";
import { useQuoteModal } from "@/components/QuoteModal";
import { useLang } from "@/i18n/LanguageContext";

const About = () => {
  const { open: openQuote } = useQuoteModal();
  const { t } = useLang();
  const [mobileOpenId, setMobileOpenId] = useState<string | null>(null);

  useEffect(() => {
  const hash = window.location.hash.replace("#");
  const validIds = ["history", "sustainability", "values"];

  if (validIds.includes(hash)) {
    setMobileOpenId(hash);

    window.setTimeout(() => {
      const element = document.getElementById(hash);
      if (!element) return;

      const top = element.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top, behavior: "smooth" });
      }, 100);
    }
  }, []);
  return (
    <EditorialLayout title={t("About Us", "Über uns")} heroCompact>
      <SEO
        title={t("About Us — 140 Years of German Textile Craft", "Über uns — 140 Jahre deutsche Textilkunst")}
        description={t(
          "Since 1882, Dresdner Spitzen has shaped textile manufacturing in Germany with tradition, innovation and sustainable production.",
          "Seit 1882 prägt Dresdner Spitzen die Textilherstellung in Deutschland mit Tradition, Innovation und nachhaltiger Produktion."
        )}
        path="/about"
      />
      <AboutAnchorNav />
      <div id="history" className="scroll-mt-32">
        <HistoryTimeline />
      </div>

      <section id="sustainability" className="-section scroll-mt-32">
        <div className="-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <h2 className="-heading-lg text-foreground mb-4">
                {t("Sustainability", "Nachhaltigkeit")}
              </h2>
              <p className="-label text-primary mb-8">
                {t("", "")}
              </p>
            </div>
            <div className="space-y-8 text-lg md:text-xl leading-[2] text-muted-foreground">
              <p>
                {t(
                  "Our production is supported by an energy management system and certified according to internationally recognised standards, including OEKO-TEX® Standard 100, OEKO-TEX® STeP Level 3 and the Global Recycled Standard (GRS). These certifications reflect our commitment to responsible textile manufacturing, transparent supply chains and sustainable production processes. We generate part of our electricity through our own solar power systems on our production site in Dresden.",
                  "Unsere Produktion wird durch ein Energiemanagementsystem unterstützt und ist nach international anerkannten Standards zertifiziert, darunter OEKO-TEX® Standard 100, OEKO-TEX® STeP Level 3 sowie Global Recycled Standard (GRS). Diese Zertifizierungen stehen für unser Engagement für verantwortungsvolle Textilherstellung, transparente Lieferketten und nachhaltige Produktionsprozesse. Einen Teil unseres Stroms erzeugen wir durch eigene Solaranlagen auf unserem Produktionsgelände in Dresden."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <EditorialSection id="values" className="bg-card scroll-mt-32">
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
