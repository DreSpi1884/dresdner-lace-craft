import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
}

const SITE_NAME = "Dresdner Spitzen";
const DEFAULT_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6091ceac-22b1-45f0-97f7-7161c48ce35f/id-preview-10a3df69--7f9e3b33-3695-4d37-9167-b83aebdaddf9.lovable.app-1782285246910.png";

/**
 * Per-route head tags. JS-executing crawlers (Googlebot) read these.
 * Static social crawlers (LinkedIn, WhatsApp, Facebook, X) only read
 * the tags in index.html — they see the sitewide defaults there.
 */
const SEO = ({ title, description, path, image = DEFAULT_IMAGE }: SEOProps) => {
  const fullTitle = `${title} — ${SITE_NAME}`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={path} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={path} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
