import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import useScrollAnimations from "@/hooks/useScrollAnimations";

// Offsets to keep the section heading clear of the fixed top nav.
// Mobile nav is h-20 (80px); desktop is h-24 (96px). Anchor navs on desktop
// add another sticky bar for /about and /services.
const ABOUT_DESKTOP_SCROLL_OFFSET = 130;
const SERVICES_DESKTOP_SCROLL_OFFSET = 160;

const getScrollOffset = (pathname: string) => {
  const isDesktop = window.innerWidth >= 1024;
  const isAbout = pathname.startsWith("/about");
  const isServices = pathname.startsWith("/services");

  if (isDesktop && isAbout) return ABOUT_DESKTOP_SCROLL_OFFSET;
  if (isDesktop && isServices) return SERVICES_DESKTOP_SCROLL_OFFSET;

  const header = document.querySelector<HTMLElement>("[data-site-header]");
  return header?.getBoundingClientRect().height ?? (isDesktop ? 96 : 80);
};

const scrollToHash = (
  hash: string,
  pathname: string,
  behavior: ScrollBehavior = "smooth"
) => {
  const id = hash.replace("#", "");
  if (!id) return false;

const isAbout = pathname.startsWith("/about");
const isMobileAbout = isAbout && window.innerWidth < 1024;
const shouldJumpInstantly =
  isMobileAbout ||
  (isAbout && window.sessionStorage.getItem("about-anchor-jump") === id);

const el = isMobileAbout
  ? document.getElementById(`mobile-${id}`)
  : document.getElementById(`${id}-scroll-target`) ??
    document.getElementById(id);

  if (!el) return false;

  const offset = getScrollOffset(pathname);
  const top = el.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: shouldJumpInstantly ? "auto" : "smooth",
  });
  
  if (shouldJumpInstantly) {
    window.sessionStorage.removeItem("about-anchor-jump");
  }
  
  return true;
};

const ScrollToTop = () => {
  const { pathname, hash, key } = useLocation();

  useLayoutEffect(() => {
    if (!hash) return;
    if (!pathname.startsWith("/about")) return;

    let cancelled = false;

    const tryScroll = (attempt = 0) => {
      if (cancelled) return;

      if (scrollToHash(hash, pathname, "auto")) return;

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

  useEffect(() => {
    if (hash) {
      if (pathname.startsWith("/about")) return;

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
    }

    window.scrollTo(0, 0);
  }, [pathname, hash, key]);

  useScrollAnimations();

  return null;
};

export default ScrollToTop;
