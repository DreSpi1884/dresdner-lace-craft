import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";
import SEO from "@/components/SEO";
import EditorialSection from "@/components/EditorialSection";
import heroVideo from "@/assets/hero-video.mp4.asset.json";

import serviceCollections from "@/assets/service-collections.jpg.asset.json";
import serviceBespoke from "@/assets/service-bespoke.jpg.asset.json";
import serviceLaceCollections from "@/assets/seasonal-lace-collections.jpg.asset.json";
import serviceFunctional from "@/assets/functional-medical-fabric.jpg.asset.json";
import serviceDyeing from "@/assets/dyeing-finishing.jpg.asset.json";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import heritageThen from "@/assets/heritage-then.png.asset.json";
import heritageNow from "@/assets/heritage-now.jpg.asset.json";
import { useLang } from "@/i18n/LanguageContext";

const Index = () => {
  const { t } = useLang();
  return (
    <EditorialLayout heroAtTop>
      <SEO
        title={t(
          "Premium Lace & Textile Manufacturer since 1882",
          "Premium Spitzen- & Textilhersteller seit 1882"
        )}
        description={t(
          "Dresdner Spitzen designs and manufactures premium lace, warp-knitted fabrics and functional textiles in Germany. Bespoke collections since 1882.",
          "Dresdner Spitzen entwickelt und fertigt Premium-Spitzen, Kettengewirke und funktionale Textilien in Deutschland. Maßgeschneiderte Kollektionen seit 1882."
        )}
        path="/"
      />
      {/* HERO */}
      <section data-no-reveal className="relative overflow-hidden min-h-screen flex items-center justify-center">
        <video
          src={heroVideo.url}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/30" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-[clamp(1rem,4vw,4rem)] py-[clamp(2rem,5vh,5rem)] w-full">
          <div className="mx-auto mb-[clamp(0.75rem,2vh,1.5rem)] aspect-[2/3]" style={{ width: "clamp(96px, 12.5vw, 240px)" }} aria-hidden="true" />
          <h1 className="font-serif text-background leading-[1.1] tracking-[-0.01em] pb-2 [text-wrap:balance]" style={{ fontSize: "clamp(28px, 4vw, 64px)" }}>
            {t("The Art of Textiles", "The Art of Textiles")}
          </h1>
          <p className="editorial-label text-background/90 tracking-[0.3em] mt-[clamp(0.5rem,1.5vh,1rem)]" style={{ fontSize: "clamp(11px, 1.3vw, 18px)" }}>
            MADE IN GERMANY
          </p>
        </div>
      </section>

      {/* KEYWORDS BANNER */}
      <section className="w-full bg-background border-b border-border py-5 md:py-6">
        <div className="editorial-container">
          <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x divide-primary/30">
            {[
              t("IN-HOUSE PRODUCTION", "INTEGRIERTE PRODUKTION"),
              t("TAILORED DESIGNS", "MASSGESCHNEIDERTE DESIGNS"),
              t("CERTIFIED SUSTAINABLE PRODUCTION", "ZERTIFIZIERTE NACHHALTIGKEIT"),
              t("JUST-IN-TIME DELIVERY", "JUST-IN-TIME-LIEFERUNG"),
            ].map((text) => (
              <div key={text} className="flex items-center justify-center px-3 md:px-6 py-2 md:py-0 min-h-[3rem]">
                <span className="editorial-label text-primary text-center leading-tight" style={{ fontSize: "clamp(9px, 1vw, 13px)" }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR SERVICES */}
      <EditorialSection className="bg-background text-foreground">
        <div className="py-10 md:py-14 lg:py-[4.5rem]">
          <div className="editorial-container text-center mb-8 md:mb-10">
            <h2 className="editorial-heading-lg text-foreground mb-4">
              {t("Our Services", "Unsere Leistungen")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 w-full">
            {[
              {
                title: t("Seasonal Lace Collections", "Saisonale Spitzenkollektionen"),
                desc: t(
                  "Every collection starts with new ideas.\n\nTwice a year, we develop designs that combine international fashion trends with our lace expertise.",
                  "Jede Kollektion beginnt mit neuen Ideen.\n\nZweimal im Jahr entwickeln wir Designs, die internationale Modetrends mit unserer Spitzenkompetenz verbinden."
                ),
                image: serviceLaceCollections.url,
                anchor: "collections",
              },
              {
                title: t("Bespoke Designs", "Maßgeschneiderte Designs"),
                desc: t(
                  "Have a specific idea? We'll translate it into fabric, quickly and flexibly.",
                  "Sie haben eine konkrete Idee? Wir setzen sie schnell und flexibel in Textil um."
                ),
                image: serviceCollections.url,
                anchor: "custom-designs",
              },
              {
                title: t("Dyeing and Finishing", "Färben & Ausrüsten"),
                desc: t(
                  "Our in-house dyeing facility covers the full colour spectrum in uni or bicolour.",
                  "Unsere hauseigene Färberei deckt das gesamte Farbspektrum in Uni oder Bicolor ab."
                ),
                image: serviceDyeing.url,
                anchor: "dyeing-finishing",
              },
              {
                title: t("Functional and Medical Textiles", "Funktions- und Medizintextilien"),
                desc: t(
                  "We develop warp-knitted fabrics for medical and technical use.",
                  "Wir entwickeln Kettengewirke für medizinische und technische Anwendungen.\n"
                ),
                image: serviceFunctional.url,
                anchor: "functional-treatments",
              },
            ].map((item) => (
              <Link
                key={item.title}
                to={`/services#${item.anchor}`}
                className="group relative overflow-hidden aspect-[3/4] cursor-pointer block"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 z-10">
                  <h3 className="editorial-heading-sm text-background">{item.title}</h3>
                </div>
                <div className="absolute inset-0 bg-foreground/85 flex items-center p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
                  <div>
                    <h3 className="editorial-heading-sm text-background mb-3">{item.title}</h3>
                    <p className="editorial-body-sm text-background/80 whitespace-pre-line">{item.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="editorial-container text-center mt-8">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 cta-lace editorial-body-sm font-medium transition-colors duration-300">
              {t("Learn More", "Mehr erfahren")} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </EditorialSection>

      {/* HERITAGE + INNOVATION */}
      <section className="py-16 md:py-20">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="w-full mx-auto lg:max-w-none">
              <BeforeAfterSlider
                beforeImage={heritageThen.url}
                afterImage={heritageNow.url}
                beforeAlt="Historic Dresdner Spitzen weaving hall"
                afterAlt="Modern Dresdner Spitzen production facility"
              />
            </div>

            <div>
              <p className="editorial-label text-primary mb-4">{t("140 YEARS OF EXPERIENCE", "1884 GEGRÜNDET")}</p>
              <h2 className="editorial-heading-lg text-foreground mb-6">
                {t("Our Story", "Unsere Geschichte")}
              </h2>
              <div className="space-y-4 editorial-body text-muted-foreground">
                <p>
                  {t(
                    "Every piece of fabric tells a story. Ours began in 1884 and continues today through new ideas, skilled craftsmanship and a passion for textile innovation.",
                    "Mehr als 140 Jahre Geschichte erzählen von Wandel und Innovationsgeist. Geblieben ist unsere Leidenschaft und unser Anspruch an hochwertige Textilien."
                  )}
                </p>
                <p>
                  {t(
                    "\n",
                    "\n"
                  )}
                </p>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary editorial-body-sm font-medium mt-8 hover:gap-3 transition-all duration-300">
                {t("Read more", "von 1884 bis heute")} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* JOBS PREVIEW */}
      <EditorialSection className="bg-card">
        <div className="editorial-container editorial-section text-center">
          <p className="editorial-label text-primary mb-4">{t("Careers", "Karriere")}</p>
          <h2 className="editorial-heading-lg text-foreground mb-6">
            {t("Join our team in Dresden", "Werden Sie Teil unseres Teams in Dresden")}
          </h2>
          <p className="editorial-body text-muted-foreground max-w-xl mx-auto mb-10">
            {t(
              "We are always looking for skilled and passionate people to join our team. Discover current opportunities and become part of our story.",
              "Wir suchen stets qualifizierte und engagierte Menschen für unser Team. Entdecken Sie aktuelle Stellen und werden Sie Teil unserer Geschichte."
            )}
          </p>
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 cta-lace border border-border text-foreground px-8 py-4 editorial-body-sm font-medium hover:bg-secondary transition-colors duration-300">
            {t("View Open Positions", "Offene Stellen ansehen")} <ArrowRight size={16} />
          </Link>
        </div>
      </EditorialSection>
    </EditorialLayout>);

};

export default Index;
