import EditorialLayout from "@/components/EditorialLayout";
import SEO from "@/components/SEO";
import { useLang } from "@/i18n/LanguageContext";

const Privacy = () => {
  const { t } = useLang();
  return (
    <EditorialLayout heroAtTop={true}>
      <SEO
        title={t("Privacy Policy", "Datenschutzerklärung")}
        description={t(
          "How Dresdner Spitzen handles your data, in compliance with GDPR.",
          "Wie Dresdner Spitzen Ihre Daten gemäß DSGVO verarbeitet."
        )}
        path="/privacy"
      />
      <section className="mt-20 md:mt-24 pt-8 md:pt-12 pb-8 md:pb-12">
        <div className="editorial-container max-w-3xl">
          <h1 className="editorial-heading-xl mb-6">{t("Privacy Policy", "Datenschutzerklärung")}</h1>
          <div className="editorial-body text-muted-foreground whitespace-pre-wrap">

            <p>
              {t(
                `Datenschutzerklärung nach den Vorgaben der DSGVO

I.         Name und Anschrift des Verantwortlichen

Der Verantwortliche im Sinne der Datenschutz-Grundverordnung und anderer nationaler Datenschutzgesetze der Mitgliedsstaaten sowie sonstiger datenschutzrechtlicher Bestimmungen ist die:

 

DreGuS GmbH & Co. KG

Breitscheidstr. 78

01237 Dresden

Telefon: +49 (0) 351 204 8 20

E-Mail: sales@dresdnerspitzen.com

 

II.       Allgemeines zur Datenverarbeitung
1.        Umfang der Verarbeitung personenbezogener Daten

Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit dies zur Bereitstellung einer funktionsfähigen Webseite sowie unserer Inhalte und Leistungen erforderlich ist. Die Verarbeitung personenbezogener Daten unserer Nutzer erfolgt regelmäßig nur nach Einwilligung des Nutzers. Eine Ausnahme gilt in solchen Fällen, in denen eine vorherige Einholung einer Einwilligung aus tatsächlichen Gründen nicht möglich ist und die Verarbeitung der Daten durch gesetzliche Vorschriften gestattet ist.

 

2.        Rechtsgrundlage für die Verarbeitung personenbezogener Daten

Soweit wir für Verarbeitungsvorgänge personenbezogener Daten eine Einwilligung der betroffenen Person einholen, dient Art. 6 Abs. 1 lit. a EU-Datenschutzgrundverordnung (DSGVO) als Rechtsgrundlage.

Bei der Verarbeitung von personenbezogenen Daten, die zur Erfüllung eines Vertrages, dessen Vertragspartei die betroffene Person ist, erforderlich ist, dient Art. 6 Abs. 1 lit. B DSGVO als Rechtsgrundlage. Dies gilt auch für Verarbeitungsvorgänge, die zur Durchführung vorvertraglicher Maßnahmen erforderlich sind.

Soweit eine Verarbeitung personenbezogener Daten zur Erfüllung einer rechtlichen Verpflichtung erforderlich ist, der unser Unternehmen unterliegt, dient Art. 6 Abs. 1 lit. c DSGVO als Rechtsgrundlage.

Für den Fall, dass lebenswichtige Interessen der betroffenen Person oder einer anderen natürlichen Person eine Verarbeitung personenbezogener Daten erforderlich machen, dient Art. 6 Abs. 1 lit. d DSGVO als Rechtsgrundlage.

Ist die Verarbeitung zur Wahrung eines berechtigten Interesses unseres Unternehmens oder eines Dritten erforderlich und überwiegen die Interessen, Grundrechte und Grundfreiheiten des Betroffenen das erstgenannte Interesse nicht, so dient Art. 6 Abs. 1 lit. f DSGVO als Rechtsgrundlage für die Verarbeitung.

3.        Datenlöschung und Speicherdauer

Die personenbezogenen Daten der betroffenen Person werden gelöscht oder gesperrt, sobald der Zweck der Speicherung entfällt. Eine Speicherung kann darüber hinaus erfolgen, wenn dies durch den europäischen oder nationalen Gesetzgeber in unionsrechtlichen Verordnungen, Gesetzen oder sonstigen Vorschriften, denen der Verantwortliche unterliegt, vorgesehen wurde. Eine Sperrung oder Löschung der Daten erfolgt auch dann, wenn eine durch die genannten Normen vorgeschriebene Speicherfrist abläuft, es sei denn, dass eine Erforderlichkeit zur weiteren Speicherung der Daten für einen Vertragsabschluss oder eine Vertragserfüllung besteht.

 

III.    Bereitstellung der Webseite und Erstellung von Logfiles
1.        Beschreibung und Umfang der Datenverarbeitung

Bei jedem Aufruf unserer Internetseite erfasst unser System automatisiert Daten und Informationen vom Computersystem des aufrufenden Rechners.

Folgende Daten werden hierbei erhoben:

(1)   Informationen über den Browsertyp und die verwendete Version

(2)   Das Betriebssystem des Nutzers

(3)   Den Internet-Service-Provider des Nutzers

(4)   Die IP-Adresse des Nutzers

(5)   Datum und Uhrzeit des Zugriffs

(6)   Webseiten, von denen das System des Nutzers auf unsere Internetseite gelangt

(7)   Webseiten, die vom System des Nutzers über unsere Webseite aufgerufen werden

(8)   Name und URL der abgerufenen Datei

(9)   Meldung, ob der Abruf erfolgreich war

Die Daten werden ebenfalls in den Logfiles unseres Systems gespeichert. Eine Speicherung dieser Daten zusammen mit anderen personenbezogenen Daten des Nutzers findet nicht statt.

2.        Rechtsgrundlage für die Datenverarbeitung

Rechtsgrundlage für die vorübergehende Speicherung der Daten und der Logfiles ist Art. 6 Abs. 1 lit. f DSGVO.

3.        Zweck der Datenverarbeitung

Die vorübergehende Speicherung der IP-Adresse durch das System ist notwendig, um eine Auslieferung der Webseite an den Rechner des Nutzers zu ermöglichen. Hierfür muss die IP‑Adresse des Nutzers für die Dauer der Sitzung gespeichert bleiben.

 

Die Speicherung in Logfiles erfolgt, um die Funktionsfähigkeit der Webseite sicherzustellen. Zudem dienen uns die Daten zur Optimierung der Webseite und zur Sicherstellung der Sicherheit unserer informationstechnischen Systeme. Eine Auswertung der Daten zu Marketingzwecken findet in diesem Zusammenhang nicht statt.

 

In diesen Zwecken liegt auch unser berechtigtes Interesse an der Datenverarbeitung nach Art. 6 Abs. 1 lit. f DSGVO.

 

4.        Dauer der Speicherung

Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich sind. Im Falle der Erfassung der Daten zur Bereitstellung der Webseite ist dies der Fall, wenn die jeweilige Sitzung beendet ist.

Im Falle der Speicherung der Daten in Logfiles ist dies nach spätestens sieben Tagen der Fall. Eine darüberhinausgehende Speicherung ist möglich. In diesem Fall werden die IP-Adressen der Nutzer gelöscht oder verfremdet, sodass eine Zuordnung des aufrufenden Clients nicht mehr möglich ist.

5.        Widerspruchs- und Beseitigungsmöglichkeit

Die Erfassung der Daten zur Bereitstellung der Webseite und die Speicherung der Daten in Logfiles ist für den Betrieb der Internetseite zwingend erforderlich. Es besteht folglich seitens des Nutzers keine Widerspruchsmöglichkeit.

IV.    Verwendung von Cookies

a) Beschreibung und Umfang der Datenverarbeitung

Unsere Webseite verwendet Cookies. Bei Cookies handelt es sich um Textdateien, die im Internetbrowser bzw. vom Internetbrowser auf dem Computersystem des Nutzers gespeichert werden. Ruft ein Nutzer eine Webseite auf, so kann ein Cookie auf dem Betriebssystem des Nutzers gespeichert werden. Dieser Cookie enthält eine charakteristische Zeichenfolge, die eine eindeutige Identifizierung des Browsers beim erneuten Aufrufen der Webseite ermöglicht.

Wir setzen Cookies ein, um unsere Webseite nutzerfreundlicher zu gestalten. Einige Elemente unserer Internetseite erfordern es, dass der aufrufende Browser auch nach einem Seitenwechsel identifiziert werden kann.

In den Cookies werden dabei folgende Daten gespeichert und übermittelt:

(1)   Spracheinstellungen

(2)   Browsertyp/ Browserversion

(3)   Verwendetes Betriebssystem

(4)   Referrer URL

(5)   Hostname des zugreifenden Rechners

(6)   Uhrzeit der Serveranfrage

b) Rechtsgrundlage für die Datenverarbeitung

Die Rechtsgrundlage für die Verarbeitung personenbezogener Daten unter Verwendung von Cookies ist Art. 6 Abs. 1 lit. f DSGVO.

 

c) Zweck der Datenverarbeitung

Der Zweck der Verwendung technisch notwendiger Cookies ist, die Nutzung von Webseiten für die Nutzer zu vereinfachen. Einige Funktionen unserer Internetseite können ohne den Einsatz von Cookies nicht angeboten werden. Für diese ist es erforderlich, dass der Browser auch nach einem Seitenwechsel wiedererkannt wird.

Für folgende Anwendungen benötigen wir Cookies:

(1)   Kontaktaufnahme

(2)   Produkt- und Supportanfragen

(3)   Anfordern von Informationen

(4)   Übernahme von Spracheinstellungen

(5)   Merken von Suchbegriffen

Die durch technisch notwendige Cookies erhobenen Nutzerdaten werden nicht zur Erstellung von Nutzerprofilen verwendet.

In diesen Zwecken liegt auch unser berechtigtes Interesse in der Verarbeitung der personenbezogenen Daten nach Art. 6 Abs. 1 lit. f DSGVO.

e) Dauer der Speicherung, Widerspruchs- und Beseitigungsmöglichkeit

Cookies werden auf dem Rechner des Nutzers gespeichert und von diesem an unsere Seite übermittelt. Daher haben Sie als Nutzer auch die volle Kontrolle über die Verwendung von Cookies. Durch eine Änderung der Einstellungen in Ihrem Internetbrowser können Sie die Übertragung von Cookies deaktivieren oder einschränken. Bereits gespeicherte Cookies können jederzeit gelöscht werden. Dies kann auch automatisiert erfolgen. Werden Cookies für unsere Webseite deaktiviert, können möglicherweise nicht mehr alle Funktionen der Webseite vollumfänglich genutzt werden.

V.            E-Mail-Kontakt
1.      Beschreibung und Umfang der Datenverarbeitung

Auf unserer Internetseite ist eine Kontaktaufnahme über die bereitgestellten E-Mail-Adressen möglich, welche für die elektronische Kontaktaufnahme genutzt werden können.

Für die Verarbeitung der Daten wird im Rahmen des Absendevorgangs Ihre Einwilligung erteilt und auf diese Datenschutzerklärung verwiesen.

In diesem Fall werden die mit der E-Mail übermittelten personenbezogenen Daten des Nutzers gespeichert.

 

Es erfolgt in diesem Zusammenhang keine Weitergabe der Daten an Dritte. Die Daten werden ausschließlich für die Verarbeitung der Konversation verwendet.

2.        Rechtsgrundlage für die Datenverarbeitung

Rechtsgrundlage für die Verarbeitung der Daten ist bei Vorliegen einer Einwilligung des Nutzers Art. 6 Abs. 1 lit. a DSGVO.

Rechtsgrundlage für die Verarbeitung der Daten, die im Zuge einer Übersendung einer E‑Mail übermittelt werden, ist Art. 6 Abs. 1 lit. f DSGVO. Zielt der E-Mail-Kontakt auf den Abschluss eines Vertrages ab, so ist zusätzliche Rechtsgrundlage für die Verarbeitung Art. 6 Abs. 1 lit. b DSGVO.

3.        Zweck der Datenverarbeitung

Die per E-Mail an uns übersandten personenbezogenen Daten dienen der Kontaktaufnahme. Hieran liegt auch das erforderliche berechtigte Interesse an der Verarbeitung der Daten.

4.        Dauer der Speicherung

Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich sind. Für die personenbezogenen Daten, die per E-Mail übersandt wurden, ist dies dann der Fall, wenn die jeweilige Konversation mit dem Nutzer beendet ist. Beendet ist die Konversation dann, wenn sich aus den Umständen entnehmen lässt, dass der betroffene Sachverhalt abschließend geklärt ist.

5.        Widerspruchs- und Beseitigungsmöglichkeit

Der Nutzer hat jederzeit die Möglichkeit, seine Einwilligung zur Verarbeitung der personenbezogenen Daten zu widerrufen. Nimmt der Nutzer per E-Mail Kontakt mit uns auf, so kann er der Speicherung seiner personenbezogenen Daten jederzeit widersprechen. In einem solchen Fall kann die Konversation nicht fortgeführt werden.

Diese kann schriftlich auf dem Postweg oder per Email erfolgen.

 

DreGuS GmbH & Co. KG

Breitscheidstr. 78

01237 Dresden

Telefon: +49 (0) 351 204 8 20

Fax: +49 (0) 351 203 1 660

E-Mail: datenschutz@dresdnerspitzen.com

 

Alle personenbezogenen Daten, die im Zuge der Kontaktaufnahme gespeichert wurden, werden in diesem Fall gelöscht.

VI.    Weitergabe personenbezogener Daten an Dritte

1.      Zur Vertragserfüllung

a)      Logistik- und Versandunternehmen

Im Rahmen der Vertragserfüllung werden Ihre personenbezogenen Daten an Logistik- und Versandunternehmen weitergeleitet.

aa) Rechtsgrundlage für die Verarbeitung personenbezogener Daten

 

Die Rechtsgrundlage für die Verarbeitung bzw. Weiterleitung personenbezogener Daten an Logistik- und Versandunternehmen ist Art. 6 Abs. 1 lit. b DSGVO.

 

bb) Zweck für die Verarbeitung bzw. Weiterleitung personenbezogener Daten

 

Zweck der Verarbeitung bzw. Weiterleitung Ihrer personenbezogenen Daten ist die Erfüllung der vertraglichen Verpflichtung insbes. die Lieferung der Leistung aus Vertrag.

 

b)      Kreditinstitute, Zahlungsdienstleister und Abrechnungsfirmen (z.B. Paypal, Kreditkartenunternehmen, Inkassodienstleister)

 

aa) Rechtsgrundlage für die Verarbeitung personenbezogener Daten

Die Rechtsgrundlage für die Verarbeitung bzw. Weiterleitung personenbezogener Daten an Logistik- und Versandunternehmen ist Art. 6 Abs. 1 lit. b DSGVO und für die Durchsetzung von fälligen Forderungen Art. 6 Abs. 1 lit. f DSGVO.

bb) Zweck für die Verarbeitung bzw. Weiterleitung personenbezogener Daten

Zweck der Verarbeitung und Weiterleitung ist die Abrechnung und Einziehung der vertraglichen Forderungen und Rechnungen zur Erfüllung der vertraglichen Beziehungen.

c)      Dauer der Speicherung für a) und b)

In der Regel werden die erhobenen Daten gelöscht, sobald sie nicht mehr benötigt werden. Eine Löschung erfolgt demnach spätestens mit Ablauf der hierfür relevanten gesetzlichen Aufbewahrungsfristen. Diese liegen in der Regel zwischen 3 bis 10 Jahren. 

d)      Widerspruchs- und Beseitigungsmöglichkeit

Als Nutzer haben sie jederzeit die Möglichkeit, der Verarbeitung Ihrer Daten zu widersprechen. Die über Sie gespeicherten Daten können Sie jederzeit auch abändern lassen.

Sind die Daten zur Erfüllung eines Vertrages oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, ist eine vorzeitige Löschung der Daten nur möglich, soweit nicht vertragliche oder gesetzliche Verpflichtungen einer Löschung entgegenstehen.

2.      Google Analytics

a)      Umfang der Verarbeitung personenbezogener Daten

Diese Webseite benutzt Google Analytics einen Webanalysedienst von Google (Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA). Google Analytics verwendet Cookies, die auf Ihrem Computer gespeichert werden und eine Analyse der Benutzung ermöglichen. Dabei handelt es sich um Cookies von Google selbst und sogenannten Drittanbieter-Cookies. Die durch die Cookies erzeugten Informationen über Ihre Benutzung dieser Webseite werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Zur datenschutzkonformen Verarbeitung setzen wir den Code „gat._anonymizeIp();“ ein, um eine anonymisierte Erfassung von IP-Adressen (sog. IP‑Masking) zu gewährleisten.

b)      Rechtsgrundlage für die Verarbeitung personenbezogener Daten

Die Rechtsgrundlage für die Verarbeitung personenbezogener Daten für die Verwendung von Google Analytics Art. 6 Abs. 1 lit. f DSGVO.

 

Rechtsgrundlage für die Verarbeitung der Daten ist bei Vorliegen einer Einwilligung des Nutzers Art. 6 Abs. 1 lit. a DSGVO.

c)      Zweck der Datenverarbeitung

Diese Webseite nutzt Google Analytics, um eine Analyse der Benutzung zu ermöglichen. Die Verarbeitung der personenbezogenen Daten der Nutzer ermöglicht uns eine Analyse des Surfverhaltens unserer Nutzer. Wir sind durch die Auswertung der gewonnen Daten in der Lage, Informationen über die Nutzung der einzelnen Komponenten unserer Webseite zusammenzustellen. Dies hilft uns dabei unsere Webseite und deren Nutzerfreundlichkeit stetig zu verbessern. In diesen Zwecken liegt auch unser berechtigtes Interesse in der Verarbeitung der Daten nach Art. 6 Abs. 1 lit. f DSGVO. Durch die Anonymisierung der IP‑Adresse wird dem Interesse der Nutzer an deren Schutz personenbezogener Daten hinreichend Rechnung getragen.

d)      Dauer der Speicherung

In der Regel werden die erhobenen Daten gelöscht, sobald sie nicht mehr benötigt werden. Eine Löschung erfolgt demnach spätestens mit Ablauf der hierfür relevanten gesetzlichen Aufbewahrungsfristen. Diese liegen in der Regel zwischen 3 bis 10 Jahren. 

e)      Widerspruchs- und Beseitigungsmöglichkeit

Die personenbezogenen Daten der betroffenen Person werden gelöscht oder gesperrt, sobald der Zweck der Speicherung entfällt. Eine Speicherung kann darüber hinaus erfolgen, wenn dies durch den europäischen oder nationalen Gesetzgeber in unionsrechtlichen Verordnungen, Gesetzen oder sonstigen Vorschriften, denen der Verantwortliche unterliegt, vorgesehen wurde. Eine Sperrung oder Löschung der Daten erfolgt auch dann, wenn eine durch die genannten Normen vorgeschriebene Speicherfrist abläuft, es sei denn, dass eine Erforderlichkeit zur weiteren Speicherung der Daten für einen Vertragsabschluss oder eine Vertragserfüllung besteht.

 

Diese kann schriftlich auf dem Postweg oder per Email erfolgen.

Ihre Widerrufs- und Beseitigungsanfrage richten Sie bitte an:

 

DreGuS GmbH & Co. KG

Breitscheidstr. 78

01237 Dresden

Telefon: +49 (0) 351 204 8 244

E-Mail: datenschutz@dresdnerspitzen.com

 

Alle personenbezogenen Daten, die im Zuge des Vertrages gespeichert wurden, werden in diesem Fall gelöscht, soweit dies möglich ist und keine der oben genannten Voraussetzungen dagegensprechen.

3.      Präsenzen von Dritten (Google Map, Youtube etc.)

Im Rahmen unseres Online-Angebots kann es vorkommen, dass auf unserer Internetseite auch Inhalte von Dritten, wie zum Beispiel YouTube, Google-Maps oder Grafiken eingebunden werden. Dabei ist es üblich, dass eine Weiterleitung der IP-Adresse an den Dritten zur Nutzung der Dienste (z. B. Darstellung im Browser) vorgenommen wird. Grundsätzlich haben wir keinen Einfluss darauf, wie der Dritte mit den Daten agiert.

 

Bitte entnehmen Sie die jeweiligen Datenschutzhinweise der Browser-Plug-Ins von den Anbietern:

           -           YouTube https://www.youtube.com

           -           Google-Maps  https://www.google.com/intl/de/policies/privacy/

 

4.      Plugin

a)      Facebook-Plugins (Like-Button)

Auf unseren Seiten sind Plugins des sozialen Netzwerks Facebook, Anbieter Facebook Inc., 1 Hacker Way, Menlo Park, California 94025, USA, integriert. Die Facebook-Plugins erkennen Sie an dem Facebook-Logo oder dem "Like-Button" ("Gefällt mir") auf unserer Seite. Eine Übersicht über die Facebook-Plugins finden Sie hier:

https://developers.facebook.com/docs/plugins.

Wenn Sie unsere Seiten besuchen, wird über das Plugin eine direkte Verbindung zwischen Ihrem Browser und dem Facebook-Server hergestellt. Facebook erhält dadurch die Information, dass Sie mit Ihrer IP-Adresse unsere Seite besucht haben. Wenn Sie den Facebook "Like-Button" anklicken während Sie in Ihrem Facebook-Account eingeloggt sind, können Sie die Inhalte unserer Seiten auf Ihrem Facebook-Profil verlinken. Dadurch kann Facebook den Besuch unserer Seiten Ihrem Benutzerkonto zuordnen. Wir weisen darauf hin, dass wir als Anbieter der Seiten keine Kenntnis vom Inhalt der übermittelten Daten sowie deren Nutzung durch Facebook erhalten. Weitere Informationen hierzu finden Sie in der Datenschutzerklärung von Facebook unter https://de-de.facebook.com/policy.php. Wenn Sie nicht wünschen, dass Facebook den Besuch unserer Seiten Ihrem Facebook-Nutzerkonto

zuordnen kann, loggen Sie sich bitte aus Ihrem Facebook-Benutzerkonto aus.

a)      Google+

Unsere Seiten nutzen Funktionen von Google+. Anbieter ist die Google Inc., 1600 Amphitheatre Parkway Mountain View, CA 94043, USA.

Erfassung und Weitergabe von Informationen: Mithilfe der Google+-Schaltfläche können Sie Informationen weltweit veröffentlichen. Über die Google+-Schaltfläche erhalten Sie und andere Nutzer personalisierte Inhalte von Google und unseren Partnern. Google speichert sowohl die Information, dass Sie für einen Inhalt +1 gegeben haben, als auch Informationen über die Seite, die Sie beim Klicken auf +1 angesehen haben. Ihre +1 können als Hinweise zusammen mit Ihrem Profilnamen und Ihrem Foto in Google-Diensten, wie etwa in Suchergebnissen oder in Ihrem Google-Profil oder an anderen Stellen auf Webseiten und Anzeigen im Internet eingeblendet werden. Google zeichnet Informationen über Ihre +1‑Aktivitäten auf, um die Google-Dienste für Sie und andere zu verbessern. Um die Google+-Schaltfläche verwenden zu können, benötigen Sie ein weltweit sichtbares, öffentliches Google-Profil, das zumindest den für das Profil gewählten Namen enthalten muss. Dieser Name wird in allen Google-Diensten verwendet. In manchen Fällen kann dieser Name auch einen anderen Namen ersetzen, den Sie beim Teilen von Inhalten über Ihr Google-Konto verwendet haben. Die Identität Ihres Google-Profils kann Nutzern angezeigt werden, die Ihre E-Mail-Adresse kennen oder über andere identifizierende Informationen von Ihnen verfügen. Verwendung der erfassten Informationen: Neben den oben erläuterten Verwendungszwecken werden die von Ihnen bereitgestellten Informationen gemäß den geltenden Google-Datenschutzbestimmungen genutzt. Google veröffentlicht möglicherweise zusammengefasste Statistiken über die +1-Aktivitäten der Nutzer bzw. gibt diese an Nutzer und Partner weiter, wie etwa Publisher, Inserenten oder verbundene Webseiten.

VII.  Rechte der betroffenen Person

Werden personenbezogene Daten von Ihnen verarbeitet, sind Sie Betroffener i.S.d. DSGVO und es stehen Ihnen folgende Rechte gegenüber dem Verantwortlichen zu:

1.        Auskunftsrecht

Sie können von dem Verantwortlichen eine Bestätigung darüber verlangen, ob personenbezogene Daten, die Sie betreffen, von uns verarbeitet werden.

Liegt eine solche Verarbeitung vor, können Sie von dem Verantwortlichen über folgende Informationen Auskunft verlangen:

(1)       die Zwecke, zu denen die personenbezogenen Daten verarbeitet werden;

(2)       die Kategorien von personenbezogenen Daten, welche verarbeitet werden;

(3)       die Empfänger bzw. die Kategorien von Empfängern, gegenüber denen die Sie betreffenden personenbezogenen Daten offengelegt wurden oder noch offengelegt werden;

(4)       die geplante Dauer der Speicherung der Sie betreffenden personenbezogenen Daten oder, falls konkrete Angaben hierzu nicht möglich sind, Kriterien für die Festlegung der Speicherdauer;

(5)       das Bestehen eines Rechts auf Berichtigung oder Löschung der Sie betreffenden personenbezogenen Daten, eines Rechts auf Einschränkung der Verarbeitung durch den Verantwortlichen oder eines Widerspruchsrechts gegen diese Verarbeitung;

(6)       das Bestehen eines Beschwerderechts bei einer Aufsichtsbehörde;

(7)       alle verfügbaren Informationen über die Herkunft der Daten, wenn die personenbezogenen Daten nicht bei der betroffenen Person erhoben werden;

(8)       das Bestehen einer automatisierten Entscheidungsfindung einschließlich Profiling gemäß Art. 22 Abs. 1 und 4 DSGVO und – zumindest in diesen Fällen – aussagekräftige Informationen über die involvierte Logik sowie die Tragweite und die angestrebten Auswirkungen einer derartigen Verarbeitung für die betroffene Person.

Ihnen steht das Recht zu, Auskunft darüber zu verlangen, ob die Sie betreffenden personenbezogenen Daten in ein Drittland oder an eine internationale Organisation übermittelt werden. In diesem Zusammenhang können Sie verlangen, über die geeigneten Garantien gem. Art. 46 DSGVO im Zusammenhang mit der Übermittlung unterrichtet zu werden.

2.        Recht auf Berichtigung

Sie haben ein Recht auf Berichtigung und/oder Vervollständigung gegenüber dem Verantwortlichen, sofern die verarbeiteten personenbezogenen Daten, die Sie betreffen, unrichtig oder unvollständig sind. Der Verantwortliche hat die Berichtigung unverzüglich vorzunehmen.

3.        Recht auf Einschränkung der Verarbeitung

Sie können die Einschränkung der Verarbeitung der Sie betreffenden personenbezogenen Daten verlangen, wenn

(1)       Sie die Richtigkeit der Sie betreffenden personenbezogenen Daten für eine Dauer bestreiten, die es dem Verantwortlichen ermöglicht, die Richtigkeit der personenbezogenen Daten zu überprüfen;

(2)       die Verarbeitung unrechtmäßig ist und Sie die Löschung der personenbezogenen Daten ablehnen und stattdessen die Einschränkung der Nutzung der personenbezogenen Daten verlangen;

(3)       der Verantwortliche die personenbezogenen Daten für die Zwecke der Verarbeitung nicht länger benötigt, Sie diese jedoch zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen benötigen, oder

(4)       Sie Widerspruch gegen die Verarbeitung gemäß Art. 21 Abs. 1 DSGVO eingelegt haben und noch nicht feststeht, ob die berechtigten Gründe des Verantwortlichen gegenüber Ihren Gründen überwiegen.

Wurde die Verarbeitung der Sie betreffenden personenbezogenen Daten eingeschränkt, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Union oder eines Mitgliedstaats verarbeitet werden.

Wurde die Einschränkung der Verarbeitung nach den o.g. Voraussetzungen eingeschränkt, werden Sie von dem Verantwortlichen unterrichtet bevor die Einschränkung aufgehoben wird.

4.        Recht auf Löschung
a)        Löschungspflicht

Sie können von dem Verantwortlichen verlangen, dass die Sie betreffenden personenbezogenen Daten unverzüglich gelöscht werden, und der Verantwortliche ist verpflichtet, diese Daten unverzüglich zu löschen, sofern einer der folgenden Gründe zutrifft:

(1)       Die Sie betreffenden personenbezogenen Daten sind für die Zwecke, für die sie erhoben oder auf sonstige Weise verarbeitet wurden, nicht mehr notwendig.

(2)       Sie widerrufen Ihre Einwilligung, auf die sich die Verarbeitung gem. Art. 6 Abs. 1 lit. a oder Art. 9 Abs. 2 lit. a DSGVO stützte, und es fehlt an einer anderweitigen Rechtsgrundlage für die Verarbeitung.

(3)       Sie legen gem. Art. 21 Abs. 1 DSGVO Widerspruch gegen die Verarbeitung ein und es liegen keine vorrangigen berechtigten Gründe für die Verarbeitung vor, oder Sie legen gem. Art. 21 Abs. 2 DSGVO Widerspruch gegen die Verarbeitung ein.

(4)       Die Sie betreffenden personenbezogenen Daten wurden unrechtmäßig verarbeitet.

(5)       Die Löschung der Sie betreffenden personenbezogenen Daten ist zur Erfüllung einer rechtlichen Verpflichtung nach dem Unionsrecht oder dem Recht der Mitgliedstaaten erforderlich, dem der Verantwortliche unterliegt.

(6)                   Die Sie betreffenden personenbezogenen Daten wurden in Bezug auf angebotene Dienste der Informationsgesellschaft gemäß Art. 8 Abs. 1 DSGVO erhoben.

b)        Information an Dritte

Hat der Verantwortliche die Sie betreffenden personenbezogenen Daten öffentlich gemacht und ist er gem. Art. 17 Abs. 1 DSGVO zu deren Löschung verpflichtet, so trifft er, unter Berücksichtigung der verfügbaren Technologie und der Implementierungskosten, angemessene Maßnahmen, auch technischer Art, um für die Datenverarbeitung Verantwortliche, die die personenbezogenen Daten verarbeiten, darüber zu informieren, dass Sie als betroffene Person von ihnen die Löschung aller Links zu diesen personenbezogenen Daten oder von Kopien oder Replikationen dieser personenbezogenen Daten verlangt haben.

c)        Ausnahmen

Das Recht auf Löschung besteht nicht, soweit die Verarbeitung erforderlich ist

(1)       zur Ausübung des Rechts auf freie Meinungsäußerung und Information;

(2)       zur Erfüllung einer rechtlichen Verpflichtung, die die Verarbeitung nach dem Recht der Union oder der Mitgliedstaaten, dem der Verantwortliche unterliegt, erfordert, oder zur Wahrnehmung einer Aufgabe, die im öffentlichen Interesse liegt oder in Ausübung öffentlicher Gewalt erfolgt, die dem Verantwortlichen übertragen wurde;

(3)       aus Gründen des öffentlichen Interesses im Bereich der öffentlichen Gesundheit gemäß Art. 9 Abs. 2 lit. h und i sowie Art. 9 Abs. 3 DSGVO;

(4)       für im öffentlichen Interesse liegende Archivzwecke, wissenschaftliche oder historische Forschungszwecke oder für statistische Zwecke gem. Art. 89 Abs. 1 DSGVO, soweit das unter Abschnitt a) genannte Recht voraussichtlich die Verwirklichung der Ziele dieser Verarbeitung umöglich macht oder ernsthaft beeinträchtigt, oder

(5)       zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.

5.        Recht auf Unterrichtung

Haben Sie das Recht auf Berichtigung, Löschung oder Einschränkung der Verarbeitung gegenüber dem Verantwortlichen geltend gemacht, ist dieser verpflichtet, allen Empfängern, denen die Sie betreffenden personenbezogenen Daten offengelegt wurden, diese Berichtigung oder Löschung der Daten oder Einschränkung der Verarbeitung mitzuteilen, es sei denn, dies erweist sich als unmöglich oder ist mit einem unverhältnismäßigen Aufwand verbunden.

Ihnen steht gegenüber dem Verantwortlichen das Recht zu, über diese Empfänger unterrichtet zu werden.

6.        Recht auf Datenübertragbarkeit

Sie haben das Recht, die Sie betreffenden personenbezogenen Daten, die Sie dem Verantwortlichen bereitgestellt haben, in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten. Außerdem haben Sie das Recht diese Daten einem anderen Verantwortlichen ohne Behinderung durch den Verantwortlichen, dem die personenbezogenen Daten bereitgestellt wurden, zu übermitteln, sofern

(1)       die Verarbeitung auf einer Einwilligung gem. Art. 6 Abs. 1 lit. a DSGVO oder Art. 9 Abs. 2 lit. a DSGVO oder auf einem Vertrag gem. Art. 6 Abs. 1 lit. b DSGVO beruht und

(2)       die Verarbeitung mithilfe automatisierter Verfahren erfolgt.

In Ausübung dieses Rechts haben Sie ferner das Recht, zu erwirken, dass die Sie betreffenden personenbezogenen Daten direkt von einem Verantwortlichen einem anderen Verantwortlichen übermittelt werden, soweit dies technisch machbar ist. Freiheiten und Rechte anderer Personen dürfen hierdurch nicht beeinträchtigt werden.

Das Recht auf Datenübertragbarkeit gilt nicht für eine Verarbeitung personenbezogener Daten, die für die Wahrnehmung einer Aufgabe erforderlich ist, die im öffentlichen Interesse liegt oder in Ausübung öffentlicher Gewalt erfolgt, die dem Verantwortlichen übertragen wurde.

7.        Widerspruchsrecht

Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten, die aufgrund von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling.

Der Verantwortliche verarbeitet die Sie betreffenden personenbezogenen Daten nicht mehr, es sei denn, er kann zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.

Werden die Sie betreffenden personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben, haben Sie das Recht, jederzeit Widerspruch gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten zum Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in Verbindung steht.

Widersprechen Sie der Verarbeitung für Zwecke der Direktwerbung, so werden die Sie betreffenden personenbezogenen Daten nicht mehr für diese Zwecke verarbeitet.

Sie haben die Möglichkeit, im Zusammenhang mit der Nutzung von Diensten der Informationsgesellschaft – ungeachtet der Richtlinie 2002/58/EG – Ihr Widerspruchsrecht mittels automatisierter Verfahren auszuüben, bei denen technische Spezifikationen verwendet werden.

8.        Recht auf Widerruf der datenschutzrechtlichen Einwilligungserklärung

Sie haben das Recht, Ihre datenschutzrechtliche Einwilligungserklärung jederzeit zu widerrufen. Durch den Widerruf der Einwilligung wird die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung nicht berührt.

9.        Automatisierte Entscheidung im Einzelfall einschließlich Profiling

Sie haben das Recht, nicht einer ausschließlich auf einer automatisierten Verarbeitung – einschließlich Profiling – beruhenden Entscheidung unterworfen zu werden, die Ihnen gegenüber rechtliche Wirkung entfaltet oder Sie in ähnlicher Weise erheblich beeinträchtigt. Dies gilt nicht, wenn die Entscheidung

(1)       für den Abschluss oder die Erfüllung eines Vertrags zwischen Ihnen und dem Verantwortlichen erforderlich ist,

(2)       aufgrund von Rechtsvorschriften der Union oder der Mitgliedstaaten, denen der Verantwortliche unterliegt, zulässig ist und diese Rechtsvorschriften angemessene Maßnahmen zur Wahrung Ihrer Rechte und Freiheiten sowie Ihrer berechtigten Interessen enthalten oder

(3)       mit Ihrer ausdrücklichen Einwilligung erfolgt.

Allerdings dürfen diese Entscheidungen nicht auf besonderen Kategorien personenbezogener Daten nach Art. 9 Abs. 1 DSGVO beruhen, sofern nicht Art. 9 Abs. 2 lit. a oder g DSGVO gilt und angemessene Maßnahmen zum Schutz der Rechte und Freiheiten sowie Ihrer berechtigten Interessen getroffen wurden.

Hinsichtlich der in (1) und (3) genannten Fälle trifft der Verantwortliche angemessene Maßnahmen, um die Rechte und Freiheiten sowie Ihre berechtigten Interessen zu wahren, wozu mindestens das Recht auf Erwirkung des Eingreifens einer Person seitens des Verantwortlichen, auf Darlegung des eigenen Standpunkts und auf Anfechtung der Entscheidung gehört.

10.    Recht auf Beschwerde bei einer Aufsichtsbehörde

Unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs steht Ihnen das Recht auf Beschwerde bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat Ihres Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu, wenn Sie der Ansicht sind, dass die Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die DSGVO verstößt.

Die Aufsichtsbehörde, bei der die Beschwerde eingereicht wurde, unterrichtet den Beschwerdeführer über den Stand und die Ergebnisse der Beschwerde einschließlich der Möglichkeit eines gerichtlichen Rechtsbehelfs nach Art. 78 DSGVO.

Die für uns zuständige Aufsichtsbehörde ist:

Sächsische Datenschutzbeauftragter

Herr Andreas Schurig

Telefon: +49 (0) 351/493-5401

Telefax: +49 (0) 351/493-5490

E-Mail: saechsdsb@slt.sachsen.de

 

VIII.         Copyright

Die Inhalte unserer Webseite sind urheberrechtlich geschützt. Sie dürfen nur zu privaten Zwecken in den Arbeitsspeicher und einmalig in einen anderen Speicher (Festplatte) geladen werden. Die sonstige Verwendung der Texte und Abbildungen, auch auszugsweise, ist ohne die schriftliche Zustimmung der DreGuS GmbH & Co. KG urheberrechtswidrig und strafbar. In den vorliegenden Inhalten werden Marken und geschäftliche Bezeichnungen verwendet; auch wenn diese nicht als solche gekennzeichnet sind, gelten die entsprechenden Schutzbestimmungen.

Der Inhalt von www.dresdnerspitzen.com ist ausschließlich zu Informationszwecken bestimmt.

IX.     Links zu Webseiten anderer Anbieter

Die DreGuS GmbH & Co. KG ist nicht verantwortlich für die Inhalte externer Internetseiten.

Bei direkten oder indirekten Verweisen auf fremde Internetseiten ("Links"), die außerhalb des Verantwortungsbereiches der DreGuS GmbH & Co. KG liegen, tritt eine Haftungsverpflichtung ausschließlich in dem Fall ein, in dem die DreGuS GmbH & Co. KG von den fremden Inhalten Kenntnis hat und es ihr technisch möglich und zumutbar wäre, die Nutzung im Falle rechtswidriger Inhalte zu verhindern.

Die DreGuS GmbH & Co. KG erklärt hiermit ausdrücklich, dass zum Zeitpunkt der Linksetzung die entsprechenden verlinkten Seiten frei von illegalen Inhalten waren. Auf die aktuelle und zukünftige Gestaltung, die Inhalte oder die Urheberschaft der gelinkten/verknüpften Seiten hat die DreGuS GmbH & Co. KG keinerlei Einfluss. Sie distanziert sich daher ausdrücklich von allen Inhalten aller gelinkten / verknüpften Seiten, die nach der Linksetzung verändert wurden.

Diese Feststellung gilt für alle innerhalb des eigenen Internetangebotes gesetzten Links und Verweise. Für illegale, fehlerhafte oder unvollständige Inhalte und insbesondere für Schäden, die aus der Nutzung oder Nichtnutzung solcher Art dargebotener Informationen entstehen, haftet allein der Anbieter der Seite, auf welche verwiesen wurde.`,
                "Privacy policy content will be added here."
              )}
            </p>
          </div>
        </div>
      </section>
    </EditorialLayout>
  );
};

export default Privacy;