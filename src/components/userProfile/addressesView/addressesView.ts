import { getState } from "../../../state/state";
import { createElement } from "../../../utils/dom/createElement";
import { createInfoGroup } from "../../../utils/dom/userProfile/createInfoGroup";

import "./addressesView.css";

export const addressesView = (): HTMLElement => {
  const user = getState("customer");
  const addresses = user?.addresses;
  console.log(user);

  if (!user || !addresses) {
    const message = createElement("section", { class: "user-info__addresses" }, [
      "Address information is not available",
    ]);
    return message;
  }

  const billingAddressIds = user?.billingAddressIds;
  const defaultBillingAddressId = user?.defaultBillingAddressId;
  const billingAddressesContainer = createElement(
    "div",
    {
      class: "user-info__billing-addresses-container",
    },
    [createElement("h2", { class: "address-type-name" }, ["Billing addresses"])]
  );
  for (const address of addresses) {
    if (billingAddressIds?.includes(address.id || "")) {
      const billingAddress = createElement("div", { class: "user-info__billing-address" });
      const street = createInfoGroup({
        headerText: "Street",
        contentText: address.streetName || "",
        contentClass: "user-profile__content",
      });
      const city = createInfoGroup({
        headerText: "City",
        contentText: address.city || "",
        contentClass: "user-profile__content",
      });
      const country = createInfoGroup({
        headerText: "Country",
        contentText: address.country || "",
        contentClass: "user-profile__content",
      });
      const postCode = createInfoGroup({
        headerText: "Post code",
        contentText: address.postalCode || "",
        contentClass: "user-profile__content",
      });
      if (address.id === defaultBillingAddressId) {
        const defaultBadge = createElement("div", { class: "user-profile__default-badge" }, [
          "Default address",
        ]);
        billingAddress.append(defaultBadge);
      }
      billingAddress.append(street, city, country, postCode);
      billingAddressesContainer.append(billingAddress);
    }
  }

  const shippingAddressIds = user?.shippingAddressIds;
  const defaultShippingAddressId = user?.defaultShippingAddressId;

  const shippingAddressesContainer = createElement(
    "div",
    {
      class: "user-info__shipping-addresses-container",
    },
    [createElement("h2", { class: "address-type-name" }, ["Shipping addresses"])]
  );
  for (const address of addresses) {
    if (shippingAddressIds?.includes(address.id || "")) {
      const shippingAddress = createElement("div", { class: "user-info__billing-address" });
      const street = createInfoGroup({
        headerText: "Street",
        contentText: address.streetName || "",
        contentClass: "user-profile__content",
      });
      const city = createInfoGroup({
        headerText: "City",
        contentText: address.city || "",
        contentClass: "user-profile__content",
      });
      const country = createInfoGroup({
        headerText: "Country",
        contentText: address.country || "",
        contentClass: "user-profile__content",
      });
      const postCode = createInfoGroup({
        headerText: "Post code",
        contentText: address.postalCode || "",
        contentClass: "user-profile__content",
      });
      if (address.id === defaultShippingAddressId) {
        const defaultBadge = createElement("div", { class: "user-profile__default-badge" }, [
          "Default address",
        ]);
        shippingAddress.append(defaultBadge);
      }
      shippingAddress.append(street, city, country, postCode);
      shippingAddressesContainer.append(shippingAddress);
    }
  }

  const headerOfSection = createElement("h2", { class: "user-info__section-header" }, [
    "Address information",
  ]);
  const addressInfo = createElement("div", { class: "user-info__address-fields" }, [
    billingAddressesContainer,
    shippingAddressesContainer,
  ]);
  const addressInfoSection = createElement("section", { class: "user-info__address-info" }, [
    headerOfSection,
    addressInfo,
  ]);
  return addressInfoSection;
};
