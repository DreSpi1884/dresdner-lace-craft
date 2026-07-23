import { Mail, Phone, ArrowRight } from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";
import SEO from "@/components/SEO";
import { useLang } from "@/i18n/LanguageContext";

type JobItem = {
  title: string;
  type: string;
  start: string;
  duration: string;
  requirements: string[];
  tasks: string[];
  chances: string[];
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
      requirements: [
        t("Interest in technical developments", "Interesse an technischen Entwicklungen"),
        t("Mechanical understanding and manual dexterity", "Mechanisches Verständnis und motorisches Geschick"),
        t("Quick comprehension", "Rasche Auffassungsgabe"),
        t("Secondary school certificate", "Hauptschulabschluss"),
      ],
      tasks: [
        t(
          "Operating and monitoring production equipment",
          "Bedienung und Überwachung von Produktionsanlagen"
        ),
        t(
          "Planning, carrying out and checking production processes",
          "Planung, Durchführung und Kontrolle von Produktionsabläufen"
        ),
        t(
          "Working with dyeing machines and finishing equipment",
          "Arbeiten mit Färbemaschinen und Anlagen der Textilveredlung"
        ),
      ],
      chances: [
        t(
          "Very good chances of being taken on after successful completion",
          "Sehr gute Chancen auf Übernahme nach erfolgreichem Abschluss"
        ),
        t(
          "Possible further qualification as a textile product finisher",
          "Weiterqualifizierung zum Produktveredler Textil möglich"
        ),
      ],
    },
    {
      title: t(
        "Textile Product Finisher (m/f/d)",
        "Produktveredler Textil (m/w/d)"
      ),
      type: t("Apprenticeship", "Ausbildung"),
      start: "01.09.2026",
      duration: t("3 years", "3 Jahre"),
      requirements: [
        t("Interest in technical developments", "Interesse an technischen Entwicklungen"),
        t(
          "Chemical and physical understanding",
          "Chemisches und physikalisches Verständnis"
        ),
        t("Manual dexterity and quick comprehension", "Motorisches Geschick und rasche Auffassungsgabe"),
        t("Secondary school certificate", "Realschulabschluss"),
      ],
      tasks: [
        t(
          "Setting up production equipment such as dyeing machines and stenters",
          "Einrichtung von Produktionsanlagen wie Färbemaschinen und Spannmaschine"
        ),
        t(
          "Developing and optimising finishing and colour recipes",
          "Ermittlung und Optimierung von Appretur- und Farbrezepturen"
        ),
        t(
          "Applying knowledge of chemical and physical finishing processes",
          "Anwendung von Kenntnissen über chemische und physikalische Veredlungsprozesse"
        ),
        t("Carrying out quality checks", "Durchführung von Qualitätsprüfungen"),
      ],
      chances: [
        t(
          "Very good chances of being taken on after successful completion",
          "Sehr gute Chancen auf Übernahme nach erfolgreichem Abschluss"
        ),
        t(
          "Further qualification as industrial master in textile technology or textile technician is possible",
          "Weiterqualifizierung zum Industriemeister Textilwirtschaft oder Textiltechniker möglich"
        ),
      ],
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
        <section className="editorial-container py-16 md:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <p className="editorial-label mb-5 text-primary">
              {t("WORKING AT DRESDNER SPITZEN", "ARBEITEN BEI DRESDNER SPITZEN")}
            </p>

            <h1 className="editorial-heading-lg mb-8 text-foreground">
              {t("Careers", "Karriere")}
            </h1>

            <p className="max-w-3xl text-lg leading-[1.9] text-muted-foreground">
              {t(
                "Since 1884, Dresdner Spitzen has stood for textile expertise, precision and production in Dresden. We train people who want to work with technology, materials and modern textile finishing.",
                "Seit 1884 steht Dresdner Spitzen für textile Kompetenz, Präzision und Produktion in Dresden. Wir bilden Menschen aus, die mit Technik, Materialien und moderner Textilveredelung arbeiten möchten."
              )}
            </p>
          </div>
        </section>

        <section className="border-t border-primary/15">
          <div className="editorial-container py-12 md:py-14 lg:py-16">
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
              <div>
                <h2 className="editorial-heading-sm text-primary">
                  {t("Open Positions", "Offene Stellen")}
                </h2>
              </div>

              <div>
                <p className="text-lg leading-[1.85] text-muted-foreground">
                  {t(
                    "There are currently no open positions.",
                    "Derzeit haben wir keine offenen Stellen."
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-primary/15">
          <div className="editorial-container py-12 md:py-14 lg:py-16">
            <div className="mx-auto max-w-4xl">
              <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
                <div>
                  <h2 className="editorial-heading-sm text-primary">
                    {t("Apprenticeships", "Ausbildung")}
                  </h2>
                </div>

                <div>
                  <p className="text-lg leading-[1.85] text-muted-foreground">
                    {t(
                      "We are currently offering apprenticeships in textile finishing and textile production.",
                      "Aktuell bieten wir Ausbildungsplätze in der Textilveredlung und textilen Produktion an."
                    )}
                  </p>
                </div>
              </div>

              <div className="divide-y divide-primary/15 border-y border-primary/15">
                {apprenticeships.map((job) => (
                  <article key={job.title} className="py-10">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
                      <div>
                        <p className="editorial-label mb-4 text-primary/70">
                          {job.type}
                        </p>

                        <h3 className="editorial-heading-sm text-primary">
                          {job.title}
                        </h3>

                        <div className="mt-6 space-y-2 text-sm leading-[1.8] text-muted-foreground">
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

                      <div className="space-y-8">
                        <div>
                          <h4 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-primary">
                            {t("Tasks", "Aufgaben")}
                          </h4>

                          <ul className="space-y-2 text-base leading-[1.8] text-muted-foreground">
                            {job.tasks.map((item) => (
                              <li key={item}>— {item}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-primary">
                            {t("Requirements", "Anforderungen")}
                          </h4>

                          <ul className="space-y-2 text-base leading-[1.8] text-muted-foreground">
                            {job.requirements.map((item) => (
                              <li key={item}>— {item}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-primary">
                            {t("Opportunities", "Chancen")}
                          </h4>

                          <ul className="space-y-2 text-base leading-[1.8] text-muted-foreground">
                            {job.chances.map((item) => (
                              <li key={item}>— {item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

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
