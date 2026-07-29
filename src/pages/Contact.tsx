import { Mail, MapPin } from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";
import SEO from "@/components/SEO";
import germanyMap from "@/assets/germany-map-dregus.png?url";
import { useLang } from "@/i18n/LanguageContext";
import { SITE } from "@/config/site";

const Contact = () => {
  const { t } = useLang();

  return (
    <EditorialLayout heroAtTop>
      <SEO
        title={t(
          "Contact for Textile Projects",
          "Kontakt für textile Projekte",
        )}
        description={t(
          "Contact Dresdner Spitzen for lace, warp-knitted fabrics, dyeing, finishing, functional textiles or custom textile development in Dresden.",
          "Kontaktieren Sie Dresdner Spitzen für Spitzen, Kettgewirke, Färbung, Ausrüstung, funktionale Textilien oder individuelle textile Entwicklungen.",
        )}
        path="/contact"
      />

      <section className="min-h-[calc(100vh-80px)] pt-20 md:min-h-[calc(100vh-96px)] md:pt-24">
        <div className="editorial-container h-full w-full py-8 md:py-12">
          <div className="grid h-full grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center">
              <h1 className="editorial-heading-lg mb-4">
                {t("Contact", "Kontakt")}
              </h1>

              <p className="editorial-body mb-6 whitespace-pre-line text-muted-foreground">
                {t(
                  "Do you have a specific project or would like to learn more about us?\nWe respond within two business days.",
                  "Sie haben ein konkretes Projekt oder möchten mehr über uns erfahren?\nWir antworten innerhalb von zwei Werktagen.",
                )}
              </p>

              <hr className="mb-6 border-border" />

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <Mail
                    size={20}
                    className="mt-1 shrink-0 text-primary"
                  />

                  <div>
                    <p className="editorial-body-sm mb-1 font-medium text-foreground">
                      {t("Email", "E-Mail")}
                    </p>

                    <a
                      href={`mailto:${SITE.salesEmail}`}
                      className="editorial-body text-muted-foreground transition-colors hover:text-primary"
                    >
                      {SITE.salesEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin
                    size={20}
                    className="mt-1 shrink-0 text-primary"
                  />

                  <div>
                    <p className="editorial-body-sm mb-1 font-medium text-foreground">
                      {t("Location", "Standort")}
                    </p>

                    <p className="editorial-body text-muted-foreground">
                      {t(
                        "Dresden, Germany",
                        "Dresden, Deutschland",
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start justify-center lg:justify-end">
              <img
                src={germanyMap}
                alt={t(
                  "Map of Germany showing Dresden",
                  "Deutschlandkarte mit dem Standort Dresden",
                )}
                className="h-auto max-h-[420px] max-w-full object-contain lg:max-h-[480px]"
              />
            </div>
          </div>
        </div>
      </section>
    </EditorialLayout>
  );
};

export default Contact;
