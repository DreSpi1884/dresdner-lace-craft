import { useEffect, useRef, useState } from "react";
import EditorialLayout from "@/components/EditorialLayout";
import SEO from "@/components/SEO";

const processSteps = [
  { step: "01", title: "Consult", desc: "Share your project, requirements and applications with us." },
  { step: "02", title: "Plan", desc: "We develop custom lace designs or warp-knitted fabrics tailored to your needs." },
  { step: "03", title: "Produce", desc: "Made in Germany using certified textile production and quality-controlled processes." },
  { step: "04", title: "Delivery", desc: "Reliable just-in-time delivery for efficient production planning." },
];

const services = [
  {
    id: "collections",
    nav: "Seasonal Lace Collections",
    title: "Seasonal Lace Collections",
    text: "Our design team continuously develops new lace collections inspired by international fashion trends. Each collection includes elastic and inelastic lace for lingerie, fashion and apparel. Samples are available on request.",
  },
  {
    id: "custom-designs",
    nav: "Bespoke Designs",
    title: "Bespoke Designs",
    text: "Every project starts with an idea. We work closely with you to create a lace, warp-knitted fabric or functional textile tailored to your technical and aesthetic requirements. From first sketch to finished product, we manage the entire process.",
    process: processSteps,
  },
  {
    id: "dyeing-finishing",
    nav: "Dyeing & Finishing",
    title: "Dyeing & Finishing",
    text: "Our in-house dyeing facilities offer precise color matching across the full spectrum, including solid and bicolor finishes. We also provide finishing tailored to the intended application: hydrophilic, hydrophobic, antistatic, flame retardant, softening and stiffening.",
  },
  {
    id: "functional-treatments",
    nav: "Functional and Medical Textiles",
    title: "Functional and Medical Textiles",
    text: "We develop functional warp-knitted fabrics for technical and medical applications. Our textiles are used in compression garments, post-surgical products, lymphatic therapy and orthopaedic supports where consistent performance is essential.",
  },
];

// Fixed header height (h-20 mobile / h-24 desktop)
const NAV_OFFSET = 96;

const Services = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  // Deterministic active-section tracking via rAF-throttled scroll.
  // We pick the section whose top has crossed an "activation line" placed
  // ~35% down the viewport. The last section whose top is above that line
  // is active. This guarantees exactly one active item, reliably reaches
  // every section (including tall ones like Bespoke Designs), and never
  // flickers between neighbours.
  useEffect(() => {
    let ticking = false;

    const compute = () => {
      ticking = false;
      const activationY = NAV_OFFSET + (window.innerHeight - NAV_OFFSET) * 0.35;
      let current = 0;
      for (let i = 0; i < sectionsRef.current.length; i++) {
        const el = sectionsRef.current[i];
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= activationY) current = i;
        else break;
      }
      setActiveIdx((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollTo = (idx: number) => {
    const el = sectionsRef.current[idx];
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET - 24;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <EditorialLayout title="Our Services" heroCompact>
      <SEO
        title="Our Services — Lace, Bespoke Designs & Finishing"
        description="Seasonal lace collections, bespoke designs, in-house dyeing and finishing, and functional or medical textiles — engineered in Germany."
        path="/services"
      />
      <section className="mx-auto w-full max-w-[1280px] px-6 lg:px-12 pt-12 md:pt-16 pb-24 lg:pb-28">
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-24">
          {/* Sticky left navigation — scoped to this grid, stops at footer naturally */}
          <aside className="hidden lg:block">
            <nav
              aria-label="Services navigation"
              className="sticky flex flex-col gap-8"
              style={{
                // Vertically centered in the visible viewport below the fixed header
                top: `calc(50vh - 120px)`,
              }}
            >
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
                      transition:
                        "color 400ms ease, font-weight 400ms ease",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-0 bottom-0"
                      style={{
                        width: "2px",
                        background: "hsl(var(--primary))",
                        opacity: active ? 1 : 0,
                        transition: "opacity 400ms ease",
                      }}
                    />
                    {s.nav}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content column */}
          <div className="min-w-0">
            {services.map((s, i) => (
              <article
                key={s.id}
                id={s.id}
                data-idx={i}
                ref={(el) => {
                  sectionsRef.current[i] = el;
                }}
                className="max-w-2xl py-16 md:py-24 first:pt-0 last:pb-0"
                style={{ scrollMarginTop: `${NAV_OFFSET + 24}px` }}
              >
                <p
                  className="mb-5"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "10px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "hsl(var(--muted-foreground) / 0.7)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(services.length).padStart(2, "0")}
                </p>
                <h2
                  className="mb-6 leading-[1.1]"
                  style={{
                    fontFamily: "'Bodoni Moda', serif",
                    fontSize: "clamp(30px, 4vw, 42px)",
                    color: "hsl(var(--primary))",
                    fontWeight: 500,
                  }}
                >
                  {s.title}
                </h2>
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "15px",
                    lineHeight: 1.65,
                    maxWidth: "560px",
                    color: "hsl(var(--muted-foreground))",
                  }}
                >
                  {s.text}
                </p>

                {s.process && (
                  <div className="mt-10 max-w-2xl">
                    <p
                      className="mb-4"
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
      </section>

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
    </EditorialLayout>
  );
};

export default Services;
