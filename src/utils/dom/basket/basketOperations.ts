import { BasketItem } from "../../../interfaces/interfaces";
import { ProductProjection } from "../../../interfaces/products/ProductProjection";
import { getState, setBasket } from "../../../state/state";
import { CartService } from "../../../services/API/cart/cartService";
import { Cart, LineItem } from "../../../interfaces/cart/cartInterfaces";
import { notificationModal } from "../../../components/notificationModal/notificationModal";

/**
 * Adds a product to the basket using commercetools API
 * @param product - The product to add to the basket
 */
export async function addToBasket(product: ProductProjection): Promise<void> {
  try {
    // Show loading state
    showAddToCartNotification("Adding to cart...", "loading");

    // Check if the product is already in the cart
    const isInCart = await CartService.isProductInCart(product.id, product.masterVariant.id);

    if (isInCart) {
      // Product is already in cart, optionally increment quantity
      const lineItem = await CartService.getLineItemByProduct(product.id, product.masterVariant.id);
      if (lineItem) {
        await CartService.changeLineItemQuantity(lineItem.id, lineItem.quantity + 1);
        showAddToCartNotification(`Updated quantity for ${product.name["en-US"]}`, "success");
      }
      return;
    } // Add product to cart via API
    // Pass both productId and SKU - CartService will prioritize SKU if available
    const updatedCart = await CartService.addLineItem(
      product.id,
      product.masterVariant.id,
      1,
      product.masterVariant.sku
    );

    // Update local state with cart data
    await syncCartToLocalState(updatedCart);

    // Show success notification
    showAddToCartNotification(`${product.name["en-US"]} added to cart!`, "success");
  } catch (error) {
    console.error("Error adding product to cart:", error);
    showAddToCartNotification(
      `Failed to add ${product.name["en-US"]} to cart. Please try again.`,
      "error"
    );
    throw error;
  }
}

/**
 * Removes a product from the basket using commercetools API
 * @param productId - ID of the product to remove
 * @param variantId - Variant ID of the product (optional)
 */
export async function removeFromBasket(productId: string, variantId: number = 1): Promise<void> {
  try {
    // Get the line item for this product
    const lineItem = await CartService.getLineItemByProduct(productId, variantId);

    if (!lineItem) {
      console.warn("Product not found in cart");
      return;
    }

    // Remove the entire line item from cart
    const updatedCart = await CartService.removeLineItem(lineItem.id);

    // Update local state
    await syncCartToLocalState(updatedCart);

    showAddToCartNotification("Item removed from cart", "success");
  } catch (error) {
    console.error("Error removing product from cart:", error);
    showAddToCartNotification("Failed to remove item from cart", "error");
    throw error;
  }
}

/**
 * Removes a line item from the basket using its line item ID
 * @param lineItemId - ID of the line item to remove
 */
export async function removeLineItemFromBasket(lineItemId: string): Promise<void> {
  try {
    const updatedCart = await CartService.removeLineItem(lineItemId);
    await syncCartToLocalState(updatedCart);
    showAddToCartNotification("Item removed from cart", "success");
  } catch (error) {
    console.error("Error removing line item from cart:", error);
    showAddToCartNotification("Failed to remove item from cart", "error");
    throw error;
  }
}

/**
 * Checks if a product is already in the basket using commercetools API
 * @param productId - ID of the product to check
 * @param variantId - Variant ID of the product (optional)
 * @returns boolean indicating if the product is in the basket
 */
export async function isInBasket(productId: string, variantId: number = 1): Promise<boolean> {
  try {
    return await CartService.isProductInCart(productId, variantId);
  } catch (error) {
    console.error("Error checking if product is in basket:", error);
    return false;
  }
}

/**
 * Checks if a product is already in the basket (synchronous version using local state)
 * @param productId - ID of the product to check
 * @returns boolean indicating if the product is in the basket
 */
export function isInBasketSync(productId: string): boolean {
  const currentBasket = (getState("basket") as BasketItem[]) || [];
  return currentBasket.some((item) => item.id === productId);
}

/**
 * Gets the total number of items in the basket using commercetools API
 * @returns The total count of items in the basket
 */
export async function getBasketItemsCount(): Promise<number> {
  try {
    return await CartService.getCartItemCount();
  } catch (error) {
    console.error("Error getting basket items count:", error);
    return 0;
  }
}

/**
 * Gets the total number of items in the basket (synchronous version using local state)
 * @returns The total count of items in the basket
 */
