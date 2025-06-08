import { getState } from "../../../state/state";
import { createElement } from "../../../utils/dom/createElement";
import { createInfoGroup } from "../../../utils/dom/userProfile/createInfoGroup";

import "./addressesView.css";

export const addressesView = (): HTMLElement => {
  const user = getState("customer");
  if (!user) {
    const message = createElement("section", { class: "user-info__addresses" }, [
      "Address information is not available",
    ]);
    return message;
  }

  const addresses = user?.addresses;
  const billingAddresses = user?.billingAddresses;
  const defaultBillingAddress = user?.defaultBillingAddress;
  const billingAddressesContainer = createElement(
    "div",
    {
      class: "user-info__billing-addresses-container",
    },
    [createElement("h2", { class: "address-type-name" }, ["Billing addresses"])]
  );
  for (let i = 0; i < billingAddresses.length; i++) {
    const billingAddress = createElement("div", { class: "user-info__billing-address" });
    const street = createInfoGroup({
      headerText: "Street",
      contentText: addresses[billingAddresses[i]].streetName,
      contentClass: "user-profile__content",
    });
    const city = createInfoGroup({
      headerText: "City",
      contentText: addresses[billingAddresses[i]].city,
      contentClass: "user-profile__content",
    });
    const country = createInfoGroup({
      headerText: "Country",
      contentText: addresses[billingAddresses[i]].country,
      contentClass: "user-profile__content",
    });
    const postCode = createInfoGroup({
      headerText: "Post code",
      contentText: addresses[billingAddresses[i]].postalCode,
      contentClass: "user-profile__content",
    });
    if (i === defaultBillingAddress) {
      const defaultBadge = createElement("div", { class: "user-profile__default-badge" }, [
        "Default address",
      ]);
      billingAddress.append(defaultBadge);
    }
    billingAddress.append(street, city, country, postCode);
    billingAddressesContainer.append(billingAddress);
  }

  const shippingAddresses = user?.shippingAddresses;
  const defaultShippingAddress = user?.defaultShippingAddress;

  const shippingAddressesContainer = createElement(
    "div",
    {
      class: "user-info__shipping-addresses-container",
    },
    [createElement("h2", { class: "address-type-name" }, ["Shipping addresses"])]
  );
  for (let i = 0; i < shippingAddresses.length; i++) {
    const shippingAddress = createElement("div", { class: "user-info__billing-address" });
    const street = createInfoGroup({
      headerText: "Street",
      contentText: addresses[shippingAddresses[i]].streetName,
      contentClass: "user-profile__content",
    });
    const city = createInfoGroup({
      headerText: "City",
      contentText: addresses[shippingAddresses[i]].city,
      contentClass: "user-profile__content",
    });
    const country = createInfoGroup({
      headerText: "Country",
      contentText: addresses[shippingAddresses[i]].country,
      contentClass: "user-profile__content",
    });
    const postCode = createInfoGroup({
      headerText: "Post code",
      contentText: addresses[shippingAddresses[i]].postalCode,
      contentClass: "user-profile__content",
    });
    if (i === defaultShippingAddress) {
      const defaultBadge = createElement("div", { class: "user-profile__default-badge" }, [
        "Default address",
      ]);
      shippingAddress.append(defaultBadge);
    }
    shippingAddress.append(street, city, country, postCode);
    shippingAddressesContainer.append(shippingAddress);
  }

  const headerOfSection = createElement("h2", { class: "user-info__section-header" }, [
    "Personal information",
  ]);
  const addressInfo = createElement("section", { class: "user-info__address-info" }, [
    headerOfSection,
    billingAddressesContainer,
    shippingAddressesContainer,
  ]);
  return addressInfo;
};
