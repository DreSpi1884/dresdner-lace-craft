import EditorialLayout from "@/components/EditorialLayout";

const Imprint = () => {
  return (
    <EditorialLayout title="Imprint">
      <section className="editorial-section">
        <div className="editorial-container max-w-3xl">
          <div className="editorial-body text-muted-foreground space-y-2">
            <p className="font-semibold text-foreground">DreGuS GmbH &amp; Co. KG</p>
            <p>Breitscheidstr. 78</p>
            <p>01237 Dresden</p>
            <p className="mt-4">Telefon: +49-351-204 8 0</p>
            <p className="mt-4">Geschäftsführer: Dr.-Ing. Sascha Schröder</p>
            <p className="mt-4">Ust.-Id.: DE 811 896 186</p>
            <p>Handelsregister: HRA 2456</p>
          </div>
        </div>
      </section>
    </EditorialLayout>
  );
};

export default Imprint;
