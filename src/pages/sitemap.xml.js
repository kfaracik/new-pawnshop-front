import { getSiteUrl } from "lib/seo";

const STATIC_PATHS = ["/", "/products", "/contact", "/legal/privacy", "/legal/terms", "/legal/cookies"];

const toUrlEntry = (path, lastModified) => `
  <url>
    <loc>${`${getSiteUrl()}${path}`}</loc>
    <lastmod>${lastModified}</lastmod>
  </url>`;

export async function getServerSideProps({ res }) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const today = new Date().toISOString();
  let productEntries = "";

  if (apiBaseUrl) {
    try {
      const response = await fetch(
        `${apiBaseUrl.replace(/\/$/, "")}/products?page=1&limit=500`
      );

      if (response.ok) {
        const data = await response.json();
        const products = Array.isArray(data?.products) ? data.products : [];

        productEntries = products
          .filter((product) => product?._id)
          .map((product) =>
            toUrlEntry(
              `/product/${product._id}`,
              product.updatedAt || product.createdAt || today
            )
          )
          .join("");
      }
    } catch (_error) {
      productEntries = "";
    }
  }

  const staticEntries = STATIC_PATHS.map((path) => toUrlEntry(path, today)).join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${productEntries}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SitemapXml() {
  return null;
}
