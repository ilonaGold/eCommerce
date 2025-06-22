import { createElement } from "../../../utils/dom/createElement";
import "./productListSkeleton.css";

export function createProductListSkeleton(count: number = 16): HTMLElement {
  const skeletonCards = Array.from({ length: count }, () => createSkeletonCard());

  return createElement("div", { class: "product-list skeleton-loading" }, skeletonCards);
}

function createSkeletonCard(): HTMLElement {
  return createElement("div", { class: "product-card skeleton-card" }, [
    // Image skeleton
    createElement("div", { class: "skeleton-image" }),

    // Content skeleton
    createElement("div", { class: "skeleton-content" }, [
      createElement("div", { class: "skeleton-title" }),
      createElement("div", { class: "skeleton-price" }),
      createElement("div", { class: "skeleton-button" }),
    ]),
  ]);
}
