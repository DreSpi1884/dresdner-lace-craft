import { ReactNode } from "react";
import EditorialNav from "./EditorialNav";
import EditorialFooter from "./EditorialFooter";
import laceBanner from "@/assets/lace-banner.png?url";

interface EditorialLayoutProps {
  children: ReactNode;
  heroAtTop?: boolean;
  title?: ReactNode;
  subtitle?: string;
  heroCompact?: boolean;
  heroSnap?: boolean;
  heroClassName?: string;
  titleClassName?: string;
}

const EditorialLayout = ({ children, heroAtTop = false, title, subtitle, heroCompact = false, heroSnap = false, heroClassName, titleClassName }: EditorialLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <EditorialNav />
      <main className="flex-1">
        {!heroAtTop && (
          <div
            className={`mt-20 md:mt-24 relative w-full bg-cover bg-center flex items-end ${heroCompact ? "h-[20vh] min-h-[120px] md:min-h-[140px] pb-3 md:pb-4" : "h-[280px] md:h-[340px] pb-10 md:pb-14"} ${heroClassName || ""}`}
            style={{ backgroundImage: `url(${laceBanner})`, scrollSnapAlign: heroSnap ? "start" : undefined }}
          >
            <div className="absolute inset-0 bg-background/40" aria-hidden="true" />
            {(title || subtitle) && (
              <div className={`relative w-full px-6 md:px-12 lg:px-16 ${heroCompact ? "pb-0" : "pb-10 md:pb-14"}`}>
                {title && (
                  <h1 className={`text-foreground max-w-3xl ${titleClassName || "editorial-heading-xl"}`}>
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
