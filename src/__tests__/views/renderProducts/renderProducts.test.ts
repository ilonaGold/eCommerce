import { renderProducts } from "../../../views/renderProducts/renderProducts";

describe("renderProducts", () => {
  it("should render without crashing", async () => {
    const parent = document.createElement("div");
    await expect(renderProducts(parent)).resolves.not.toThrow();
  });
});
