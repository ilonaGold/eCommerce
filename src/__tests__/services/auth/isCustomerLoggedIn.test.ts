import { describe, it, expect, vi, beforeEach } from "vitest";
import { isCustomerLoggedIn } from "../../../services/auth/isCustomerLoggedIn";

// Mock dependencies
vi.mock("../../../services/localStorage/localStorage");
vi.mock("../../../services/auth/refreshToken");

import { getLoginInfo } from "../../../services/localStorage/localStorage";
import { refreshAccessToken } from "../../../services/auth/refreshToken";

const mockGetLoginInfo = vi.mocked(getLoginInfo);
const mockRefreshAccessToken = vi.mocked(refreshAccessToken);

// Mock environment variables
Object.defineProperty(import.meta, "env", {
  value: {
    VITE_CTP_CLIENT_ID: "test-client-id",
    VITE_CTP_CLIENT_SECRET: "test-client-secret",
    VITE_CTP_AUTH_URL: "https://auth.test.com",
    VITE_CTP_API_URL: "https://api.test.com",
    VITE_CTP_PROJECT_KEY: "test-project",
  },
  writable: true,
});

// Helper function to create a mock customer
const createMockCustomer = (overrides = {}) => ({
  id: "123",
  version: 1,
  createdAt: "2023-01-01T00:00:00Z",
  lastModifiedAt: "2023-01-01T00:00:00Z",
  email: "test@test.com",
  isEmailVerified: true,
  firstName: "John",
  lastName: "Doe",
  ...overrides,
});

