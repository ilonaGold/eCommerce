// Mock getCategories to prevent real API calls
vi.mock("../../../services/API/products/getCategories", () => ({
  getCategories: vi.fn(() =>
    Promise.resolve({
      results: [], // or add mock category objects if needed
      total: 0,
      offset: 0,
      limit: 12,
      count: 0,
      facets: {},
    })
  ),
}));

// Mock getAccessTokenData to prevent real API calls
vi.mock("../../../services/auth/getAccessTokenData", () => ({
  getAccessTokenData: vi.fn(() =>
    Promise.resolve({
      access_token: "mock-token",
      expires_in: 3600,
      token_type: "Bearer",
      scope: "mock-scope",
    })
  ),
}));

// Mock productProjectionSearch to prevent real API calls
vi.mock("../../../services/API/products/productProjectionSearch", () => ({
  productProjectionSearch: vi.fn(() =>
    Promise.resolve({
      results: [],
      total: 0,
      offset: 0,
      limit: 12,
      count: 0,
      facets: {},
    })
  ),
}));

import { renderProducts } from "../../../views/renderProducts/renderProducts";

describe("renderProducts", () => {
  it("should render without crashing", async () => {
    const parent = document.createElement("div");
    await expect(renderProducts(parent)).resolves.not.toThrow();
  });
});
