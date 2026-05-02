import { getCanonicalUrl, getSiteUrl, stripHtml, truncate } from "lib/seo";

export function getProductSeoData(product, id) {
  const seoTitle = product?.title
    ? `${product.title} | Nowy Lombard`
    : "Produkt | Nowy Lombard";

  const seoDescription = truncate(
    stripHtml(product?.description || "Szczegóły produktu dostępnego w ofercie Nowego Lombardu."),
    155
  );

  const canonicalPath = product?._id ? `/product/${product._id}` : `/product/${id || ""}`;

  const productSchema = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        description: stripHtml(product.description || ""),
        image: Array.isArray(product.images)
          ? product.images.map((image) =>
              image.startsWith("http") ? image : `${getSiteUrl()}${image}`
            )
          : [],
        offers: {
          "@type": "Offer",
          priceCurrency: "PLN",
          price: Number(product.price || 0).toFixed(2),
          availability:
            product?.availabilityStatus === "unavailable"
              ? "https://schema.org/OutOfStock"
              : "https://schema.org/InStock",
          url: getCanonicalUrl(canonicalPath),
        },
      }
    : null;

  return {
    seoTitle,
    seoDescription,
    canonicalPath,
    productSchema,
  };
}
