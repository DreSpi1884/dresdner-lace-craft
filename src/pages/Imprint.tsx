import EditorialLayout from "@/components/EditorialLayout";

const Imprint = () => {
  return (
    <EditorialLayout heroAtTop={true}>
      <section className="mt-20 md:mt-24 pt-8 md:pt-12 pb-8 md:pb-12">
        <div className="editorial-container max-w-3xl">
          <h1 className="editorial-heading-xl mb-6">Imprint</h1>
          <div className="editorial-body text-muted-foreground space-y-2">
            <p className="font-semibold text-foreground">DreGuS GmbH &amp; Co. KG</p>
            <p className="whitespace-pre-line">
              Breitscheidstraße 78{"\u00a0"}
              {"\n"}01237 Dresden{"\u00a0"}
              {"\n"}Deutschland{"\u00a0"}
              {"\n"}Vertreten durch{"\u00a0"}
              {"\n"}Dr.-Ing. Sascha Schröder{"\u00a0"}
              {"\n"}Kontakt{"\u00a0"}
              {"\n"}+49 351 2048 244{"\u00a0"}
              {"\n"}sales@dresdnerspitzen.com{"\u00a0"}
              {"\n"}Handelsregister{"\u00a0"}
              {"\n"}Amtsgericht Dresden{"\u00a0"}
              {"\n"}HRA 2456{"\u00a0"}
              {"\n"}Komplementärin{"\u00a0"}
              {"\n"}M. & S. Schröder GmbH{"\u00a0"}
              {"\n"}Amtsgericht Dresden, HRB 12846{"\u00a0"}
              {"\n"}Umsatzsteuer-Identifikationsnummer{"\u00a0"}
              {"\n"}DE 811 896 186{"\u00a0"}
            </p>
          </div>
        </div>
      </section>
    </EditorialLayout>
  );
};

export default Imprint;
