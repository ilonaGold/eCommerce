import { Cart, LineItem } from "../../../interfaces/cart/cartInterfaces";
//import { BasketItem } from "../../../interfaces/interfaces";
import { createElement } from "../../../utils/dom/createElement";
import {
  removeLineItemFromBasket,
  updateLineItemQuantity,
  applyDiscountCode,
  clearBasket,
} from "../../../utils/dom/basket/basketOperations";
import { CartService } from "../../../services/API/cart/cartService";

/**
 * Creates the basket content component with cart items and controls
 */
export async function createBasketContent(): Promise<HTMLElement> {
  try {
    // Load cart data from API
    const cart = await CartService.getMyCart();

    if (!cart || cart.lineItems.length === 0) {
      return createEmptyBasketContent();
    }

    return createFilledBasketContent(cart);
  } catch (error) {
    console.error("Error loading cart:", error);
    return createErrorBasketContent();
  }
}

/**
 * Creates empty basket content
 */
function createEmptyBasketContent(): HTMLElement {
  return createElement("div", { class: "basket-page__section" }, [
    createElement("div", { class: "basket-page__placeholder" }, [
      createElement("h2", { class: "basket-page__title" }, ["Your Basket is Empty"]),
      createElement("p", {}, [
        "No treats in your basket yet! Start shopping and fill your basket!",
      ]),
      createElement("button", { class: "continue-shopping-btn" }, ["Continue Shopping"], {
        events: {
          click: (e: Event) => {
            e.preventDefault();
            window.history.pushState({}, "", "/products");
            window.dispatchEvent(new Event("popstate"));
          },
        },
      }),
    ]),
  ]);
}

/**
 * Creates basket content with items
 */
function createFilledBasketContent(cart: Cart): HTMLElement {
  const basketItems = cart.lineItems.map((lineItem) => createBasketItem(lineItem));

  const subtotal = cart.totalPrice.centAmount / 100;
  const discountAmount = cart.discountCodes.length > 0 ? calculateDiscountAmount(cart) : 0;
  const total = subtotal - discountAmount;

  const basketList = createElement("div", { class: "basket-items-list" }, basketItems);

  const discountSection = createDiscountSection(cart);
  const totalsSection = createTotalsSection(subtotal, discountAmount, total);
  const actionsSection = createActionsSection();

  return createElement("div", { class: "basket-page__section" }, [
    createElement("div", { class: "basket-page__container" }, [
      createElement("h2", { class: "basket-page__title" }, ["Shopping Cart"]),
      basketList,
      discountSection,
      totalsSection,
      actionsSection,
    ]),
  ]);
}

/**
 * Creates error basket content
 */
function createErrorBasketContent(): HTMLElement {
  return createElement("div", { class: "basket-page__section" }, [
    createElement("div", { class: "basket-page__placeholder" }, [
      createElement("h2", { class: "basket-page__title" }, ["Error Loading Cart"]),
      createElement("p", {}, ["We couldn't load your cart. Please try refreshing the page."]),
      createElement("button", { class: "continue-shopping-btn" }, ["Try Again"], {
        events: {
          click: (e: Event) => {
            e.preventDefault();
            window.location.reload();
          },
        },
      }),
    ]),
  ]);
}

/**
 * Creates a single basket item element
 */
