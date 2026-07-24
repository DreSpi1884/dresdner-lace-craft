import { Mail, Phone, ArrowRight } from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";
import SEO from "@/components/SEO";
import { useLang } from "@/i18n/LanguageContext";

type JobItem = {
  title: string;
  type: string;
  start: string;
  duration: string;
};

const Jobs = () => {
  const { t } = useLang();

  const apprenticeships: JobItem[] = [
    {
      title: t(
        "Machine and Plant Operator – Textile Finishing (m/f/d)",
        "Maschinen- und Anlagenführer Textilveredlung (m/w/d)"
      ),
      type: t("Apprenticeship", "Ausbildung"),
      start: "01.09.2026",
      duration: t("2 years", "2 Jahre"),
    },
    {
      title: t(
        "Textile Product Finisher (m/f/d)",
        "Produktveredler Textil (m/w/d)"
      ),
      type: t("Apprenticeship", "Ausbildung"),
      start: "01.09.2026",
      duration: t("3 years", "3 Jahre"),
    },
  ];

  return (
    <EditorialLayout title={t("Careers", "Karriere")} heroCompact>
      <SEO
        title={t("Careers and Apprenticeships", "Karriere und Ausbildung")}
        description={t(
          "Discover current career and apprenticeship opportunities at Dresdner Spitzen in Dresden.",
          "Entdecken Sie aktuelle Karriere- und Ausbildungsmöglichkeiten bei Dresdner Spitzen in Dresden."
        )}
        path="/jobs"
      />

      <main className="bg-background text-foreground">
        {/* Intro */}
        <section className="editorial-container py-16 md:py-20 lg:py-24">
          <div className="mx-auto max-w-5xl text-center">
            <p className="editorial-label mb-6 text-primary">
              {t("WORKING AT DRESDNER SPITZEN", "ARBEITEN BEI DRESDNER SPITZEN")}
            </p>

            <p className="mx-auto max-w-3xl text-lg leading-[1.9] text-muted-foreground">
              {t(
                "For more than 140 years, Dresdner Spitzen has stood for textile craftsmanship, precision and quality made in Dresden. We welcome people who want to become part of our history with passion and new ideas.",
                "Seit über 140 Jahren steht Dresdner Spitzen für textile Handwerkskunst, Präzision und Qualität aus Dresden. Wir freuen uns über Menschen, die mit Leidenschaft und neuen Ideen Teil unserer Geschichte werden möchten."
              )}
            </p>
          </div>
        </section>

        {/* Open positions */}
        <section className="border-t border-primary/15">
          <div className="editorial-container py-12 md:py-16 lg:py-20">
            <div className="mx-auto max-w-5xl">
              <div className="mb-10 md:mb-12">
                <p className="editorial-label mb-3 text-primary/70">
                  {t("CURRENT OPPORTUNITIES", "AKTUELLE MÖGLICHKEITEN")}
                </p>
                <h2 className="editorial-heading-sm text-primary">
                  {t("Open Positions", "Offene Positionen")}
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {apprenticeships.map((job) => (
                  <article
                    key={job.title}
                    className="flex flex-col justify-between border border-primary/15 p-8"
                  >
                    <div>
                      <p className="editorial-label mb-4 text-primary/60">
                        {job.type}
                      </p>

                      <h3 className="editorial-heading-sm text-primary mb-6">
                        {job.title}
                      </h3>

                      <div className="space-y-2 text-sm leading-[1.8] text-muted-foreground">
                        <p>
                          <span className="text-primary">
                            {t("Start", "Beginn")}:
                          </span>{" "}
                          {job.start}
                        </p>
                        <p>
                          <span className="text-primary">
                            {t("Duration", "Dauer")}:
                          </span>{" "}
                          {job.duration}
                        </p>
                        <p>
                          <span className="text-primary">
                            {t("Location", "Ort")}:
                          </span>{" "}
                          Dresden
                        </p>
                      </div>
                    </div>

                    <a
                      href="mailto:jobs@dresdnerspitzen.com"
                      className="mt-8 inline-flex items-center gap-2 text-primary editorial-body-sm font-medium hover:opacity-70 transition-opacity"
                    >
                      {t("Apply now", "Jetzt bewerben")}
                      <ArrowRight size={16} />
                    </a>
                  </article>
                ))}
              </div>

              <p className="mt-10 text-base leading-[1.8] text-muted-foreground">
                {t(
                  "We currently have no other open vacancies. Speculative applications are always welcome.",
                  "Aktuell haben wir keine weiteren offenen Stellen. Initiativbewerbungen sind jederzeit willkommen."
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Application */}
        <section className="border-t border-primary/15">
          <div className="editorial-container py-12 md:py-14 lg:py-16">
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
              <div>
                <h2 className="editorial-heading-sm text-primary">
                  {t("Application", "Bewerbung")}
                </h2>
              </div>

              <div className="space-y-6 text-lg leading-[1.85] text-muted-foreground">
                <p>
                  {t(
                    "Please send your application by email or by post to the address listed in the imprint.",
                    "Bitte senden Sie Ihre Bewerbung per E-Mail oder per Post an die im Impressum angegebene Adresse."
                  )}
                </p>

                <div className="space-y-3 text-base">
                  <a
                    href="mailto:jobs@dresdnerspitzen.com"
                    className="flex items-center gap-3 text-primary hover:opacity-75 transition-opacity"
                  >
                    <Mail size={18} strokeWidth={1.6} />
                    jobs@dresdnerspitzen.com
                  </a>

                  <a
                    href="tel:+493512048244"
                    className="flex items-center gap-3 text-primary hover:opacity-75 transition-opacity"
                  >
                    <Phone size={18} strokeWidth={1.6} />
                    0351 2048 244
                  </a>
                </div>

                <p className="text-base leading-[1.8]">
                  {t(
                    "Your contact person is Mr Kluge. We look forward to receiving your application.",
                    "Ihr Ansprechpartner ist Herr Kluge. Wir freuen uns auf Ihre Bewerbung."
                  )}
                </p>

                <a
                  href="mailto:jobs@dresdnerspitzen.com"
                  className="inline-flex items-center gap-2 border border-primary bg-transparent px-7 py-3 text-primary editorial-body-sm font-medium hover:bg-primary hover:text-background transition-colors duration-300"
                >
                  {t("Apply now", "Jetzt bewerben")}
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </EditorialLayout>
  );
};

export default Jobs;
