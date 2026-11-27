import {
  Mail,
  Phone,
  ArrowRight,
  FileText,
} from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";
import SEO from "@/components/SEO";
import { useLang } from "@/i18n/LanguageContext";

type Apprenticeship = {
  title: string;
  duration: string;
  pdf: string;
};

const Jobs = () => {
  const { t } = useLang();

  const apprenticeships: Apprenticeship[] = [
    {
      title: t(
        "Production Mechanic – Textiles (m/f/d)",
        "Produktionsmechaniker – Textil (m/w/d)"
      ),
      duration: t("3 years", "3 Jahre"),
      pdf: "/ausbildung-produktionsmechaniker-textil.pdf",
    },
    {
      title: t(
        "Machine and Plant Operator – Textile Technology (m/f/d)",
        "Maschinen- und Anlagenführer – Textiltechnik (m/w/d)"
      ),
      duration: t("2 years", "2 Jahre"),
      pdf: "/ausbildung-maschinen-und-anlagenfuehrer-textiltechnik.pdf",
    },
  ];

  return (
    <EditorialLayout title={t("Careers and Apprenticeships", "Karriere und Ausbildung")} heroCompact>
      <SEO
        title={t("Textile Apprenticeships in Dresden, Germany", "Ausbildung in der Textilindustrie in Dresden")}
        description={t(
          "Explore 2027 textile apprenticeships at Dresdner Spitzen in Dresden, Germany: Production Mechanic – Textiles and Machine and Plant Operator – Textile Technology. Both programmes start on 23 August 2027.",
          "Entdecken Sie die Ausbildungsplätze 2027 bei Dresdner Spitzen in Dresden: Produktionsmechaniker – Textil sowie Maschinen- und Anlagenführer – Textiltechnik. Ausbildungsbeginn ist der 23. August 2027."
        )}
        path="/jobs"
      />

      <main className="bg-background text-foreground">
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

        <section className="border-t border-primary/15">
          <div className="editorial-container py-12 md:py-16 lg:py-20">
            <div className="mx-auto max-w-5xl">
              <div className="mb-10 md:mb-12">
                <p className="editorial-label mb-3 text-primary/70">
                  {t("CURRENT TEXTILE APPRENTICESHIPS", "AKTUELLE AUSBILDUNGSPLÄTZE IN DER TEXTILINDUSTRIE")}
                </p>
                <h2 className="editorial-heading-sm text-primary">
                  {t("Textile apprenticeships in Dresden – starting 2027", "Ausbildung in der Textilindustrie in Dresden – Beginn 2027")}
                </h2>
                <p className="mt-4 text-base leading-[1.8] text-muted-foreground">
                  {t(
                    "Both apprenticeships take place on site in Dresden, Germany, and start on 23 August 2027. Select a position to open the full job description as a PDF.",
                    "Beide Ausbildungen finden vor Ort in Dresden statt und beginnen am 23. August 2027. Klicken Sie auf einen Ausbildungsplatz, um die vollständige Beschreibung als PDF zu öffnen."
                  )}
                </p>
              </div>

              <div className="mb-10 border-l-2 border-primary/25 pl-5 text-base leading-[1.8] text-muted-foreground">
                <h3 className="editorial-heading-sm mb-3 text-primary">
                  {t("Applying from outside Germany", "Bewerbung aus dem Ausland")}
                </h3>
                <p>
                  {t(
                    "Our apprenticeship positions are based at our textile manufacturing site in Dresden, Germany. If you are currently living abroad, please contact us before applying so we can clarify the requirements for starting vocational training in Germany.",
                    "Unsere Ausbildungsplätze befinden sich an unserem Textilproduktionsstandort in Dresden. Wenn Sie derzeit im Ausland leben, kontaktieren Sie uns bitte vor Ihrer Bewerbung, damit wir die Voraussetzungen für einen Ausbildungsbeginn in Deutschland klären können."
                  )}
                </p>
              </div>

              <div className="grid items-stretch gap-6 md:grid-cols-2">
                {apprenticeships.map((job) => (
                  <a
                    key={job.pdf}
                    href={job.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col border border-primary/20 p-8 transition-colors hover:border-primary/50"
                    aria-label={t(
                      `Open apprenticeship details: ${job.title} (PDF, opens in a new tab)`,
                      `Ausbildungsbeschreibung öffnen: ${job.title} (PDF, öffnet in neuem Tab)`
                    )}
                  >
                    <p className="editorial-label mb-4 text-primary/60">
                      {t("Apprenticeship · 2027", "Ausbildung · 2027")}
                    </p>
                    <h3 className="editorial-heading-sm mb-6 text-primary">
                      {job.title}
                    </h3>

                    <div className="space-y-2 text-sm leading-[1.8] text-muted-foreground">
                      <p>
                        <span className="text-primary">{t("Start", "Beginn")}:</span>{" "}
                        23.08.2027
                      </p>
                      <p>
                        <span className="text-primary">{t("Duration", "Dauer")}:</span>{" "}
                        {job.duration}
                      </p>
                      <p>
                        <span className="text-primary">{t("Location", "Ort")}:</span>{" "}
                        Dresden
                      </p>
                    </div>

                    <span className="mt-8 flex items-center justify-between border-t border-primary/15 pt-5 text-primary">
                      <span className="inline-flex items-center gap-2 editorial-body-sm font-medium">
                        <FileText size={17} strokeWidth={1.6} />
                        {t("View job description (PDF)", "Stellenbeschreibung ansehen (PDF)")}
                      </span>
                      <ArrowRight
                        size={18}
                        strokeWidth={1.5}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </a>
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
                  {t("Please send your application to:", "Bitte senden Sie Ihre Bewerbung an:")}
                </p>

                <div className="space-y-3 text-base">
                  <a
                    href="mailto:jobs@dresdnerspitzen.com"
                    className="flex items-center gap-3 text-primary transition-opacity hover:opacity-75"
                  >
                    <Mail size={18} strokeWidth={1.6} />
                    jobs@dresdnerspitzen.com
                  </a>

                  <a
                    href="tel:+493512048244"
                    className="flex items-center gap-3 text-primary transition-opacity hover:opacity-75"
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
