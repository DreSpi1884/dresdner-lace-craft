import EditorialLayout from "@/components/EditorialLayout";
import SEO from "@/components/SEO";
import { useLang } from "@/i18n/LanguageContext";

const privacyTextEn = `Last updated: 28 July 2026

1. Data Controller

The data controller for the processing of personal data on this website is:

DreGuS GmbH & Co. KG
Breitscheidstraße 78
01237 Dresden
Germany
Phone: +49 351 2048 0
Email: sales@dresdnerspitzen.com

Represented by: Dr.-Ing. Sascha Schröder

2. General Information

We process personal data only to the extent necessary to provide our website, process inquiries, initiate and execute business relationships, or fulfill legal obligations.

Personal data is any information relating to an identified or identifiable natural person.

Processing is carried out in particular on the basis of:

Art. 6 (1) (b) GDPR, insofar as processing is necessary for the performance of pre-contractual measures or a contract;
Art. 6 (1) (c) GDPR, insofar as we are subject to legal obligations;
Art. 6 (1) (f) GDPR, insofar as processing is necessary for the protection of our legitimate interests or the legitimate interests of third parties;
Art. 6 (1) (a) GDPR, insofar as we have obtained prior consent.

3. Hosting and Server Logs

This website is hosted by the following provider:

IONOS SE
Elgendorfer Straße 57
56410 Montabaur
Germany

When the website is accessed, technically necessary access data is processed. This may include, in particular, the page or file accessed, date and time of access, browser type and version, operating system, device type, referrer URL, and IP address.

Processing is carried out to deliver the website, ensure its stability and security, detect technical errors, and prevent misuse.

The legal basis is Art. 6 (1) (f) GDPR. Our legitimate interest lies in the secure, reliable, and technically flawless operation of the website.

According to IONOS, visitor data collected for web hosting is immediately anonymized and stored for up to eight weeks. According to IONOS, no data is passed on to third parties or transferred to countries outside the European Union for this hosting data.

4. IONOS WebAnalytics

As part of IONOS hosting, IONOS WebAnalytics is used. The evaluation is carried out via log files or a tracking pixel. According to IONOS, WebAnalytics does not use cookies.

The following are processed in particular:

the previously visited website;
the page or file accessed;
browser type and version;
operating system;
device type;
time of access;
the IP address in anonymized form for the approximate determination of the location of access.

The IP address is technically transmitted when a page is accessed and is then immediately anonymized according to IONOS.

The data is processed for statistical evaluation and technical optimization of our web offer. The legal basis is Art. 6 (1) (f) GDPR. Our legitimate interest lies in the analysis of general usage and the improvement of our website.

According to IONOS, no personal visitor profiles are created via WebAnalytics and no data is passed on to third parties.

5. Language Selection

On the website, you can choose between the German and English language versions. The selected language is stored under the key "ds-lang" in your browser's local storage.

This allows the website to restore your language selection on a subsequent visit. The information is stored exclusively on your end device and is not used for analysis or advertising purposes.

The legal basis is Art. 6 (1) (f) GDPR. Our legitimate interest lies in a user-friendly and uniform presentation of the website. Storage is also necessary to provide the language function you have expressly chosen.

You can delete the stored language selection at any time by removing the website or browser data in your browser.

6. Contact by Email

If you contact us by email, we process the data you transmit, in particular your email address, your name, the content of your message, and any other information you provide voluntarily.

Processing is carried out to process and answer your inquiry.

If your inquiry relates to a possible contract or an existing business relationship, Art. 6 (1) (b) GDPR is the legal basis. For general inquiries, processing is based on Art. 6 (1) (f) GDPR. Our legitimate interest lies in the proper handling of incoming communication.

7. Links to Instagram and LinkedIn

Our website contains links to our profiles on Instagram and LinkedIn. These are merely external links. No social media plugins, feeds, or tracking pixels from these providers are integrated into our website.

Only when you click on such a link do you leave our website and a connection to the respective provider is established. In doing so, your IP address, device, and browser information, as well as the information that you reached the respective offer from our website, may be processed.

The respective platform operator is responsible for the data processing that takes place after clicking. The use of the platforms is subject to their own data protection provisions.

8. Recipients of Personal Data

Personal data will only be transferred to recipients if this is necessary to fulfill the described purposes, if a legal obligation exists, or if you have consented.

Possible recipients include in particular:

IONOS SE as hosting and WebAnalytics provider;
internal departments and employees involved in processing your inquiry;
external advisors or service providers, insofar as this is necessary for the fulfillment of legal or business obligations.

Insofar as service providers process data exclusively on our behalf, they are used as processors in accordance with legal requirements.

9. Storage Period

We store personal data only as long as is necessary for the respective processing purpose.

After completion of an inquiry, the data will be deleted unless a further business relationship arises and there are no legal retention obligations or legitimate interests in further storage.

Business communication may be subject to legal commercial or tax retention periods. In this case, processing is limited to the fulfillment of these obligations.

10. Obligation to Provide Data

The provision of personal data is generally not required by law or contract.

However, certain information, in particular name and email address, is required so that we can process and answer an inquiry. Without this information, processing is not possible.

11. Automated Decisions

Automated decision-making, including profiling within the meaning of Art. 22 GDPR, does not take place.

13. Your Rights

You have the following rights in particular within the scope of legal requirements:

Right of access under Art. 15 GDPR;
Right to rectification under Art. 16 GDPR;
Right to erasure under Art. 17 GDPR;
Right to restriction of processing under Art. 18 GDPR;
Right to data portability under Art. 20 GDPR;
Right to object under Art. 21 GDPR;
Right to withdraw consent given with effect for the future.

The withdrawal of consent does not affect the lawfulness of the processing that took place until the withdrawal.

To exercise your rights, you can contact datenschutz@dresdnerspitzen.com. The rights may be restricted if legal exceptions or retention obligations stand in the way.

14. Objection to Processing Based on Legitimate Interests

Insofar as we process personal data on the basis of Art. 6 (1) (f) GDPR, you have the right to object to the processing at any time for reasons arising from your particular situation.

We will then no longer process the data concerned unless we can demonstrate compelling legitimate grounds for processing that outweigh your interests, rights, and freedoms, or the processing serves the assertion, exercise, or defense of legal claims.

15. Right of Complaint

You have the right to complain to a data protection supervisory authority if you believe that the processing of your personal data violates data protection law.

The supervisory authority responsible for Saxony is:

Sächsische Datenschutz- und Transparenzbeauftragte
Maternistraße 17
01067 Dresden
Germany

You can also contact any other data protection supervisory authority responsible for you.

16. Changes to this Privacy Policy

We may adjust this privacy policy if the website, the services used, or the legal requirements change. The version published on this website at the time applies.`;

