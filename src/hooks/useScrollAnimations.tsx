import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Global scroll-triggered reveal animations.
 * - Fades in headings, paragraphs and images with a gentle upward drift
 * - Runs once per element (won't re-trigger)
 * - Skips any element inside a `[data-no-reveal]` ancestor
 */
const SELECTORS = "h1, h2, h3, p, li, blockquote, img";
const PROCESSED = "data-reveal-init";
const REVEAL_ON = "data-reveal-in";

function isExcluded(el: Element): boolean {
  return !!el.closest("[data-no-reveal]");
}

export default function useScrollAnimations() {
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute(REVEAL_ON, "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );

    const process = () => {
      document.body.querySelectorAll<HTMLElement>(SELECTORS).forEach((el) => {
        if (el.hasAttribute(PROCESSED)) return;
        if (isExcluded(el)) return;
        el.setAttribute(PROCESSED, "1");
        if (el.tagName === "IMG") {
          el.classList.add("reveal-image");
        } else {
          el.classList.add("reveal-body");
        }
        observer.observe(el);
      });
    };

    const t = window.setTimeout(process, 50);
    const mo = new MutationObserver(() => process());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(t);
      mo.disconnect();
      observer.disconnect();
    };
  }, [location.pathname]);
}
