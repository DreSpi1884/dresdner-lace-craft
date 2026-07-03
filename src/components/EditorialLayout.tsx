import { ReactNode } from "react";
import EditorialNav from "./EditorialNav";
import EditorialFooter from "./EditorialFooter";
import laceBanner from "@/assets/lace-banner.png.asset.json";

interface EditorialLayoutProps {
  children: ReactNode;
  heroAtTop?: boolean;
  title?: string;
  subtitle?: string;
  heroCompact?: boolean;
  heroSnap?: boolean;
}

const EditorialLayout = ({ children, heroAtTop = false, title, subtitle, heroCompact = false, heroSnap = false }: EditorialLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <EditorialNav />
      <main className="flex-1">
        {!heroAtTop && (
          <div
            className={`mt-20 md:mt-24 relative w-full bg-cover bg-center flex items-end ${heroCompact ? "h-[35vh] min-h-[200px] md:min-h-[220px] pb-4 md:pb-6" : "h-[280px] md:h-[340px] pb-10 md:pb-14"}`}
            style={{ backgroundImage: `url(${laceBanner.url})`, scrollSnapAlign: heroSnap ? "start" : undefined }}
          >
            <div className="absolute inset-0 bg-background/40" aria-hidden="true" />
            {(title || subtitle) && (
              <div className={`relative w-full px-6 md:px-12 lg:px-16 ${heroCompact ? "pb-0" : "pb-10 md:pb-14"}`}>
                {title && (
                  <h1 className="editorial-heading-xl text-foreground max-w-3xl">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="editorial-body text-foreground/80 max-w-3xl mt-3">
                    {subtitle}
                  </p>
                )}
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
