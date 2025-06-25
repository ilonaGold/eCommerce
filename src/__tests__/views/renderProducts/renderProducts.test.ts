import { renderProducts } from "../../../views/renderProducts/renderProducts";

describe("renderProducts", () => {
  it("should render without crashing", () => {
    const parent = document.createElement("div");
    expect(() => renderProducts(parent)).not.toThrow();
  });
});
