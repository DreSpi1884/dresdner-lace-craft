import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";
import EditorialSection from "@/components/EditorialSection";
import heroVideo from "@/assets/hero-video.mp4.asset.json";
import logoWhite from "@/assets/logo-white.png.asset.json";
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
      <section className="relative overflow-hidden h-screen min-h-[600px] flex items-center justify-center">
        <video
          src={heroVideo.url}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/30" />
        <div className="editorial-container relative text-center">
          <img
            src={logoWhite.url}
            alt="Dresdner Spitzen"
            className="w-56 md:w-64 mx-auto mb-6 drop-shadow-lg"
          />
          <h1 className="font-serif text-background mb-4 leading-[1.02] tracking-[-0.01em] text-[clamp(2.75rem,7vw,5.75rem)] [text-wrap:balance]">
            The Art of Textiles
          </h1>
          <p className="editorial-label text-background/90 mb-12 tracking-[0.3em]">MADE IN GERMANY SINCE 1884</p>
        </div>
      </section>


      {/* KEYWORDS BANNER */}
      <section className="w-full bg-background border-b border-border py-5 md:py-6">
        <div className="editorial-container flex items-center justify-between">
          {[
            "140 Years of Expertise",
            "Made in Germany",
            "Certified Quality",
            "Tailored Solutions",
          ].map((text, i) => (
            <div key={text} className="flex items-center">
              {i > 0 && (
                <div className="h-5 md:h-6 w-px bg-primary/30 mx-3 md:mx-6" />
              )}
              <span className="editorial-label text-primary whitespace-nowrap">
                {text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* OUR SERVICES */}
      <EditorialSection className="bg-foreground text-background">
        <div className="editorial-section">
          <div className="editorial-container text-center mb-16 md:mb-20">
            <p className="editorial-label text-background/40 mb-4">Our Services</p>
            <h2 className="editorial-heading-lg text-background mb-4">
              What we offer
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 w-full">
            {[
              {
                title: "Seasonal Collections",
                desc: "Twice a year we release a new lace collection, each spanning a wide variety of styles inspired by global fashion trends.",
                image: serviceBespoke.url,
              },
              {
                title: "Bespoke Designs",
                desc: "Have a specific idea? We'll translate it into fabric, quickly and flexibly.",
                image: serviceCollections.url,
              },
              {
                title: "Dyeing and Finishing",
                desc: "Our in-house dyeing facility covers the full colour spectrum, from soft pastels to deep saturated tones, in uni or bicolour.",
                image: serviceDyeing,
              },
              {
                title: "Functional Treatments",
                desc: "We can finish our fabrics for specific applications, including dirt repellency, hydrophilic or hydrophobic coatings, antistatic treatments and flame retardancy.",
                image: serviceFunctional.url,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden aspect-[3/4] cursor-pointer"
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
              </div>
            ))}
          </div>

          <div className="editorial-container text-center mt-16">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 cta-lace editorial-body-sm font-medium transition-colors duration-300">
              Learn More <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </EditorialSection>

      {/* CAPABILITIES */}
      <EditorialSection className="editorial-section">
        <div className="editorial-container">
          <p className="editorial-label text-primary mb-4">What We Do</p>
          <h2 className="editorial-heading-lg text-foreground mb-16 max-w-2xl">
            We manage every step
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
            {[
            {
              num: "01",
              title: "Integrated Production",
              desc: "We manage every stage of production under one roof."
            },
            {
              num: "02",
              title: "Just-in-Time",
              desc: "We produce to demand for efficient, reliable delivery."
            },
            {
              num: "03",
              title: "Certified Quality",
              desc: "We offer recognized certifications, including GRS and STeP."
            }].
            map((item) =>
            <div key={item.num} className="border-t border-border pt-8">
                <h3 className="editorial-heading-sm text-foreground mb-4">{item.title}</h3>
                <p className="editorial-body-sm text-muted-foreground">{item.desc}</p>
              </div>
            )}
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
              <p className="editorial-label text-primary mb-4">Heritage & Innovation</p>
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