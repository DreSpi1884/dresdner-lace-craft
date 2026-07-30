import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";
import SEO from "@/components/SEO";
import EditorialSection from "@/components/EditorialSection";
import heroVideo from "@/assets/hero-video.mp4?url";

import bespokeDesignsImage from "@/assets/bespoke-designs.webp?url";
import serviceLaceCollections from "@/assets/seasonal-lace-collections.webp?url";
import functionalTextiles from "@/assets/dyeing-finishing.webp?url";
import fullStageProductionImage from "@/assets/full-production.webp?url";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import heritageThen from "@/assets/heritage-then.webp?url";
import heritageNow from "@/assets/heritage-now.webp?url";
import grsLogo from "@/assets/GRS_freigestellt.webp?url";
import OekoTex from "@/assets/OEKOTEXSTeP.png?url";
import { useLang } from "@/i18n/LanguageContext";


const FooterCertificationLogos = () => (

  <div className="mt-4 flex items-center md:items-start justify-center gap-10 md:justify-start">
    <a
      href="https://textileexchange.org/recycled-claim-global-recycled-standard/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Global Recycled Standard – mehr erfahren"
    >
      <img
        src={grsLogo}
        alt="Global Recycled Standard"
        className="w-[300px] md:w-[300px] bg-white object-contain"
      />
    </a>
    <img
      src={OekoTex}
      alt="OEKO-TEX STeP"
      className="w-[170px] md:w-[250px] bg-white object-contain mt-0 md:mt-2"
    />
  </div>
);

const Index = () => {
  const { t } = useLang();
  return (
    <EditorialLayout heroAtTop>
     <SEO
      title={t(
        "Lace and Textile Production Since 1884",
        "Spitzen- und Textilproduktion seit 1884"
      )}
      description={t(
        "Dresdner Spitzen develops and produces lace, warp-knitted fabrics, functional textiles, dyeing and finishing solutions in Dresden, Germany.",
        "Dresdner Spitzen entwickelt und produziert in Dresden Spitzen, Kettgewirke, funktionale Textilien sowie Färbe- und Ausrüstungslösungen."
      )}
      path="/"
    />
      {/* HERO */}
      <section data-no-reveal className="relative overflow-hidden min-h-screen flex items-center justify-center">
        <video
          src={heroVideo}
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


      {/* OUR SERVICES */}
      <EditorialSection className="bg-background text-foreground">
        <div className="pt-10 pb-8 md:pt-14 md:pb-8 lg:pt-[4.5rem] lg:pb-8">
          <div className="editorial-container text-center mb-8 md:mb-10">
            <h2 className="editorial-heading-lg text-foreground mb-4">{t("Our Services", "Unsere Leistungen")}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 w-full">
            {[
  {
    title: t("Lace Collections", "Spitzenkollektionen"),
    desc: t(
      "In our Dresden studio, seasonal lace collections are created, inspired by current trends.",
      "In unserem Dresdner Atelier entstehen saisonale Spitzenkollektionen, inspiriert von aktuellen Trends.",
    ),
    image: serviceLaceCollections,
    anchor: "design",
  },
  {
    title: t("Custom Designs", "Individuelle Designs"),
    desc: t(
      "Want to develop your own design? We'll translate it into high-quality textiles according to your requirements.",
      "Sie möchten Ihr eigenes Design entwickeln? Wir setzen es nach Ihren Anforderungen in hochwertige Textilien um.",
    ),
    image: bespokeDesignsImage,
    anchor: "design",
  },
  {
    title: t("Technical Textiles", "Technische Textilien"),
    desc: t(
      "We develop functional warp-knitted fabrics for technical and medical applications with a variety of finishes.",
      "Wir entwickeln funktionale Kettgewirke für technische und medizinische Anwendungen mit verschiedenen Ausrüstungen.",
    ),
    image: functionalTextiles,
    anchor: "functional-textiles",
  },
  {
    title: t("Fully Integrated Production", "Vollstufige Produktion"),
    desc: t(
      "Design, raw material production, finishing and final production under one roof. OEKO-TEX® STeP and GRS certified.",
      "Design, Rohwarenproduktion, Ausrüstung und Endfertigung unter einem Dach. OEKO-TEX® STeP und GRS zertifiziert.",
    ),
    image: fullStageProductionImage,
    anchor: "raw-material-production",
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
    decoding="async"
    className="absolute inset-0 h-full w-full object-cover"
  />

  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-foreground/80 via-foreground/45 to-transparent" />
  
  <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-center">
    <h3
      className="mb-4 font-serif text-[clamp(28px,7vw,40px)] leading-tight text-background"
    >
      {item.title}
    </h3>

    <p
      className="text-background whitespace-pre-line text-[17px] font-light leading-[1.6]"
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
    <div className="absolute inset-x-0 bottom-0 p-6 z-10 text-center transition-opacity duration-300 group-hover:opacity-0">
  <h3 className="editorial-heading-sm text-background">{item.title}</h3>
</div>
    <div className="absolute inset-0 bg-foreground/85 flex items-center p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
      <div className="mx-auto text-center">
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
              className="inline-flex items-center gap-2 border border-primary bg-transparent px-8 py-4 text-primary editorial-body-sm font-medium hover:bg-primary hover:text-background transition-colors duration-300"
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
      beforeImage={heritageThen}
      afterImage={heritageNow}
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
        "Every piece of fabric tells a story. Ours began in 1884 and continues today through new ideas, skilled craftsmanship and passion for textile innovation.",
        "Mehr als 140 Jahre Geschichte erzählen von Wandel und Innovationsgeist. Geblieben ist unsere Leidenschaft und unser Anspruch an hochwertige Textilien.",
      )}
    </p>
  </div>

  <Link
    to="/about#history"
    className="inline-flex items-center justify-center gap-2 text-primary editorial-body-sm font-medium mt-8 hover:gap-3 transition-all duration-300"
  >
    {t("From 1884 to today", "Von 1884 bis heute")} <ArrowRight size={16} />
  </Link>
</div>
  </div>
</section>

      <div className="bg-white pb-6 md:pb-10">
        <div className="editorial-container flex flex-col items-center gap-8 md:gap-10">
          <FooterCertificationLogos />
        </div>
    </div>

      
    </EditorialLayout>
  );
};

export default Index;
