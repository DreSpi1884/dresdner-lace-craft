import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import useScrollAnimations from "@/hooks/useScrollAnimations";
import { getAnchorScrollOffset, getAnchorTargetElement } from "@/lib/scrollNav";

const instantScrollTo = (top: number) => {
  const html = document.documentElement;
  const body = document.body;
  const prevHtml = html.style.scrollBehavior;
  const prevBody = body.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  body.style.scrollBehavior = "auto";
  window.scrollTo({ top: Math.max(top, 0), left: 0, behavior: "auto" });
  // restore after the current frame
  window.requestAnimationFrame(() => {
    html.style.scrollBehavior = prevHtml;
    body.style.scrollBehavior = prevBody;
  });
};

const scrollToHash = (hash: string, pathname: string) => {
  const id = hash.replace("#", "");
  if (!id) return false;
  const target = getAnchorTargetElement(id, pathname);
  if (!target) return false;
  const offset = getAnchorScrollOffset(id);
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
  const isMobileAbout =
    pathname.startsWith("/about") && window.innerWidth < 1024;

  // Mobile About manages its accordion state and scrolling itself.
  if (hash && isMobileAbout) return;

  if (!hash) {
    instantScrollTo(0);
    return;
  }

    // Try immediately (synchronous, pre-paint) — no visible jump.
    if (scrollToHash(hash, pathname)) return;

    // Target not yet in the DOM (e.g. mobile accordion still mounting).
    // Retry on the next few frames only; stop as soon as it succeeds.
    let cancelled = false;
    let frame = 0;
    const tick = (attempt: number) => {
      if (cancelled) return;
      if (scrollToHash(hash, pathname)) return;
      if (attempt < 10) {
        frame = window.requestAnimationFrame(() => tick(attempt + 1));
      }
    };
    frame = window.requestAnimationFrame(() => tick(0));

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
    };
  }, [pathname, hash, key]);

  useScrollAnimations();
  return null;
};

export default ScrollToTop;
