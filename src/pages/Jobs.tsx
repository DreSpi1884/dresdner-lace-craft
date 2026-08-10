import { useState } from "react";
import {
  Mail,
  Phone,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";
import SEO from "@/components/SEO";
import { useLang } from "@/i18n/LanguageContext";

type JobItem = {
  title: string;
  type: string;
  start: string;
  duration: string;
  tasks: string[];
  requirements: string[];
  benefits: string[];
};

const Jobs = () => {
  const { t } = useLang();

  const [openJob, setOpenJob] = useState<string | null>(null);

  const apprenticeships: JobItem[] = [
    {
      title: t(
        "Machine and Plant Operator – Textile Finishing (m/f/d)",
        "Maschinen- und Anlagenführer Textilveredlung (m/w/d)"
      ),
      type: t("Apprenticeship", "Ausbildung"),
      start: "01.09.2026",
      duration: t("2 years", "2 Jahre"),

      /*
       * HIER SPÄTER DIE AUFGABEN FÜR JOB 1 EINFÜGEN
       *
       * Beispiel:
       * tasks: [
       *   t("English task 1", "Deutsche Aufgabe 1"),
       *   t("English task 2", "Deutsche Aufgabe 2"),
       * ],
       */
      tasks: [],

      /*
       * HIER SPÄTER DIE VORAUSSETZUNGEN FÜR JOB 1 EINFÜGEN
       */
      requirements: [],

      /*
       * HIER SPÄTER "DAS BIETEN WIR" FÜR JOB 1 EINFÜGEN
       */
      benefits: [],
    },

    {
      title: t(
        "Textile Product Finisher (m/f/d)",
        "Produktveredler Textil (m/w/d)"
      ),
      type: t("Apprenticeship", "Ausbildung"),
      start: "01.09.2026",
      duration: t("3 years", "3 Jahre"),

      /*
       * HIER SPÄTER DIE AUFGABEN FÜR JOB 2 EINFÜGEN
       */
      tasks: [],

      /*
       * HIER SPÄTER DIE VORAUSSETZUNGEN FÜR JOB 2 EINFÜGEN
       */
      requirements: [],

      /*
       * HIER SPÄTER "DAS BIETEN WIR" FÜR JOB 2 EINFÜGEN
       */
      benefits: [],
    },
  ];

  return (
    <EditorialLayout title={t("Careers", "Karriere")} heroCompact>
      <SEO
        title={t(
          "Careers and Apprenticeships",
          "Karriere und Ausbildung"
        )}
        description={t(
          "Discover current career and apprenticeship opportunities at Dresdner Spitzen in Dresden.",
          "Entdecken Sie aktuelle Karriere- und Ausbildungsmöglichkeiten bei Dresdner Spitzen in Dresden."
        )}
        path="/jobs"
      />

      <main className="bg-background text-foreground">
        {/* Intro */}
        <section className="editorial-container py-16 md:py-20 lg:py-24">
          <div className="mx-auto max-w-8xl text-center">
            <p className="mx-auto max-w-8xl whitespace-pre-wrap text-lg leading-[1.9] text-muted-foreground">
              {t(
                "For more than 140 years, Dresdner Spitzen has stood for textile craftsmanship, precision and quality made in Dresden.\u00a0\nWe welcome people who want to become part of our history with passion and new ideas.",
                "Seit über 140 Jahren steht Dresdner Spitzen für textile Handwerkskunst, Präzision und Qualität aus Dresden.\u00a0\nWir freuen uns über Menschen, die mit Leidenschaft und neuen Ideen Teil unserer Geschichte werden möchten."
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
                  {t(
                    "CURRENT OPPORTUNITIES",
                    "AKTUELLE MÖGLICHKEITEN"
                  )}
                </p>

                <h2 className="editorial-heading-sm text-primary">
                  {t("Open Positions", "Offene Positionen")}
                </h2>
              </div>

              <div className="grid items-start gap-6 md:grid-cols-2">
                {apprenticeships.map((job) => {
                  const isOpen = openJob === job.title;

                  const hasDetails =
                    job.tasks.length > 0 ||
                    job.requirements.length > 0 ||
                    job.benefits.length > 0;

                  return (
                    <article
                      key={job.title}
                      className="border border-primary/15"
                    >
                      {/* Sichtbarer Teil der Jobkarte */}
                      <div className="p-8">
                        <p className="editorial-label mb-4 text-primary/60">
                          {job.type}
                        </p>

                        <h3 className="editorial-heading-sm mb-6 text-primary">
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

                        {/* Dropdown Button */}
                        <button
                          type="button"
                          onClick={() =>
                            setOpenJob(isOpen ? null : job.title)
                          }
                          className="mt-8 flex w-full items-center justify-between border-t border-primary/15 pt-5 text-left text-primary transition-opacity hover:opacity-70"
                          aria-expanded={isOpen}
                        >
                          <span className="editorial-body-sm font-medium">
                            {isOpen
                              ? t(
                                  "Show less",
                                  "Weniger anzeigen"
                                )
                              : t(
                                  "Learn more",
                                  "Mehr erfahren"
                                )}
                          </span>

                          <ChevronDown
                            size={18}
                            strokeWidth={1.5}
                            className={`transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

                      {/* Aufklappbarer Bereich */}
                      <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                          isOpen
                            ? "grid-rows-[1fr]"
                            : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="border-t border-primary/15 px-8 pb-8 pt-7">
                            <div className="space-y-8">
                              {/* Noch keine Inhalte eingetragen */}
                              {!hasDetails && (
                                <p className="text-sm leading-[1.8] text-muted-foreground">
                                  {t(
                                    "Further details about this position will follow shortly.",
                                    "Weitere Details zu dieser Stelle folgen in Kürze."
                                  )}
                                </p>
                              )}

                              {/* DEINE AUFGABEN */}
                              {job.tasks.length > 0 && (
                                <div>
                                  <h4 className="mb-3 font-medium text-primary">
                                    {t(
                                      "Your tasks",
                                      "Deine Aufgaben"
                                    )}
                                  </h4>

                                  <ul className="list-disc space-y-2 pl-5 text-sm leading-[1.8] text-muted-foreground">
                                    {job.tasks.map(
                                      (task, index) => (
                                        <li key={index}>
                                          {task}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}

                              {/* DAS BRINGST DU MIT */}
                              {job.requirements.length >
                                0 && (
                                <div>
                                  <h4 className="mb-3 font-medium text-primary">
                                    {t(
                                      "What you bring",
                                      "Das bringst du mit"
                                    )}
                                  </h4>

                                  <ul className="list-disc space-y-2 pl-5 text-sm leading-[1.8] text-muted-foreground">
                                    {job.requirements.map(
                                      (
                                        requirement,
                                        index
                                      ) => (
                                        <li key={index}>
                                          {requirement}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}

                              {/* DAS BIETEN WIR */}
                              {job.benefits.length > 0 && (
                                <div>
                                  <h4 className="mb-3 font-medium text-primary">
                                    {t(
                                      "What we offer",
                                      "Das bieten wir"
                                    )}
                                  </h4>

                                  <ul className="list-disc space-y-2 pl-5 text-sm leading-[1.8] text-muted-foreground">
                                    {job.benefits.map(
                                      (benefit, index) => (
                                        <li key={index}>
                                          {benefit}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}

                              {/* Bewerben */}
                              <a
                                href="mailto:jobs@dresdnerspitzen.com"
                                className="inline-flex items-center gap-2 text-primary editorial-body-sm font-medium transition-opacity hover:opacity-70"
                              >
                                {t(
                                  "Apply now",
                                  "Jetzt bewerben"
                                )}
                                <ArrowRight size={16} />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
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
                    "Please send your application to:",
                    "Bitte senden Sie Ihre Bewerbung an:"
                  )}
                </p>

                <div className="space-y-3 text-base">
                  <a
                    href="mailto:jobs@dresdnerspitzen.com"
                    className="flex items-center gap-3 text-primary transition-opacity hover:opacity-75"
                  >
                    <Mail
                      size={18}
                      strokeWidth={1.6}
                    />
                    jobs@dresdnerspitzen.com
                  </a>

                  <a
                    href="tel:+493512048244"
                    className="flex items-center gap-3 text-primary transition-opacity hover:opacity-75"
                  >
                    <Phone
                      size={18}
                      strokeWidth={1.6}
                    />
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
                  className="inline-flex items-center gap-2 border border-primary bg-transparent px-7 py-3 text-primary editorial-body-sm font-medium transition-colors duration-300 hover:bg-primary hover:text-background"
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
