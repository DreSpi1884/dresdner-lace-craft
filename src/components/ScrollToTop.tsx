import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import useScrollAnimations from "@/hooks/useScrollAnimations";

const DESKTOP_ANCHOR_OFFSET = 130;

const getScrollOffset = (pathname: string) => {
  const isDesktop = window.innerWidth >= 1024;
  const isAbout = pathname.startsWith("/about");
const isServices = pathname.startsWith("/services");

if (isDesktop && isAbout) return ABOUT_DESKTOP_ANCHOR_OFFSET;
if (isDesktop && isServices) return SERVICES_DESKTOP_ANCHOR_OFFSET;

  const ABOUT_DESKTOP_ANCHOR_OFFSET = 180;
  const SERVICES_DESKTOP_ANCHOR_OFFSET = 130;

  const header = document.querySelector<HTMLElement>("[data-site-header]");
  return header?.getBoundingClientRect().height ?? (isDesktop ? 96 : 80);
};

const getTargetElement = (id: string, pathname: string) => {
  const isMobileAbout = pathname.startsWith("/about") && window.innerWidth < 1024;

  if (isMobileAbout) {
    return document.getElementById(`mobile-${id}`);
  }

  return (
    document.getElementById(`${id}-scroll-target`) ??
    document.getElementById(id)
  );
};

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

  const target = getTargetElement(id, pathname);
  if (!target) return false;

  const offset = getScrollOffset(pathname);
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
