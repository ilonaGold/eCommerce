export const storeLoginData = (loginData: string): void => {
  localStorage.setItem("redpandaUser", loginData);
};
export const clearLoginData = (): void => {
  localStorage.removeItem("redpandaUser");
};
