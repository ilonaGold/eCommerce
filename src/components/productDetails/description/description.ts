import { ProductProjection } from "../../../interfaces/products/ProductProjection";
import { createElement } from "../../../utils/dom/createElement";
import { imageSlider } from "../slider/slider";
import { modalWithSlider } from "../productDetailsModal/productDetailsModal";
import { addToBasket, isInBasketSync } from "../../../utils/dom/basket/basketOperations";

import "./description.css";
import "../../catalog/productsList/productCard/productCard.css";

export const description = (product: ProductProjection): HTMLElement => {
  const productImageSlider = imageSlider(product);

  // Add event listener to the slider wrapper to open modal
  const productImageSliderWrapper = productImageSlider.querySelector(
    ".product-details__slider-wrapper"
  );
  productImageSliderWrapper?.addEventListener("click", () => {
    modalWithSlider(product);
  });

  const productInfo = createElement("div", { class: "product-info" }, []);
  const productName = createElement("h3", { class: "product-details__product-name" }, [
    `${product.name["en-US"]}`,
  ]);
  const originalPrice = product.masterVariant.prices?.[0].value.centAmount || 0;
  const discountedPrice =
    product.masterVariant.prices?.[0].discounted?.value.centAmount || originalPrice;
  const discount = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  const priceField = createElement("div", { class: "product-details__product-price" });

  if (discount) {
    priceField.append(
      createElement("div", { class: "product-details__price-row product-card__price-row" }, [
        // Price group with discounted and original prices
        createElement("div", { class: "product-details__price-group product-card__price-group" }, [
          // Discounted price appears first due to order: -1 in CSS
          createElement(
            "span",
            { class: "product-details__discounted-price product-card__discounted-price" },
            [`€${(discountedPrice / 100).toFixed(2)}`]
          ),
          // Original price with strikethrough
          createElement(
            "span",
            { class: "product-details__old-price product-card__original-price" },
            [`€${(originalPrice / 100).toFixed(2)}`]
          ),
        ]),
        // Discount percentage pushed to the right with margin-left: auto
        createElement("span", { class: "product-details__discount product-card__discount" }, [
          `-${discount}%`,
        ]),
      ])
    );
  } else {
    priceField.append(
      createElement("div", { class: "product-details__price product-card__price" }, [
        `€${(originalPrice / 100).toFixed(2)}`,
      ])
    );
  }

  const desc = product.description?.["en-US"] || "No description available";
  const productDescription = createElement("p", { class: "product-details__product-description" }, [
    `${desc}`,
  ]);
  const channelKey = "a619c99e-3bda-46ab-bf47-4d8bec0144e8";
  const stock = product.masterVariant.availability?.channels?.[channelKey]?.isOnStock
    ? "On stock"
    : "Out of stock";
  const stockAvailability = createElement("div", { class: "product-details__stock" }, [`${stock}`]);
  stockAvailability.classList.toggle("out-of-stock", stock === "Out of stock");

  const productAttributes = createElement("div", { class: "product-details__product-attributes" });
  const attrArray = product.masterVariant.attributes;
  if (attrArray?.length) {
    for (const attr of attrArray) {
      const attrName = attr.name;
      const attrValue = attr.value;
      const attributes = attrName !== "new-arrival" ? `${attrName}: ${attrValue}` : `${attrName}`;
      const attrGroup = createElement(
        "div",
        { class: "product-details__product-attributes-group" },
        [`${attributes}`]
      );
      attrGroup.classList.toggle("new-arrival", attrName === "new-arrival");
      attrGroup.classList.toggle("color", attrName === "color");
      attrGroup.classList.toggle("size", attrName === "size");
      productAttributes.append(attrGroup);
    }
  }

  const addToCartButton = createElement(
    "button",
    { type: "submit", class: "product-details__add-to-cart-btn" },
    ["Add to Cart"]
  );

  addToCartButton.addEventListener("click", async (e) => {
    e.stopPropagation();
    await handleAddToCart();
  });

  async function handleAddToCart(): Promise<void> {
    if (addToCartButton.disabled) return;
    // Check if product is already in cart using sync method for immediate UI feedback
    if (isInBasketSync(product.id)) return;
    // Disable button and show loading state
    addToCartButton.disabled = true;
    addToCartButton.textContent = "Adding...";

    try {
      // Add to cart via API
      await addToBasket(product);

      // Update button state
      if (isInBasketSync(product.id)) {
        addToCartButton.textContent = "In Cart";
        addToCartButton.disabled = true;
        addToCartButton.classList.add("product-card__buy-button--in-cart");
      } else {
        addToCartButton.textContent = "Add to Cart";
        addToCartButton.disabled = false;
        addToCartButton.classList.remove("product-card__buy-button--in-cart");
      }

      // Add animation for visual feedback
      addToCartButton.classList.add("product-card__buy-button--added");
      setTimeout(() => {
        addToCartButton.classList.remove("product-card__buy-button--added");
      }, 1000);
    } catch (error) {
      console.error("Failed to add product to cart:", error);

      // Reset button on error
      addToCartButton.disabled = false;
      addToCartButton.textContent = "Add to Cart";
      addToCartButton.classList.remove("product-card__buy-button--in-cart");
    }
  }

  productInfo.append(
    productName,
    priceField,
    productDescription,
    productAttributes,
    stockAvailability,
    addToCartButton
  );

  const container = createElement("section", { class: "product-details" }, [
    productImageSlider,
    productInfo,
  ]);

  return container;
};