function createBasketItem(lineItem: LineItem): HTMLElement {
  const name = lineItem.name["en-US"] || "Unknown Product";
  const imageUrl = lineItem.variant.images?.[0]?.url || "";
  const price = lineItem.price.value.centAmount / 100;
  const quantity = lineItem.quantity;
  const totalPrice = lineItem.totalPrice.centAmount / 100;
  const discountedPrice = lineItem.price.discounted?.value.centAmount;
  const hasDiscount = discountedPrice && discountedPrice < lineItem.price.value.centAmount;

  // Create price display elements properly instead of HTML strings
  const priceDisplayElements = hasDiscount
    ? [
        createElement("span", { class: "basket-item__discounted-price" }, [
          `€${(discountedPrice / 100).toFixed(2)}`,
        ]),
        createElement("span", { class: "basket-item__original-price" }, [`€${price.toFixed(2)}`]),
      ]
    : [createElement("span", { class: "basket-item__price" }, [`€${price.toFixed(2)}`])];

  const quantityControls = createElement("div", { class: "basket-item__quantity-controls" }, [
    createElement(
      "button",
      {
        class: "quantity-btn quantity-btn--decrease",
        "data-line-item-id": lineItem.id,
      },
      ["-"],
      {
        events: {
          click: (e: Event) => handleQuantityChange(e, lineItem.id, quantity - 1),
        },
      }
    ),
    createElement(
      "input",
      {
        type: "number",
        class: "quantity-input",
        value: quantity.toString(),
        min: "1",
        "data-line-item-id": lineItem.id,
      },
      [],
      {
        events: {
          change: (e: Event) => {
            const target = e.target as HTMLInputElement;
            const newQuantity = parseInt(target.value);
            if (newQuantity > 0) {
              handleQuantityChange(e, lineItem.id, newQuantity);
            }
          },
        },
      }
    ),
    createElement(
      "button",
      {
        class: "quantity-btn quantity-btn--increase",
        "data-line-item-id": lineItem.id,
      },
      ["+"],
      {
        events: {
          click: (e: Event) => handleQuantityChange(e, lineItem.id, quantity + 1),
        },
      }
    ),
  ]);

  const removeButton = createElement(
    "button",
    {
      class: "basket-item__remove-btn",
      "data-line-item-id": lineItem.id,
    },
    ["Remove"],
    {
      events: {
        click: (e: Event) => handleRemoveItem(e, lineItem.id),
      },
    }
  );

  return createElement("div", { class: "basket-item", "data-line-item-id": lineItem.id }, [
    createElement("div", { class: "basket-item__image-container" }, [
      createElement("img", {
        class: "basket-item__image",
        src: imageUrl,
        alt: name,
      }),
    ]),
    createElement("div", { class: "basket-item__details" }, [
      createElement("h3", { class: "basket-item__name" }, [name]),
      createElement("div", { class: "basket-item__price-container" }, priceDisplayElements),
    ]),
    createElement("div", { class: "basket-item__controls" }, [
      quantityControls,
      createElement("div", { class: "basket-item__total" }, [`€${totalPrice.toFixed(2)}`]),
      removeButton,
    ]),
  ]);
}

/**
 * Creates discount code section
 */
function createDiscountSection(cart: Cart): HTMLElement {
  const discountInput = createElement("input", {
    type: "text",
    class: "discount-input",
    placeholder: "Enter discount code",
  });

  const applyButton = createElement("button", { class: "discount-apply-btn" }, ["Apply"], {
    events: {
      click: async (e: Event) => {
        e.preventDefault();
        const input = discountInput as HTMLInputElement;
        const code = input.value.trim();

        if (code) {
          try {
            await applyDiscountCode(code);
            input.value = "";
            // Refresh the page to show updated cart
            window.location.reload();
          } catch (error) {
            console.error("Failed to apply discount code:", error);
          }
        }
      },
    },
  });

  const appliedDiscounts = cart.discountCodes.map((discount) =>
    createElement("div", { class: "applied-discount" }, [
      createElement("span", { class: "discount-code" }, [
        discount.discountCode.obj?.code || "Discount",
      ]),
      createElement(
        "button",
        {
          class: "discount-remove-btn",
          "data-discount-id": discount.discountCode.id,
        },
        ["×"],
        {
          events: {
            click: async (e: Event) => {
              e.preventDefault();
              try {
                // TODO: Implement removeDiscountCode function in basketOperations
                // await removeDiscountCode(discount.discountCode.id);
                // window.location.reload();
              } catch (error) {
                console.error("Failed to remove discount code:", error);
              }
            },
          },
        }
      ),
    ])
  );

  return createElement("div", { class: "discount-section" }, [
    createElement("h3", { class: "discount-section__title" }, ["Discount Code"]),
    createElement("div", { class: "discount-input-group" }, [discountInput, applyButton]),
    ...(appliedDiscounts.length > 0
      ? [createElement("div", { class: "applied-discounts" }, appliedDiscounts)]
      : []),
  ]);
}

/**
 * Creates totals section
 */
