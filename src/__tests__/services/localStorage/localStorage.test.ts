import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getLoginInfo,
  storeLoginData,
  clearLoginData,
} from "../../../services/localStorage/localStorage";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

const mockCustomer = {
  id: "123",
  version: 1,
  createdAt: "2023-01-01T00:00:00Z",
  lastModifiedAt: "2023-01-01T00:00:00Z",
  email: "test@test.com",
  isEmailVerified: true,
  firstName: "John",
  lastName: "Doe",
};

describe("localStorage service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getLoginInfo", () => {
    it("should return null when no data exists", () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = getLoginInfo();

      expect(result).toBe(null);
      expect(localStorageMock.getItem).toHaveBeenCalledWith("redpandaUser");
    });

    it("should return parsed login info when data exists", () => {
      const loginInfo = {
        accessToken: "token123",
        refreshToken: "refresh123",
        expiresAt: Date.now() + 10000,
        customer: mockCustomer,
      };

      localStorageMock.getItem.mockReturnValue(JSON.stringify(loginInfo));

      const result = getLoginInfo();

      expect(result).toEqual(loginInfo);
    });

    it("should throw error when JSON is invalid", () => {
      localStorageMock.getItem.mockReturnValue("invalid json");

      expect(() => getLoginInfo()).toThrow();
    });

    it("should return null when empty string is stored", () => {
      localStorageMock.getItem.mockReturnValue("");

      const result = getLoginInfo();

      expect(result).toBe(null);
    });

    it("should handle undefined return from localStorage", () => {
      localStorageMock.getItem.mockReturnValue(undefined);

      const result = getLoginInfo();

      expect(result).toBe(null);
    });
  });

  describe("storeLoginData", () => {
    it("should store login info as JSON string with correct key", () => {
      const loginInfo = {
        accessToken: "token123",
        refreshToken: "refresh123",
        expiresAt: Date.now() + 10000,
        customer: mockCustomer,
      };

      storeLoginData(loginInfo);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "redpandaUser",
        JSON.stringify(loginInfo)
      );
    });

    it("should handle customer with optional properties", () => {
      const loginInfoWithOptionals = {
        accessToken: "complex-token",
        refreshToken: "complex-refresh",
        expiresAt: Date.now() + 20000,
        customer: {
          id: "456",
          version: 2,
          createdAt: "2023-02-01T00:00:00Z",
          lastModifiedAt: "2023-02-01T00:00:00Z",
          email: "complex@test.com",
          isEmailVerified: true,
          firstName: "Jane",
          lastName: "Smith",
          dateOfBirth: "1990-01-01",
        },
      };

      storeLoginData(loginInfoWithOptionals);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "redpandaUser",
        JSON.stringify(loginInfoWithOptionals)
      );
    });

    it("should handle minimal login data", () => {
      const minimalLoginInfo = {
        accessToken: "minimal-token",
        refreshToken: "minimal-refresh",
        expiresAt: Date.now() + 5000,
        customer: {
          id: "min-123",
          version: 1,
          createdAt: "2023-01-01T00:00:00Z",
          lastModifiedAt: "2023-01-01T00:00:00Z",
          email: "min@test.com",
          isEmailVerified: false,
        },
      };

      storeLoginData(minimalLoginInfo);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "redpandaUser",
        JSON.stringify(minimalLoginInfo)
      );
    });
  });

  describe("clearLoginData", () => {
    it("should remove login info from localStorage with correct key", () => {
      clearLoginData();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith("redpandaUser");
    });
  });

  describe("integration scenarios", () => {
    it("should store and retrieve the same data", () => {
      const originalData = {
        accessToken: "integration-token",
        refreshToken: "integration-refresh",
        expiresAt: Date.now() + 30000,
        customer: mockCustomer,
      };

      // Mock the flow: store data, then retrieve it
      storeLoginData(originalData);
      const storedJson = localStorageMock.setItem.mock.calls[0][1];
      localStorageMock.getItem.mockReturnValue(storedJson);

      const retrievedData = getLoginInfo();

      expect(retrievedData).toEqual(originalData);
    });

    it("should handle clearing and retrieving after clear", () => {
      clearLoginData();
      localStorageMock.getItem.mockReturnValue(null);

      const result = getLoginInfo();

      expect(result).toBe(null);
      expect(localStorageMock.removeItem).toHaveBeenCalledWith("redpandaUser");
    });
  });
});
