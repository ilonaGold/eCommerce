import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  isInBasketSync,
  getBasketItemsCountSync,
  syncCartToLocalState,
  loadCartFromAPI,
} from "../../../../utils/dom/basket/basketOperations";

// Mock state
vi.mock("../../../../state/state", () => ({
  getState: vi.fn(() => []),
  setBasket: vi.fn(),
}));

// Mock CartService
vi.mock("../../../../services/API/cart/cartService", () => ({
  CartService: {
    getMyCart: vi.fn(),
  },
}));

// Mock notification
vi.mock("../../../../components/notificationModal/notificationModal", () => ({
  notificationModal: vi.fn(),
}));

import { getState, setBasket } from "../../../../state/state";
import { CartService } from "../../../../services/API/cart/cartService";

describe("basketOperations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("isInBasketSync", () => {
    it("should return true when product is in basket", () => {
      const mockBasket = [
        {
          id: "prod-1",
          lineItemId: "item-1",
          name: "Product 1",
          price: 50,
          imageUrl: "",
          slug: "",
          quantity: 1,
          sku: "sku-1",
        },
        {
          id: "prod-2",
          lineItemId: "item-2",
          name: "Product 2",
          price: 30,
          imageUrl: "",
          slug: "",
          quantity: 2,
          sku: "sku-2",
        },
      ];

      (getState as any).mockReturnValue(mockBasket);

      expect(isInBasketSync("prod-1")).toBe(true);
      expect(isInBasketSync("prod-3")).toBe(false);
    });

    it("should return false for empty basket", () => {
      (getState as any).mockReturnValue([]);
      expect(isInBasketSync("prod-1")).toBe(false);
    });
  });

  describe("getBasketItemsCountSync", () => {
    it("should calculate total quantity correctly", () => {
      const mockBasket = [
        {
          id: "prod-1",
          lineItemId: "item-1",
          name: "Product 1",
          price: 50,
          imageUrl: "",
          slug: "",
          quantity: 2,
          sku: "sku-1",
        },
        {
          id: "prod-2",
          lineItemId: "item-2",
          name: "Product 2",
          price: 30,
          imageUrl: "",
          slug: "",
          quantity: 3,
          sku: "sku-2",
        },
      ];

      (getState as any).mockReturnValue(mockBasket);
      expect(getBasketItemsCountSync()).toBe(5);
    });

    it("should return 0 for empty basket", () => {
      (getState as any).mockReturnValue([]);
      expect(getBasketItemsCountSync()).toBe(0);
    });
  });

  describe("syncCartToLocalState", () => {
    it("should convert cart to basket items correctly", async () => {
      const mockCart = {
        id: "cart-1",
        version: 1,
        lineItems: [
          {
            id: "line-1",
            productId: "prod-1",
            name: { "en-US": "Test Product" },
            quantity: 2,
            price: {
              value: { centAmount: 5000, currencyCode: "EUR" },
            },
            totalPrice: { centAmount: 10000, currencyCode: "EUR" },
            variant: {
              id: 1,
              sku: "test-sku",
              images: [{ url: "https://example.com/image.jpg" }],
            },
            productSlug: { "en-US": "test-product" },
          },
        ],
        totalPrice: { centAmount: 10000, currencyCode: "EUR" },
        discountCodes: [],
      };

      await syncCartToLocalState(mockCart as any);

      expect(setBasket).toHaveBeenCalledWith([
        expect.objectContaining({
          id: "prod-1",
          lineItemId: "line-1",
          name: "Test Product",
          price: 50,
          quantity: 2,
          sku: "test-sku",
        }),
      ]);
    });
  });

  describe("loadCartFromAPI", () => {
    it("should load cart and sync to state", async () => {
      const mockCart = {
        lineItems: [],
        totalPrice: { centAmount: 0 },
        discountCodes: [],
      };

      (CartService.getMyCart as any).mockResolvedValue(mockCart);

      await loadCartFromAPI();

      expect(CartService.getMyCart).toHaveBeenCalled();
      expect(setBasket).toHaveBeenCalledWith([]);
    });

    it("should handle API errors gracefully", async () => {
      (CartService.getMyCart as any).mockRejectedValue(new Error("API Error"));

      await expect(loadCartFromAPI()).resolves.not.toThrow();
    });
  });
});
