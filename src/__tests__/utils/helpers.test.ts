import { describe, it, expect } from "vitest";

// Common utility functions that typically exist in eCommerce apps
const formatPrice = (price: number, currency: string = "USD"): string => {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
  };
  return `${symbols[currency] || currency} ${price.toFixed(2)}`;
};

const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const calculateDiscount = (originalPrice: number, discountPercent: number): number => {
  return originalPrice * (discountPercent / 100);
};

const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

describe("utility helpers", () => {
  describe("formatPrice", () => {
    it("should format USD prices correctly", () => {
      expect(formatPrice(10.99, "USD")).toBe("$ 10.99");
      expect(formatPrice(0, "USD")).toBe("$ 0.00");
      expect(formatPrice(1000.5, "USD")).toBe("$ 1000.50");
    });

    it("should format EUR prices correctly", () => {
      expect(formatPrice(25.5, "EUR")).toBe("€ 25.50");
    });

    it("should handle unknown currencies", () => {
      expect(formatPrice(15.99, "JPY")).toBe("JPY 15.99");
    });

    it("should use USD as default currency", () => {
      expect(formatPrice(9.99)).toBe("$ 9.99");
    });
  });

  describe("slugify", () => {
    it("should convert text to URL-friendly slug", () => {
      expect(slugify("Hello World")).toBe("hello-world");
      expect(slugify("Product Name 123")).toBe("product-name-123");
      expect(slugify("Special Characters!@#")).toBe("special-characters");
    });

    it("should handle multiple spaces and special characters", () => {
      expect(slugify("  Multiple   Spaces  ")).toBe("multiple-spaces");
      expect(slugify("Under_scores-and-dashes")).toBe("under-scores-and-dashes");
    });

    it("should handle empty string", () => {
      expect(slugify("")).toBe("");
    });
  });

  describe("truncateText", () => {
    it("should truncate long text", () => {
      expect(truncateText("This is a very long text", 10)).toBe("This is a...");
      expect(truncateText("Short", 10)).toBe("Short");
    });

    it("should handle exact length", () => {
      expect(truncateText("Exactly10!", 10)).toBe("Exactly10!");
    });

    it("should handle empty string", () => {
      expect(truncateText("", 5)).toBe("");
    });
  });

  describe("isValidUrl", () => {
    it("should validate correct URLs", () => {
      expect(isValidUrl("https://example.com")).toBe(true);
      expect(isValidUrl("http://test.org")).toBe(true);
      expect(isValidUrl("https://sub.domain.com/path?query=1")).toBe(true);
    });

    it("should reject invalid URLs", () => {
      expect(isValidUrl("not-a-url")).toBe(false);
      expect(isValidUrl("")).toBe(false);
      expect(isValidUrl("http://")).toBe(false);
    });
  });

  describe("calculateDiscount", () => {
    it("should calculate discount correctly", () => {
      expect(calculateDiscount(100, 10)).toBe(10);
      expect(calculateDiscount(50, 20)).toBe(10);
      expect(calculateDiscount(75, 15)).toBe(11.25);
    });

    it("should handle zero discount", () => {
      expect(calculateDiscount(100, 0)).toBe(0);
    });

    it("should handle 100% discount", () => {
      expect(calculateDiscount(100, 100)).toBe(100);
    });
  });

  describe("generateId", () => {
    it("should generate a string ID", () => {
      const id = generateId();
      expect(typeof id).toBe("string");
      expect(id.length).toBeGreaterThan(0);
    });

    it("should generate unique IDs", () => {
      const ids = Array.from({ length: 100 }, () => generateId());
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });
});
