import { setAuth, setCustomer } from "../../state/state";
import { isCustomerLoggedIn } from "./isCustomerLoggedIn";

export const authFromStorage = async (): Promise<void> => {
  try {
    const result = await isCustomerLoggedIn();
    setAuth(result.isTokenValid);
    setCustomer(result.customer);
  } catch (error) {
    console.log(error);
    setAuth(false);
    setCustomer(null);
  }
};
