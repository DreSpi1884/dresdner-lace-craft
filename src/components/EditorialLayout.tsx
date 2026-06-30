import { ReactNode } from "react";
import EditorialNav from "./EditorialNav";
import EditorialFooter from "./EditorialFooter";
import laceBanner from "@/assets/lace-banner.png.asset.json";

interface EditorialLayoutProps {
  children: ReactNode;
  heroAtTop?: boolean;
  title?: string;
}

const EditorialLayout = ({ children, heroAtTop = false, title }: EditorialLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <EditorialNav />
      <main className="flex-1">
        {!heroAtTop && (
          <div
            className="mt-20 md:mt-24 relative w-full h-[280px] md:h-[340px] bg-cover bg-center flex items-end"
            style={{ backgroundImage: `url(${laceBanner.url})` }}
          >
            <div className="absolute inset-0 bg-background/40" aria-hidden="true" />
            {title && (
              <div className="relative w-full px-6 md:px-12 lg:px-16 pb-10 md:pb-14">
                <h1 className="editorial-heading-xl text-foreground max-w-3xl">
                  {title}
                </h1>
              </div>
            )}
          </div>
        )}
        {children}
      </main>
      <EditorialFooter />
    </div>
  );
};

export default EditorialLayout;
