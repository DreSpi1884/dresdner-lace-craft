// Central scroll/offset helpers.
// One source of truth for how far a section must sit below the fixed header
// (and, on desktop, the sticky sub-nav). Used by ScrollToTop, the anchor
// navs, and any per-page accordion openers.

const BUFFER_PX = 8;

// Extra breathing room (or negative = scroll further down) needed for
// specific sections, on top of the base header/sub-nav offset.
const EXTRA_OFFSET_BY_ID: Record<string, number> = {
  history: -25,
  sustainability: 30,
  values: -80,
  design: -60,
  "raw-material-production": -60,
  "dyeing-finishing": -60,
  "functional-textiles": -60,
};

export const getAnchorScrollOffset = (id?: string) => {
  const isDesktop = window.innerWidth >= 1024;

  const header = document.querySelector<HTMLElement>("[data-site-header]");
  const headerHeight =
    header?.getBoundingClientRect().height ?? (isDesktop ? 96 : 80);

  // Mobile: wie im alten Code ausschließlich den Haupt-Header berücksichtigen.
  if (!isDesktop) {
    return headerHeight;
  }

  // Desktop: Haupt-Header + sticky Subnav + individueller Section-Offset.
  const subNav = document.querySelector<HTMLElement>(
    "[data-anchor-subnav]"
  );
  const subNavHeight = subNav?.getBoundingClientRect().height ?? 0;

  const extra = id ? EXTRA_OFFSET_BY_ID[id] ?? 0 : 0;

  return headerHeight + subNavHeight + BUFFER_PX + extra;
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
