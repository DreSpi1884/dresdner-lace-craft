import { useState } from "react";
import EditorialLayout from "@/components/EditorialLayout";
import SEO from "@/components/SEO";
import { useLang } from "@/i18n/LanguageContext";

const privacyTextEn = `Last updated: 20 August 2026

1. Data Controller

The data controller for the processing of personal data on this website is:

DreGuS GmbH & Co. KG
Breitscheidstraße 78
01237 Dresden
Germany
Phone: +49 351 2048 0
Email: sales@dresdnerspitzen.com

Represented by: Dr.-Ing. Sascha Schröder

For data protection matters, you may contact: datenschutz@dresdnerspitzen.com

2. General Information

We process personal data only to the extent necessary to provide our website, communicate with visitors, initiate and execute business relationships, comply with legal obligations, and improve our web offering.

Depending on the purpose, processing is based in particular on Art. 6 (1) (b), (c), (f) or, where applicable, (a) GDPR.

3. Hosting and Server Logs – Vercel

This website is hosted and delivered through Vercel Inc., United States ("Vercel"). Vercel provides the technical infrastructure, edge network and related services required to make the website available.

When the website is accessed, technically necessary connection and access data may be processed, including the IP address, date and time of the request, requested resource, referrer, browser and device information, and technical request data.

The processing is necessary to deliver the website, ensure stability and security, detect technical errors and prevent misuse. The legal basis is Art. 6 (1) (f) GDPR. Our legitimate interest is the secure, reliable and technically efficient operation of our website.

Where Vercel processes personal data on our behalf, Vercel is used as a processor in accordance with Art. 28 GDPR on the basis of the applicable contractual data protection terms.

4. Vercel Web Analytics

We use Vercel Web Analytics to obtain aggregated statistics about the use of this website and to improve its content, structure and technical performance.

According to Vercel, Web Analytics does not use third-party cookies and does not create persistent cross-site user profiles. Visitors are distinguished using a hash generated from the incoming request. According to Vercel, the visitor session is automatically discarded after 24 hours and analytics data is provided in aggregated form without being tied to an individual visitor or IP address.

The data points processed may include, in particular:

page or route accessed;
event timestamp;
referrer;
filtered query information;
approximate geographic location;
browser and browser version;
operating system;
device type;
version of the analytics script.

As an additional privacy measure, our implementation removes URL query strings and fragments before page-view events are sent to Vercel. We do not use Vercel Web Analytics for advertising, cross-site tracking or the creation of individual marketing profiles.

The legal basis is Art. 6 (1) (f) GDPR. Our legitimate interest lies in obtaining privacy-friendly, aggregated usage statistics and improving our website. You have the right to object to this processing for reasons arising from your particular situation.

You can also disable Vercel Web Analytics for future visits using the opt-out control on this page. If you do so, the preference "ds-analytics-optout" is stored in your browser's local storage so that your choice can be respected on later visits. This preference is used only to remember your analytics opt-out.

5. Language Selection

You can choose between the German and English versions of the website. The selected language is stored under the key "ds-lang" in your browser's local storage so that the website can restore your language preference on subsequent visits.

This information remains on your device and is not used for advertising or analytics. The legal basis is Art. 6 (1) (f) GDPR. Our legitimate interest lies in providing a user-friendly and consistent website experience.

6. Contact by Email

If you contact us by email, we process the information you provide, including your email address, name, message content and any other information you provide voluntarily, in order to process and answer your inquiry.

If your inquiry concerns a potential or existing contractual relationship, the legal basis is Art. 6 (1) (b) GDPR. For other inquiries, processing is based on Art. 6 (1) (f) GDPR, based on our legitimate interest in responding to incoming communications efficiently and appropriately.

Please avoid sending special categories of personal data or other particularly sensitive information by unencrypted email unless this is necessary and appropriate.

7. Links to Instagram and LinkedIn

Our website contains links to our profiles on Instagram and LinkedIn. These are external links only. We do not embed social-media feeds, tracking pixels or social plugins from these platforms on this website.

A connection to the respective platform is established only when you click the relevant link. The platform operator is responsible for the data processing that occurs after you leave our website.

8. Recipients of Personal Data

Personal data is disclosed only where this is necessary for the purposes described in this privacy policy, where we are legally required to do so, or where you have consented.

Possible recipients include Vercel Inc. as hosting and Web Analytics provider, internal departments involved in processing inquiries, and external advisers or service providers where required for legal or business purposes.

9. Processing Outside the EEA

Vercel is a company based in the United States and operates an international infrastructure. As a result, personal data may be processed in the United States or other countries outside the European Economic Area.

Vercel states that it participates in the EU-U.S. Data Privacy Framework and also provides contractual safeguards, including Standard Contractual Clauses where required. We use the applicable contractual safeguards for transfers of personal data in accordance with Art. 44 et seq. GDPR.

Further information is available in Vercel's privacy and data protection documentation at vercel.com/legal and vercel.com/docs/analytics/privacy-policy.

10. Storage Period

We retain personal data only for as long as necessary for the respective purpose or for as long as statutory retention obligations require.

Business correspondence may be subject to statutory commercial or tax retention periods. Analytics visitor sessions used by Vercel Web Analytics are, according to Vercel, automatically discarded after 24 hours; aggregated analytics statistics may remain available in accordance with the Vercel service and plan used.

11. Automated Decision-Making

Automated decision-making, including profiling within the meaning of Art. 22 GDPR, does not take place on this website.

12. Your Rights

Within the scope of the applicable legal requirements, you have in particular the right of access under Art. 15 GDPR, rectification under Art. 16 GDPR, erasure under Art. 17 GDPR, restriction of processing under Art. 18 GDPR, data portability under Art. 20 GDPR, objection under Art. 21 GDPR, and withdrawal of consent with effect for the future where processing is based on consent.

To exercise your rights, please contact datenschutz@dresdnerspitzen.com.

13. Objection to Processing Based on Legitimate Interests

Where we process personal data on the basis of Art. 6 (1) (f) GDPR, you may object at any time for reasons arising from your particular situation. We will then cease the relevant processing unless compelling legitimate grounds for the processing override your interests, rights and freedoms, or the processing is required for the establishment, exercise or defence of legal claims.

14. Right to Lodge a Complaint

You have the right to lodge a complaint with a data protection supervisory authority if you believe that the processing of your personal data infringes data protection law.

The supervisory authority responsible for Saxony is:

Sächsische Datenschutz- und Transparenzbeauftragte
Maternistraße 17
01067 Dresden
Germany

15. Changes to this Privacy Policy

We may update this privacy policy if the website, the services used or the legal requirements change. The version published on this website at the relevant time applies.`;

