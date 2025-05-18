export const storeLoginData = (loginData: string): void => {
  localStorage.setItem("redpandaUser", loginData);
};
