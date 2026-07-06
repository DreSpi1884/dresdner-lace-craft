import { useEffect, useRef, useState } from "react";
import EditorialLayout from "@/components/EditorialLayout";

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
    text: "Every project starts with an idea. We work closely with you to create a lace, warp-knitted fabric or functional textile tailored to your technical and aesthetic requirements. From first sketch to finished cloth, one team owns the process.",
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

const Services = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

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
      { threshold: [0.35, 0.6] }
    );
    sectionsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Enable snap only when scrolling down; scrolling up stays free
  useEffect(() => {
    const html = document.documentElement;
    const prevSnap = html.style.scrollSnapType;
    const prevBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "smooth";
    html.style.scrollSnapType = "none";

    let lastY = window.scrollY;
    let timeout: number | undefined;

    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY;
      lastY = y;
      html.style.scrollSnapType = goingDown ? "y proximity" : "none";
      if (timeout) window.clearTimeout(timeout);
      // When scrolling settles after a downward move, allow snap to finalize,
      // then release so the next upward scroll is unrestricted.
      timeout = window.setTimeout(() => {
        html.style.scrollSnapType = "none";
      }, 250);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timeout) window.clearTimeout(timeout);
      html.style.scrollSnapType = prevSnap;
      html.style.scrollBehavior = prevBehavior;
    };
  }, []);


  const scrollTo = (idx: number) => {
    const el = sectionsRef.current[idx];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <EditorialLayout
      title="Our Services"
      heroCompact
    >
      <section className="relative lg:grid lg:grid-cols-[28%_72%]">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:block pl-[60px] pt-16 md:pt-24">
          <nav className="sticky top-[calc(6rem+6rem)] flex flex-col gap-10">


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
                className="h-[calc(100vh-5rem)] md:h-[calc(100vh-6rem)] pt-16 md:pt-24 pb-8 px-6 lg:pl-[60px] lg:pr-16 flex flex-col justify-start overflow-hidden"
                style={{
                  opacity: activeIdx === i ? 1 : 0.2,
                  transition: "opacity 600ms ease",
                  scrollSnapAlign: "start",
                  scrollSnapStop: "normal",
                  scrollMarginTop: "6rem",
                }}
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
                  {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
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
                  <div className="mt-8 max-w-2xl">
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
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
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
    </EditorialLayout>
  );
};

export default Services;
