import { Customer } from "../../interfaces/dataInterfaces";

type StoredUser = {
  accessToken: string;
  customer: Customer;
  expiresAt: number;
  refreshToken: string;
};

export const isTokenValid = (): boolean => {
  const userString = localStorage.getItem("redpandaUser");
  const storedUser: StoredUser = userString ? JSON.parse(userString) : null;

  if (storedUser.accessToken && storedUser.expiresAt > Date.now()) {
    console.log("token been test checked by 'isTokenValid' and its ok");
    return true;
  } else if (storedUser.refreshToken) {
    console.log("token expired but we got refresh token to reactivate access one");
    return false; // instead later we have to put here access token reactivating logic
  } else {
    console.log("We have to do login again");
    return false;
  }
};
