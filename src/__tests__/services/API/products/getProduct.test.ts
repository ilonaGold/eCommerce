import { describe, it, expect, vi, beforeEach } from "vitest";
import { getProduct } from "../../../../services/API/products/getProduct";

// Mock the auth service
vi.mock("../../../../services/auth/getAccessTokenData", () => ({
  getAccessTokenData: vi.fn(() => Promise.resolve({ access_token: "mock-token" })),
}));

describe("getProduct API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it("should handle network errors", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    await expect(getProduct("nonexistent")).rejects.toThrow("Network Problem");
  });

  it("should handle fetch rejections", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network failure"));

    await expect(getProduct("test-id")).rejects.toThrow("Network failure");
  });
});
