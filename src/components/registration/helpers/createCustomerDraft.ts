import { Address } from "./../../../interfaces/dataInterfaces";
import { Customer } from "../../../interfaces/dataInterfaces";

export const createCustomerDraft = (form: HTMLFormElement): Customer => {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData) as Record<string, string>;

  const {
    email,
    firstName,
    lastName,
    dateOfBirth,
    password,
    separateBilling,
    defaultShipping,
    defaultBilling,
  } = data;

  const shippingAddr: Address = {
    streetName: data.address,
    city: data.city,
    country: data.country,
    postalCode: data.postalCode,
  };

  const hasSeparateBilling = separateBilling === "on";

  const billingAddr: Address = hasSeparateBilling
    ? {
        streetName: data.billingAddress,
        city: data.billingCity,
        country: data.billingCountry,
        postalCode: data.billingPostalCode,
      }
    : {
        ...shippingAddr,
      };

  const addresses: Address[] = [shippingAddr, billingAddr];

  const shippingAddresses = [0];
  const billingAddresses = [1];

  const defaultShippingAddress = defaultShipping === "on" ? 0 : shippingAddresses[0];
  const defaultBillingAddress = defaultBilling === "on" ? 1 : billingAddresses[0];

  return {
    email,
    firstName,
    lastName,
    dateOfBirth,
    password,
    addresses,
    shippingAddresses,
    billingAddresses,
    defaultShippingAddress,
    defaultBillingAddress,
  };
};
