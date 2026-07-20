import { Link } from "react-router-dom";
import { ArrowRight, Factory, PenTool, BadgeCheck, Truck } from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";
import SEO from "@/components/SEO";
import EditorialSection from "@/components/EditorialSection";
import heroVideo from "@/assets/hero-video.mp4.asset.json";

import bespokeDesignsImage from "@/assets/bespoke-designs.png?url";
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
          "Lace and Textile Production Since 1884",
          "Spitze und Textilproduktion seit 1884"
        )}
        description={t(
          "Dresdner Spitzen develops and produces lace, warp-knitted fabrics, functional textiles, dyeing and finishing solutions in Dresden, Germany.",
          "Dresdner Spitzen entwickelt und produziert in Dresden Spitzen, Kettengewirke, funktionale Textilien sowie Färbe- und Ausrüstungslösungen."
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
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-[clamp(1rem,4vw,4rem)] pt-[24vh] py-[clamp(2rem,5vh,5rem)] w-full">
          <div
            className="mx-auto mb-[clamp(0.75rem,2vh,1.5rem)] aspect-[2/3]"
            style={{ width: "clamp(96px, 12.5vw, 240px)" }}
            aria-hidden="true"
          />
          <h1
            className="font-serif text-background leading-[1.1] tracking-[-0.01em] pb-2 [text-wrap:balance]"
            style={{ fontSize: "clamp(36px, 8vw, 64px)" }}
          >
            {t("The Art of Textiles", "The Art of Textiles")}
          </h1>
          <p
            className="editorial-label text-background/90 tracking-[0.3em] mt-[clamp(0.5rem,1.5vh,1rem)]"
            style={{ fontSize: "clamp(13px, 2vw, 18px)" }}
          >
            MADE IN GERMANY
          </p>
        </div>
      </section>

{/* KEYWORDS BANNER */}
<section className="w-full border-b border-primary/10 bg-[hsl(var(--primary)/0.035)] py-0">
  <div className="w-full">
    <div className="grid w-full grid-cols-2 md:grid-cols-4">
      {[
        {
          text: t("IN-HOUSE PRODUCTION", "INTEGRIERTE PRODUKTION"),
          icon: Factory,
        },
        {
          text: t("TAILORED DESIGNS", "MASSGESCHNEIDERTE DESIGNS"),
          icon: PenTool,
        },
        {
          text: t(
            "CERTIFIED SUSTAINABLE PRODUCTION",
            "ZERTIFIZIERTE NACHHALTIGKEIT"
          ),
          icon: BadgeCheck,
        },
        {
          text: t("JUST-IN-TIME DELIVERY", "JUST-IN-TIME-LIEFERUNG"),
          icon: Truck,
        },
      ].map(({ text, icon: Icon }, index) => (
        <div
          key={text}
          className={`flex min-h-[3.6rem] min-w-0 items-center justify-center gap-1.5 px-2 py-3 text-center md:min-h-[4.4rem] md:px-4 md:py-0 ${
            index % 2 === 0 ? "border-r border-primary/10 md:border-r" : ""
          } ${
            index < 2 ? "border-b border-primary/10 md:border-b-0" : ""
          } md:border-r md:border-primary/15 last:md:border-r-0`}
        >
          <Icon
            className="h-4 w-4 shrink-0 text-primary md:hidden"
            strokeWidth={1.5}
            aria-hidden="true"
          />

          <span
            className="editorial-label min-w-0 whitespace-nowrap text-primary leading-none tracking-[0.06em] sm:tracking-[0.1em] md:tracking-[0.13em] lg:tracking-[0.16em] xl:tracking-[0.2em]"
            style={{ fontSize: "clamp(8px, 0.72vw, 13px)" }}
          >
            {text}
          </span>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* OUR SERVICES */}
      <EditorialSection className="bg-background text-foreground">
        <div className="pt-10 pb-8 md:pt-14 md:pb-8 lg:pt-[4.5rem] lg:pb-8">
          <div className="editorial-container text-center mb-8 md:mb-10">
            <h2 className="editorial-heading-lg text-foreground mb-4">{t("Our Services", "Unsere Leistungen")}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 w-full">
            {[
              {
                title: t("Seasonal Lace Collections", "Saisonale Spitzenkollektionen"),
                desc: t(
                  "Twice a year, we develop designs that combine international fashion trends with our lace expertise.",
                  "Zweimal im Jahr entwickeln wir Designs, die internationale Modetrends mit unserer Spitzenkompetenz verbinden.",
                ),
                image: serviceLaceCollections.url,
                anchor: "design",
              },
              {
                title: t("Bespoke Designs", "Maßgeschneiderte Designs"),
                desc: t(
                  "Have a specific idea? We'll translate it into fabric, quickly and flexibly.",
                  "Sie haben eine konkrete Idee? Wir setzen sie schnell und flexibel in Textil um.",
                ),
                image: bespokeDesignsImage,
                anchor: "design",
              },

              {
                title: t("Dyeing and Finishing", "Färben & Ausrüsten"),
                desc: t(
                  "Our in-house dyeing facility covers the full colour spectrum in uni- and bicolour.",
                  "Unsere hauseigene Färberei deckt das gesamte Farbspektrum in Uni- und Bicolor ab.",
                ),
                image: serviceDyeing.url,
                anchor: "dyeing-finishing",
              },
              {
                title: t("Functional and Medical Textiles", "Funktions- und Medizintextilien"),
                desc: t(
                  "We develop warp-knitted fabrics for medical and technical use.",
                  "Wir entwickeln Kettengewirke für medizinische und technische Anwendungen.\n",
                ),
                image: serviceFunctional.url,
                anchor: "functional-textiles",
              },
            ].map((item) => (
<Link
  key={item.title}
  to={`/services#${item.anchor}`}
  className="group block"
>
{/* Mobile version */}
<div className="lg:hidden relative aspect-[4/5] overflow-hidden">
  <img
    src={item.image}
    alt={item.title}
    className="absolute inset-0 h-full w-full object-cover"
  />

  <div className="absolute inset-x-0 bottom-0 p-6">
    <h3
      className="font-serif text-background whitespace-nowrap text-[clamp(23px,6.2vw,32px)] leading-none mb-4"
      style={{
        textShadow: "0 2px 12px rgba(0,0,0,0.75)",
      }}
    >
      {item.title}
    </h3>

    <p
      className="text-background whitespace-pre-line text-[18px] leading-[1.6]"
      style={{
        fontFamily: "'Jost', sans-serif",
        textShadow: "0 2px 10px rgba(0,0,0,0.8)",
      }}
    >
      {item.desc}
    </p>
  </div>
</div>

  {/* Desktop version */}
  <div className="hidden lg:block relative overflow-hidden aspect-[3/4] cursor-pointer">
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
        <p className="editorial-body-sm text-background/80 whitespace-pre-line">
          {item.desc}
        </p>
      </div>
    </div>
  </div>
</Link>
            ))}
          </div>

          <div className="editorial-container text-center mt-8">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 cta-lace editorial-body-sm font-medium transition-colors duration-300"
            >
              {t("Learn More", "Mehr erfahren")} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </EditorialSection>

{/* HERITAGE + INNOVATION */}
<section className="pt-0 pb-16 md:pb-20 overflow-hidden">
  <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
  <div className="w-full">
    <BeforeAfterSlider
      beforeImage={heritageThen.url}
      afterImage={heritageNow.url}
      beforeAlt="Historic Dresdner Spitzen weaving hall"
      afterAlt="Modern Dresdner Spitzen production facility"
      className="aspect-[4/3] lg:aspect-[16/10]"
    />
  </div>

    <div className="px-6 pt-10 md:px-[60px] md:pt-12 lg:px-[80px] lg:pt-0 text-center lg:text-left flex flex-col items-center lg:items-start">
  <h2 className="editorial-heading-lg text-foreground mb-6">
    {t("Our Story", "Unsere Geschichte")}
  </h2>

  <div className="space-y-4 editorial-body text-muted-foreground max-w-2xl mx-auto lg:mx-0">
    <p>
      {t(
        "Every piece of fabric tells a story. Ours began in 1884 and continues today through new ideas, skilled craftsmanship and a passion for textile innovation.",
        "Mehr als 140 Jahre Geschichte erzählen von Wandel und Innovationsgeist. Geblieben ist unsere Leidenschaft und unser Anspruch an hochwertige Textilien.",
      )}
    </p>
  </div>

  <Link
    to="/about"
    className="inline-flex items-center justify-center gap-2 text-primary editorial-body-sm font-medium mt-8 hover:gap-3 transition-all duration-300"
  >
    {t("From 1884 to today", "Von 1884 bis heute")} <ArrowRight size={16} />
  </Link>
</div>
  </div>
</section>
      
    </EditorialLayout>
  );
};

export default Index;