const privacyTextDe = `Stand: 20. August 2026

1. Verantwortlicher

Verantwortlicher für die Verarbeitung personenbezogener Daten auf dieser Website ist:

DreGuS GmbH & Co. KG
Breitscheidstraße 78
01237 Dresden
Deutschland
Telefon: +49 351 2048 0
E-Mail: sales@dresdnerspitzen.com

Vertreten durch: Dr.-Ing. Sascha Schröder

Für Datenschutzanfragen erreichen Sie uns unter: datenschutz@dresdnerspitzen.com

2. Allgemeine Hinweise

Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung unserer Website, zur Kommunikation mit Besuchern, zur Anbahnung und Durchführung von Geschäftsbeziehungen, zur Erfüllung gesetzlicher Verpflichtungen sowie zur Verbesserung unseres Webangebots erforderlich ist.

Je nach Verarbeitungszweck erfolgt die Verarbeitung insbesondere auf Grundlage von Art. 6 Abs. 1 lit. b, c, f oder – soweit erforderlich – lit. a DSGVO.

3. Hosting und Serverprotokolle – Vercel

Diese Website wird über Vercel Inc., USA ("Vercel"), gehostet und ausgeliefert. Vercel stellt die technische Infrastruktur, das Edge-Netzwerk und weitere Dienste bereit, die für die Bereitstellung der Website erforderlich sind.

Beim Aufruf der Website können technisch notwendige Verbindungs- und Zugriffsdaten verarbeitet werden. Dazu gehören insbesondere die IP-Adresse, Datum und Uhrzeit der Anfrage, die aufgerufene Ressource, Referrer, Browser- und Geräteinformationen sowie technische Anfragedaten.

Die Verarbeitung erfolgt zur Auslieferung der Website, zur Gewährleistung von Stabilität und Sicherheit, zur Erkennung technischer Fehler und zur Missbrauchsprävention. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im sicheren, zuverlässigen und technisch effizienten Betrieb unserer Website.

Soweit Vercel personenbezogene Daten in unserem Auftrag verarbeitet, setzen wir Vercel als Auftragsverarbeiter gemäß Art. 28 DSGVO auf Grundlage der geltenden vertraglichen Datenschutzregelungen ein.

4. Vercel Web Analytics

Wir nutzen Vercel Web Analytics, um aggregierte statistische Informationen über die Nutzung unserer Website zu erhalten und Inhalte, Struktur und technische Leistung unseres Webangebots zu verbessern.

Nach Angaben von Vercel verwendet Web Analytics keine Drittanbieter-Cookies und erstellt keine dauerhaften websiteübergreifenden Nutzerprofile. Besucher werden anhand eines aus der eingehenden Anfrage erzeugten Hashwerts unterschieden. Nach Angaben von Vercel wird die Besuchersitzung nach 24 Stunden automatisch verworfen; die Analysedaten werden aggregiert bereitgestellt und nicht mit einer einzelnen Person oder deren IP-Adresse verknüpft.

Verarbeitet werden können insbesondere:

aufgerufene Seite oder Route;
Zeitpunkt des Ereignisses;
Referrer;
gefilterte Query-Informationen;
ungefähre geografische Zuordnung;
Browser und Browserversion;
Betriebssystem;
Gerätetyp;
Version des Analytics-Skripts.

Als zusätzliche Datenschutzmaßnahme entfernt unsere Implementierung URL-Query-Strings und URL-Fragmente, bevor Seitenaufrufe an Vercel übermittelt werden. Wir verwenden Vercel Web Analytics nicht für Werbung, websiteübergreifendes Tracking oder die Erstellung individueller Marketingprofile.

Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse besteht in einer datenschutzfreundlichen, aggregierten statistischen Auswertung der Nutzung und der Verbesserung unserer Website. Sie haben das Recht, dieser Verarbeitung aus Gründen, die sich aus Ihrer besonderen Situation ergeben, zu widersprechen.

Zusätzlich können Sie Vercel Web Analytics für zukünftige Besuche über die Opt-out-Funktion auf dieser Seite deaktivieren. In diesem Fall wird die Einstellung "ds-analytics-optout" im lokalen Speicher Ihres Browsers gespeichert, damit Ihre Entscheidung bei späteren Besuchen berücksichtigt werden kann. Diese Einstellung wird ausschließlich zur Speicherung Ihres Analytics-Widerspruchs verwendet.

5. Sprachauswahl

Sie können zwischen der deutschen und der englischen Sprachversion wählen. Die gewählte Sprache wird unter dem Schlüssel "ds-lang" im lokalen Speicher Ihres Browsers gespeichert, damit die Website Ihre Sprachwahl bei späteren Besuchen wiederherstellen kann.

Die Information verbleibt auf Ihrem Endgerät und wird nicht für Werbung oder Analysezwecke verwendet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in einer nutzerfreundlichen und einheitlichen Darstellung der Website.

6. Kontaktaufnahme per E-Mail

Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir die von Ihnen übermittelten Daten, insbesondere Ihre E-Mail-Adresse, Ihren Namen, den Inhalt der Nachricht sowie weitere freiwillig übermittelte Informationen, um Ihre Anfrage zu bearbeiten und zu beantworten.

Bezieht sich Ihre Anfrage auf ein mögliches oder bestehendes Vertragsverhältnis, ist Art. 6 Abs. 1 lit. b DSGVO Rechtsgrundlage. Bei sonstigen Anfragen erfolgt die Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO aufgrund unseres berechtigten Interesses an einer effizienten und ordnungsgemäßen Bearbeitung eingehender Kommunikation.

Bitte übermitteln Sie besondere Kategorien personenbezogener Daten oder andere besonders sensible Informationen nicht per unverschlüsselter E-Mail, sofern dies nicht erforderlich und angemessen ist.

7. Links zu Instagram und LinkedIn

Unsere Website enthält Links zu unseren Profilen bei Instagram und LinkedIn. Es handelt sich ausschließlich um externe Links. Auf dieser Website werden keine Social-Media-Feeds, Tracking-Pixel oder Social Plugins dieser Plattformen eingebunden.

Eine Verbindung zum jeweiligen Anbieter wird erst hergestellt, wenn Sie den entsprechenden Link anklicken. Für die nach dem Verlassen unserer Website stattfindende Datenverarbeitung ist der jeweilige Plattformbetreiber verantwortlich.

8. Empfänger personenbezogener Daten

Personenbezogene Daten werden nur weitergegeben, soweit dies für die in dieser Datenschutzerklärung beschriebenen Zwecke erforderlich ist, eine gesetzliche Verpflichtung besteht oder Sie eingewilligt haben.

Mögliche Empfänger sind insbesondere Vercel Inc. als Hosting- und Web-Analytics-Anbieter, interne Abteilungen, die mit der Bearbeitung von Anfragen befasst sind, sowie externe Berater oder Dienstleister, soweit dies für rechtliche oder geschäftliche Zwecke erforderlich ist.

9. Verarbeitung außerhalb des EWR

Vercel ist ein Unternehmen mit Sitz in den USA und betreibt eine internationale Infrastruktur. Daher können personenbezogene Daten in den USA oder anderen Staaten außerhalb des Europäischen Wirtschaftsraums verarbeitet werden.

Vercel gibt an, am EU-U.S. Data Privacy Framework teilzunehmen und zusätzlich vertragliche Garantien, insbesondere Standardvertragsklauseln, soweit erforderlich, bereitzustellen. Für Übermittlungen personenbezogener Daten werden die jeweils anwendbaren Garantien gemäß Art. 44 ff. DSGVO zugrunde gelegt.

Weitere Informationen finden Sie in den Datenschutz- und Complianceinformationen von Vercel unter vercel.com/legal und vercel.com/docs/analytics/privacy-policy.

10. Speicherdauer

Wir speichern personenbezogene Daten nur so lange, wie dies für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.

Geschäftliche Kommunikation kann gesetzlichen handels- oder steuerrechtlichen Aufbewahrungsfristen unterliegen. Die von Vercel Web Analytics zur Besuchererkennung verwendete Sitzung wird nach Angaben von Vercel nach 24 Stunden automatisch verworfen; aggregierte Analytics-Statistiken können entsprechend dem eingesetzten Vercel-Dienst und Tarif länger verfügbar bleiben.

11. Automatisierte Entscheidungen

Eine automatisierte Entscheidungsfindung einschließlich Profiling im Sinne von Art. 22 DSGVO findet auf dieser Website nicht statt.

12. Ihre Rechte

Sie haben im Rahmen der gesetzlichen Voraussetzungen insbesondere das Recht auf Auskunft nach Art. 15 DSGVO, Berichtigung nach Art. 16 DSGVO, Löschung nach Art. 17 DSGVO, Einschränkung der Verarbeitung nach Art. 18 DSGVO, Datenübertragbarkeit nach Art. 20 DSGVO, Widerspruch nach Art. 21 DSGVO sowie den Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft, soweit eine Verarbeitung auf Einwilligung beruht.

Zur Ausübung Ihrer Rechte wenden Sie sich bitte an datenschutz@dresdnerspitzen.com.

13. Widerspruch gegen Verarbeitungen aufgrund berechtigter Interessen

Soweit wir personenbezogene Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO verarbeiten, können Sie aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit Widerspruch gegen die Verarbeitung einlegen. Wir beenden die betreffende Verarbeitung anschließend, sofern nicht zwingende schutzwürdige Gründe für die Verarbeitung Ihre Interessen, Rechte und Freiheiten überwiegen oder die Verarbeitung der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen dient.

14. Beschwerderecht

Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen Datenschutzrecht verstößt.

Die für Sachsen zuständige Aufsichtsbehörde ist:

Sächsische Datenschutz- und Transparenzbeauftragte
Maternistraße 17
01067 Dresden
Deutschland

15. Änderungen dieser Datenschutzerklärung

Wir können diese Datenschutzerklärung anpassen, wenn sich die Website, die eingesetzten Dienste oder die rechtlichen Anforderungen ändern. Es gilt die jeweils auf dieser Website veröffentlichte Fassung.`;

