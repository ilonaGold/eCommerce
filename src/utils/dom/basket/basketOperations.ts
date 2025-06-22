import { BasketItem } from "../../../interfaces/interfaces";
import { ProductProjection } from "../../../interfaces/products/ProductProjection";
import { getState, setBasket } from "../../../state/state";

/**
 * Adds a product to the basket
 * @param product - The product to add to the basket
 */
export function addToBasket(product: ProductProjection): void {
  const currentBasket = (getState("basket") as BasketItem[]) || [];

  // Check if the product is already in the basket
  if (isInBasket(product.id)) {
    // If you want to increase quantity instead of blocking
    // incrementBasketItemQuantity(product.id);
    return;
  }

  // Get product details
  const name = product.name["en-US"];
  const imageUrl = product.masterVariant.images?.[0]?.url || "";
  const originalPrice = product.masterVariant.prices?.[0]?.value.centAmount || 0;
  const discountedPrice =
    product.masterVariant.prices?.[0]?.discounted?.value.centAmount || originalPrice;
  const discountPercentage =
    originalPrice !== discountedPrice
      ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
      : undefined;

  // Create a new basket item
  const basketItem: BasketItem = {
    id: product.id,
    name: name,
    price: discountedPrice / 100, // Convert to euros
    originalPrice: originalPrice !== discountedPrice ? originalPrice / 100 : undefined,
    discountPercentage,
    imageUrl,
    quantity: 1,
    slug: product.slug?.["en-US"] || "",
    sku: product.masterVariant.sku,
  };

  // Update the basket state
  setBasket([...currentBasket, basketItem]);

  // Show a visual notification (you could implement a toast notification here)
  showAddToCartNotification(basketItem.name);
}

/**
 * Removes a product from the basket
 * @param productId - ID of the product to remove
 */
export function removeFromBasket(productId: string): void {
  const currentBasket = (getState("basket") as BasketItem[]) || [];
  const updatedBasket = currentBasket.filter((item) => item.id !== productId);
  setBasket(updatedBasket);
}

/**
 * Checks if a product is already in the basket
 * @param productId - ID of the product to check
 * @returns boolean indicating if the product is in the basket
 */
export function isInBasket(productId: string): boolean {
  const currentBasket = (getState("basket") as BasketItem[]) || [];
  return currentBasket.some((item) => item.id === productId);
}

/**
 * Gets the total number of items in the basket
 * @returns The total count of items in the basket
 */
export function getBasketItemsCount(): number {
  const currentBasket = (getState("basket") as BasketItem[]) || [];
  return currentBasket.length;
}

/**
 * Increments the quantity of a product in the basket
 * @param productId - ID of the product to increment
 */
function incrementBasketItemQuantity(productId: string): void {
  const currentBasket = (getState("basket") as BasketItem[]) || [];
  const updatedBasket = currentBasket.map((item) => {
    if (item.id === productId) {
      return { ...item, quantity: item.quantity + 1 };
    }
    return item;
  });

  setBasket(updatedBasket);
}

/**
 * Shows a notification when a product is added to the basket
 * @param productName - Name of the product added
 */
function showAddToCartNotification(productName: string): void {
  console.log(`${productName} added to cart!`);
  // You could implement a visual toast notification here
}
