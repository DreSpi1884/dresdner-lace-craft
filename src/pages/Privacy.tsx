import EditorialLayout from "@/components/EditorialLayout";

const Privacy = () => {
  return (
    <EditorialLayout>
      <section className="editorial-section">
        <div className="editorial-container max-w-3xl">
          <p className="editorial-label text-primary mb-6">Legal</p>
          <h1 className="editorial-heading-xl text-foreground mb-8">Privacy Policy</h1>
          <div className="editorial-body text-muted-foreground space-y-4">
            <p>Privacy policy content will be added here.</p>
          </div>
        </div>
      </section>
    </EditorialLayout>
  );
};

export default Privacy;
