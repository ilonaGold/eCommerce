import { LoginInfo } from "../../interfaces/dataInterfaces";

export const storeLoginData = (loginData: LoginInfo): void => {
  localStorage.setItem("redpandaUser", JSON.stringify(loginData));
};
export const clearLoginData = (): void => {
  localStorage.removeItem("redpandaUser");
};

export const getLoginInfo = (): LoginInfo | null => {
  const loginInfo = localStorage.getItem("redpandaUser");
  return loginInfo ? JSON.parse(loginInfo) : null;
};
