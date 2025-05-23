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

  if (storedUser?.accessToken && storedUser?.expiresAt > Date.now()) {
    console.log("token been test checked by 'isTokenValid' and its ok");
    // setAuth(true);
    return true;
  } else if (storedUser?.refreshToken) {
    console.log("token expired but we got refresh token to reactivate access one");
    // try {
    //   const response = await fetch(...);

    //   if (response.ok) {
    //     const newUser = await response.json();
    //     storeLoginData(JSON.stringify(newUser));
    //     setAuth(true);
    //     return true;
    //   }
    // } catch (err) {
    //   console.error("Failed to refresh token", err);
    // }
    return false; // instead later we have to put here access token reactivating logic
  } else {
    console.log("We have to do login again");
    // localStorage.removeItem("redpandaUser");
    // setAuth(false);
    return false;
  }
};
