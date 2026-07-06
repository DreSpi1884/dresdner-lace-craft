import { Mail, MapPin } from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";
import SEO from "@/components/SEO";
import germanyMap from "@/assets/germany-map-dregus.png.asset.json";

const Contact = () => {
  return (
    <EditorialLayout heroAtTop={true}>
      <SEO
        title="Contact"
        description="Speak to the Dresdner Spitzen team in Germany. Reach out for samples, bespoke projects or partnership inquiries."
        path="/contact"
      />
      <section className="min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-96px)] pt-20 md:pt-24">
        <div className="editorial-container w-full h-full py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 h-full">
            <div className="flex flex-col justify-center">
              <h1 className="editorial-heading-lg mb-4">Let's start a conversation</h1>
              <p className="editorial-body text-muted-foreground mb-6">
                Whether you have a specific project in mind or simply want to learn more about our capabilities, we're here to help. Our team responds within one business day.
              </p>
              <hr className="border-border mb-6" />
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <Mail size={20} className="text-primary mt-1 shrink-0" />
                  <div>
                    <p className="editorial-body-sm font-medium text-foreground mb-1">Email</p>
                    <a href="mailto:info@dresdner-spitzen.de" className="editorial-body text-muted-foreground hover:text-primary transition-colors">
                      info@dresdner-spitzen.de
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="text-primary mt-1 shrink-0" />
                  <div>
                    <p className="editorial-body-sm font-medium text-foreground mb-1">Location</p>
                    <p className="editorial-body text-muted-foreground">
                      Dresden, Germany
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start justify-center lg:justify-end">
              <img
                src={germanyMap.url}
                alt="Map of Germany showing Dresden location"
                className="max-w-full h-auto max-h-[420px] lg:max-h-[480px] object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </EditorialLayout>
  );
};

export default Contact;
