import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";
import EditorialSection from "@/components/EditorialSection";
import heritageImage from "@/assets/heritage-workshop.jpg";
import productionImage from "@/assets/production-detail.jpg";

const services = [
  {
    title: "Collections",
    desc: "Our design team continously develops new lace collections inspired by international fashion trends throughout the year. Each collection includes a wide variety of elastic and inelastic lace for lingerie, fashion and apparel. ",
  },
  {
    title: "Custom designs",
    desc: "Every project starts with an idea. Whether you're developing a unique lace design, a warp-knitted fabric or a functional textile for a specific application, we work closely with you to create a solution tailored to your technical and aesthetic requirements. ",
  },
  {
    title: "Dyeing and finishing",
    desc: "Our in-house dye house offers precise colour matching across the full spectrum, from subtle neutrals to vibrant shades, including solid and bicolour finishes. We also provide textile finishing tailored to the intended application and performance requirements, including hydrophilic and hydrophobic treatments, dirt and oil repellency, antistatic properties, flame retardancy, softening and stiffening finishes. ",
  },
  {
    title: "Functional treatments",
    desc: "Beyond fashion, we develop functional warp-knitted fabrics for technical and medical applications. Our textiles are used in compression garments, post-surgical products, lymphatic therapy, orthopaedic supports and other medical applications where consistent elasticity, skin compatibility and durability are essential. ",
  },
];

const Services = () => {
  return (
    <EditorialLayout title="Our Services">
      {/* Intro */}
      <section className="editorial-section">
        <div className="editorial-container">
          <div className="max-w-3xl">
            <p className="editorial-body text-muted-foreground max-w-2xl">
              Every step of our textile manufacturing takes place under one roof in Dresden. We combine design, warp knitting, dyeing, finishing and quality control to create premium lace, warp-knitted fabrics and technical textiles tailored to your requirements. 
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
              { step: "01", title: "Consult", desc: "Share your project, requirements and applications with us.\u00a0" },
              { step: "02", title: "Plan", desc: "We develop custom lace designs or warp-knitted fabrics tailored to your needs." },
              { step: "03", title: "Produce", desc: "Made in Germany using certified textile production and quality controlled processes." },
              { step: "04", title: "Delivery", desc: "Reliable just-in-time delivery for efficient production planning." },
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
