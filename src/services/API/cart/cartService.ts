import {
  Cart,
  CartDraft,
  CartUpdateAction,
  AddLineItemAction,
  RemoveLineItemAction,
  ChangeLineItemQuantityAction,
  AddDiscountCodeAction,
  RemoveDiscountCodeAction,
  LineItem,
} from "../../../interfaces/cart/cartInterfaces";
import { getAccessTokenData } from "../../auth/getAccessTokenData";
import { getState } from "../../../state/state";

/**
 * Service for managing shopping carts using commercetools API
 * For logged-in users: uses My Carts API with customer tokens
 * For anonymous users: uses regular Carts API with client credentials and anonymousId
 */
export class CartService {
  private static apiUrl = `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}`;

  /**
   * Get access token for API requests
   * For logged-in users, gets customer token from localStorage
   * For anonymous users, uses client credentials token
   */  private static async getAuthHeaders(): Promise<{ Authorization: string }> {
    const isLoggedIn = getState("userAuth") as boolean;    if (isLoggedIn) {
      // Use stored customer token for logged-in users
      const loginInfo = localStorage.getItem("redpandaUser");
      if (loginInfo) {
        const { accessToken } = JSON.parse(loginInfo);
        return {
          Authorization: `Bearer ${accessToken}`,
        };
      } else {
        // If user is logged in but no token found, this is an error state
        throw new Error("User is logged in but no access token found. Please log in again.");
      }
    }

    // For anonymous users, use client credentials token
    const tokenData = await getAccessTokenData();
    return {
      Authorization: `Bearer ${tokenData.access_token}`,
    };
  }

  /**
   * Get or create anonymousId for anonymous users
   */
  private static getAnonymousId(): string {
    let anonymousId = localStorage.getItem("anonymousId");

    if (!anonymousId) {
      // Generate a new anonymousId (UUID-like format)
      anonymousId = "anon-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("anonymousId", anonymousId);
    }

    return anonymousId;
  }

  /**
   * Check if user is logged in
   */
  private static isLoggedIn(): boolean {
    return getState("userAuth") as boolean;
  }
  /**
   * Get the current user's cart
   * For logged-in users: uses My Carts API
   * For anonymous users: uses regular Carts API with anonymousId query
   */
  static async getMyCart(): Promise<Cart | null> {
    try {
      const headers = await this.getAuthHeaders();
      const isLoggedIn = this.isLoggedIn();

      if (isLoggedIn) {
        // Use My Carts endpoint for logged-in users
        const response = await fetch(`${this.apiUrl}/me/carts`, {
          method: "GET",
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 404) {
          return null;
        }

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to get cart: ${response.status} ${response.statusText} - ${errorText}`
          );
        }

        const data = await response.json();
        return data.results && data.results.length > 0 ? data.results[0] : null;
      } else {
        // Use regular Carts endpoint for anonymous users
        const anonymousId = this.getAnonymousId();
        const response = await fetch(`${this.apiUrl}/carts?where=anonymousId="${anonymousId}"`, {
          method: "GET",
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 404) {
          return null;
        }

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to get cart: ${response.status} ${response.statusText} - ${errorText}`
          );
        }

        const data = await response.json();
        return data.results && data.results.length > 0 ? data.results[0] : null;
      }
    } catch (error) {
      console.error("Error getting cart:", error);
      throw new Error(
        `Couldn't get cart data. Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Get or create a cart for the current user
   * If no cart exists, creates a new one
   */
  static async getOrCreateCart(): Promise<Cart> {
    let cart = await this.getMyCart();

    if (!cart) {
      cart = await this.createCart();
    }

    return cart;
  }
  /**
   * Create a new cart for the current user
   * For logged-in users: uses My Carts API
   * For anonymous users: uses regular Carts API with anonymousId
   */
  static async createCart(cartDraft?: Partial<CartDraft>): Promise<Cart> {
    try {
      const headers = await this.getAuthHeaders();
      const isLoggedIn = this.isLoggedIn();

      const defaultCartDraft: CartDraft = {
        currency: "EUR", // Default currency, can be customized
        country: "DE", // Default country, can be customized
        ...cartDraft,
      };

      if (isLoggedIn) {
        // Use My Carts endpoint for logged-in users
        const response = await fetch(`${this.apiUrl}/me/carts`, {
          method: "POST",
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(defaultCartDraft),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to create cart: ${response.status} ${response.statusText} - ${errorText}`
          );
        }

