import Head from "next/head";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_NAME,
  getCanonicalUrl,
  getSiteUrl,
} from "lib/seo";

type SeoHeadProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  schema?: Record<string, unknown> | Record<string, unknown>[];
};

const getImageUrl = (image?: string) => {
  if (!image) {
    return `${getSiteUrl()}/favicon.ico`;
  }

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return `${getSiteUrl()}${image.startsWith("/") ? image : `/${image}`}`;
};

export default function SeoHead({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image,
  noindex = false,
  schema,
}: SeoHeadProps) {
  const canonicalUrl = getCanonicalUrl(path);
  const ogImage = getImageUrl(image);
  const robots = noindex ? "noindex,follow" : "index,follow";
  const schemas = Array.isArray(schema) ? schema : schema ? [schema] : [];

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="pl_PL" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {schemas.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </Head>
  );
}
