// Central scroll/offset helpers.
// One source of truth for how far a section must sit below the fixed header
// (and, on desktop, the sticky sub-nav). Used by ScrollToTop, the anchor
// navs, and any per-page accordion openers.

const BUFFER_PX = 8;

const SERVICE_SECTION_IDS = new Set([
  "design",
  "raw-material-production",
  "dyeing-finishing",
  "functional-textiles",
]);

// Extra breathing room (or negative = scroll further down) needed for
// specific sections, on top of the base header/sub-nav offset.
const EXTRA_OFFSET_BY_ID: Record<string, number> = {
  history: -50,
  sustainability: 30,
  values: 30,
};

export const getAnchorScrollOffset = (id?: string) => {
  const isDesktop = window.innerWidth >= 1024;
const headerBar = document.querySelector<HTMLElement>(
  "[data-site-header] > nav"
);

const headerHeight =
  headerBar?.getBoundingClientRect().height ?? (isDesktop ? 96 : 80);

  if (!isDesktop) return headerHeight;

  const subNav = document.querySelector<HTMLElement>("[data-anchor-subnav]");
  const subNavHeight = subNav?.getBoundingClientRect().height ?? 0;
  const extra = id ? EXTRA_OFFSET_BY_ID[id] ?? 0 : 0;
  const buffer = id && SERVICE_SECTION_IDS.has(id) ? 0 : BUFFER_PX;

  return headerHeight + subNavHeight + buffer + extra;
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
