// Central scroll/offset helpers.
// One source of truth for how far a section must sit below the fixed header
// (and, on desktop, the sticky sub-nav). Used by ScrollToTop, the anchor
// navs, and any per-page accordion openers.

const BUFFER_PX = 8;

export const getAnchorScrollOffset = (_id?: string) => {
  const header = document.querySelector<HTMLElement>("[data-site-header]");
  const headerHeight =
    header?.getBoundingClientRect().height ??
    (window.innerWidth >= 1024 ? 96 : 80);

  const subNav = document.querySelector<HTMLElement>("[data-anchor-subnav]");
  // hidden elements report height 0, so this is safe on mobile
  const subNavHeight = subNav?.getBoundingClientRect().height ?? 0;

  return headerHeight + subNavHeight + BUFFER_PX;
};

export const getAnchorTargetElement = (id: string, pathname: string) => {
  const isMobileAbout =
    pathname.startsWith("/about") && window.innerWidth < 1024;

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
