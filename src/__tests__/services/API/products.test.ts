import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock API functions for testing
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Simulated API functions that would exist
const fetchWithAuth = async (url: string, token?: string) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
};

const buildApiUrl = (endpoint: string, projectKey: string = "test-project"): string => {
  const baseUrl = "https://api.test.com";
  return `${baseUrl}/${projectKey}/${endpoint}`;
};

const handleApiError = (error: any): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return "Unknown API error";
};

describe("API utilities", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("fetchWithAuth", () => {
    it("should make authenticated requests", async () => {
      const mockResponse = { id: 1, name: "Test Product" };

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await fetchWithAuth("https://api.test.com/products", "test-token");

      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.test.com/products",
        expect.objectContaining({
          method: "GET",
          headers: expect.objectContaining({
            Authorization: "Bearer test-token",
            "Content-Type": "application/json",
          }),
        })
      );
    });

    it("should make unauthenticated requests", async () => {
      const mockResponse = { data: "public data" };

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await fetchWithAuth("https://api.test.com/public");

      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.test.com/public",
        expect.objectContaining({
          headers: expect.not.objectContaining({
            Authorization: expect.any(String),
          }),
        })
      );
    });

    it("should handle API errors", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
      });

      await expect(fetchWithAuth("https://api.test.com/notfound")).rejects.toThrow(
        "API Error: 404"
      );
    });
  });

  describe("buildApiUrl", () => {
    it("should build correct API URLs", () => {
      expect(buildApiUrl("products")).toBe("https://api.test.com/test-project/products");
      expect(buildApiUrl("customers", "my-project")).toBe(
        "https://api.test.com/my-project/customers"
      );
    });

    it("should handle empty endpoints", () => {
      expect(buildApiUrl("")).toBe("https://api.test.com/test-project/");
    });
  });

  describe("handleApiError", () => {
    it("should extract error messages", () => {
      expect(handleApiError(new Error("Network error"))).toBe("Network error");
      expect(handleApiError("String error")).toBe("Unknown API error");
      expect(handleApiError(null)).toBe("Unknown API error");
    });
  });
});
