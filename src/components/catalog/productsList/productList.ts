import { ProductProjection } from "../../../interfaces/products/ProductProjection";
import { createElement } from "../../../utils/dom/createElement";
import { ProductCard } from "./productCard/productCard";
import "./productList.css";

export function productList(products: ProductProjection[]): HTMLElement {
  if (!products.length) {
    return createElement("div", {}, ["No products available."], {
      classes: ["product-list", "empty-message"],
      styles: { textAlign: "center", color: "#888", fontSize: "1.2rem", padding: "2rem" },
    });
  }
  const productList = createElement(
    "div",
    {},
    products.map((product) => new ProductCard(product).render()),
    { classes: ["product-list"] }
  );

  return productList;
}
