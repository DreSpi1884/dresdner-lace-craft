import { ArrowRight } from "lucide-react";
import EditorialLayout from "@/components/EditorialLayout";
import EditorialSection from "@/components/EditorialSection";
import SEO from "@/components/SEO";

const openPositions = [
{
  title: "Machine Operator, Lace Production",
  type: "Full-time",
  desc: "Operate and maintain modern textile machinery in our Dresden production facility. Experience with lace or knitting machines preferred."
},
{
  title: "Quality Control Technician",
  type: "Full-time",
  desc: "Ensure product quality through systematic testing and inspection processes. Knowledge of European textile standards required."
},
{
  title: "Sales & Client Relations Manager",
  type: "Full-time",
  desc: "Manage relationships with existing B2B clients and develop new business opportunities across European markets."
},
{
  title: "Textile Design Assistant",
  type: "Full-time / Part-time",
  desc: "Support our design team in developing new lace patterns and product concepts. Textile design background preferred."
}];


const Jobs = () => {
  return (
    <EditorialLayout title="Join the future of textile innovation." heroCompact heroClassName="h-[180px] md:h-[220px]">
      <SEO
        title="Careers"
        description="Join the Dresdner Spitzen team in Germany. Open positions in textile design, production and engineering."
        path="/jobs"
      />
      <EditorialSection className="py-10 md:py-12">
        <div className="editorial-container max-w-3xl mx-auto">
          <p className="editorial-body text-muted-foreground max-w-2xl">
            At Dresdner Spitzen, we value skilled hands and fresh ideas equally.
            Join a team where tradition meets innovation, in one of Germany's most beautiful cities.
          </p>
        </div>
      </EditorialSection>

      <section className="pb-16 md:pb-20">
        <div className="editorial-container max-w-3xl mx-auto">
          <p className="editorial-label text-muted-foreground mb-8">Open Positions</p>
          <div className="space-y-0">
            {openPositions.map((pos) =>
            <div key={pos.title} className="border-t border-border py-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="editorial-heading-sm text-foreground mb-2">{pos.title}</h2>
                    <p className="editorial-label text-primary mb-3">{pos.type}</p>
                    <p className="editorial-body-sm text-muted-foreground">{pos.desc}</p>
                  </div>
                  <a

                  className="inline-flex items-center gap-2 text-foreground editorial-body-sm font-medium hover:text-primary transition-colors shrink-0 mt-2 md:mt-0" href="mailto:jobs@dresdnerspitzen.com">
                  
                    Apply <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            )}
            <div className="border-t border-border" />
          </div>

          <div className="mt-12 bg-card p-8 md:p-12">
            <h3 className="editorial-heading-sm text-foreground mb-4">Don't see the right role?</h3>
            <p className="editorial-body-sm text-muted-foreground mb-6">
              We're always interested in hearing from talented people. Send us your CV and a short introduction.
            </p>
            <a
              href="mailto:jobs@dresdner-spitzen.de"
              className="inline-flex items-center gap-2 cta-lace bg-foreground text-background px-8 py-4 editorial-body-sm font-medium hover:bg-charcoal-light transition-colors">
              
              Contact HR <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </EditorialLayout>);

};

export default Jobs;