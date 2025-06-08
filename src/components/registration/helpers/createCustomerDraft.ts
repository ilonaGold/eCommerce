import { AddressFormData } from "./../../../interfaces/dataInterfaces";
import { CustomerFormData } from "../../../interfaces/dataInterfaces";

export const createCustomerDraft = (form: HTMLFormElement): CustomerFormData => {
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

  const shippingAddr: AddressFormData = {
    streetName: data.address,
    city: data.city,
    country: data.country,
    postalCode: data.postalCode,
  };

  const hasSeparateBilling = separateBilling === "on";

  const billingAddr: AddressFormData = hasSeparateBilling
    ? {
        streetName: data.billingAddress,
        city: data.billingCity,
        country: data.billingCountry,
        postalCode: data.billingPostalCode,
      }
    : {
        ...shippingAddr,
      };

  const addresses: AddressFormData[] = [shippingAddr, billingAddr];

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
