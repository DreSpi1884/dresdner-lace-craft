import { useLayoutEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";
import EditorialSection from "@/components/EditorialSection";
import HistoryTimeline from "@/components/HistoryTimeline";
import AboutAnchorNav from "@/components/AboutAnchorNav";
import SEO from "@/components/SEO";
import { useLang } from "@/i18n/LanguageContext";
import { getAnchorScrollOffset } from "@/lib/scrollNav";
import grsLogo from "@/assets/GRS_freigestellt.png?url";
import oekoTexLogo from "@/assets/OEKOTEXSTeP.png?url";
import umweltallianzLogo from "@/assets/umweltallianz-sachsen.png?url";
import solarRoofImg from "@/assets/solaranlage.jpg?url";


const SolarImageCard = ({
  mobileText,
  desktopText,
  alt,
}: {
  mobileText: string;
  desktopText: string;
  alt: string;
}) => (
  <figure className="group relative -mx-4 overflow-hidden bg-muted lg:mx-0">
    <img
      data-no-reveal
      src={solarRoofImg}
      alt={alt}
      className="block h-[220px] w-full object-cover sm:h-[250px] lg:h-[460px] xl:h-[520px]"
    />

   <figcaption className="absolute inset-0 flex items-end justify-center bg-transparent px-3 py-4 opacity-100 transition-opacity duration-500 lg:bg-foreground/45 lg:px-8 lg:py-6 lg:opacity-0 lg:group-hover:opacity-100">
      <p className="w-full max-w-none whitespace-nowrap text-left text-[13px] leading-[1.45] text-background drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] sm:text-[15px] lg:hidden">
        {mobileText}
      </p>

      <p className="hidden w-full max-w-none text-left text-[17px] leading-[1.65] text-background drop-shadow-md lg:block">
        {desktopText}
      </p>
    </figcaption>
  </figure>
);

const SustainabilityLogos = ({ className = "" }: { className?: string }) => (
  <div
    data-no-reveal
    className={`flex w-full flex-nowrap items-center justify-start gap-2.5 overflow-visible sm:gap-4 md:gap-5 ${className}`}
  >
    <a
      href="https://textileexchange.org/recycled-claim-global-recycled-standard/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Global Recycled Standard – mehr erfahren"
      className="shrink-0"
    >
     <img
        data-no-reveal
        src={grsLogo}
        alt="Global Recycled Standard"
        className="block w-[90px] shrink-0 bg-white object-contain sm:w-[100px] md:w-[150px] lg:w-[200px] xl:w-[250px]"
      />
    </a>

    <img
      data-no-reveal
      src={oekoTexLogo}
      alt="OEKO-TEX STeP"
      className="block w-[90px] shrink-0 bg-white object-contain sm:w-[100px] md:w-[150px] lg:w-[200px] xl:w-[250px]"
    />

    <img
      data-no-reveal
      src={umweltallianzLogo}
      alt="Umwelt- und Klimaallianz Sachsen"
      className="block w-[60px] shrink-0 object-contain sm:w-[95px] md:w-[110px] lg:w-[130px] xl:w-[180px]"
    />
  </div>
);

const About = () => {
  const { t } = useLang();
  const location = useLocation();
  const [mobileOpenId, setMobileOpenId] = useState<string | null>(null);

  const scrollMobileSectionToTop = (id: string) => {
    const element = document.getElementById(`mobile-${id}`);
    if (!element) return;
    const offset = getAnchorScrollOffset(id);
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "auto" });
  };

  const openMobileSection = (id: string) => {
    if (mobileOpenId === id) {
      flushSync(() => {
        setMobileOpenId(null);
      });
      window.history.replaceState(null, "", location.pathname);
      return;
    }

    flushSync(() => {
      setMobileOpenId(id);
    });
    window.history.replaceState(null, "", `#${id}`);

      scrollMobileSectionToTop(id);
  };

  // Sync accordion state with URL hash (opening a section from another page
  // or from the anchor nav). Actual scrolling is handled centrally by
  // ScrollToTop — no duplicate scroll logic here.
useLayoutEffect(() => {
  if (window.innerWidth >= 1024) return;

  const hash = location.hash.replace("#", "");
  const validIds = ["history", "sustainability", "values"];

  if (validIds.includes(hash)) {
    setMobileOpenId(hash);
  }
}, [location.hash, location.key]);

