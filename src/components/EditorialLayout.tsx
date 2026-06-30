import { ReactNode } from "react";
import EditorialNav from "./EditorialNav";
import EditorialFooter from "./EditorialFooter";

interface EditorialLayoutProps {
  children: ReactNode;
  heroAtTop?: boolean;
}

const EditorialLayout = ({ children, heroAtTop = false }: EditorialLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <EditorialNav />
      <main className={`flex-1 ${heroAtTop ? "" : "pt-24 md:pt-32"}`}>{children}</main>
      <EditorialFooter />
    </div>
  );
};

export default EditorialLayout;
