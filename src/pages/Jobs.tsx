import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import EditorialLayout from "@/components/EditorialLayout";
import EditorialSection from "@/components/EditorialSection";
import SEO from "@/components/SEO";

const apprenticeships = [
  "Machine and Plant Operator – Textile Finishing (m/f/d)",
  "Textile Finishing Technician (m/f/d)",
];

const Jobs = () => {
  return (
    <EditorialLayout
      title={<>Join the future of<br />textile innovation.</>}
      titleClassName="editorial-heading-lg"
      heroCompact
      heroClassName="h-[160px] md:h-[200px]"
    >
      <SEO
        title="Careers"
        description="Join Dresdner Spitzen in Dresden. Current apprenticeships in textile finishing and open applications for talented professionals."
        path="/jobs"
      />

      <EditorialSection className="py-10 md:py-12">
        <div className="px-6 md:px-12 lg:px-16">
          <p className="editorial-body text-muted-foreground w-full lg:w-[72%]">
            At Dresdner Spitzen, we value skilled hands and fresh ideas equally.
            Join a team where tradition meets innovation, in one of Germany's most beautiful cities.
          </p>
        </div>
      </EditorialSection>

      <section className="pb-16 md:pb-20">
        <div className="px-6 md:px-12 lg:px-16">
          <div className="w-full lg:w-[72%]">
            <p className="editorial-label text-muted-foreground mb-8">Professional Positions</p>
            <div className="border-t border-border py-8">
              <p className="editorial-body text-muted-foreground">There are currently no open positions.</p>
            </div>

            <p className="editorial-label text-muted-foreground mb-8 mt-12">Apprenticeships</p>
            <div className="space-y-0">
              {apprenticeships.map((title) => (
                <div key={title} className="border-t border-border py-8">
                  <h2 className="editorial-heading-sm text-foreground">{title}</h2>
                </div>
              ))}
              <div className="border-t border-border" />
            </div>

            <div className="mt-12 md:mt-16">
              <h3 className="editorial-heading-sm text-foreground mb-4">Interested in joining our team?</h3>
              <div className="editorial-body-sm text-muted-foreground space-y-4 mb-8">
                <p>
                  Please send your application to{" "}
                  <a href="mailto:jobs@dresdnerspitzen.com" className="text-foreground hover:text-primary transition-colors">
                    jobs@dresdnerspitzen.com
                  </a>{" "}
                  or by post to the address listed in the{" "}
                  <Link to="/imprint" className="text-foreground hover:text-primary transition-colors">
                    Imprint
                  </Link>
                  .
                </p>
                <p>
                  Contact person: Mr. Kluge<br />
                  Phone:{" "}
                  <a href="tel:+493512048244" className="text-foreground hover:text-primary transition-colors">
                    +49 351 2048 244
                  </a>
                </p>
                <p>We look forward to receiving your application.</p>
              </div>
              <a
                href="mailto:jobs@dresdnerspitzen.com"
                className="inline-flex items-center gap-2 cta-lace bg-foreground text-background px-8 py-4 editorial-body-sm font-medium hover:bg-charcoal-light transition-colors"
              >
                Apply Now <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </EditorialLayout>
  );
};

export default Jobs;
