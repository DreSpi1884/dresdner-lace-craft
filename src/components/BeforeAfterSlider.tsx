import { useRef, useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  beforeAlt = "Before",
  afterAlt = "After",
  beforeLabel = "Then",
  afterLabel = "Now",
  className = "",
}: BeforeAfterSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, pct)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
const onMove = (e: MouseEvent | TouchEvent) => {
  if ("touches" in e) {
    e.preventDefault();
  }

  const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
  updateFromClientX(clientX);
};
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging, updateFromClientX]);

  return (
    <div ref={containerRef} className={`relative w-full aspect-[4/3] overflow-hidden select-none ${className}`}>
      {/* After (base) */}
      <img
        src={afterImage}
        alt={afterAlt}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
      />
      {/* Before (clipped from the left) */}
      <img
        src={beforeImage}
        alt={beforeAlt}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        draggable={false}
      />

      {/* Labels */}
      <span
        className="absolute bottom-3 left-3 editorial-label text-background/90 text-[10px] tracking-[0.25em] drop-shadow transition-opacity duration-150"
        style={{ opacity: position > 2 ? 1 : 0 }}
      >
        {beforeLabel}
      </span>
      <span
        className="absolute bottom-3 right-3 editorial-label text-background/90 text-[10px] tracking-[0.25em] drop-shadow transition-opacity duration-150"
        style={{ opacity: position < 98 ? 1 : 0 }}
      >
        {afterLabel}
      </span>

      {/* Divider + handle */}
      <div
        className="absolute top-0 bottom-0 w-px bg-background/90 pointer-events-none"
        style={{ left: `${position}%` }}
      />
      <button
  type="button"
  aria-label="Drag to compare"
  onMouseDown={(e) => {
    e.preventDefault();
    setDragging(true);
  }}
  onTouchStart={(e) => {
    e.preventDefault();
    setDragging(true);
  }}
  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 md:w-10 md:h-10 rounded-full bg-background border border-foreground/20 shadow-md flex items-center justify-center cursor-ew-resize touch-none"
        style={{ left: `${position}%` }}
      >
        <ChevronLeft size={14} className="text-foreground" />
        <ChevronRight size={14} className="text-foreground" />
      </button>
    </div>
  );
};

export default BeforeAfterSlider;
