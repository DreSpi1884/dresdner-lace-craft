import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";
import EditorialSection from "@/components/EditorialSection";
import productionImage from "@/assets/production-detail.jpg";
import heritageImage from "@/assets/heritage-workshop.jpg";

const services = [
  {
    id: "collections",
    nav: "Seasonal Collections",
    title: "Seasonal Collections",
    image: "/__l5e/assets-v1/ab9a0a65-3da2-4a24-aea6-bc5b44139c0c/service-collections.jpg",
    paragraphs: [
      "Our design team continuously develops new lace collections inspired by international fashion trends throughout the year.",
      "Each collection includes a wide variety of elastic and inelastic lace for lingerie, fashion and apparel — carefully engineered for comfort, drape and durability.",
      "Sample yardage is available on request so your team can evaluate hand-feel, stretch and finish before committing to production.",
    ],
  },
  {
    id: "custom-designs",
    nav: "Bespoke Designs",
    title: "Bespoke Designs",
    image: "/__l5e/assets-v1/d02d6321-9172-48ec-b048-9d6fa3b95236/service-bespoke.jpg",
    paragraphs: [
      "Every project starts with an idea. Whether you are developing a unique lace design, a warp-knitted fabric or a functional textile for a specific application, we work closely with you to create a solution tailored to your technical and aesthetic requirements.",
      "Our designers translate references, mood boards or existing samples into production-ready patterns using our full in-house design and prototyping capability.",
      "From first sketch to finished cloth, one team owns the process — ensuring intent is preserved at every stage.",
    ],
  },
  {
    id: "dyeing-finishing",
    nav: "Dyeing & Finishing",
    title: "Dyeing & Finishing",
    image: heritageImage,
    paragraphs: [
      "Our in-house dye house offers precise colour matching across the full spectrum, from subtle neutrals to vibrant shades, including solid and bicolour finishes.",
      "We also provide textile finishing tailored to the intended application and performance requirements, including hydrophilic and hydrophobic treatments, dirt and oil repellency, antistatic properties, flame retardancy, softening and stiffening finishes.",
    ],
  },
  {
    id: "functional-treatments",
    nav: "Functional Treatments",
    title: "Functional Treatments",
    image: "/__l5e/assets-v1/a47d67da-4eaa-4fc9-b44d-dece4a11ff7d/service-functional.png",
    paragraphs: [
      "Beyond fashion, we develop functional warp-knitted fabrics for technical and medical applications.",
      "Our textiles are used in compression garments, post-surgical products, lymphatic therapy, orthopaedic supports and other medical applications where consistent elasticity, skin compatibility and durability are essential.",
      "Every functional textile is developed to defined performance criteria and validated through our internal quality control processes.",
    ],
  },
];

const Services = () => {
  const [activeId, setActiveId] = useState(services[0].id);
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId((visible[0].target as HTMLElement).id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    Object.values(sectionsRef.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = sectionsRef.current[id];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <EditorialLayout title="Our Services">
      {/* Intro */}
      <section className="editorial-section">
        <div className="editorial-container">
          <div className="max-w-3xl">
            <p className="editorial-body text-muted-foreground max-w-2xl whitespace-pre-line">
              Every step of our textile manufacturing takes place under one roof in Dresden.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky sidebar + scrolling content */}
      <section className="editorial-container pb-24">
        {/* Mobile tab bar */}
        <div className="lg:hidden sticky top-16 z-30 -mx-6 px-6 bg-background/95 backdrop-blur border-b border-border">
          <div className="flex gap-6 overflow-x-auto py-4 no-scrollbar">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => handleNavClick(e, s.id)}
                className={`whitespace-nowrap editorial-label transition-colors ${
                  activeId === s.id ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {s.nav}
              </a>
            ))}
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-[28%_72%] lg:gap-16 items-start">
          {/* Sticky sidebar */}
          <aside className="hidden lg:block sticky top-32 self-start">
            <p className="editorial-label text-muted-foreground mb-6">Services</p>
            <nav className="flex flex-col">
              {services.map((s) => {
                const active = activeId === s.id;
                return (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={(e) => handleNavClick(e, s.id)}
                    className={`text-left py-3 pl-4 border-l-2 editorial-body-sm ${
                      active
                        ? "border-primary text-primary font-medium"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {s.nav}
                  </a>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <div>
            {services.map((s, idx) => (
              <article
                key={s.id}
                id={s.id}
                ref={(el) => {
                  sectionsRef.current[s.id] = el;
                }}
                className={`scroll-mt-32 reveal-on-scroll ${
                  idx === 0 ? "pt-4" : "pt-[120px]"
                } ${idx === services.length - 1 ? "" : "pb-[120px]"}`}
              >
                <h2 className="editorial-heading-lg text-foreground mb-8">{s.title}</h2>
                <div className="space-y-5 max-w-2xl mb-10">
                  {s.paragraphs.map((p, i) => (
                    <p key={i} className="editorial-body text-muted-foreground">
                      {p}
                    </p>
                  ))}
                </div>
                <div className="w-full aspect-[16/9] overflow-hidden bg-muted">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <EditorialSection className="bg-foreground text-background">
        <div className="editorial-container editorial-section">
          <div className="text-center mb-16 md:mb-20">
            <p className="editorial-label text-background/40 mb-4">How It Works</p>
            <h2 className="editorial-heading-lg text-background mb-4">
              From Concept to Creation
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { step: "01", title: "Consult", desc: "Share your project, requirements and applications with us.\u00a0" },
              { step: "02", title: "Plan", desc: "We develop custom lace designs or warp-knitted fabrics tailored to your needs." },
              { step: "03", title: "Produce", desc: "Made in Germany using certified textile production and quality controlled processes." },
              { step: "04", title: "Delivery", desc: "Reliable just-in-time delivery for efficient production planning." },
            ].map((item) => (
              <div key={item.step} className="flex flex-col h-full">
                <span className="editorial-label text-background/40 mb-4 block">{item.step}</span>
                <h3 className="editorial-heading-sm text-background mb-3">{item.title}</h3>
                <p className="editorial-body-sm text-background/60 flex-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </EditorialSection>

      {/* CTA */}
      <section className="editorial-section">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="editorial-label text-primary mb-4">Get in touch</p>
              <h2 className="editorial-heading-lg text-foreground mb-6">
                Let's build your next collection
              </h2>
              <p className="editorial-body text-muted-foreground mb-8">
                Tell us about your project and our team will craft a tailored offer for your needs.
              </p>
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 cta-lace bg-foreground text-background px-8 py-4 editorial-body-sm font-medium hover:bg-charcoal-light transition-colors duration-300">
                Request a Quote <ArrowRight size={16} />
              </Link>
            </div>
            <img
              src={productionImage}
              alt="Lace production at Dresdner Spitzen"
              className="w-full h-[400px] object-cover" />
          </div>
        </div>
      </section>
    </EditorialLayout>);
};

export default Services;
