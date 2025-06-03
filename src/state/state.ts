import { AppState } from "../interfaces/interfaces";

const state: AppState = {
  view: "/",
  userAuth: false,
  customer: null,
  productId: undefined,
  setView(view) {
    this.view = view;
  },
  setAuth(isAuth: boolean) {
    this.userAuth = isAuth;
  },
  setCustomer(customer) {
    this.customer = customer;
  },
  setProductId(productId) {
    this.productId = productId;
  },
  getState(property) {
    return this[property];
  },
};

export const setView = state.setView.bind(state);
export const setAuth = state.setAuth.bind(state);
export const setCustomer = state.setCustomer.bind(state);
export const getState = state.getState.bind(state);
