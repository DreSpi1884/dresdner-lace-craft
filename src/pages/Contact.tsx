import { Mail, MapPin } from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";

const Contact = () => {
  return (
    <EditorialLayout heroAtTop={true}>
      <section className="mt-20 md:mt-24 pt-8 md:pt-12 pb-8 md:pb-12">
        <div className="editorial-container">
          <h1 className="editorial-heading-xl mb-6">Let's start a conversation</h1>
          <div className="max-w-xl">
            <p className="editorial-body text-muted-foreground mb-6 whitespace-pre-line">
              Whether you have a specific project in mind or simply want to learn more about our capabilities, we're here to help.{"\n"}
              Our team responds within one business day.
            </p>

            <div className="space-y-4">
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
        </div>
      </section>
    </EditorialLayout>
  );
};

export default Contact;