const Privacy = () => {
  const { t } = useLang();
  const [analyticsDisabled, setAnalyticsDisabled] = useState(() =>
    typeof window !== "undefined" && localStorage.getItem("ds-analytics-optout") === "1"
  );

  const content = t(privacyTextEn, privacyTextDe);

  const toggleAnalytics = () => {
    const nextValue = !analyticsDisabled;
    setAnalyticsDisabled(nextValue);

    if (nextValue) {
      localStorage.setItem("ds-analytics-optout", "1");
    } else {
      localStorage.removeItem("ds-analytics-optout");
    }
  };

  return (
    <EditorialLayout heroAtTop={true}>
      <SEO
        title={t("Privacy Policy", "Datenschutzerklärung")}
        description={t(
          "Information on how personal data is processed when using the Dresdner Spitzen website.",
          "Informationen zur Verarbeitung personenbezogener Daten bei der Nutzung der Website von Dresdner Spitzen."
        )}
        path="/privacy"
      />
      <section className="mt-20 md:mt-24 pt-8 md:pt-12 pb-8 md:pb-12 w-full px-4 md:px-8">
        <div className="editorial-container w-full max-w-none">
          <h1 className="editorial-heading-xl mb-6">
            {t("Privacy Policy", "Datenschutzerklärung")}
          </h1>

          <div className="mb-10 border-y border-border py-6">
            <p className="editorial-body mb-3">
              {t("Vercel Web Analytics preference", "Einstellung für Vercel Web Analytics")}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              {analyticsDisabled
                ? t(
                    "Analytics is currently disabled in this browser.",
                    "Analytics ist in diesem Browser derzeit deaktiviert."
                  )
                : t(
                    "Analytics is currently enabled. Vercel Web Analytics is cookieless; you can nevertheless opt out here.",
                    "Analytics ist derzeit aktiviert. Vercel Web Analytics verwendet keine Analytics-Cookies; Sie können der Analyse dennoch hier widersprechen."
                  )}
            </p>
            <button
              type="button"
              onClick={toggleAnalytics}
              className="inline-flex items-center border border-foreground px-4 py-2 text-sm transition-colors hover:bg-foreground hover:text-background"
            >
              {analyticsDisabled
                ? t("Enable analytics", "Analytics aktivieren")
                : t("Disable analytics", "Analytics deaktivieren")}
            </button>
          </div>

          <div className="editorial-body text-muted-foreground whitespace-pre-line w-full">
            {content}
          </div>
        </div>
      </section>
    </EditorialLayout>
  );
};

export default Privacy;
