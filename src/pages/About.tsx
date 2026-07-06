import { ArrowRight } from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";
import EditorialSection from "@/components/EditorialSection";
import HistoryTimeline from "@/components/HistoryTimeline";
import AboutAnchorNav from "@/components/AboutAnchorNav";
import SEO from "@/components/SEO";
import productionImage from "@/assets/production-detail.jpg";
import { useQuoteModal } from "@/components/QuoteModal";
import { useLang } from "@/i18n/LanguageContext";

const About = () => {
  const { open: openQuote } = useQuoteModal();
  const { t } = useLang();
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

      <section id="sustainability" className="editorial-section scroll-mt-32">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <h2 className="editorial-heading-lg text-foreground mb-4">
                {t("Sustainability", "Nachhaltigkeit")}
              </h2>
              <p className="editorial-label text-primary mb-8">
                {t("RESPONSIBLE PRODUCTION AT EVERY STAGE", "VERANTWORTUNGSVOLLE PRODUKTION AUF JEDER STUFE")}
              </p>
            </div>
            <div className="space-y-6 editorial-body text-muted-foreground">
              <p>
                {t(
                  "Our production is supported by an energy management system and certified according to internationally recognised standards, including OEKO-TEX® STANDARD 100, OEKO-TEX® STeP Level 3 and the Global Recycled Standard (GRS).",
                  "Unsere Produktion wird durch ein Energiemanagementsystem unterstützt und ist nach international anerkannten Standards zertifiziert, darunter OEKO-TEX® STANDARD 100, OEKO-TEX® STeP Level 3 sowie Global Recycled Standard (GRS)."
                )}
              </p>
              <p>
                {t(
                  "These certifications reflect our commitment to responsible textile manufacturing, transparent supply chains and sustainable production processes.",
                  "Diese Zertifizierungen stehen für unser Engagement für verantwortungsvolle Textilherstellung, transparente Lieferketten und nachhaltige Produktionsprozesse."
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
              { title: t("Quality", "Qualität"), desc: t("Certified textile production with strict quality standards.", "Zertifizierte Textilproduktion mit strengen Qualitätsstandards.") },
              { title: t("Precision", "Präzision"), desc: t("Meticulous attention to detail in every product.", "Höchste Sorgfalt im Detail bei jedem Produkt.") },
              { title: t("Flexibility", "Flexibilität"), desc: t("Tailored solutions for every project.", "Maßgeschneiderte Lösungen für jedes Projekt.") },
              { title: t("Reliability", "Zuverlässigkeit"), desc: t("A trusted partner from development to delivery.", "Ein verlässlicher Partner von der Entwicklung bis zur Lieferung.") },
            ].map((item) =>
              <div key={item.title} className="border-t border-border pt-6">
                <h3 className="editorial-heading-sm text-foreground mb-3">{item.title}</h3>
                <p className="editorial-body-sm text-muted-foreground">{item.desc}</p>
              </div>
            )}
          </div>
        </div>
      </EditorialSection>

      <section id="production" className="editorial-section scroll-mt-32">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="editorial-label text-primary mb-4">{t("Production", "Produktion")}</p>
              <h2 className="editorial-heading-lg text-foreground mb-6">
                {t("Modern Machinery, Timeless Standards", "Moderne Technik, zeitlose Standards")}
              </h2>
              <div className="editorial-body text-muted-foreground mb-8 space-y-4">
                <p>
                  {t(
                    "Our production combines advanced Karl Mayer warp knitting technology with more than 140 years of textile expertise.",
                    "Unsere Produktion vereint moderne Karl-Mayer-Kettenwirktechnik mit über 140 Jahren textiler Erfahrung."
                  )}
                </p>
                <p>
                  {t(
                    "We manufacture premium lace, warp-knitted fabrics, elastic textiles and technical fabrics using modern Raschel, Jacquardtronic® and Textronic® machines.",
                    "Wir fertigen Premium-Spitzen, Kettengewirke, elastische Textilien und technische Gewebe auf modernen Raschel-, Jacquardtronic®- und Textronic®-Maschinen."
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={openQuote}
                className="inline-flex items-center gap-2 cta-lace bg-foreground text-background px-8 py-4 editorial-body-sm font-medium hover:bg-charcoal-light transition-colors duration-300">
                {t("Request a Quote", "Angebot anfragen")} <ArrowRight size={16} />
              </button>
            </div>
            <img
              src={productionImage}
              alt="Lace production machinery at Dresdner Spitzen facility"
              className="w-full h-[400px] object-cover" />
          </div>
        </div>
      </section>
    </EditorialLayout>);
};

export default About;
