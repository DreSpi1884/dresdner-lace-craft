import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";
import EditorialSection from "@/components/EditorialSection";
import HistoryTimeline from "@/components/HistoryTimeline";
import AboutAnchorNav from "@/components/AboutAnchorNav";
import productionImage from "@/assets/production-detail.jpg";

const About = () => {
  return (
    <EditorialLayout title="Our Story" subtitle="For more than 140 years, we have been shaping textile manufacturing in Germany.">
      <AboutAnchorNav />
      {/* History timeline */}
      <div id="history" className="scroll-mt-32">
        <HistoryTimeline />
      </div>


      {/* Sustainability */}
      <section id="sustainability" className="editorial-section scroll-mt-32">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <h2 className="editorial-heading-lg text-foreground mb-4">
                Sustainability
              </h2>
              <p className="editorial-label text-primary mb-8">RESPONSIBLE PRODUCTION AT EVERY STAGE</p>
            </div>
            <div className="space-y-6 editorial-body text-muted-foreground">
              <p>
                Our production is supported by an energy management system and certified according to internationally recognised standards, including OEKO-TEX® STANDARD 100, OEKO-TEX® STeP Level 3 and the Global Recycled Standard (GRS).
              </p>
              <p>
                These certifications reflect our commitment to responsible textile manufacturing, transparent supply chains and sustainable production processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <EditorialSection id="values" className="bg-card scroll-mt-32">

        <div className="editorial-container editorial-section">
          <h2 className="editorial-heading-lg text-foreground mb-4 text-center">
            Our Values
          </h2>
          <p className="editorial-label text-primary mb-16 text-center">WHAT DRIVES US EVERYDAY</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
            { title: "Tradition", desc: "More than 140 years of textile craftsmanship. " },
            { title: "Innovation", desc: "Driven by new ideas and modern manufacturing. " },
            { title: "Quality", desc: "Certified textile production with strict quality standards." },
            { title: "Precision", desc: "Meticulous attention to detail in every product. " },
            { title: "Flexibility", desc: "Tailored solutions for every project. " },
            { title: "Reliability", desc: "A trusted partner from development to delivery. " }].
            map((item) =>
            <div key={item.title} className="border-t border-border pt-6">
                <h3 className="editorial-heading-sm text-foreground mb-3">{item.title}</h3>
                <p className="editorial-body-sm text-muted-foreground">{item.desc}</p>
              </div>
            )}
          </div>
        </div>
      </EditorialSection>

      {/* Production */}
      <section id="production" className="editorial-section scroll-mt-32">

        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="editorial-label text-primary mb-4">Production</p>
              <h2 className="editorial-heading-lg text-foreground mb-6">
                Modern Machinery, Timeless Standards
              </h2>
              <div className="editorial-body text-muted-foreground mb-8 space-y-4">
                <p>
                  Our production combines advanced Karl Mayer warp knitting technology with more than 140 years of textile expertise.
                </p>
                <p>
                  We manufacture premium lace, warp-knitted fabrics, elastic textiles and technical fabrics using modern Raschel, Jacquardtronic® and Textronic® machines.
                </p>
              </div>
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