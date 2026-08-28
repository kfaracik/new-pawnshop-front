import { describe, expect, it } from "vitest";
import { safeExternalUrl, safeStripeRedirectUrl } from "./safeUrl";

describe("safeExternalUrl", () => {
  it("allows http and https links", () => {
    expect(safeExternalUrl("https://facebook.com/x")).toBe("https://facebook.com/x");
    expect(safeExternalUrl("http://example.com")).toBe("http://example.com");
  });

  it("blocks script-capable schemes", () => {
    expect(safeExternalUrl("javascript:alert(1)")).toBeUndefined();
    expect(safeExternalUrl("data:text/html,<script>")).toBeUndefined();
    expect(safeExternalUrl("vbscript:msgbox(1)")).toBeUndefined();
  });

  it("returns undefined for empty / non-string", () => {
    expect(safeExternalUrl("")).toBeUndefined();
    expect(safeExternalUrl("   ")).toBeUndefined();
    expect(safeExternalUrl(null)).toBeUndefined();
    expect(safeExternalUrl(42)).toBeUndefined();
  });
});

describe("safeStripeRedirectUrl", () => {
  it("allows genuine Stripe checkout hosts over https", () => {
    expect(safeStripeRedirectUrl("https://checkout.stripe.com/c/pay/abc")).toBe(
      "https://checkout.stripe.com/c/pay/abc"
    );
    expect(safeStripeRedirectUrl("https://stripe.com/x")).toBe("https://stripe.com/x");
  });

  it("blocks look-alike and off-domain hosts", () => {
    expect(safeStripeRedirectUrl("https://stripe.com.evil.test/x")).toBeUndefined();
    expect(safeStripeRedirectUrl("https://evil.test/stripe.com")).toBeUndefined();
    expect(safeStripeRedirectUrl("https://notstripe.com/x")).toBeUndefined();
  });

  it("requires https", () => {
    expect(safeStripeRedirectUrl("http://checkout.stripe.com/x")).toBeUndefined();
  });

  it("returns undefined for junk input", () => {
    expect(safeStripeRedirectUrl("")).toBeUndefined();
    expect(safeStripeRedirectUrl("not a url")).toBeUndefined();
    expect(safeStripeRedirectUrl(null)).toBeUndefined();
  });
});
