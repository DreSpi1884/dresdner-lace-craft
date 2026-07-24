// Zentrale Hilfsfunktionen, damit der Scroll-Offset und das Ziel-Element
// bei Seitenaufruf per Link (ScrollToTop) und beim Klick auf einen
// Anchor-Nav-Button (AboutAnchorNav / ProductionAnchorNav) IMMER identisch
// berechnet werden.

export const getAnchorScrollOffset = () => {
  const isDesktop = window.innerWidth >= 1024;
  const header = document.querySelector<HTMLElement>("[data-site-header]");
  const headerHeight =
    header?.getBoundingClientRect().height ?? (isDesktop ? 96 : 80);

  if (!isDesktop) return headerHeight;

  const subNav = document.querySelector<HTMLElement>("[data-anchor-subnav]");
  const subNavHeight = subNav?.getBoundingClientRect().height ?? 0;

  return headerHeight + subNavHeight + 24;
};

export const getAnchorTargetElement = (id: string, pathname: string) => {
  const isMobileAbout = pathname.startsWith("/about") && window.innerWidth < 1024;

  if (isMobileAbout) {
    return document.getElementById(`mobile-${id}`);
  }

  return (
    document.getElementById(`${id}-scroll-target`) ??
    document.getElementById(id)
  );
};

export const getAnchorSectionTop = (id: string, pathname: string) => {
  const element = getAnchorTargetElement(id, pathname);
  if (!element) return null;
  return element.getBoundingClientRect().top + window.scrollY;
};
