import EditorialLayout from "@/components/EditorialLayout";
import SEO from "@/components/SEO";
import { useLang } from "@/i18n/LanguageContext";

const Privacy = () => {
  const { t } = useLang();
  return (
    <EditorialLayout title={t("Privacy Policy", "Datenschutzerklärung")}>
      <SEO
        title={t("Privacy Policy", "Datenschutzerklärung")}
        description={t(
          "How Dresdner Spitzen handles your data, in compliance with GDPR.",
          "Wie Dresdner Spitzen Ihre Daten gemäß DSGVO verarbeitet."
        )}
        path="/privacy"
      />
      <section className="editorial-section">
        <div className="editorial-container max-w-3xl">
          <div className="editorial-body text-muted-foreground space-y-4">
            <p>
              {t(
                "Privacy policy content will be added here.",
                "Der Inhalt der Datenschutzerklärung wird hier ergänzt."
              )}
            </p>
          </div>
        </div>
      </section>
    </EditorialLayout>
  );
};

export default Privacy;
