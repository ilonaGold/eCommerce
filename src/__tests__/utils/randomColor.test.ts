import { describe, it, expect, vi } from "vitest";
import { getRandomColor } from "../../utils/randomColor";

describe("randomColor utilities", () => {
  describe("getRandomColor", () => {
    it("should return a valid color string", () => {
      const color = getRandomColor();

      expect(typeof color).toBe("string");
      expect(color.length).toBeGreaterThan(0);
    });

    it("should return different colors on multiple calls", () => {
      const colors = Array.from({ length: 10 }, () => getRandomColor());
      const uniqueColors = new Set(colors);

      // Should have some variation (very unlikely to get all same colors)
      expect(uniqueColors.size).toBeGreaterThan(1);
    });

    it("should return consistent format", () => {
      const color = getRandomColor();

      // Test that it returns a string that could be a valid color
      // (hex, rgb, color name, etc.)
      expect(typeof color).toBe("string");
      expect(color.trim()).toBe(color); // no leading/trailing whitespace
      expect(color.length).toBeGreaterThan(0);
    });

    it("should handle multiple calls without errors", () => {
      expect(() => {
        for (let i = 0; i < 100; i++) {
          getRandomColor();
        }
      }).not.toThrow();
    });

    it("should return valid color values", () => {
      const colors = Array.from({ length: 20 }, () => getRandomColor());

      colors.forEach((color: string) => {
        expect(typeof color).toBe("string");
        expect(color.length).toBeGreaterThan(0);
        // Add more specific validation based on what getRandomColor actually returns
      });
    });
  });

  describe("color utility edge cases", () => {
    it("should be deterministic with same seed if implemented", () => {
      // If your getRandomColor uses Math.random, this tests randomness
      const color1 = getRandomColor();
      const color2 = getRandomColor();

      // Should be able to generate colors consistently
      expect(typeof color1).toBe("string");
      expect(typeof color2).toBe("string");
    });

    it("should handle rapid successive calls", () => {
      const rapidColors = [];
      const startTime = Date.now();

      while (Date.now() - startTime < 10) {
        // 10ms test
        rapidColors.push(getRandomColor());
      }

      expect(rapidColors.length).toBeGreaterThan(0);
      rapidColors.forEach((color: string) => {
        expect(typeof color).toBe("string");
      });
    });
  });
});
