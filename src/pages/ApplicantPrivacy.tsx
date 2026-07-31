import EditorialLayout from "@/components/EditorialLayout";
import SEO from "@/components/SEO";

const applicantPrivacyText = `Vielen Dank für Ihr Interesse an unserer Stellenausschreibung. Der Schutz Ihrer persönlichen Daten ist uns sehr wichtig.

Daher informieren wir Sie nachfolgend über die Erhebung, Verarbeitung und Nutzung Ihrer Daten im Rahmen der Bewerbung gemäß den einschlägigen Datenschutzvorschriften.

Datenerhebung

Im Zuge Ihrer Bewerbung werden von uns die nachfolgend aufgeführten persönlichen Bewerbungsdaten erhoben und verarbeitet:

Name und Vorname
Adresse
Telefonnummer
E-Mail-Adresse
Bewerbungsunterlagen, insbesondere Bewerbungsschreiben, Lebenslauf, Zeugnisse und Zertifikate

Zweck der Datenerfassung und Weitergabe

Die Erhebung und Verarbeitung Ihrer persönlichen Bewerbungsdaten erfolgt ausschließlich zweckgebunden für die Besetzung von Stellen innerhalb unseres Unternehmens.

Ihre Daten werden grundsätzlich nur an die für das konkrete Bewerbungsverfahren zuständigen innerbetrieblichen Stellen und Fachabteilungen unseres Unternehmens weitergeleitet.

Eine darüber hinausgehende Nutzung oder Weitergabe Ihrer Bewerbungsdaten an Dritte erfolgt nicht.

Aufbewahrungsdauer der Bewerbungsdaten

Eine Löschung Ihrer persönlichen Bewerbungsdaten erfolgt grundsätzlich sechs Monate nach Abschluss des Bewerbungsverfahrens.

Dies gilt nicht, sofern gesetzliche Bestimmungen einer Löschung entgegenstehen, die weitere Speicherung zum Zwecke der Beweisführung erforderlich ist oder Sie einer längeren Speicherung ausdrücklich zugestimmt haben.

Speicherung für zukünftige Stellenausschreibungen

Sollten wir Ihnen keine aktuell zu besetzende Stelle anbieten können, jedoch aufgrund Ihres Profils der Ansicht sein, dass Ihre Bewerbung für zukünftige Stellenangebote interessant sein könnte, werden wir Ihre persönlichen Bewerbungsdaten bis auf Widerruf speichern, sofern Sie einer solchen Speicherung und Nutzung ausdrücklich zustimmen.

Auskunftsrecht und Widerruf

Sollten Sie Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten haben oder Auskunft, Berichtigung oder Löschung Ihrer Daten beziehungsweise den Widerruf einer erteilten Einwilligung wünschen, wenden Sie sich bitte an unsere Personalverantwortlichen unter jobs@dresdnerspitzen.com.

Allgemeine Datenschutzhinweise

Bitte beachten Sie auch unsere allgemeinen Datenschutzhinweise für weitere Informationen im Hinblick auf die Nutzung unseres Webauftrittes.`;

const ApplicantPrivacy = () => (
  <EditorialLayout heroAtTop={true}>
    <SEO
      title="Datenschutzhinweise für Bewerber:innen"
      description="Informationen zur Verarbeitung personenbezogener Daten im Rahmen einer Bewerbung bei Dresdner Spitzen."
      path="/bewerber-datenschutz"
    />

    <section className="mt-20 w-full px-4 pb-8 pt-8 md:mt-24 md:px-8 md:pb-12 md:pt-12">
      <div className="editorial-container w-full max-w-none">
        <h1 className="editorial-heading-xl mb-6">
          Datenschutzhinweise für Bewerber:innen
        </h1>

        <div className="editorial-body w-full whitespace-pre-line text-muted-foreground">
          {applicantPrivacyText}
        </div>
      </div>
    </section>
  </EditorialLayout>
);

export default ApplicantPrivacy;
