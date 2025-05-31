import { Product } from "../../interfaces/products/Product";
import { ProductCard } from "./productCard/productCard";
import "./productList.css";

export class ProductList {
  private element: HTMLElement;

  constructor(products: Product[]) {
    this.element = document.createElement("div");
    this.element.classList.add("product-list");

    // Create product cards
    products.forEach((product) => {
      const card = new ProductCard(product);
      this.element.appendChild(card.render());
    });
  }

  render(): HTMLElement {
    return this.element;
  }
}
