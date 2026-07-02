import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";
import productionImage from "@/assets/production-detail.jpg";

const processSteps = [
  { step: "01", title: "Consult", desc: "Share your project, requirements and applications with us." },
  { step: "02", title: "Plan", desc: "We develop custom lace designs or warp-knitted fabrics tailored to your needs." },
  { step: "03", title: "Produce", desc: "Made in Germany using certified textile production and quality-controlled processes." },
  { step: "04", title: "Delivery", desc: "Reliable just-in-time delivery for efficient production planning." },
];

const services = [
  {
    id: "collections",
    nav: "Seasonal Collections",
    title: "Seasonal Collections",
    text: "Our design team continuously develops new lace collections inspired by international fashion trends. Each collection includes elastic and inelastic lace for lingerie, fashion and apparel. Sample yardage is available on request.",
  },
  {
    id: "custom-designs",
    nav: "Bespoke Designs",
    title: "Bespoke Designs",
    text: "Every project starts with an idea. We work closely with you to create a lace, warp-knitted fabric or functional textile tailored to your technical and aesthetic requirements. From first sketch to finished cloth, one team owns the process.",
    process: processSteps,
  },
  {
    id: "dyeing-finishing",
    nav: "Dyeing & Finishing",
    title: "Dyeing & Finishing",
    text: "Our in-house dye house offers precise colour matching across the full spectrum, including solid and bicolour finishes. We also provide finishing tailored to the intended application — hydrophilic, hydrophobic, antistatic, flame retardant, softening and stiffening.",
  },
  {
    id: "functional-treatments",
    nav: "Functional Treatments",
    title: "Functional Treatments",
    text: "Beyond fashion, we develop functional warp-knitted fabrics for technical and medical applications. Our textiles are used in compression garments, post-surgical products, lymphatic therapy and orthopaedic supports where consistent performance is essential.",
  },
];

const Services = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // Enable soft (proximity) snap on the document so users glide from the
    // last service straight into the CTA without a hard trap.
    const prev = document.documentElement.style.scrollSnapType;
    document.documentElement.style.scrollSnapType = "y proximity";
    return () => {
      document.documentElement.style.scrollSnapType = prev;
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const idx = Number((visible[0].target as HTMLElement).dataset.idx);
          setActiveIdx(idx);
        }
      },
      { threshold: [0.35, 0.6, 0.85] }
    );
    sectionsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (idx: number) => {
    const el = sectionsRef.current[idx];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <EditorialLayout
      title="Our Services"
      subtitle="Every step of our textile manufacturing takes place under one roof in Dresden."
      heroCompact
      heroSnap
    >
      {/* Snap scroll experience */}
      <section className="relative">
        <div className="lg:grid lg:grid-cols-[28%_72%] relative">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:flex sticky top-20 md:top-24 h-[calc(100vh-5rem)] md:h-[calc(100vh-6rem)] items-center pl-[60px] self-start">
            <nav className="relative flex flex-col gap-10">
              <span
                aria-hidden="true"
                className="absolute left-0 top-2 bottom-2 w-px bg-border"
              />
              {services.map((s, i) => {
                const active = activeIdx === i;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => scrollTo(i)}
                    className="text-left pl-6 relative"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "12px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      fontWeight: active ? 600 : 400,
                      color: active
                        ? "hsl(var(--primary))"
                        : "hsl(var(--muted-foreground) / 0.6)",
                      transition: "color 300ms ease",
                    }}
                  >
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-0 bottom-0"
                        style={{ width: "2px", background: "hsl(var(--primary))" }}
                      />
                    )}
                    {s.nav}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content column */}
          <div>
            {services.map((s, i) => (
              <article
                key={s.id}
                id={s.id}
                data-idx={i}
                ref={(el) => {
                  sectionsRef.current[i] = el;
                }}
                className="min-h-screen flex flex-col justify-center px-6 lg:pl-[60px] lg:pr-16 pt-4 pb-16"
                style={{
                  scrollSnapAlign: "start",
                  opacity: activeIdx === i ? 1 : 0.2,
                  transition: "opacity 600ms ease",
                }}
              >
                <p
                  className="mb-6"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "10px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "hsl(var(--muted-foreground) / 0.7)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                </p>
                <h2
                  className="mb-8 leading-[1.1]"
                  style={{
                    fontFamily: "'Bodoni Moda', serif",
                    fontSize: "clamp(36px, 5vw, 52px)",
                    color: "hsl(var(--primary))",
                    fontWeight: 500,
                  }}
                >
                  {s.title}
                </h2>
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "16px",
                    lineHeight: 1.7,
                    maxWidth: "560px",
                    color: "hsl(var(--muted-foreground))",
                  }}
                >
                  {s.text}
                </p>

                {s.process && (
                  <div className="mt-12 max-w-2xl">
                    <p
                      className="mb-6"
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "10px",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        color: "hsl(var(--muted-foreground) / 0.7)",
                      }}
                    >
                      How It Works
                    </p>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                      {s.process.map((item) => (
                        <div key={item.step} className="flex flex-col">
                          <span
                            className="mb-2"
                            style={{
                              fontFamily: "'Jost', sans-serif",
                              fontSize: "10px",
                              letterSpacing: "2px",
                              color: "hsl(var(--muted-foreground) / 0.6)",
                            }}
                          >
                            {item.step}
                          </span>
                          <h3
                            className="mb-1"
                            style={{
                              fontFamily: "'Bodoni Moda', serif",
                              fontSize: "20px",
                              color: "hsl(var(--primary))",
                              fontWeight: 500,
                            }}
                          >
                            {item.title}
                          </h3>
                          <p
                            style={{
                              fontFamily: "'Jost', sans-serif",
                              fontSize: "13px",
                              lineHeight: 1.6,
                              color: "hsl(var(--muted-foreground))",
                            }}
                          >
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>

        {/* Mobile dots */}
        <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-40">
          {services.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={s.nav}
              onClick={() => scrollTo(i)}
              className="rounded-full transition-all"
              style={{
                width: activeIdx === i ? "24px" : "8px",
                height: "8px",
                background:
                  activeIdx === i
                    ? "hsl(var(--primary))"
                    : "hsl(var(--muted-foreground) / 0.35)",
              }}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24">
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
