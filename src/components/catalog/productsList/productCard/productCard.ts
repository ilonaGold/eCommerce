import "./productCard.css";
import tempPlaceholderImg from "../../../../assets/images/red-panda.png";
import { Price, ProductProjection } from "../../../../interfaces/products/ProductProjection";
import { goToView } from "../../../../routing/router";
import { addToBasket, isInBasket } from "../../../../utils/dom/basket/basketOperations";
import { subscribe } from "../../../../state/state";

export class ProductCard {
  private element: HTMLElement;
  private product: ProductProjection;
  private buyButton: HTMLButtonElement | null = null;

  constructor(product: ProductProjection) {
    this.product = product;
    this.element = document.createElement("div");
    this.element.classList.add("product-card");
    this.element.dataset.productId = product.id;

    const name = product.name["en-US"];
    const description = product.description?.["en-US"] || "No description available";
    const image = product.masterVariant.images?.[0]?.url || tempPlaceholderImg;

    const originalPrice = product.masterVariant.prices?.[0].value.centAmount || 0;
    const discountedPrice =
      product.masterVariant.prices?.[0].discounted?.value.centAmount || originalPrice;
    const discount = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);

    let priceHtml = "";

    if (discount) {
      const origAmount = (originalPrice / 100).toFixed(2);
      const discountAmount = (discountedPrice / 100).toFixed(2);

      priceHtml = `
    <div class="product-card__price-row">
      <div class="product-card__price-group">
        <span class="product-card__discounted-price">€${discountAmount}</span>
        <span class="product-card__original-price">€${origAmount}</span>
      </div>
      <span class="product-card__discount">-${discount}%</span>
    </div>
  `;
    } else {
      const formattedPrice = this.formatPrice(product.masterVariant.prices?.[0]);
      priceHtml = `
        <div class="product-card__price-row">
          <div class="product-card__price">${formattedPrice}</div>
        </div>
      `;
    }

    this.element.innerHTML = `
  <div class="product-card__image-container">
    <img class="product-card__image" src="${image}" alt="${name}" />
  </div>
  <div class="product-card__content">
    <h3 class="product-card__title">${name}</h3>
    <p class="product-card__description">${description}</p>
    ${priceHtml}
  </div>
  <button class="product-card__buy-button">Add to Cart</button>
    `;

    // Set up event listeners
    this.setupEventListeners();

    // Check if product is already in basket and update button
    this.updateButtonState();

    // Subscribe to basket changes to update button state
    subscribe(["basket"], () => this.updateButtonState());
  }

  private setupEventListeners(): void {
    this.element.addEventListener("click", (e) => {
      // Don't navigate if clicking the buy button
      if ((e.target as HTMLElement).classList.contains("product-card__buy-button")) {
        e.stopPropagation();
        this.handleAddToCart();
        return;
      }

      // Navigate to product detail page
      goToView(`products/${this.product.slug?.["en-US"]}`);
    });
  }

  private handleAddToCart(): void {
    if (!isInBasket(this.product.id)) {
      // Add to cart logic
      addToBasket(this.product);

      // Update button state
      this.updateButtonState();

      // Add animation for visual feedback
      const button = this.element.querySelector(".product-card__buy-button");
      button?.classList.add("product-card__buy-button--added");
      setTimeout(() => {
        button?.classList.remove("product-card__buy-button--added");
      }, 1000);
    }
  }

  private updateButtonState(): void {
    const button = this.element.querySelector(".product-card__buy-button") as HTMLButtonElement;
    if (!button) return;

    if (isInBasket(this.product.id)) {
      button.textContent = "In Cart";
      button.disabled = true;
      button.classList.add("product-card__buy-button--in-cart");
    } else {
      button.textContent = "Add to Cart";
      button.disabled = false;
      button.classList.remove("product-card__buy-button--in-cart");
    }
  }

  private formatPrice(price?: Price): string {
    if (!price?.value?.centAmount) {
      return "Price not available";
    }

    const amount = (price.value.centAmount / 100).toFixed(2);
    return `€${amount}`;
  }

  render(): HTMLElement {
    return this.element;
  }
}
