import { describe, expect, it } from "vitest";
import { assertAllowedBackendPath, ForbiddenBackendPathError } from "./backend";

const allowed = (p: string) => {
  expect(() => assertAllowedBackendPath(p)).not.toThrow();
};
const blocked = (p: string) => {
  expect(() => assertAllowedBackendPath(p)).toThrow(ForbiddenBackendPathError);
};

describe("assertAllowedBackendPath — customer proxy allowlist", () => {
  it("allows customer-facing resources (with and without version prefix)", () => {
    allowed("products");
    allowed("v1/products");
    allowed("v1/products/123");
    allowed("v1/categories");
    allowed("v1/locations");
    allowed("v1/auctions/abc/bids");
    allowed("v1/orders/xyz/confirm-payment");
    allowed("v1/inquiries");
  });

  it("blocks privileged / non-customer resources", () => {
    blocked("v1/admin/users");
    blocked("admin");
    blocked("v1/auth/user");
    blocked("v1/account");
    blocked("v1/staff");
  });

  it("blocks path traversal and empty segments", () => {
    blocked("v1/products/../../internal");
    blocked("..");
    blocked("v1/../auth");
    blocked("");
    blocked("/");
  });
});
