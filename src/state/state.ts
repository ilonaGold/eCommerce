import { SubscriberFunction } from "./../interfaces/interfaces";
import { AppState } from "../interfaces/interfaces";

const state: AppState = {
  view: "/",
  userAuth: false,
  customer: null,
  products: [],
  subscribers: new Set(),
  setView(view) {
    this.view = view;
  },
  setAuth(isAuth: boolean) {
    this.userAuth = isAuth;
  },
  setCustomer(customer) {
    this.customer = customer;
  },
  setProducts(products) {
    this.products = products;
    this.subscribers.forEach((cb) => cb(this));
  },
  getState(property) {
    return this[property];
  },
  subscribe(cb: SubscriberFunction) {
    this.subscribers.add(cb);
    return () => {
      this.subscribers.delete(cb);
    };
  },
};

export const setView = state.setView.bind(state);
export const setAuth = state.setAuth.bind(state);
export const setCustomer = state.setCustomer.bind(state);
export const setProducts = state.getState.bind(state);
export const getState = state.getState.bind(state);
export const subscribe = state.subscribe.bind(state);
