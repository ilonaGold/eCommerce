import { renderProductDetails } from "../../../views/renderProductDetails/renderProductDetails";
import type { ProductDetailsProps } from "../../../interfaces/interfaces";
import type { ProductProjection } from "../../../interfaces/products/ProductProjection";

describe("renderProductDetails", () => {
  it("should render without crashing", () => {
    const parent = document.createElement("div");
    const product: ProductProjection = {
      id: "1",
      version: 1,
      createdAt: "2023-01-01T00:00:00Z",
      lastModifiedAt: "2023-01-01T00:00:00Z",
      productType: { typeId: "product-type", id: "pt-1" },
      name: { en: "Test Product" },
      slug: { en: "test-product" },
      categories: [],
      searchKeywords: {},
      hasStagedChanges: false,
      published: true,
      masterVariant: { id: 1 },
      variants: [],
    };
    const props: ProductDetailsProps = { parent, product };
    expect(() => renderProductDetails(props)).not.toThrow();
  });
});
