import { ProductProjection } from "../../../interfaces/products/ProductProjection";
import { createElement } from "../../../utils/dom/createElement";
import { createInputGroup } from "../../../utils/dom/form/createInputGroup";

import "./description.css";

export const description = (product: ProductProjection): HTMLElement => {
  const originalPrice = product.masterVariant.prices?.[0].value.centAmount || 0;
  const discountedPrice =
    product.masterVariant.prices?.[0].discounted?.value.centAmount || originalPrice;
  const discount = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);

  const priceField = createElement("div", { class: "product-details__product-price" });
  if (discount) {
    priceField.append(
      createElement("div", { class: "" }, [
        createElement("div", { class: "product-details__discounted-price" }, [
          `€${(discountedPrice / 100).toFixed(2)}`,
        ]),
        createElement("div", { class: "product-details__old-price" }, [
          `€${(originalPrice / 100).toFixed(2)}`,
        ]),
      ]),
      createElement("div", { class: "" }, [`${discount}%`])
    );
  } else {
    priceField.append(
      createElement("div", { class: "product-details__original-price" }, [
        `€${(originalPrice / 100).toFixed(2)}`,
      ])
    );
  }
  const productDescription = product.description?.["en-US"] || "No description available";
  const channelKey = "a619c99e-3bda-46ab-bf47-4d8bec0144e8";
  const stock = product.masterVariant.availability?.channels?.[channelKey]?.isOnStock
    ? "On stock"
    : "Out of stock";
  const productAttributes = `${product.masterVariant.attributes?.[0].name}: ${product.masterVariant.attributes?.[0].value}`;
  const input = createInputGroup("", "text", "quantity");
  const button = createElement("button", { type: "submit" }, ["Add to Cart"]);
  const container = createElement("section", { class: "product-details" }, [
    createElement("h3", { class: "product-details__product-header" }, [`${product.name["en-US"]}`]),
    priceField,
    createElement("p", { class: "product-details__product-description" }, [
      `${productDescription}`,
    ]),
    createElement("div", { class: "product-details__product-attributes" }, [
      `${productAttributes}`,
    ]),
    createElement("div", { class: "product-details__stock" }, [`${stock}`]),
    createElement("form", { class: "product-details__cart" }, [input, button]),
  ]);
  return container;
};
