import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getState,
  setAuth,
  setCustomer,
  setProductsData,
  setSearchFormData,
  setBasket,
  subscribe,
} from "../../state/state";

describe("State management", () => {
  beforeEach(() => {
    // Reset state before each test
    setAuth(false);
    setCustomer(null);
    setProductsData({
      limit: 0,
      offset: 0,
      count: 0,
      results: [],
      facets: undefined,
    });
    setSearchFormData({
      keyword: "",
      sort: "",
      category: "",
      minPrice: "",
      maxPrice: "",
    });
    setBasket([]);
  });

  describe("getState", () => {
    it("should return user auth state", () => {
      expect(getState("userAuth")).toBe(false);

      setAuth(true);
      expect(getState("userAuth")).toBe(true);
    });

    it("should return customer data", () => {
      expect(getState("customer")).toBe(null);

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

      setCustomer(mockCustomer);
      expect(getState("customer")).toEqual(mockCustomer);
    });

    it("should return products data", () => {
      const mockProductsData = {
        limit: 20,
        offset: 0,
        count: 1,
        results: [{
          id: "prod-1",
          version: 1,
          createdAt: "2023-01-01T00:00:00Z",
          lastModifiedAt: "2023-01-01T00:00:00Z",
          productType: { typeId: "product-type", id: "type-1" },
          name: { en: "Test Product" },
          slug: { en: "test-product" },
          categories: [],
          searchKeywords: { en: [] },
          hasStagedChanges: false,
          published: true,
          masterVariant: {
            id: 1,
            sku: "test-sku",
            prices: []
          },
          variants: []
        }],
        facets: undefined,
      };

      setProductsData(mockProductsData);
      expect(getState("productsData")).toEqual(mockProductsData);
    });

    it("should return basket data", () => {
      const basketItems = [
        {
          id: "prod-1",
          lineItemId: "basket-item-1",
          name: "Product 1",
          price: 50,
          imageUrl: "https://example.com/img1.jpg",
          slug: "product-1",
          quantity: 2,
          sku: "prod-1-sku"
        },
        {
          id: "prod-2",
          lineItemId: "basket-item-2", 
          name: "Product 2",
          price: 25,
          imageUrl: "https://example.com/img2.jpg",
          slug: "product-2",
          quantity: 1,
          sku: "prod-2-sku"
        }
      ];

      setBasket(basketItems);
      expect(getState("basket")).toEqual(basketItems);
    });
  });

  describe("setAuth", () => {
    it("should update authentication state", () => {
      setAuth(true);
      expect(getState("userAuth")).toBe(true);

      setAuth(false);
      expect(getState("userAuth")).toBe(false);
    });
  });

  describe("setCustomer", () => {
    it("should update customer data", () => {
      const customer = {
        id: "456",
        version: 2,
        createdAt: "2023-02-01T00:00:00Z",
        lastModifiedAt: "2023-02-01T00:00:00Z",
        email: "customer@test.com",
        isEmailVerified: true,
        firstName: "Jane",
        lastName: "Smith",
      };

      setCustomer(customer);
      expect(getState("customer")).toEqual(customer);
    });

    it("should handle null customer", () => {
      setCustomer(null);
      expect(getState("customer")).toBe(null);
    });
  });

  describe("subscribe", () => {
    it("should notify subscribers when products data changes", () => {
      const callback = vi.fn();
      const unsubscribe = subscribe(["productsData"], callback);

      const newProductsData = {
        limit: 10,
        offset: 0,
        count: 2,
        results: [
          {
            id: "prod-1",
            version: 1,
            createdAt: "2023-01-01T00:00:00Z",
            lastModifiedAt: "2023-01-01T00:00:00Z",
            productType: { typeId: "product-type", id: "type-1" },
            name: { en: "Product 1" },
            slug: { en: "product-1" },
            categories: [],
            searchKeywords: { en: [] },
            hasStagedChanges: false,
            published: true,
            masterVariant: { id: 1, sku: "sku-1", prices: [] },
            variants: []
          },
          {
            id: "prod-2",
            version: 1,
            createdAt: "2023-01-01T00:00:00Z",
            lastModifiedAt: "2023-01-01T00:00:00Z",
            productType: { typeId: "product-type", id: "type-2" },
            name: { en: "Product 2" },
            slug: { en: "product-2" },
            categories: [],
            searchKeywords: { en: [] },
            hasStagedChanges: false,
            published: true,
            masterVariant: { id: 2, sku: "sku-2", prices: [] },
            variants: []
          }
        ],
        facets: undefined,
      };

      setProductsData(newProductsData);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          productsData: newProductsData,
        })
      );

      unsubscribe();
    });

    it("should notify subscribers when basket changes", () => {
      const callback = vi.fn();
      const unsubscribe = subscribe(["basket"], callback);

      const basketItems = [{
        id: "prod-1",
        lineItemId: "basket-item-1",
        name: "Product 1",
        price: 75,
        imageUrl: "https://example.com/img1.jpg",
        slug: "product-1",
        quantity: 3,
        sku: "prod-1-sku"
      }];

      setBasket(basketItems);

      expect(callback).toHaveBeenCalledTimes(1);
      unsubscribe();
    });

    it("should handle multiple subscribers", () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      const unsubscribe1 = subscribe(["productsData"], callback1);
      const unsubscribe2 = subscribe(["productsData"], callback2);

      setProductsData({
        limit: 5,
        offset: 0,
        count: 1,
        results: [{
          id: "test",
          version: 1,
          createdAt: "2023-01-01T00:00:00Z",
          lastModifiedAt: "2023-01-01T00:00:00Z",
          productType: { typeId: "product-type", id: "type-test" },
          name: { en: "Test" },
          slug: { en: "test" },
          categories: [],
          searchKeywords: { en: [] },
          hasStagedChanges: false,
          published: true,
          masterVariant: { id: 1, sku: "test-sku", prices: [] },
          variants: []
        }],
        facets: undefined,
      });

      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(1);

      unsubscribe1();
      unsubscribe2();
    });

    it("should allow unsubscribing", () => {
      const callback = vi.fn();
      const unsubscribe = subscribe(["productsData"], callback);

      // First update should trigger callback
      setProductsData({
        limit: 1,
        offset: 0,
        count: 1,
        results: [],
        facets: undefined,
      });
      expect(callback).toHaveBeenCalledTimes(1);

      // Unsubscribe
      unsubscribe();

      // Second update should not trigger callback
      setProductsData({
        limit: 2,
        offset: 0,
        count: 1,
        results: [],
        facets: undefined,
      });
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should handle multiple keys subscription", () => {
      const callback = vi.fn();
      const unsubscribe = subscribe(["productsData", "searchFormData"], callback);

      setProductsData({
        limit: 1,
        offset: 0,
        count: 1,
        results: [],
        facets: undefined,
      });

      setSearchFormData({
        keyword: "test",
        sort: "",
        category: "",
        minPrice: "",
        maxPrice: "",
      });

      expect(callback).toHaveBeenCalledTimes(2);
      unsubscribe();
    });
  });

  describe("integration scenarios", () => {
    it("should handle complete user session flow", () => {
      // User starts logged out
      expect(getState("userAuth")).toBe(false);
      expect(getState("customer")).toBe(null);

      // User logs in
      setAuth(true);
      setCustomer({
        id: "user-123",
        version: 1,
        createdAt: "2023-01-01T00:00:00Z",
        lastModifiedAt: "2023-01-01T00:00:00Z",
        email: "user@test.com",
        isEmailVerified: true,
        firstName: "Test",
        lastName: "User",
      });

      expect(getState("userAuth")).toBe(true);
      expect(getState("customer")).toEqual({
        id: "user-123",
        version: 1,
        createdAt: "2023-01-01T00:00:00Z",
        lastModifiedAt: "2023-01-01T00:00:00Z",
        email: "user@test.com",
        isEmailVerified: true,
        firstName: "Test",
        lastName: "User",
      });

      // User searches for products
      setSearchFormData({
        keyword: "shoes",
        sort: "price",
        category: "fashion",
        minPrice: "50",
        maxPrice: "200",
      });

      // Products are loaded
      setProductsData({
        limit: 20,
        offset: 0,
        count: 5,
        results: [
          {
            id: "shoe-1",
            version: 1,
            createdAt: "2023-01-01T00:00:00Z",
            lastModifiedAt: "2023-01-01T00:00:00Z",
            productType: { typeId: "product-type", id: "shoe-type" },
            name: { en: "Running Shoes" },
            slug: { en: "running-shoes" },
            categories: [],
            searchKeywords: { en: [] },
            hasStagedChanges: false,
            published: true,
            masterVariant: { id: 1, sku: "shoe-1-sku", prices: [] },
            variants: []
          },
          {
            id: "shoe-2",
            version: 1,
            createdAt: "2023-01-01T00:00:00Z",
            lastModifiedAt: "2023-01-01T00:00:00Z",
            productType: { typeId: "product-type", id: "shoe-type" },
            name: { en: "Casual Shoes" },
            slug: { en: "casual-shoes" },
            categories: [],
            searchKeywords: { en: [] },
            hasStagedChanges: false,
            published: true,
            masterVariant: { id: 2, sku: "shoe-2-sku", prices: [] },
            variants: []
          }
        ],
        facets: undefined,
      });

      // User adds items to basket
      setBasket([
        {
          id: "shoe-1",
          lineItemId: "basket-item-1",
          name: "Running Shoes",
          price: 120,
          imageUrl: "https://example.com/shoe1.jpg",
          slug: "running-shoes",
          quantity: 1,
          sku: "shoe-1-sku"
        },
        {
          id: "shoe-2",
          lineItemId: "basket-item-2", 
          name: "Casual Shoes",
          price: 80,
          imageUrl: "https://example.com/shoe2.jpg",
          slug: "casual-shoes",
          quantity: 2,
          sku: "shoe-2-sku"
        }
      ]);

      expect(getState("basket")).toHaveLength(2);
      expect(getState("searchFormData").keyword).toBe("shoes");
      expect(getState("productsData").count).toBe(5);
    });
  });
});
