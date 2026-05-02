import { getSiteUrl } from "lib/seo";

export async function getServerSideProps({ res }) {
  const siteUrl = getSiteUrl();

  const robots = `User-agent: *
Allow: /
Disallow: /account
Disallow: /cart
Disallow: /search

Sitemap: ${siteUrl}/sitemap.xml
`;

  res.setHeader("Content-Type", "text/plain");
  res.write(robots);
  res.end();

  return {
    props: {},
  };
}

export default function RobotsTxt() {
  return null;
}
