import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderBasket } from "../../../views/renderBasket/renderBasket";

// Mock all dependencies
vi.mock("../../../utils/dom/createElement", () => ({
  createElement: vi.fn((tag, attrs, children) => {
    const element = document.createElement(tag);
    if (attrs) {
      Object.entries(attrs).forEach(([key, value]) => {
        if (key === 'class') element.className = value as string;
        else element.setAttribute(key, value as string);
      });
    }
    if (children) {
      children.forEach((child: any) => {
        if (typeof child === 'string') {
          element.appendChild(document.createTextNode(child));
        } else {
          element.appendChild(child);
        }
      });
    }
    return element;
  }),
}));

vi.mock("../../../state/state", () => ({
  getState: vi.fn(),
}));

vi.mock("../../../components/header/header", () => ({
  createHeader: vi.fn(() => document.createElement('header')),
}));

vi.mock("../../../components/footer/footer", () => ({
  createFooter: vi.fn(() => document.createElement('footer')),
}));

vi.mock("../../../components/main/main", () => ({
  mainComponent: vi.fn((content) => {
    const main = document.createElement('main');
    main.appendChild(content);
    return main;
  }),
}));

vi.mock("../../../utils/dom/basket/basketOperations", () => ({
  loadCartFromAPI: vi.fn(),
}));

vi.mock("../../../components/basket/basketContent/basketContent", () => ({
  createBasketContent: vi.fn(() => Promise.resolve(document.createElement('div'))),
}));

import { getState } from "../../../state/state";
import { loadCartFromAPI } from "../../../utils/dom/basket/basketOperations";
import { createBasketContent } from "../../../components/basket/basketContent/basketContent";

describe("renderBasket", () => {
  let mockParent: HTMLElement;

  beforeEach(() => {
    vi.clearAllMocks();
    mockParent = document.createElement('div');
    document.body.innerHTML = '';
  });

  it("should render basket successfully", async () => {
    (getState as any).mockReturnValue(false); // not authenticated
    (loadCartFromAPI as any).mockResolvedValue(undefined);
    (createBasketContent as any).mockResolvedValue(document.createElement('div'));

    await renderBasket(mockParent);

    expect(loadCartFromAPI).toHaveBeenCalled();
    expect(mockParent.children.length).toBeGreaterThan(0);
    expect(mockParent.querySelector('.view-container')).toBeTruthy();
  });

  it("should handle API errors gracefully", async () => {
    (getState as any).mockReturnValue(false);
    (loadCartFromAPI as any).mockRejectedValue(new Error("API Error"));

    await renderBasket(mockParent);

    expect(mockParent.children.length).toBeGreaterThan(0);
    // Should render error state
    expect(mockParent.textContent).toContain("Error Loading Cart");
  });

  it("should handle authenticated users", async () => {
    (getState as any)
      .mockReturnValueOnce(true) // userAuth
      .mockReturnValueOnce({ id: "user-1", name: "Test User" }); // customer
    (loadCartFromAPI as any).mockResolvedValue(undefined);
    (createBasketContent as any).mockResolvedValue(document.createElement('div'));

    await renderBasket(mockParent);

    expect(mockParent.querySelector('.view-container')).toBeTruthy();
  });
});
