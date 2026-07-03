import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";
import EditorialSection from "@/components/EditorialSection";
import heroVideo from "@/assets/hero-video.mp4.asset.json";

import serviceCollections from "@/assets/service-collections.jpg.asset.json";
import serviceBespoke from "@/assets/service-bespoke.jpg.asset.json";
import serviceFunctional from "@/assets/service-functional.png.asset.json";
import serviceDyeing from "@/assets/production-detail.jpg";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import heritageThen from "@/assets/heritage-then.png.asset.json";
import heritageNow from "@/assets/heritage-now.jpg";

const Index = () => {
  return (
    <EditorialLayout heroAtTop>
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
          {/* Spacer reserving room for the nav logo that sits in the hero until scrolling */}
          <div className="mx-auto mb-[clamp(0.75rem,2vh,1.5rem)] aspect-[2/3]" style={{ width: "clamp(96px, 12.5vw, 240px)" }} aria-hidden="true" />
          <h1 className="font-serif text-background leading-[1.1] tracking-[-0.01em] pb-2 [text-wrap:balance]" style={{ fontSize: "clamp(28px, 4vw, 64px)" }}>
            The Art of Textiles
          </h1>
          <p className="editorial-label text-background/90 tracking-[0.3em] mt-[clamp(0.5rem,1.5vh,1rem)]" style={{ fontSize: "clamp(14px, 1.8vw, 24px)" }}>
            MADE IN GERMANY SINCE 1884
          </p>
        </div>
      </section>


      {/* KEYWORDS BANNER */}
      <section className="w-full bg-background border-b border-border py-5 md:py-6">
        <div className="editorial-container">
          <div className="flex divide-x divide-primary/30">
            {[
              "IN-HOUSE PRODUCTION",
              "TAILORED SOLUTIONS",
              "CERTIFIED SUSTAINABLE PRODUCTION",
              "JUST-IN-TIME DELIVERY",
            ].map((text) => (
              <div key={text} className="flex-1 flex items-center justify-center px-3 md:px-6">
                <span className="editorial-label text-primary text-center whitespace-nowrap" style={{ fontSize: "clamp(9px, 1vw, 13px)" }}>
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
              Our Services
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 w-full">
            {[
              {
                title: "Seasonal Lace Collections",
                desc: "Twice a year we release a new lace collection, each spanning a wide variety of styles inspired by global fashion trends.",
                image: serviceBespoke.url,
                anchor: "collections",
              },
              {
                title: "Bespoke Designs",
                desc: "Have a specific idea? We'll translate it into fabric, quickly and flexibly.",
                image: serviceCollections.url,
                anchor: "custom-designs",
              },
              {
                title: "Dyeing and Finishing\u00a0",
                desc: "Our in-house dyeing facility covers the full colour spectrum, from soft pastels to deep saturated tones, in uni or bicolour.",
                image: serviceDyeing,
                anchor: "dyeing-finishing",
              },
              {
                title: "Functional and Medical Textiles",
                desc: "We develop certified warp-knitted fabrics for medical and technical applications. Our elastic textiles are used in compression garments, post-surgical care and lymphatic therapy, combining skin compatibility, reliable compression and long-lasting performance with the highest quality standards.",
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
                    <p className="editorial-body-sm text-background/80">{item.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="editorial-container text-center mt-8">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 cta-lace editorial-body-sm font-medium transition-colors duration-300">
              Learn More <ArrowRight size={16} />
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
                afterImage={heritageNow}
                beforeAlt="Historic Dresdner Spitzen weaving hall"
                afterAlt="Modern Dresdner Spitzen production facility"
              />
            </div>

            <div>
              <p className="editorial-label text-primary mb-4">OUR HERITAGE</p>
              <h2 className="editorial-heading-lg text-foreground mb-6">
                Generations of expertise
              </h2>
              <div className="space-y-4 editorial-body text-muted-foreground">
                <p>
                  Since 1884, we have combined textile craftsmanship with continuous innovation, delivering quality without compromise.
                </p>
                <p>
                  From our facility in Dresden, we unite advanced manufacturing with decades of experience to serve our clients of every scale.
                </p>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary editorial-body-sm font-medium mt-8 hover:gap-3 transition-all duration-300">
                Read our story <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* JOBS PREVIEW */}
      <EditorialSection className="bg-card">
        <div className="editorial-container editorial-section text-center">
          <p className="editorial-label text-primary mb-4">Careers</p>
          <h2 className="editorial-heading-lg text-foreground mb-6">
            Join our team in Dresden
          </h2>
          <p className="editorial-body text-muted-foreground max-w-xl mx-auto mb-10">
            We are always looking for skilled and passionate people to join our team.&nbsp;
            Discover current opportunities and become part of our story.
          </p>
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 cta-lace border border-border text-foreground px-8 py-4 editorial-body-sm font-medium hover:bg-secondary transition-colors duration-300">
            
            View Open Positions <ArrowRight size={16} />
          </Link>
        </div>
      </EditorialSection>
    </EditorialLayout>);

};

export default Index;