function createTotalsSection(subtotal: number, discountAmount: number, total: number): HTMLElement {
  const rows = [
    createElement("div", { class: "totals-row" }, [
      createElement("span", {}, ["Subtotal:"]),
      createElement("span", {}, [`€${subtotal.toFixed(2)}`]),
    ]),
  ];

  if (discountAmount > 0) {
    rows.push(
      createElement("div", { class: "totals-row discount-row" }, [
        createElement("span", {}, ["Discount:"]),
        createElement("span", { class: "discount-amount" }, [`-€${discountAmount.toFixed(2)}`]),
      ])
    );
  }

  rows.push(
    createElement("div", { class: "totals-row total-row" }, [
      createElement("span", { class: "total-label" }, ["Total:"]),
      createElement("span", { class: "total-amount" }, [`€${total.toFixed(2)}`]),
    ])
  );

  return createElement("div", { class: "basket-totals" }, [
    createElement("h3", { class: "totals-title" }, ["Order Summary"]),
    ...rows,
  ]);
}

/**
 * Creates actions section
 */
function createActionsSection(): HTMLElement {
  const clearButton = createElement("button", { class: "clear-cart-btn" }, ["Clear Cart"], {
    events: {
      click: async (e: Event) => {
        e.preventDefault();
        if (confirm("Are you sure you want to clear all items from your cart?")) {
          try {
            await clearBasket();
            window.location.reload();
          } catch (error) {
            console.error("Failed to clear cart:", error);
          }
        }
      },
    },
  });

  const continueShoppingButton = createElement(
    "button",
    { class: "continue-shopping-btn" },
    ["Continue Shopping"],
    {
      events: {
        click: (e: Event) => {
          e.preventDefault();
          window.history.pushState({}, "", "/products");
          window.dispatchEvent(new Event("popstate"));
        },
      },
    }
  );

  const checkoutButton = createElement(
    "button",
    { class: "checkout-btn" },
    ["Proceed to Checkout"],
    {
      events: {
        click: (e: Event) => {
          e.preventDefault();
          // TODO: Implement checkout flow
          alert("Checkout functionality will be implemented in a future sprint.");
        },
      },
    }
  );

  return createElement("div", { class: "basket-actions" }, [
    createElement("div", { class: "basket-actions__secondary" }, [
      clearButton,
      continueShoppingButton,
    ]),
    createElement("div", { class: "basket-actions__primary" }, [checkoutButton]),
  ]);
}

/**
 * Handles quantity change for a line item
 */
async function handleQuantityChange(
  e: Event,
  lineItemId: string,
  newQuantity: number
): Promise<void> {
  e.preventDefault();

  try {
    // Disable all quantity controls during update
    const buttons = document.querySelectorAll(`[data-line-item-id="${lineItemId}"]`);
    buttons.forEach((button) => ((button as HTMLButtonElement).disabled = true));

    await updateLineItemQuantity(lineItemId, newQuantity);

    // Refresh the page to show updated cart
    window.location.reload();
  } catch (error) {
    console.error("Failed to update quantity:", error);

    // Re-enable controls on error
    const buttons = document.querySelectorAll(`[data-line-item-id="${lineItemId}"]`);
    buttons.forEach((button) => ((button as HTMLButtonElement).disabled = false));
  }
}

/**
 * Handles removing an item from the cart
 */
async function handleRemoveItem(e: Event, lineItemId: string): Promise<void> {
  e.preventDefault();

  try {
    const button = e.target as HTMLButtonElement;
    button.disabled = true;
    button.textContent = "Removing...";

    await removeLineItemFromBasket(lineItemId);

    // Refresh the page to show updated cart
    window.location.reload();
  } catch (error) {
    console.error("Failed to remove item:", error);

    // Reset button on error
    const button = e.target as HTMLButtonElement;
    button.disabled = false;
    button.textContent = "Remove";
  }
}

/**
 * Calculates the total discount amount from applied discount codes
 */
function calculateDiscountAmount(cart: Cart): number {
  // This is a simplified calculation - in reality, you'd need to examine
  // the cart's discount information more carefully
  let discountAmount = 0;

  cart.lineItems.forEach((lineItem) => {
    lineItem.discountedPricePerQuantity.forEach((discountedPrice) => {
      discountedPrice.discountedPrice.includedDiscounts.forEach((discount) => {
        discountAmount += discount.discountedAmount.centAmount / 100;
      });
    });
  });

  return discountAmount;
}