describe("isCustomerLoggedIn", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it("should return false when no login info exists", async () => {
    mockGetLoginInfo.mockReturnValue(null);

    const result = await isCustomerLoggedIn();

    expect(result.isTokenValid).toBe(false);
    expect(result.customer).toBe(null);
  });

  it("should return true for valid non-expired token", async () => {
    const futureDate = Date.now() + 10000;
    const mockCustomer = createMockCustomer();

    mockGetLoginInfo.mockReturnValue({
      accessToken: "valid-token",
      refreshToken: "refresh-token",
      expiresAt: futureDate,
      customer: mockCustomer,
    });

    const fetchedCustomer = createMockCustomer({
      email: "fetched@test.com",
      firstName: "Jane",
    });

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ active: true }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(fetchedCustomer),
      });

    const result = await isCustomerLoggedIn();

    expect(result.isTokenValid).toBe(true);
    expect(result.customer).toEqual(fetchedCustomer);
  });

  it("should refresh token when expired", async () => {
    const expiredDate = Date.now() - 1000;
    const mockCustomer = createMockCustomer();

    mockGetLoginInfo.mockReturnValue({
      accessToken: "old-token",
      refreshToken: "refresh-token",
      expiresAt: expiredDate,
      customer: mockCustomer,
    });

    mockRefreshAccessToken.mockResolvedValue("new-token");

    const fetchedCustomer = createMockCustomer();
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(fetchedCustomer),
    });

    const result = await isCustomerLoggedIn();

    expect(mockRefreshAccessToken).toHaveBeenCalledWith("refresh-token");
    expect(result.isTokenValid).toBe(true);
    expect(result.customer).toEqual(fetchedCustomer);
  });

  it("should refresh token when introspection shows inactive", async () => {
    const futureDate = Date.now() + 10000;
    const mockCustomer = createMockCustomer();

    mockGetLoginInfo.mockReturnValue({
      accessToken: "invalid-token",
      refreshToken: "refresh-token",
      expiresAt: futureDate,
      customer: mockCustomer,
    });

    mockRefreshAccessToken.mockResolvedValue("new-token");

    const fetchedCustomer = createMockCustomer();
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ active: false }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(fetchedCustomer),
      });

    const result = await isCustomerLoggedIn();

    expect(mockRefreshAccessToken).toHaveBeenCalledWith("refresh-token");
    expect(result.isTokenValid).toBe(true);
    expect(result.customer).toEqual(fetchedCustomer);
  });

  it("should handle customer fetch with 500 server error", async () => {
    const futureDate = Date.now() + 10000;
    const mockCustomer = createMockCustomer();

    mockGetLoginInfo.mockReturnValue({
      accessToken: "valid-token",
      refreshToken: "refresh-token",
      expiresAt: futureDate,
      customer: mockCustomer,
    });

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ active: true }),
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
        text: () => Promise.resolve("Server error occurred"),
      });

    await expect(isCustomerLoggedIn()).rejects.toThrow(
      "Failed to fetch customer response: 500 Internal Server Error - Server error occurred"
    );
  });

  it("should handle introspect fetch network error", async () => {
    const futureDate = Date.now() + 10000;
    const mockCustomer = createMockCustomer();

    mockGetLoginInfo.mockReturnValue({
      accessToken: "valid-token",
      refreshToken: "refresh-token",
      expiresAt: futureDate,
      customer: mockCustomer,
    });

    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

    await expect(isCustomerLoggedIn()).rejects.toThrow("Something went wrong Network error");
  });

  it("should handle refresh token failure", async () => {
    const expiredDate = Date.now() - 1000;
    const mockCustomer = createMockCustomer();

    mockGetLoginInfo.mockReturnValue({
      accessToken: "token",
      refreshToken: "refresh-token",
      expiresAt: expiredDate,
      customer: mockCustomer,
    });

    mockRefreshAccessToken.mockRejectedValue(new Error("Refresh failed"));

    await expect(isCustomerLoggedIn()).rejects.toThrow("Something went wrong Refresh failed");
  });

  it("should verify introspect API call structure", async () => {
    const futureDate = Date.now() + 10000;
    const mockCustomer = createMockCustomer();

    mockGetLoginInfo.mockReturnValue({
      accessToken: "test-token",
      refreshToken: "refresh-token",
      expiresAt: futureDate,
      customer: mockCustomer,
    });

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ active: true }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCustomer),
      });

    await isCustomerLoggedIn();

    // Use actual environment variables from the running system
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/oauth/introspect"),
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      })
    );
  });

  it("should verify customer API call structure", async () => {
    const futureDate = Date.now() + 10000;
    const mockCustomer = createMockCustomer();

    mockGetLoginInfo.mockReturnValue({
      accessToken: "bearer-token",
      refreshToken: "refresh-token",
      expiresAt: futureDate,
      customer: mockCustomer,
    });

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ active: true }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCustomer),
      });

    await isCustomerLoggedIn();

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/me"),
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          Authorization: "Bearer bearer-token",
          "Content-Type": "application/json",
        }),
      })
    );
  });

  it("should handle empty login info object", async () => {
    mockGetLoginInfo.mockReturnValue({} as any);

    // Mock fetch to prevent undefined errors
    global.fetch = vi.fn().mockRejectedValue(new Error("No access token"));

    await expect(isCustomerLoggedIn()).rejects.toThrow("Something went wrong");
  });

  it("should handle null values in login info", async () => {
    mockGetLoginInfo.mockReturnValue({
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
      customer: null,
    } as any);

    // Mock fetch to prevent undefined errors
    global.fetch = vi.fn().mockRejectedValue(new Error("No access token"));

    await expect(isCustomerLoggedIn()).rejects.toThrow("Something went wrong");
  });

  it("should handle non-Error exception types", async () => {
    const expiredDate = Date.now() - 1000;
    const mockCustomer = createMockCustomer();

    mockGetLoginInfo.mockReturnValue({
      accessToken: "token",
      refreshToken: "refresh-token",
      expiresAt: expiredDate,
      customer: mockCustomer,
    });

    mockRefreshAccessToken.mockRejectedValue("String error");

    await expect(isCustomerLoggedIn()).rejects.toThrow("Something went wrong String error");
  });

  it("should handle customer with minimal required properties", async () => {
    const futureDate = Date.now() + 10000;
    const mockCustomer = createMockCustomer();

    mockGetLoginInfo.mockReturnValue({
      accessToken: "valid-token",
      refreshToken: "refresh-token",
      expiresAt: futureDate,
      customer: mockCustomer,
    });

    const minimalCustomer = createMockCustomer({
      firstName: undefined,
      lastName: undefined,
    });

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ active: true }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(minimalCustomer),
      });

    const result = await isCustomerLoggedIn();

    expect(result.isTokenValid).toBe(true);
    expect(result.customer).toEqual(minimalCustomer);
    expect(result.customer!.firstName).toBeUndefined();
    expect(result.customer!.lastName).toBeUndefined();
  });

  it("should handle malformed JSON response from introspect", async () => {
    const futureDate = Date.now() + 10000;
    const mockCustomer = createMockCustomer();

    mockGetLoginInfo.mockReturnValue({
      accessToken: "valid-token",
      refreshToken: "refresh-token",
      expiresAt: futureDate,
      customer: mockCustomer,
    });

    global.fetch = vi.fn().mockResolvedValueOnce({
      json: () => Promise.reject(new Error("Invalid JSON")),
    });

    await expect(isCustomerLoggedIn()).rejects.toThrow("Something went wrong Invalid JSON");
  });

  it("should handle malformed JSON response from customer API", async () => {
    const futureDate = Date.now() + 10000;
    const mockCustomer = createMockCustomer();

    mockGetLoginInfo.mockReturnValue({
      accessToken: "valid-token",
      refreshToken: "refresh-token",
      expiresAt: futureDate,
      customer: mockCustomer,
    });

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ active: true }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.reject(new Error("Invalid customer JSON")),
      });

    await expect(isCustomerLoggedIn()).rejects.toThrow(
      "Something went wrong Invalid customer JSON"
    );
  });

  it("should handle token exactly at expiration time", async () => {
    const currentTime = Date.now();
    const mockCustomer = createMockCustomer();

    mockGetLoginInfo.mockReturnValue({
      accessToken: "token",
      refreshToken: "refresh-token",
      expiresAt: currentTime,
      customer: mockCustomer,
    });

    mockRefreshAccessToken.mockResolvedValue("new-token");

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockCustomer),
    });

    const result = await isCustomerLoggedIn();

    expect(mockRefreshAccessToken).toHaveBeenCalledWith("refresh-token");
    expect(result.isTokenValid).toBe(true);
  });

  it("should handle customer API returning 401 unauthorized", async () => {
    const futureDate = Date.now() + 10000;
    const mockCustomer = createMockCustomer();

    mockGetLoginInfo.mockReturnValue({
      accessToken: "invalid-token",
      refreshToken: "refresh-token",
      expiresAt: futureDate,
      customer: mockCustomer,
    });

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ active: true }),
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: "Unauthorized",
        text: () => Promise.resolve("Invalid token"),
      });

    await expect(isCustomerLoggedIn()).rejects.toThrow(
      "Failed to fetch customer response: 401 Unauthorized - Invalid token"
    );
  });

  it("should handle customer API returning 403 forbidden", async () => {
    const futureDate = Date.now() + 10000;
    const mockCustomer = createMockCustomer();

    mockGetLoginInfo.mockReturnValue({
      accessToken: "valid-token",
      refreshToken: "refresh-token",
      expiresAt: futureDate,
      customer: mockCustomer,
    });

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ active: true }),
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 403,
        statusText: "Forbidden",
        text: () => Promise.resolve("Access denied"),
      });

    await expect(isCustomerLoggedIn()).rejects.toThrow(
      "Failed to fetch customer response: 403 Forbidden - Access denied"
    );
  });

  it("should handle missing refresh token when token is expired", async () => {
    const expiredDate = Date.now() - 1000;
    const mockCustomer = createMockCustomer();

    mockGetLoginInfo.mockReturnValue({
      accessToken: "expired-token",
      refreshToken: "",
      expiresAt: expiredDate,
      customer: mockCustomer,
    });

    mockRefreshAccessToken.mockResolvedValue("new-token");

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockCustomer),
    });

    const result = await isCustomerLoggedIn();

    expect(mockRefreshAccessToken).toHaveBeenCalledWith("");
    expect(result.isTokenValid).toBe(true);
  });

  it("should handle very large expiration timestamp", async () => {
    const veryFutureDate = Date.now() + 999999999999;
    const mockCustomer = createMockCustomer();

    mockGetLoginInfo.mockReturnValue({
      accessToken: "valid-token",
      refreshToken: "refresh-token",
      expiresAt: veryFutureDate,
      customer: mockCustomer,
    });

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ active: true }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCustomer),
      });

    const result = await isCustomerLoggedIn();

    expect(result.isTokenValid).toBe(true);
    expect(result.customer).toEqual(mockCustomer);
  });

  it("should handle customer with all optional fields missing", async () => {
    const futureDate = Date.now() + 10000;
    const mockCustomer = createMockCustomer();

    mockGetLoginInfo.mockReturnValue({
      accessToken: "valid-token",
      refreshToken: "refresh-token",
      expiresAt: futureDate,
      customer: mockCustomer,
    });

    const bareMinimumCustomer = {
      id: "456",
      version: 2,
      createdAt: "2023-02-01T00:00:00Z",
      lastModifiedAt: "2023-02-01T00:00:00Z",
      email: "minimal@test.com",
      isEmailVerified: false,
    };

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ active: true }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(bareMinimumCustomer),
      });

    const result = await isCustomerLoggedIn();

    expect(result.isTokenValid).toBe(true);
    expect(result.customer).toEqual(bareMinimumCustomer);
  });
});
