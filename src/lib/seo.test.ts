import { describe, expect, it } from "vitest";
import { getCanonicalUrl, stripHtml, truncate } from "./seo";

describe("seo helpers", () => {
  it("builds canonical urls with a leading slash", () => {
    expect(getCanonicalUrl("products")).toContain("/products");
  });

  it("strips html tags from descriptions", () => {
    expect(stripHtml("<p>Hello <strong>world</strong></p>")).toBe("Hello world");
  });

  it("truncates long descriptions", () => {
    const value = truncate("a".repeat(170), 20);
    expect(value.length).toBeLessThanOrEqual(20);
    expect(value.endsWith("…")).toBe(true);
  });
});
