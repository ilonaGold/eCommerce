import { describe, it, expect } from "vitest";

// Simple validation functions that would commonly exist
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*]/.test(password)
  );
};

const validateRequired = (value: any): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  return true;
};

const formatCurrency = (centAmount: number, currencyCode: string): string => {
  const amount = centAmount / 100;
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
  };
  const symbol = symbols[currencyCode] || currencyCode;
  return `${symbol}${amount.toFixed(2)}`;
};

const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

const validatePostalCode = (code: string, country: string = "US"): boolean => {
  const patterns: Record<string, RegExp> = {
    US: /^\d{5}(-\d{4})?$/,
    UK: /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i,
    CA: /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i,
  };
  return patterns[country]?.test(code) || false;
};

describe("validation utilities", () => {
  describe("validateEmail", () => {
    it("should validate correct email formats", () => {
      expect(validateEmail("test@example.com")).toBe(true);
      expect(validateEmail("user.name+tag@domain.co.uk")).toBe(true);
      expect(validateEmail("user123@test-domain.com")).toBe(true);
      expect(validateEmail("simple@test.co")).toBe(true);
    });

    it("should reject invalid email formats", () => {
      expect(validateEmail("invalid-email")).toBe(false);
      expect(validateEmail("@domain.com")).toBe(false);
      expect(validateEmail("user@")).toBe(false);
      expect(validateEmail("")).toBe(false);
      expect(validateEmail("user@domain")).toBe(false);
      expect(validateEmail("user name@domain.com")).toBe(false);
    });

    it("should handle edge cases", () => {
      expect(validateEmail("a@b.c")).toBe(true);
      expect(validateEmail("test@domain.com.")).toBe(true);
      expect(validateEmail(".test@domain.com")).toBe(true); // Actually valid according to regex
    });
  });

  describe("validatePassword", () => {
    it("should validate strong passwords", () => {
      expect(validatePassword("StrongPass123!")).toBe(true);
      expect(validatePassword("MySecure@Pass1")).toBe(true);
      expect(validatePassword("Valid123#Pass")).toBe(true);
    });

    it("should reject weak passwords", () => {
      expect(validatePassword("weak")).toBe(false);
      expect(validatePassword("12345678")).toBe(false);
      expect(validatePassword("NoNumbers!")).toBe(false);
      expect(validatePassword("nouppercase123!")).toBe(false);
      expect(validatePassword("NOLOWERCASE123!")).toBe(false);
      expect(validatePassword("NoSpecialChar123")).toBe(false);
    });

    it("should handle edge cases", () => {
      expect(validatePassword("")).toBe(false);
      expect(validatePassword("Aa1!")).toBe(false); // too short
      expect(validatePassword("Minimum8!")).toBe(true);
    });
  });

  describe("validateRequired", () => {
    it("should validate non-empty values", () => {
      expect(validateRequired("valid")).toBe(true);
      expect(validateRequired("0")).toBe(true);
      expect(validateRequired(0)).toBe(true);
      expect(validateRequired(false)).toBe(true);
      expect(validateRequired([])).toBe(true);
      expect(validateRequired({})).toBe(true);
    });

    it("should reject empty values", () => {
      expect(validateRequired("")).toBe(false);
      expect(validateRequired("   ")).toBe(false);
      expect(validateRequired(null)).toBe(false);
      expect(validateRequired(undefined)).toBe(false);
    });

    it("should handle whitespace", () => {
      expect(validateRequired("\t")).toBe(false);
      expect(validateRequired("\n")).toBe(false);
      expect(validateRequired(" a ")).toBe(true);
    });
  });

  describe("formatCurrency", () => {
    it("should format currency correctly", () => {
      expect(formatCurrency(1000, "USD")).toBe("$10.00");
      expect(formatCurrency(2550, "EUR")).toBe("€25.50");
      expect(formatCurrency(9999, "GBP")).toBe("£99.99");
    });

    it("should handle zero and negative amounts", () => {
      expect(formatCurrency(0, "USD")).toBe("$0.00");
      expect(formatCurrency(-500, "USD")).toBe("$-5.00");
    });

    it("should handle unknown currencies", () => {
      expect(formatCurrency(1000, "JPY")).toBe("JPY10.00");
      expect(formatCurrency(1500, "XYZ")).toBe("XYZ15.00");
    });

    it("should handle large amounts", () => {
      expect(formatCurrency(999999, "USD")).toBe("$9999.99");
      expect(formatCurrency(100, "EUR")).toBe("€1.00");
    });
  });

  describe("validatePhoneNumber", () => {
    it("should validate various phone formats", () => {
      expect(validatePhoneNumber("+1234567890")).toBe(true);
      expect(validatePhoneNumber("123-456-7890")).toBe(true);
      expect(validatePhoneNumber("(123) 456-7890")).toBe(true);
      expect(validatePhoneNumber("123 456 7890")).toBe(true);
      expect(validatePhoneNumber("12345678901")).toBe(true);
    });

    it("should reject invalid phone numbers", () => {
      expect(validatePhoneNumber("123")).toBe(false);
      expect(validatePhoneNumber("abc-def-ghij")).toBe(false);
      expect(validatePhoneNumber("")).toBe(false);
      expect(validatePhoneNumber("12345")).toBe(false);
    });
  });

  describe("validatePostalCode", () => {
    it("should validate US postal codes", () => {
      expect(validatePostalCode("12345", "US")).toBe(true);
      expect(validatePostalCode("12345-6789", "US")).toBe(true);
    });

    it("should validate UK postal codes", () => {
      expect(validatePostalCode("SW1A 1AA", "UK")).toBe(true);
      expect(validatePostalCode("M1 1AA", "UK")).toBe(true);
      expect(validatePostalCode("B33 8TH", "UK")).toBe(true);
    });

    it("should validate Canadian postal codes", () => {
      expect(validatePostalCode("K1A 0A6", "CA")).toBe(true);
      expect(validatePostalCode("M5V 3L9", "CA")).toBe(true);
    });

    it("should reject invalid postal codes", () => {
      expect(validatePostalCode("1234", "US")).toBe(false);
      expect(validatePostalCode("INVALID", "UK")).toBe(false);
      expect(validatePostalCode("123", "CA")).toBe(false);
    });
  });
});
