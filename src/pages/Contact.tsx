import { Link } from "react-router-dom";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";

const Contact = () => {
  return (
    <EditorialLayout title="Let's start a conversation">
      <section className="editorial-section">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
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

            {/* Contact form */}
            <div className="bg-[#F0F4F8] p-8 md:p-12">
              <h2 className="editorial-heading-sm text-foreground mb-10">Send us a message</h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="contact-name" className="editorial-label text-[#5A6B7D] tracking-[0.15em] uppercase block mb-3">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    className="w-full border border-[#D1D9E0] bg-white px-5 py-4 editorial-body text-foreground placeholder:text-[#8895A3] focus:outline-none focus:border-foreground transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-company" className="editorial-label text-[#5A6B7D] tracking-[0.15em] uppercase block mb-3">Company</label>
                  <input
                    id="contact-company"
                    type="text"
                    className="w-full border border-[#D1D9E0] bg-white px-5 py-4 editorial-body text-foreground placeholder:text-[#8895A3] focus:outline-none focus:border-foreground transition-colors"
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="editorial-label text-[#5A6B7D] tracking-[0.15em] uppercase block mb-3">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    className="w-full border border-[#D1D9E0] bg-white px-5 py-4 editorial-body text-foreground placeholder:text-[#8895A3] focus:outline-none focus:border-foreground transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="editorial-label text-[#5A6B7D] tracking-[0.15em] uppercase block mb-3">Message</label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    className="w-full border border-[#D1D9E0] bg-white px-5 py-4 editorial-body text-foreground placeholder:text-[#8895A3] focus:outline-none focus:border-foreground transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-3 bg-[#1A2332] text-white px-8 py-4 editorial-body font-medium hover:bg-[#2A3A4D] transition-colors"
                >
                  Send Message <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </EditorialLayout>
  );
};

export default Contact;