useLayoutEffect(() => {
  if (window.innerWidth >= 1024) return;

  const hash = location.hash.replace("#", "");

  if (!hash || mobileOpenId !== hash) return;

  scrollMobileSectionToTop(hash);
}, [mobileOpenId, location.hash, location.key]);


  return (
    <EditorialLayout title={t("About Us", "Über uns")} heroCompact>
      <SEO
        title={t(
          "Company and History Since 1884",
          "Unternehmen und Geschichte seit 1884"
        )}
        description={t(
          "Learn more about Dresdner Spitzen, a textile company in Dresden with a history dating back to 1884, certified production and a clear commitment to quality and sustainability.",
          "Lernen Sie Dresdner Spitzen kennen: ein Textilunternehmen aus Dresden mit Geschichte seit 1884, zertifizierter Produktion und klarem Qualitätsanspruch."
        )}
        path="/about"
      />  

      <AboutAnchorNav />

      {/* Mobile accordion */}
      <section className="lg:hidden border-t border-primary/10">
        {[
          { id: "history", label: t("History", "Geschichte") },
          { id: "sustainability", label: t("Sustainability", "Nachhaltigkeit") },
          { id: "values", label: t("Values", "Werte") },
        ].map((section) => {
          const isOpen = mobileOpenId === section.id;

          return (
            <article
              key={section.id}
              className="border-b border-primary/10"
            >
              <button
              id={`mobile-${section.id}`}
              type="button"
              onClick={() => openMobileSection(section.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between px-4 py-6 text-left"
              >
                <span className="editorial-label tracking-[0.22em] text-primary">
                  {section.label}
                </span>

                <ChevronDown
                  className={`ml-4 h-5 w-5 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div
                  className={`px-4 pt-0 ${
                    section.id === "values"
                      ? "min-h-[calc(100svh-5rem)] pb-20"
                      : "pb-10"
                  }`}
                >
                  {section.id === "history" && <HistoryTimeline />}

                  {section.id === "sustainability" && (
                    <div className="space-y-4 text-left text-[17px] leading-[1.9] text-muted-foreground">
                      <p className="whitespace-pre-wrap">
                        {t(
                          "Our production is supported by an energy management system and certified according to internationally recognised standards, \nincluding OEKO-TEX® Standard 100, OEKO-TEX® STeP Level 3 and the Global Recycled Standard (GRS).\n\n",
                          "Unsere Produktion wird durch ein Energiemanagementsystem unterstützt und ist nach international anerkannten Standards zertifiziert, \ndarunter OEKO-TEX® Standard 100, OEKO-TEX® STeP Level 3 sowie Global Recycled Standard (GRS).\n\n"
                        )}
                      </p>

                      <SustainabilityLogos className="my-8" />

                      <p className="whitespace-pre-wrap">
                        {t(
                          "\nThese certifications reflect our commitment to responsible textile manufacturing, transparent supply chains and sustainable production processes.",
                          "\nDiese Zertifizierungen stehen für unser Engagement für verantwortungsvolle Textilherstellung, transparente Lieferketten und nachhaltige Produktionsprozesse."
                        )}
                      </p>

                      <SolarImageCard
                        mobileText={t(
                          "Solar power from our site.",
                          "Solarstrom von unserem Produktionsstandort Dresden"
                        )}
                        desktopText={t(
                          "We generate part of our electricity through our solar power systems on our production site in Dresden.",
                          "Einen Teil unseres Stroms erzeugen wir durch Solaranlagen auf unserem Produktionsgelände."
                        )}
                        alt={t(
                          "Solar panels on the roof of the Dresden production site",
                          "Solaranlagen auf dem Dach des Produktionsstandorts in Dresden"
                        )}
                      />

                      <p>
                        {"\n"}
                      </p>
                    </div>
                  )}

                  {section.id === "values" && (
                  <div className="divide-y divide-primary/15 lg:pt-8 xl:pt-10">
                    {[
                      {
                        title: t("Quality & Precision", "Qualität & Präzision"),
                        desc: t(
                          "We work with high standards, careful quality control and attention to detail.",
                          "Wir arbeiten mit hohen Standards, sorgfältiger Kontrolle und Liebe zum Detail."
                        ),
                      },
                      {
                        title: t(
                          "Flexibility & Reliability",
                          "Flexibilität & Zuverlässigkeit"
                        ),
                        desc: t(
                          "We develop tailored solutions and support projects from initial idea to finished textile.",
                          "Wir entwickeln individuelle Lösungen und begleiten Projekte von der ersten Idee bis zum fertigen Textil."
                        ),
                      },
                      {
                        title: t(
                          "Tradition & Innovation",
                          "Tradition & Innovation"
                        ),
                        desc: t(
                          "We combine over 140 years of textile experience with new ideas and modern manufacturing.",
                          "Wir verbinden über 140 Jahre textile Erfahrung mit neuen Ideen und moderner Fertigung."
                        ),
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="py-8 first:pt-0 last:pb-0"
                      >
                        <h3 className="editorial-heading-sm text-primary text-[21px] leading-snug">
                          {item.title}
                        </h3>
                
                        <p className="mt-4 max-w-[42ch] text-[16px] leading-[1.8] text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                  )}
                 </div>
                )}
            </article>
          );
        })}
      </section>

      {/* Desktop history */}
      <div id="history" className="hidden lg:block scroll-mt-32">
        <HistoryTimeline />
      </div>

      {/* Desktop sustainability */}
     <section
  id="sustainability"
  className="hidden lg:block editorial-section scroll-mt-32 overflow-hidden"
>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
    <div className="min-w-0">
      <div className="pl-8 xl:pl-12 2xl:pl-16">
        <span
          id="sustainability-scroll-target"
          className="block h-0"
          aria-hidden="true"
        />

        <h2 className="editorial-heading-lg text-foreground mb-0">
          {t("Sustainability", "Nachhaltigkeit")}
        </h2>
      </div>

      <div className="mt-10 xl:mt-12 px-8 xl:px-12 2xl:px-16">
        <SolarImageCard
          mobileText={t(
            "Solar power from our site.",
            "Solarstrom von unserem Produktionsstandort Dresden"
          )}
          desktopText={t(
            "We generate part of our electricity through our solar power systems on our production site in Dresden.",
            "Einen Teil unseres Stroms erzeugen wir durch Solaranlagen auf unserem Produktionsgelände."
          )}
          alt={t(
            "Solar panels on the roof of the Dresden production site",
            "Solaranlagen auf dem Dach des Produktionsstandorts in Dresden"
          )}
        />
      </div>
    </div>

    <div className="min-w-0 pr-8 xl:pr-12 2xl:pr-16">
      <div className="max-w-[760px] text-left text-lg leading-[1.85] text-muted-foreground lg:pt-32 xl:pt-36">
        <p className="whitespace-pre-wrap">
          {t(
            "Our production is supported by an energy management system and certified according to internationally recognised standards, including OEKO-TEX® Standard 100,\u00a0\nOEKO-TEX® STeP Level 3 and the Global Recycled Standard (GRS).",
            "Unsere Produktion wird durch ein Energiemanagementsystem unterstützt und ist nach international anerkannten Standards zertifiziert, darunter OEKO-TEX® Standard 100, OEKO-TEX® STeP Level 3 sowie Global Recycled Standard (GRS)."
          )}
        </p>

        <SustainabilityLogos className="mt-8 mb-6" />

        <p>
          {t(
            "These certifications reflect our commitment to responsible textile manufacturing, transparent supply chains and sustainable production processes.",
            "Diese Zertifizierungen stehen für unser Engagement für verantwortungsvolle Textilherstellung, transparente Lieferketten und nachhaltige Produktionsprozesse."
          )}
        </p>

        <p className="mt-8">
          {"\n"}
        </p>
      </div>
    </div>
  </div>
</section>

      {/* Desktop values */}
      <EditorialSection id="values" className="hidden lg:block bg-card scroll-mt-32">
        <span id="values-scroll-target" className="block h-0" aria-hidden="true" />
        <div className="editorial-container py-24 xl:py-32">
          <div className="grid grid-cols-[0.7fr_1.3fr] gap-16 xl:gap-24 items-start">
            <div className="sticky top-32">
              <h2 className="editorial-heading-lg text-foreground mb-4">
                {t("Our Values", "Unsere Werte")}
              </h2>

              <p className="editorial-label text-primary">
                {t("WHAT DRIVES US EVERYDAY", "WAS UNS TÄGLICH ANTREIBT")}
              </p>
            </div>

            <div className="divide-y divide-primary/15 lg:pt-3 xl:pt-5">
              {[
  {
    title: t("Quality & Precision", "Qualität & Präzision"),
    desc: t(
      "We work with high standards, careful control and attention to detail.",
      "Wir arbeiten mit hohen Standards, sorgfältiger Kontrolle und Liebe zum Detail."
    ),
  },
  {
    title: t(
      "Flexibility & Reliability",
      "Flexibilität & Zuverlässigkeit"
    ),
    desc: t(
      "We develop tailored solutions and support projects from the initial idea to the finished textile.",
      "Wir entwickeln individuelle Lösungen und begleiten Projekte von der ersten Idee bis zum fertigen Textil."
    ),
  },
  {
    title: t(
      "Tradition & Innovation",
      "Tradition & Innovation"
    ),
    desc: t(
      "We combine over 140 years of textile experience with new ideas and modern manufacturing.",
      "Wir verbinden über 140 Jahre textile Erfahrung mit neuen Ideen und moderner Fertigung."
    ),
  },
].map((item) => (
                <div key={item.title} className="py-12 first:pt-0 last:pb-0">
                  <h3 className="editorial-heading-sm text-primary text-[28px] leading-snug xl:text-[32px]">
                    {item.title}
                  </h3>

                  <p className="mt-6 w-full text-lg leading-[1.9] text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </EditorialSection>
    </EditorialLayout>
  );
};

export default About;
