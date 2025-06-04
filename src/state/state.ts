import { AppState } from "../interfaces/interfaces";

const state: AppState = {
  userAuth: false,
  customer: null,
  setAuth(isAuth: boolean) {
    this.userAuth = isAuth;
  },
  setCustomer(customer) {
    this.customer = customer;
  },
  getState(property) {
    return this[property];
  },
};

export const setAuth = state.setAuth.bind(state);
export const setCustomer = state.setCustomer.bind(state);
export const getState = state.getState.bind(state);
