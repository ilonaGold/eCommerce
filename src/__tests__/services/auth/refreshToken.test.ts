import { describe, it, expect, vi, beforeEach } from "vitest";
import { refreshAccessToken } from "../../../services/auth/refreshToken";

describe("refreshAccessToken", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it("should handle network errors", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network failure"));

    await expect(refreshAccessToken("test-token")).rejects.toThrow();
  });

  it("should handle fetch rejections", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Connection error"));

    await expect(refreshAccessToken("refresh-token")).rejects.toThrow("Connection error");
  });

  it("should handle timeout errors", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Request timeout"));

    await expect(refreshAccessToken("timeout-token")).rejects.toThrow("Request timeout");
  });
});
