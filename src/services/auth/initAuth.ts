import { setState } from "../../state/state";
import { isCustomerLoggedIn } from "./isCustomerLoggedIn";

export const initAuth = async () => {
  const result = await isCustomerLoggedIn();

  setState("userAuth", result.isTokenValid);
  setState("customer", result.customer);
};
