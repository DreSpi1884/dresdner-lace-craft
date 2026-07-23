import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useScrollAnimations from "@/hooks/useScrollAnimations";

// Offsets to keep the section heading clear of the fixed top nav.
// Mobile nav is h-20 (80px); desktop is h-24 (96px). Anchor navs on desktop
// add another sticky bar (~64px) for /about and /services.
const getScrollOffset = (pathname: string) => {
  const isDesktop = window.innerWidth >= 1024;
  const hasAnchorNav =
    isDesktop && (pathname.startsWith("/about") || pathname.startsWith("/services"));

  if (hasAnchorNav) return 160;

  const header = document.querySelector<HTMLElement>("[data-site-header]");
  return header?.getBoundingClientRect().height ?? (isDesktop ? 96 : 80);
};

const scrollToHash = (hash: string, pathname: string) => {
  const id = hash.replace("#", "");
  if (!id) return false;

  const isMobileAbout = pathname.startsWith("/about") && window.innerWidth < 1024;
  const el = isMobileAbout
    ? document.getElementById(`mobile-${id}`)
    : document.getElementById(`${id}-scroll-target`) ??
      document.getElementById(id);

  if (!el) return false;

  const offset = getScrollOffset(pathname);
  const top = el.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: isMobileAbout ? "auto" : "smooth",
  });
  return true;
};

const ScrollToTop = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      let cancelled = false;

      const tryScroll = (attempt = 0) => {
        if (cancelled) return;
        if (scrollToHash(hash, pathname)) return;
        if (attempt < 20) {
          window.setTimeout(() => tryScroll(attempt + 1), 60);
        }
      };

      // Give the new route a frame to mount before measuring.
      const raf = window.requestAnimationFrame(() => tryScroll());

      return () => {
        cancelled = true;
        window.cancelAnimationFrame(raf);
      };
    }

    window.scrollTo(0, 0);
  }, [pathname, hash, key]);

  useScrollAnimations();

  return null;
};

export default ScrollToTop;
