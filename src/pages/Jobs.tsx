import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import EditorialLayout from "@/components/EditorialLayout";
import EditorialSection from "@/components/EditorialSection";
import SEO from "@/components/SEO";
import { useLang } from "@/i18n/LanguageContext";

const Jobs = () => {
  const { t } = useLang();

  const apprenticeships = [
    t("Machine and Plant Operator – Textile Finishing (m/f/d)", "Maschinen- und Anlagenführer:in – Textilveredelung (m/w/d)"),
    t("Textile Finishing Technician (m/f/d)", "Produktveredler:in Textil (m/w/d)"),
  ];

  return (
    <EditorialLayout title={t("Careers", "Karriere")} heroCompact>
      <SEO
        title={t("Careers", "Karriere")}
        description={t(
          "Join Dresdner Spitzen. Current apprenticeships in textile finishing and open applications for talented professionals.",
          "Kommen Sie zu Dresdner Spitzen. Aktuelle Ausbildungsplätze in der Textilveredelung und Initiativbewerbungen für talentierte Fachkräfte."
        )}
        path="/jobs"
      />

      <EditorialSection className="py-16 md:py-20">
        <div className="editorial-container">
          <div className="max-w-3xl">
            <p className="editorial-body text-muted-foreground whitespace-pre-line">
              {t(
                "We believe that great textiles are made by great people. That's why we value team spirit, mutual respect and the opportunity to grow together.\n\nJoin a team where tradition meets innovation.",
                "Wir glauben, dass großartige Textilien von großartigen Menschen gemacht werden. Deshalb setzen wir auf Teamgeist, gegenseitigen Respekt und die Möglichkeit, gemeinsam zu wachsen.\n\nWerden Sie Teil eines Teams, in dem Tradition auf Innovation trifft."
              )}
            </p>
          </div>
        </div>
      </EditorialSection>

      <section className="pb-20 md:pb-28">
        <div className="editorial-container">
          <div className="max-w-3xl">
            <p className="editorial-label text-muted-foreground mb-6">
              {t("Professional Positions", "Feste Stellen")}
            </p>

            <div className="border-t border-border py-8">
              <p className="editorial-body text-muted-foreground whitespace-pre-line">
                {t(
                  "There are currently no open positions, but we're always happy to hear from people\nwho share our passion for textiles. Get in touch.",
                  "Aktuell keine offenen Stellen, aber wir freuen uns immer, von Menschen zu hören,\ndie unsere Leidenschaft für Textilien teilen. Kontaktieren Sie uns."
                )}
              </p>
            </div>

            <p className="editorial-label text-muted-foreground mb-6 mt-12">
              {t("Apprenticeships", "Ausbildungsplätze")}
            </p>

            <div>
              {apprenticeships.map((title) => (
                <div key={title} className="border-t border-border py-8">
                  <p className="editorial-body text-foreground font-medium">{title}</p>
                </div>
              ))}
              <div className="border-t border-border" />
            </div>

            <div className="mt-20 border-t border-border pt-10">
              <h3 className="editorial-heading-sm text-foreground mb-4">
                {t("Interest?", "Interesse?")}
              </h3>

              <div className="editorial-body-sm text-muted-foreground space-y-4 mb-8">
                <p className="whitespace-pre-line">
                  {t("Please send your application to ", "Bitte senden Sie Ihre Bewerbung an ")}
                  <a href="mailto:jobs@dresdnerspitzen.com" className="text-foreground hover:text-primary transition-colors">
                    jobs@dresdnerspitzen.com
                  </a>
                  {"\n"}
                  {t("or by post to the address listed in the ", "oder per Post an die im ")}
                  <Link to="/imprint" className="text-foreground hover:text-primary transition-colors">
                    {t("Imprint", "Impressum")}
                  </Link>
                  {t(".", " angegebene Adresse.")}
                </p>

                <p>
                  {t("Contact person: Mr. Kluge", "Ansprechpartner: Herr Kluge")}
                  <br />
                  {t("Phone: ", "Telefon: ")}
                  <a href="tel:+493512048244" className="text-foreground hover:text-primary transition-colors">
                    +49 351 2048 244
                  </a>
                </p>

                <p>{t("We look forward to receiving your application.", "Wir freuen uns auf Ihre Bewerbung.")}</p>
              </div>

              <a
                href="mailto:jobs@dresdnerspitzen.com"
                className="inline-flex items-center gap-2 cta-lace bg-foreground text-background px-8 py-4 editorial-body-sm font-medium hover:bg-charcoal-light transition-colors"
              >
                {t("Apply Now", "Jetzt bewerben")} <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </EditorialLayout>
  );
};

export default Jobs;
