import { describe, it, expect, vi, beforeEach } from "vitest";
import { productProjectionSearch } from "../../../../services/API/products/productProjectionSearch";

// Mock auth service
vi.mock("../../../../services/auth/getAccessTokenData", () => ({
  getAccessTokenData: vi.fn(() => Promise.resolve({ access_token: "mock-token" })),
}));

describe("productProjectionSearch", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it("should search with default parameters", async () => {
    const mockResponse = {
      limit: 12,
      offset: 0,
      count: 2,
      results: [
        { id: "prod-1", name: { "en-US": "Product 1" } },
        { id: "prod-2", name: { "en-US": "Product 2" } },
      ],
      facets: {},
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await productProjectionSearch();

    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("limit=12"),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer mock-token",
        }),
      })
    );
  });

  it("should handle custom search parameters", async () => {
    const mockResponse = {
      limit: 20,
      offset: 20,
      count: 5,
      results: [],
      facets: {},
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await productProjectionSearch({
      query: "shoes",
      page: 2,
      limit: 20,
      categoryId: "cat-123",
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("limit=20&offset=20"),
      expect.anything()
    );
  });

  it("should handle search errors", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      text: () => Promise.resolve("Search failed"),
    });

    await expect(productProjectionSearch()).rejects.toThrow();
  });
});
