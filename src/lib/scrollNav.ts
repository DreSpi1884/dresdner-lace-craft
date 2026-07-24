

// Zusätzlicher Abstand für einzelne Sections (z.B. mehr Luft oberhalb der Überschrift)
const EXTRA_OFFSET_BY_ID: Record<string, number> = {
  sustainability: 40,
  values: 40,
};

export const getAnchorScrollOffset = (id?: string) => {
  const isDesktop = window.innerWidth >= 1024;
  const header = document.querySelector<HTMLElement>("[data-site-header]");
  const headerHeight =
    header?.getBoundingClientRect().height ?? (isDesktop ? 96 : 80);

  if (!isDesktop) return headerHeight;

  const subNav = document.querySelector<HTMLElement>("[data-anchor-subnav]");
  const subNavHeight = subNav?.getBoundingClientRect().height ?? 0;
  const extra = id ? EXTRA_OFFSET_BY_ID[id] ?? 0 : 0;

  return headerHeight + subNavHeight + 24 + extra;
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
