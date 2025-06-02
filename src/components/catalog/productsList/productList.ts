import { ProductProjection } from "../../../interfaces/products/ProductProjection";
import { createElement } from "../../../utils/dom/createElement";
import { ProductCard } from "./productCard/productCard";
import "./productList.css";

export function productList(products: ProductProjection[]): HTMLElement {
  return createElement(
    "section",
    {},
    products.map((product) => new ProductCard(product).render()),
    { classes: ["product-list"] }
  );
}
