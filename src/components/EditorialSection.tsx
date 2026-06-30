import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EditorialSectionProps {
  children: ReactNode;
  className?: string;
  backgroundImage?: string;
  overlayOpacity?: number;
  id?: string;
}

const EditorialSection = ({
  children,
  className,
  backgroundImage,
  overlayOpacity = 0.85,
  id,
}: EditorialSectionProps) => {
  if (!backgroundImage) {
    return <section id={id} className={className}>{children}</section>;
  }

  return (
    <section
      id={id}
      className={cn("relative bg-cover bg-center bg-no-repeat", className)}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `hsl(var(--background) / ${overlayOpacity})` }}
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
};

export default EditorialSection;