        return await response.json();
      } else {
        // Use regular Carts endpoint for anonymous users
        const anonymousId = this.getAnonymousId();
        const anonymousCartDraft = {
          ...defaultCartDraft,
          anonymousId,
        };

        const response = await fetch(`${this.apiUrl}/carts`, {
          method: "POST",
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(anonymousCartDraft),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to create cart: ${response.status} ${response.statusText} - ${errorText}`
          );
        }

        return await response.json();
      }
    } catch (error) {
      console.error("Error creating cart:", error);
      throw new Error(
        `Couldn't create cart. Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
  /**
   * Update cart with one or more actions
   * For logged-in users: uses My Carts API
   * For anonymous users: uses regular Carts API
   */
  static async updateCart(
    cartId: string,
    version: number,
    actions: CartUpdateAction[]
  ): Promise<Cart> {
    try {
      const headers = await this.getAuthHeaders();
      const isLoggedIn = this.isLoggedIn();

      const updatePayload = {
        version,
        actions,
      };

      const endpoint = isLoggedIn
        ? `${this.apiUrl}/me/carts/${cartId}`
        : `${this.apiUrl}/carts/${cartId}`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatePayload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to update cart: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      const cart: Cart = await response.json();
      return cart;
    } catch (error) {
      console.error("Error updating cart:", error);
      throw new Error(
        `Couldn't update cart. Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  } /**
   * Add a product to the cart
   * Use either sku OR productId+variantId, sku takes precedence if provided
   */
  static async addLineItem(
    productId: string,
    variantId: number = 1,
    quantity: number = 1,
    sku?: string
  ): Promise<Cart> {
    const cart = await this.getOrCreateCart();

    // Use either sku OR productId+variantId, not both
    // SKU takes precedence if provided
    const addLineItemAction: AddLineItemAction = sku
      ? {
          action: "addLineItem",
          sku,
          quantity,
        }
      : {
          action: "addLineItem",
          productId,
          variantId,
          quantity,
        };

    return await this.updateCart(cart.id, cart.version, [addLineItemAction]);
  }

  /**
   * Remove a line item from the cart
   */
  static async removeLineItem(lineItemId: string, quantity?: number): Promise<Cart> {
    const cart = await this.getOrCreateCart();

    const removeLineItemAction: RemoveLineItemAction = {
      action: "removeLineItem",
      lineItemId,
      ...(quantity && { quantity }),
    };

    return await this.updateCart(cart.id, cart.version, [removeLineItemAction]);
  }

  /**
   * Change the quantity of a line item in the cart
   */
  static async changeLineItemQuantity(lineItemId: string, quantity: number): Promise<Cart> {
    const cart = await this.getOrCreateCart();

    const changeQuantityAction: ChangeLineItemQuantityAction = {
      action: "changeLineItemQuantity",
      lineItemId,
      quantity,
    };

    return await this.updateCart(cart.id, cart.version, [changeQuantityAction]);
  }

  /**
   * Apply a discount code to the cart
   */
  static async addDiscountCode(code: string): Promise<Cart> {
    const cart = await this.getOrCreateCart();

    const addDiscountAction: AddDiscountCodeAction = {
      action: "addDiscountCode",
      code,
    };

    return await this.updateCart(cart.id, cart.version, [addDiscountAction]);
  }

  /**
   * Remove a discount code from the cart
   */
  static async removeDiscountCode(discountCodeId: string): Promise<Cart> {
    const cart = await this.getOrCreateCart();

    const removeDiscountAction: RemoveDiscountCodeAction = {
      action: "removeDiscountCode",
      discountCode: {
        typeId: "discount-code",
        id: discountCodeId,
      },
    };

    return await this.updateCart(cart.id, cart.version, [removeDiscountAction]);
  }

  /**
   * Clear all items from the cart
   */
  static async clearCart(): Promise<Cart> {
    const cart = await this.getOrCreateCart();
    // Create remove actions for all line items
    const removeActions: RemoveLineItemAction[] = cart.lineItems.map((lineItem: LineItem) => ({
      action: "removeLineItem",
      lineItemId: lineItem.id,
    }));

    if (removeActions.length === 0) {
      return cart; // Cart is already empty
    }

    return await this.updateCart(cart.id, cart.version, removeActions);
  }
  /**
   * Delete the entire cart
   * For logged-in users: uses My Carts API
   * For anonymous users: uses regular Carts API
   */
  static async deleteCart(): Promise<void> {
    try {
      const cart = await this.getMyCart();

      if (!cart) {
        return; // No cart to delete
      }

      const headers = await this.getAuthHeaders();
      const isLoggedIn = this.isLoggedIn();

      const endpoint = isLoggedIn
        ? `${this.apiUrl}/me/carts/${cart.id}?version=${cart.version}`
        : `${this.apiUrl}/carts/${cart.id}?version=${cart.version}`;

      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          ...headers,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to delete cart: ${response.status} ${response.statusText} - ${errorText}`
        );
      }
    } catch (error) {
      console.error("Error deleting cart:", error);
      throw new Error(
        `Couldn't delete cart. Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Get cart total item count (sum of all quantities)
   */
  static async getCartItemCount(): Promise<number> {
    try {
      const cart = await this.getMyCart();

      if (!cart) {
        return 0;
      }

      return cart.lineItems.reduce((total: number, item: LineItem) => total + item.quantity, 0);
    } catch (error) {
      console.error("Error getting cart item count:", error);
      return 0;
    }
  }

  /**
   * Check if a product is already in the cart
   */
  static async isProductInCart(productId: string, variantId: number = 1): Promise<boolean> {
    try {
      const cart = await this.getMyCart();

      if (!cart) {
        return false;
      }
      return cart.lineItems.some(
        (item: LineItem) => item.productId === productId && item.variant.id === variantId
      );
    } catch (error) {
      console.error("Error checking if product is in cart:", error);
      return false;
    }
  } /**
   * Get line item by product ID and variant ID
   */
  static async getLineItemByProduct(
    productId: string,
    variantId: number = 1
  ): Promise<LineItem | null> {
    try {
      const cart = await this.getMyCart();

      if (!cart) {
        return null;
      }

      return (
        cart.lineItems.find(
          (item: LineItem) => item.productId === productId && item.variant.id === variantId
        ) || null
      );
    } catch (error) {
      console.error("Error getting line item:", error);
      return null;
    }
  }

  /**
   * Clean up anonymous cart data when user logs in
   * This should be called after successful login
   */
  static clearAnonymousData(): void {
    localStorage.removeItem("anonymousId");
  }

  /**
   * Transfer anonymous cart to logged-in user
   * This can be called after login to merge anonymous cart with user's cart
   */
  static async transferAnonymousCart(): Promise<void> {
    try {
      // Get anonymous cart before clearing the anonymousId
      const anonymousId = localStorage.getItem("anonymousId");
      if (!anonymousId) {
        return; // No anonymous cart to transfer
      }

      // Get anonymous cart using client credentials
      const headers = {
        Authorization: `Bearer ${(await getAccessTokenData()).access_token}`,
      };

      const response = await fetch(`${this.apiUrl}/carts?where=anonymousId="${anonymousId}"`, {
        method: "GET",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const anonymousCart = data.results && data.results.length > 0 ? data.results[0] : null;

        if (anonymousCart && anonymousCart.lineItems.length > 0) {
          // If user has items in anonymous cart, we could merge them
          // For now, we'll just clear the anonymous data
          // TODO: Implement cart merging logic if needed
          console.log("Anonymous cart found with items - implement merging logic if needed");
        }
      }

      // Clear anonymous data
      this.clearAnonymousData();
    } catch (error) {
      console.error("Error transferring anonymous cart:", error);
      // Clear anonymous data even if transfer fails
      this.clearAnonymousData();
    }
  }
}
