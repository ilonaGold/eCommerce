import { ProductProjection } from "../../../interfaces/products/ProductProjection";
import { createElement } from "../../../utils/dom/createElement";
import { createInputGroup } from "../../../utils/dom/form/createInputGroup";

import "./description.css";

export const description = (product: ProductProjection): HTMLElement => {
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

  const input = createInputGroup("", "text", "quantity");
  const button = createElement("button", { type: "submit" }, ["Add to Cart"]);
  const addToCartForm = createElement("form", { class: "product-details__cart" }, [input, button]);

  const container = createElement("section", { class: "product-details" }, [
    productName,
    priceField,
    productDescription,
    productAttributes,
    stockAvailability,
    addToCartForm,
  ]);
  return container;
};
