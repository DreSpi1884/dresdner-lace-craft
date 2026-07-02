import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Global scroll-triggered reveal animations.
 * - Splits h1/h2/h3 into per-word spans that stagger up on reveal
 * - Fades in p and img elements with a gentle upward drift
 * - Runs once per element (won't re-trigger)
 */
const HEADING_SEL = "h1, h2, h3";
const BODY_SEL = "p, li, blockquote";
const IMAGE_SEL = "img";

const PROCESSED = "data-reveal-init";
const REVEAL_ON = "data-reveal-in";

function splitHeadingWords(el: HTMLElement) {
  // Only split if all children are text nodes (avoid breaking nested markup)
  const children = Array.from(el.childNodes);
  const allText = children.every((n) => n.nodeType === Node.TEXT_NODE);
  if (!allText) {
    el.classList.add("reveal-body");
    return;
  }
  const text = el.textContent ?? "";
  const words = text.split(/(\s+)/); // keep whitespace tokens
  el.textContent = "";
  let idx = 0;
  for (const token of words) {
    if (/^\s+$/.test(token)) {
      el.appendChild(document.createTextNode(token));
      continue;
    }
    if (!token) continue;
    const outer = document.createElement("span");
    outer.className = "reveal-word";
    outer.style.setProperty("--reveal-i", String(idx));
    const inner = document.createElement("span");
    inner.className = "reveal-word-inner";
    inner.textContent = token;
    outer.appendChild(inner);
    el.appendChild(outer);
    idx++;
  }
  el.classList.add("reveal-heading");
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
      { threshold: 0.2, rootMargin: "0px 0px -5% 0px" }
    );

    const process = () => {
      const root = document.body;
      // Headings
      root.querySelectorAll<HTMLElement>(HEADING_SEL).forEach((el) => {
        if (el.hasAttribute(PROCESSED)) return;
        el.setAttribute(PROCESSED, "1");
        splitHeadingWords(el);
        observer.observe(el);
      });
      // Body text
      root.querySelectorAll<HTMLElement>(BODY_SEL).forEach((el) => {
        if (el.hasAttribute(PROCESSED)) return;
        el.setAttribute(PROCESSED, "1");
        el.classList.add("reveal-body");
        observer.observe(el);
      });
      // Images
      root.querySelectorAll<HTMLElement>(IMAGE_SEL).forEach((el) => {
        if (el.hasAttribute(PROCESSED)) return;
        el.setAttribute(PROCESSED, "1");
        el.classList.add("reveal-image");
        observer.observe(el);
      });
    };

    // Delay to let route content mount
    const t = window.setTimeout(process, 50);
    // Re-scan when DOM changes (route swaps, lazy content)
    const mo = new MutationObserver(() => process());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(t);
      mo.disconnect();
      observer.disconnect();
    };
  }, [location.pathname]);
}