export function getBasketItemsCountSync(): number {
  const currentBasket = (getState("basket") as BasketItem[]) || [];
  return currentBasket.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Increments the quantity of a product in the basket using commercetools API
 * @param productId - ID of the product to increment
 * @param variantId - Variant ID of the product (optional)
 */
export async function incrementBasketItemQuantity(
  productId: string,
  variantId: number = 1
): Promise<void> {
  try {
    const lineItem = await CartService.getLineItemByProduct(productId, variantId);

    if (!lineItem) {
      console.warn("Product not found in cart");
      return;
    }

    const newQuantity = lineItem.quantity + 1;
    const updatedCart = await CartService.changeLineItemQuantity(lineItem.id, newQuantity);

    await syncCartToLocalState(updatedCart);
    showAddToCartNotification("Quantity updated", "success");
  } catch (error) {
    console.error("Error incrementing basket item quantity:", error);
    showAddToCartNotification("Failed to update quantity", "error");
    throw error;
  }
}

/**
 * Decrements the quantity of a product in the basket using commercetools API
 * @param productId - ID of the product to decrement
 * @param variantId - Variant ID of the product (optional)
 */
export async function decrementBasketItemQuantity(
  productId: string,
  variantId: number = 1
): Promise<void> {
  try {
    const lineItem = await CartService.getLineItemByProduct(productId, variantId);

    if (!lineItem) {
      console.warn("Product not found in cart");
      return;
    }

    const newQuantity = lineItem.quantity - 1;

    if (newQuantity <= 0) {
      // Remove the item if quantity becomes 0 or less
      await removeLineItemFromBasket(lineItem.id);
      return;
    }

    const updatedCart = await CartService.changeLineItemQuantity(lineItem.id, newQuantity);

    await syncCartToLocalState(updatedCart);
    showAddToCartNotification("Quantity updated", "success");
  } catch (error) {
    console.error("Error decrementing basket item quantity:", error);
    showAddToCartNotification("Failed to update quantity", "error");
    throw error;
  }
}

/**
 * Synchronizes commercetools cart data with local state
 * @param cart - The cart data from commercetools API
 */
export async function syncCartToLocalState(cart: Cart): Promise<void> {
  const basketItems: BasketItem[] = cart.lineItems.map((lineItem: LineItem) => ({
    id: lineItem.productId,
    lineItemId: lineItem.id,
    name: lineItem.name["en-US"] || "Unknown Product",
    price: lineItem.price.discounted?.value.centAmount
      ? lineItem.price.discounted.value.centAmount / 100
      : lineItem.price.value.centAmount / 100,
    originalPrice: lineItem.price.discounted?.value.centAmount
      ? lineItem.price.value.centAmount / 100
      : undefined,
    discountPercentage: lineItem.price.discounted?.value.centAmount
      ? Math.round(
          ((lineItem.price.value.centAmount - lineItem.price.discounted.value.centAmount) /
            lineItem.price.value.centAmount) *
            100
        )
      : undefined,
    imageUrl: lineItem.variant.images?.[0]?.url || "",
    quantity: lineItem.quantity,
    slug: lineItem.productSlug?.["en-US"] || "",
    sku: lineItem.variant.sku,
  }));

  setBasket(basketItems);
}

/**
 * Loads cart data from commercetools API and syncs with local state
 */
export async function loadCartFromAPI(): Promise<void> {
  try {
    const cart = await CartService.getMyCart();
    if (cart) {
      await syncCartToLocalState(cart);
    } else {
      // No cart exists, clear local state
      setBasket([]);
    }
  } catch (error) {
    console.error("Error loading cart from API:", error);
    // Keep existing local state on error
  }
}

/**
 * Updates the quantity of a line item using commercetools API
 * @param lineItemId - ID of the line item to update
 * @param quantity - New quantity
 */
export async function updateLineItemQuantity(lineItemId: string, quantity: number): Promise<void> {
  try {
    if (quantity <= 0) {
      // Remove the item if quantity is 0 or negative
      await removeLineItemFromBasket(lineItemId);
      return;
    }

    const updatedCart = await CartService.changeLineItemQuantity(lineItemId, quantity);
    await syncCartToLocalState(updatedCart);
    showAddToCartNotification("Quantity updated", "success");
  } catch (error) {
    console.error("Error updating line item quantity:", error);
    showAddToCartNotification("Failed to update quantity", "error");
    throw error;
  }
}

/**
 * Applies a discount code to the cart using commercetools API
 * @param code - Discount code to apply
 */
export async function applyDiscountCode(code: string): Promise<void> {
  try {
    const updatedCart = await CartService.addDiscountCode(code);
    await syncCartToLocalState(updatedCart);
    showAddToCartNotification(`Discount code "${code}" applied`, "success");
  } catch (error) {
    console.error("Error applying discount code:", error);
    showAddToCartNotification("Failed to apply discount code", "error");
    throw error;
  }
}

/**
 * Removes a discount code from the cart using commercetools API
 * @param discountCodeId - ID of the discount code to remove
 */
export async function removeDiscountCode(discountCodeId: string): Promise<void> {
  try {
    const updatedCart = await CartService.removeDiscountCode(discountCodeId);
    await syncCartToLocalState(updatedCart);
    showAddToCartNotification("Discount code removed", "success");
  } catch (error) {
    console.error("Error removing discount code:", error);
    showAddToCartNotification("Failed to remove discount code", "error");
    throw error;
  }
}

/**
 * Clears all items from the cart using commercetools API
 */
export async function clearBasket(): Promise<void> {
  try {
    const updatedCart = await CartService.clearCart();
    await syncCartToLocalState(updatedCart);
    showAddToCartNotification("Cart cleared", "success");
  } catch (error) {
    console.error("Error clearing cart:", error);
    showAddToCartNotification("Failed to clear cart", "error");
    throw error;
  }
}

/**
 * Shows a notification when a product is added to the basket or cart operations occur
 * @param message - Message to display
 * @param type - Type of notification ("success", "error", "loading")
 */
function showAddToCartNotification(
  message: string,
  type: "success" | "error" | "loading" = "success"
): void {
  console.log(`${type.toUpperCase()}: ${message}`);

  // Use the existing notification modal system
  if (type === "loading") {
    console.log(message); // For loading states, just log for now
  } else {
    notificationModal(message, type);
  }
}
