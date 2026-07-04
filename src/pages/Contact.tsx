import { Link } from "react-router-dom";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";

const Contact = () => {
  return (
    <EditorialLayout title="Let's start a conversation">
      <section className="editorial-section">
        <div className="editorial-container">
          <div className="max-w-xl">
            <p className="editorial-body text-muted-foreground mb-12 whitespace-pre-line">
              Whether you have a specific project in mind or simply want to learn more about our capabilities, we're here to help.{"\n"}
              Our team responds within one business day.
            </p>

            <div className="space-y-8">
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

            <div className="mt-12 pt-12 border-t border-border">
              <p className="editorial-body-sm text-muted-foreground mb-4">
                Looking to request a tailored quote?
              </p>
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 cta-lace bg-foreground text-background px-8 py-4 editorial-body-sm font-medium hover:bg-charcoal-light transition-colors"
              >
                Request a Quote <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </EditorialLayout>
  );
};

export default Contact;
