import EditorialLayout from "@/components/EditorialLayout";
import SEO from "@/components/SEO";
import { useLang } from "@/i18n/LanguageContext";

const Imprint = () => {
  const { t } = useLang();
  return (
    <EditorialLayout heroAtTop={true}>
      <SEO
        title={t(
          "Imprint",
          "Impressum"
        )}
        description={t(
          "Legal information and company details for Dresdner Spitzen.",
          "Rechtliche Angaben und Unternehmensinformationen von Dresdner Spitzen."
        )}
        path="/imprint"
      />
      <section className="mt-20 md:mt-24 pt-8 md:pt-12 pb-8 md:pb-12">
        <div className="editorial-container max-w-3xl">
          <h1 className="editorial-heading-xl mb-6">{t("Imprint", "Impressum")}</h1>
          <div className="editorial-body text-muted-foreground space-y-4">
            <p className="font-semibold text-foreground">DreGuS GmbH &amp; Co. KG</p>
            <div className="whitespace-pre-line">
              {"Breitscheidstraße 78\n01237 Dresden\n"}{t("Germany", "Deutschland")}
            </div>
            <div>
              <p className="font-semibold text-foreground">{t("Represented by", "Vertreten durch")}</p>
              <p>Dr.-Ing. Sascha Schröder</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">{t("Contact", "Kontakt")}</p>
              <p>+49 351 2048 244</p>
              <p>sales@dresdnerspitzen.com</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">{t("Commercial Register", "Handelsregister")}</p>
              <p>{t("Local Court Dresden", "Amtsgericht Dresden")}</p>
              <p>HRA 2456</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">{t("General Partner", "Komplementärin")}</p>
              <p>M. &amp; S. Schröder GmbH</p>
              <p>{t("Local Court Dresden, HRB 12846", "Amtsgericht Dresden, HRB 12846")}</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">{t("VAT ID", "Umsatzsteuer-Identifikationsnummer")}</p>
              <p>DE 811 896 186</p>
            </div>
          </div>
        </div>
      </section>
    </EditorialLayout>
  );
};

export default Imprint;
