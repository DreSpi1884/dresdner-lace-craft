import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";
import EditorialSection from "@/components/EditorialSection";
import heritageImage from "@/assets/heritage-workshop.jpg";
import productionImage from "@/assets/production-detail.jpg";

const services = [
  {
    title: "Collections",
    desc: "Twice a year we design a new lace collection, shaped by international fashion trends. Each collection spans a wide range of styles.",
  },
  {
    title: "Custom designs",
    desc: "If you have a specific idea in mind, we'll work with you to bring it to life, quickly and without unnecessary back and forth.",
  },
  {
    title: "Dyeing and finishing",
    desc: "Once the lace is woven, it goes through our in-house dyeing facility. Whether you're after soft pastels, bold saturated tones or anything in between, we match your colour requirements precisely. We also offer bicolour finishes for more complex designs.",
  },
  {
    title: "Functional treatments",
    desc: "Lace isn't just for fashion. Depending on the application, we can treat our fabrics with specific functional properties. That includes dirt and oil repellency for the automotive industry, hydrophilic or hydrophobic finishes for apparel, antistatic and softening treatments, as well as flame retardant and stiffening finishes for decorative use and floristry.",
  },
];

const Services = () => {
  return (
    <EditorialLayout title="What we offer">
      {/* Intro */}
      <section className="editorial-section">
        <div className="editorial-container">
          <div className="max-w-3xl">
            <p className="editorial-body text-muted-foreground max-w-2xl">
              From seasonal collections and bespoke designs to in-house dyeing and functional finishes — a complete lace service, made in Dresden.
            </p>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="editorial-container">
        <img
          src={heritageImage}
          alt="Dresdner Spitzen lace production services"
          className="w-full h-[300px] md:h-[500px] object-cover" />
      </section>

      {/* Service list */}
      <EditorialSection className="bg-card">
        <div className="editorial-container editorial-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16">
            {services.map((item) => (
              <div key={item.title} className="border-t border-border pt-6">
                <h3 className="editorial-heading-md text-foreground mb-4">{item.title}</h3>
                <p className="editorial-body text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </EditorialSection>

      {/* PROCESS */}
      <EditorialSection className="bg-foreground text-background">
        <div className="editorial-container editorial-section">
          <div className="text-center mb-16 md:mb-20">
            <p className="editorial-label text-background/40 mb-4">How It Works</p>
            <h2 className="editorial-heading-lg text-background mb-4">
              From Concept to Creation
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { step: "01", title: "Consult", desc: "Share your idea with us." },
              { step: "02", title: "Plan", desc: "We define the perfect solution." },
              { step: "03", title: "Produce", desc: "Made in Germany to the highest standards." },
              { step: "04", title: "Delivery", desc: "Reliable just-in-time delivery." },
            ].map((item) => (
              <div key={item.step} className="flex flex-col h-full">
                <span className="editorial-label text-background/40 mb-4 block">{item.step}</span>
                <h3 className="editorial-heading-sm text-background mb-3">{item.title}</h3>
                <p className="editorial-body-sm text-background/60 flex-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </EditorialSection>


      {/* CTA */}
      <section className="editorial-section">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="editorial-label text-primary mb-4">Get in touch</p>
              <h2 className="editorial-heading-lg text-foreground mb-6">
                Let's build your next collection
              </h2>
              <p className="editorial-body text-muted-foreground mb-8">
                Tell us about your project and our team will craft a tailored offer for your needs.
              </p>
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 cta-lace bg-foreground text-background px-8 py-4 editorial-body-sm font-medium hover:bg-charcoal-light transition-colors duration-300">
                Request a Quote <ArrowRight size={16} />
              </Link>
            </div>
            <img
              src={productionImage}
              alt="Lace production at Dresdner Spitzen"
              className="w-full h-[400px] object-cover" />
          </div>
        </div>
      </section>
    </EditorialLayout>);
};

export default Services;
