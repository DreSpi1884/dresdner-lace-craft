import { ReactNode } from "react";
import EditorialNav from "./EditorialNav";
import EditorialFooter from "./EditorialFooter";
import laceBanner from "@/assets/lace-banner.png.asset.json";

interface EditorialLayoutProps {
  children: ReactNode;
  heroAtTop?: boolean;
}

const EditorialLayout = ({ children, heroAtTop = false }: EditorialLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <EditorialNav />
      <main className="flex-1">
        {!heroAtTop && (
          <div
            className="mt-20 md:mt-24 h-36 md:h-44 w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${laceBanner.url})` }}
            aria-hidden="true"
          />
        )}
        {children}
      </main>
      <EditorialFooter />
    </div>
  );
};

export default EditorialLayout;