const privacyTextDe = `Stand: 28. Juli 2026

1. Verantwortlicher

Verantwortlicher für die Verarbeitung personenbezogener Daten auf dieser Website ist:

DreGuS GmbH & Co. KG
Breitscheidstraße 78
01237 Dresden
Deutschland
Telefon: +49 351 2048 0
E-Mail: sales@dresdnerspitzen.com

Vertreten durch: Dr.-Ing. Sascha Schröder

2. Allgemeine Hinweise

Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung unserer Website, zur Bearbeitung von Anfragen, zur Anbahnung und Durchführung von Geschäftsbeziehungen oder zur Erfüllung gesetzlicher Verpflichtungen erforderlich ist.

Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen.

Die Verarbeitung erfolgt insbesondere auf Grundlage von:

Art. 6 Abs. 1 lit. b DSGVO, soweit die Verarbeitung zur Durchführung vorvertraglicher Maßnahmen oder zur Erfüllung eines Vertrags erforderlich ist;
Art. 6 Abs. 1 lit. c DSGVO, soweit wir rechtlichen Verpflichtungen unterliegen;
Art. 6 Abs. 1 lit. f DSGVO, soweit die Verarbeitung zur Wahrung unserer berechtigten Interessen oder der berechtigten Interessen Dritter erforderlich ist;
Art. 6 Abs. 1 lit. a DSGVO, soweit wir zuvor eine Einwilligung eingeholt haben.

3. Hosting und Serverprotokolle

Diese Website wird bei folgendem Anbieter gehostet:

IONOS SE
Elgendorfer Straße 57
56410 Montabaur
Deutschland

Beim Aufruf der Website werden technisch erforderliche Zugriffsdaten verarbeitet. Dazu können insbesondere die aufgerufene Seite oder Datei, Datum und Uhrzeit des Zugriffs, Browsertyp und Browserversion, Betriebssystem, Gerätetyp, Referrer-URL sowie die IP-Adresse gehören.

Die Verarbeitung erfolgt, um die Website auszuliefern, ihre Stabilität und Sicherheit zu gewährleisten, technische Fehler zu erkennen und Missbrauch zu verhindern.

Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse besteht im sicheren, zuverlässigen und technisch einwandfreien Betrieb der Website.

Nach den Angaben von IONOS werden die für Webhosting erhobenen Besucherdaten unmittelbar anonymisiert und bis zu acht Wochen gespeichert. Eine Weitergabe an Dritte oder Übermittlung in Staaten außerhalb der Europäischen Union findet laut IONOS für diese Hostingdaten nicht statt.

4. IONOS WebAnalytics

Im Rahmen des IONOS-Hostings wird IONOS WebAnalytics eingesetzt. Die Auswertung erfolgt über Logdateien oder einen Zählpixel. Nach Angaben von IONOS verwendet WebAnalytics dabei keine Cookies.

Verarbeitet werden insbesondere:

die zuvor besuchte Website;
die aufgerufene Seite oder Datei;
Browsertyp und Browserversion;
Betriebssystem;
Gerätetyp;
Zeitpunkt des Zugriffs;
die IP-Adresse in anonymisierter Form zur ungefähren Bestimmung des Zugriffsortes.

Die IP-Adresse wird bei der Übermittlung eines Seitenaufrufs technisch übertragen und anschließend nach Angaben von IONOS unmittelbar anonymisiert.

Die Daten werden zur statistischen Auswertung und technischen Optimierung unseres Webangebots verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der Analyse der allgemeinen Nutzung und der Verbesserung unserer Website.

Nach Angaben von IONOS werden über WebAnalytics keine personenbezogenen Besucherprofile erstellt und keine Daten an Dritte weitergegeben.

5. Sprachauswahl

Auf der Website können Sie zwischen der deutschen und englischen Sprachversion wählen. Die gewählte Sprache wird unter dem Schlüssel „ds-lang“ im lokalen Speicher Ihres Browsers gespeichert.

Dadurch kann die Website Ihre Sprachauswahl bei einem späteren Besuch wiederherstellen. Die Information wird ausschließlich auf Ihrem Endgerät gespeichert und nicht zu Analyse- oder Werbezwecken verwendet.

Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse besteht in einer benutzerfreundlichen und einheitlichen Darstellung der Website. Die Speicherung ist außerdem erforderlich, um die von Ihnen ausdrücklich gewählte Sprachfunktion bereitzustellen.

Sie können die gespeicherte Sprachauswahl jederzeit löschen, indem Sie die Website- beziehungsweise Browserdaten in Ihrem Browser entfernen.

6. Kontaktaufnahme per E-Mail

Wenn Sie uns per E-Mail kontaktieren, werden die von Ihnen übermittelten personenbezogenen Daten (z. B. E-Mail-Adresse, Name, Inhalt der Nachricht sowie Zeitpunkt der Übermittlung) von uns verarbeitet, um Ihre Anfrage zu bearbeiten und zu beantworten.

Die Verarbeitung dieser Daten erfolgt zur Bearbeitung Ihrer Anfrage oder zur Durchführung vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO). Sofern Ihre Anfrage nicht auf den Abschluss oder die Erfüllung eines Vertrags gerichtet ist, erfolgt die Verarbeitung auf Grundlage unseres berechtigten Interesses an einer effizienten und ordnungsgemäßen Bearbeitung von Anfragen (Art. 6 Abs. 1 lit. f DSGVO).

Die von Ihnen per E-Mail übersandten Daten verbleiben bei uns, bis der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen, insbesondere gesetzliche Aufbewahrungsfristen (z. B. nach HGB oder AO bei geschäftlicher Korrespondenz), bleiben unberührt.

Bitte beachten Sie, dass die Datenübertragung im Internet bei der Kommunikation per unverschlüsselter E-Mail Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich. Übermitteln Sie uns daher bitte keine besonderen Kategorien personenbezogener Daten (z. B. Gesundheitsdaten, Angaben zur ethnischen Herkunft, Religion oder Gewerkschaftszugehörigkeit) per unverschlüsselter E-Mail.

7. Links zu Instagram und LinkedIn

Unsere Website enthält Links zu unseren Profilen bei Instagram und LinkedIn. Es handelt sich lediglich um externe Links. Auf unserer Website werden keine Social-Media-Plugins, Feeds oder Tracking-Pixel dieser Anbieter eingebunden.

Erst wenn Sie einen solchen Link anklicken, verlassen Sie unsere Website und es wird eine Verbindung zum jeweiligen Anbieter hergestellt. Dabei können insbesondere Ihre IP-Adresse, Geräte- und Browserinformationen sowie die Information verarbeitet werden, dass Sie von unserer Website auf das jeweilige Angebot gelangt sind.

Für die nach dem Anklicken erfolgende Datenverarbeitung ist der jeweilige Plattformbetreiber verantwortlich. Die Nutzung der Plattformen richtet sich nach deren eigenen Datenschutzbestimmungen.

8. Empfänger personenbezogener Daten

Personenbezogene Daten werden nur an Empfänger übermittelt, wenn dies zur Erfüllung der beschriebenen Zwecke erforderlich ist, eine gesetzliche Verpflichtung besteht oder Sie eingewilligt haben.

Zu den möglichen Empfängern gehören insbesondere:

IONOS SE als Hosting- und WebAnalytics-Anbieter;
interne Abteilungen und Beschäftigte, die mit der Bearbeitung Ihrer Anfrage befasst sind;
externe Berater oder Dienstleister, soweit dies für die Erfüllung rechtlicher oder geschäftlicher Pflichten erforderlich ist.

Soweit Dienstleister Daten ausschließlich in unserem Auftrag verarbeiten, werden sie entsprechend den gesetzlichen Anforderungen als Auftragsverarbeiter eingesetzt.

9. Speicherdauer

Wir speichern personenbezogene Daten nur so lange, wie dies für den jeweiligen Verarbeitungszweck erforderlich ist.

Nach Abschluss einer Anfrage werden die Daten gelöscht, sofern keine weitere Geschäftsbeziehung entsteht und keine gesetzlichen Aufbewahrungspflichten oder berechtigten Interessen an einer weiteren Speicherung bestehen.

Geschäftliche Kommunikation kann gesetzlichen handels- oder steuerrechtlichen Aufbewahrungsfristen unterliegen. In diesem Fall wird die Verarbeitung auf die Erfüllung dieser Pflichten beschränkt.

10. Pflicht zur Bereitstellung von Daten

Die Bereitstellung personenbezogener Daten ist grundsätzlich weder gesetzlich noch vertraglich vorgeschrieben.

Bestimmte Angaben, insbesondere Name und E-Mail-Adresse, sind jedoch erforderlich, damit wir eine Anfrage bearbeiten und beantworten können. Ohne diese Angaben ist eine Bearbeitung nicht möglich.

11. Automatisierte Entscheidungen

Eine automatisierte Entscheidungsfindung einschließlich Profiling im Sinne von Art. 22 DSGVO findet nicht statt.

12. Ihre Rechte

Sie haben im Rahmen der gesetzlichen Voraussetzungen insbesondere folgende Rechte:

Recht auf Auskunft nach Art. 15 DSGVO;
Recht auf Berichtigung nach Art. 16 DSGVO;
Recht auf Löschung nach Art. 17 DSGVO;
Recht auf Einschränkung der Verarbeitung nach Art. 18 DSGVO;
Recht auf Datenübertragbarkeit nach Art. 20 DSGVO;
Recht auf Widerspruch nach Art. 21 DSGVO;
Recht auf Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft.

Der Widerruf einer Einwilligung berührt nicht die Rechtmäßigkeit der Verarbeitung, die bis zum Widerruf erfolgt ist.

Zur Ausübung Ihrer Rechte können Sie sich an datenschutz@dresdnerspitzen.com wenden. Die Rechte können eingeschränkt sein, wenn gesetzliche Ausnahmen oder Aufbewahrungspflichten entgegenstehen.

13. Widerspruch gegen Verarbeitungen aufgrund berechtigter Interessen

Soweit wir personenbezogene Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO verarbeiten, haben Sie das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit Widerspruch gegen die Verarbeitung einlegen.

Wir verarbeiten die betreffenden Daten anschließend nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.

14. Beschwerderecht

Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen Datenschutzrecht verstößt.

Die für Sachsen zuständige Aufsichtsbehörde ist:

Sächsische Datenschutz- und Transparenzbeauftragte
Maternistraße 17
01067 Dresden
Deutschland

Sie können sich auch an eine andere für Sie zuständige Datenschutzaufsichtsbehörde wenden.

15. Änderungen dieser Datenschutzerklärung

Wir können diese Datenschutzerklärung anpassen, wenn sich die Website, die eingesetzten Dienste oder die rechtlichen Anforderungen ändern. Es gilt die jeweils auf dieser Website veröffentlichte Fassung.`;

const Privacy = () => {
  const { t } = useLang();
  
  const content = t(privacyTextEn, privacyTextDe);

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
          <div className="editorial-body text-muted-foreground whitespace-pre-line w-full">
            {content}
          </div>
        </div>
      </section>
    </EditorialLayout>
  );
};

export default Privacy;
