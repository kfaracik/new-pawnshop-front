import { describe, expect, it } from "vitest";
import { sanitizeHtml } from "./sanitizeHtml";

describe("sanitizeHtml", () => {
  it("removes scripts and inline handlers", () => {
    const unsafe =
      '<p onclick="alert(1)">Opis</p><script>alert(1)</script><img src="x" onerror="alert(1)">';

    expect(sanitizeHtml(unsafe)).toBe("<p>Opis</p>");
  });
});
