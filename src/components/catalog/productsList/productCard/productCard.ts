import "./productCard.css";
import tempPlaceholderImg from "../../../../assets/images/red-panda.png";
import { Price, ProductProjection } from "../../../../interfaces/products/ProductProjection";

export class ProductCard {
  private element: HTMLElement;

  constructor(product: ProductProjection) {
    this.element = document.createElement("div");
    this.element.classList.add("product-card");
    this.element.dataset.productId = product.id;

    const name = product.name["en-US"];
    const description = product.description?.["en-US"] || "No description available";
    const originalPrice = product.masterVariant.prices?.[0];
    const image = product.masterVariant.images?.[0]?.url || tempPlaceholderImg;

    // Sample discount logic - can be replaced with actual discount data
    const hasDiscount = Math.random() > 0.5;
    const discountPercentage = hasDiscount ? Math.floor(Math.random() * 30) + 10 : 0;

    let priceHtml = "";

    if (hasDiscount && originalPrice?.value?.centAmount) {
      const origAmount = (originalPrice.value.centAmount / 100).toFixed(2);
      const discountAmount = (
        (originalPrice.value.centAmount * (1 - discountPercentage / 100)) /
        100
      ).toFixed(2);

      priceHtml = `
    <div class="product-card__price-row">
      <div class="product-card__price-group">
        <span class="product-card__discounted-price">€${discountAmount}</span>
        <span class="product-card__original-price">€${origAmount}</span>
      </div>
      <span class="product-card__discount">-${discountPercentage}%</span>
    </div>
  `;
    } else {
      const formattedPrice = this.formatPrice(originalPrice);
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

    this.element.addEventListener("click", (e) => {
      // Don't navigate if clicking the buy button
      if ((e.target as HTMLElement).classList.contains("product-card__buy-button")) {
        e.stopPropagation();
        // Add to cart logic here
        console.log(`Adding product ${product.id} to cart`);
        return;
      }

      // Navigate to product detail page
      window.location.href = `/product/${product.id}`;
    });
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
