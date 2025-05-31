import { Product } from "../../interfaces/products/Product";
import { createElement } from "../../utils/dom/createElement";
import { ProductCard } from "./productCard/productCard";
import "./productList.css";

export function productList(products: Product[]): HTMLElement {
  return createElement(
    "section",
    {},
    products.map((product) => new ProductCard(product).render()),
    { classes: ["product-list"] }
  );
}
