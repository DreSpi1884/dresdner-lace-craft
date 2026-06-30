import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";
import EditorialSection from "@/components/EditorialSection";
import HistoryTimeline from "@/components/HistoryTimeline";
import productionImage from "@/assets/production-detail.jpg";

const About = () => {
  return (
    <EditorialLayout>
      {/* History timeline */}
      <div id="history" className="scroll-mt-32">
        <HistoryTimeline />
      </div>


      {/* Values */}
      <EditorialSection id="values" className="bg-card scroll-mt-32">

        <div className="editorial-container editorial-section">
          <p className="editorial-label text-primary mb-4 text-center">Our Values</p>
          <h2 className="editorial-heading-lg text-foreground mb-16 text-center">
            What drives us every day
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
            { title: "Tradition", desc: "Five generations of knowledge, passed down and refined." },
            { title: "Innovation", desc: "Continuous investment in technology and processes." },
            { title: "Quality", desc: "Uncompromising standards at every stage of production." },
            { title: "Precision", desc: "Meticulous attention to detail in every product." },
            { title: "Flexibility", desc: "Adaptive production for orders of any scale." },
            { title: "Reliability", desc: "Consistent delivery and transparent communication." }].
            map((item) =>
            <div key={item.title} className="border-t border-border pt-6">
                <h3 className="editorial-heading-sm text-foreground mb-3">{item.title}</h3>
                <p className="editorial-body-sm text-muted-foreground">{item.desc}</p>
              </div>
            )}
          </div>
        </div>
      </EditorialSection>

      {/* Sustainability */}
      <section id="sustainability" className="editorial-section scroll-mt-32">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <p className="editorial-label text-primary mb-4">Sustainability</p>
              <h2 className="editorial-heading-lg text-foreground mb-8">
                Responsible production at every stage
              </h2>
            </div>
            <div className="space-y-6 editorial-body text-muted-foreground">
              <p>
                We operate with respect for our craft, our people, and the environment. Our facility runs on energy-efficient processes, and we minimise waste through just-in-time production.
              </p>
              <p>
                Optional certifications such as GRS and STeP are available for clients seeking verified sustainable sourcing and chemical management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Production */}
      <section id="production" className="editorial-section scroll-mt-32">

        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="editorial-label text-primary mb-4">Production</p>
              <h2 className="editorial-heading-lg text-foreground mb-6">
                Modern machinery, timeless standards
              </h2>
              <p className="editorial-body text-muted-foreground mb-8">
                Our&nbsp;cutting-edge production equipment&nbsp;handles everything from delicate elastic lace to robust inelastic fabrics. Every meter goes through strict quality control before it leaves our hands.
              </p>
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 cta-lace bg-foreground text-background px-8 py-4 editorial-body-sm font-medium hover:bg-charcoal-light transition-colors duration-300">
                Request a Quote <ArrowRight size={16} />
              </Link>
            </div>
            <img
              src={productionImage}
              alt="Lace production machinery at Dresdner Spitzen facility"
              className="w-full h-[400px] object-cover" />
          </div>
        </div>
      </section>
    </EditorialLayout>);
};

export default About;