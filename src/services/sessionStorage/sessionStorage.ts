export const storeLoginData = (loginData: string): void => {
  sessionStorage.setItem("redpandaUser", loginData);
};
