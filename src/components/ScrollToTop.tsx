import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import useScrollAnimations from "@/hooks/useScrollAnimations";
import { getAnchorScrollOffset, getAnchorTargetElement } from "@/lib/scrollNav";

const instantScrollTo = (top: number) => {
  const html = document.documentElement;
  const body = document.body;
  const previousHtmlScrollBehavior = html.style.scrollBehavior;
  const previousBodyScrollBehavior = body.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  body.style.scrollBehavior = "auto";
  window.scrollTo({
    top: Math.max(top, 0),
    left: 0,
    behavior: "auto",
  });
  window.requestAnimationFrame(() => {
    html.style.scrollBehavior = previousHtmlScrollBehavior;
    body.style.scrollBehavior = previousBodyScrollBehavior;
  });
};

const scrollToHash = (hash: string, pathname: string) => {
  const id = hash.replace("#", "");
  if (!id) return false;
  const target = getAnchorTargetElement(id, pathname);
  if (!target) return false;
  const offset = getAnchorScrollOffset();
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  instantScrollTo(top);
  return true;
};

const ScrollToTop = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    if (!hash) {
      instantScrollTo(0);
      return;
    }

    // Erster Versuch SOFORT, synchron, vor dem ersten Paint -> kein Sprung
    if (scrollToHash(hash, pathname)) return;

    // Fallback: Ziel-Element existiert noch nicht (z.B. Mobile-Accordion)
    let cancelled = false;
    const tryScroll = (attempt = 0) => {
      if (cancelled) return;
      if (scrollToHash(hash, pathname)) return;
      if (attempt < 20) {
        window.setTimeout(() => tryScroll(attempt + 1), 60);
      }
    };
    const raf = window.requestAnimationFrame(() => tryScroll());
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
    };
  }, [pathname, hash, key]);

  useScrollAnimations();
  return null;
};

export default ScrollToTop;
