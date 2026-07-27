export const SITE = {
  name: "Dresdner Spitzen",

  url: (
    import.meta.env.VITE_SITE_URL ??
    "https://www.dresdnerspitzen.de"
  ).replace(/\/$/, ""),

  salesEmail: "sales@dresdnerspitzen.com",
  jobsEmail: "jobs@dresdnerspitzen.com",

  phoneDisplay: "0351 2048 244",
  phoneHref: "+493512048244",
} as const;
