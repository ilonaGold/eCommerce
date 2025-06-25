import { describe, it, expect, vi, beforeEach } from "vitest";
import { getRoot, goToView, routeHandler } from "../../routing/router";

// Mock state
vi.mock("../../state/state", () => ({
  getState: vi.fn(() => false),
  setAuth: vi.fn(),
}));

// Mock all view renderers
vi.mock("../../views/renderHome/renderHome", () => ({
  renderHome: vi.fn(),
}));

vi.mock("../../views/renderLogin/renderLogin", () => ({
  renderLogin: vi.fn(),
}));

vi.mock("../../views/renderProducts/renderProducts", () => ({
  renderProducts: vi.fn(),
}));

vi.mock("../../views/renderError/renderError", () => ({
  renderError: vi.fn(),
}));

vi.mock("../../views/renderRegistration/renderRegistration", () => ({
  renderRegistration: vi.fn(),
}));

vi.mock("../../views/renderAbout/renderAbout", () => ({
  renderAbout: vi.fn(),
}));

vi.mock("../../views/renderBasket/renderBasket", () => ({
  renderBasket: vi.fn(),
}));

vi.mock("../../views/renderUserProfile/renderUserProfile", () => ({
  renderUserProfile: vi.fn(),
}));

vi.mock("../../utils/dom/product/productHandler", () => ({
  handleProductDetails: vi.fn(),
}));

// Mock DOM/history
Object.defineProperty(window, "history", {
  value: {
    pushState: vi.fn(),
    replaceState: vi.fn(),
  },
  writable: true,
});

Object.defineProperty(window, "location", {
  value: {
    pathname: "/",
  },
  writable: true,
});

describe("Router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = "";
    window.location.pathname = "/";
  });

  describe("getRoot", () => {
    it("should create root element if it doesn't exist", () => {
      const root = getRoot();

      expect(root).toBeDefined();
      expect(root.id).toBe("root");
      expect(document.body.contains(root)).toBe(true);
    });

    it("should clear existing root element", () => {
      const existingRoot = document.createElement("div");
      existingRoot.id = "root";
      existingRoot.innerHTML = "<p>existing content</p>";
      document.body.appendChild(existingRoot);

      const root = getRoot();

      expect(root.innerHTML).toBe("");
      expect(root).toBe(existingRoot);
    });
  });

  describe("goToView", () => {
    it("should update history and trigger routing", () => {
      const mockPushState = vi.spyOn(history, "pushState");

      goToView("products");

      expect(mockPushState).toHaveBeenCalledWith({}, "", "/products");
    });

    it("should handle empty view", () => {
      const mockPushState = vi.spyOn(history, "pushState");

      goToView("");

      expect(mockPushState).toHaveBeenCalledWith({}, "", "/");
    });
  });

  describe("routeHandler", () => {
    it("should handle root path", () => {
      window.location.pathname = "/";

      expect(() => routeHandler()).not.toThrow();
    });

    it("should handle products path", () => {
      window.location.pathname = "/products";

      expect(() => routeHandler()).not.toThrow();
    });

    it("should handle authentication flow", () => {
      window.location.pathname = "/user-profile";

      expect(() => routeHandler()).not.toThrow();
    });

    it("should handle invalid paths", () => {
      window.location.pathname = "/nonexistent";

      expect(() => routeHandler()).not.toThrow();
    });
  });
});
