import { SubscriberFunction } from "./../interfaces/interfaces";
import { AppState } from "../interfaces/interfaces";

const state: AppState = {
  userAuth: false,
  customer: null,
  productsData: {
    limit: 0,
    offset: 0,
    count: 0,
    results: [],
    facets: undefined,
  },
  subscribers: new Set(),
  setAuth(isAuth: boolean) {
    this.userAuth = isAuth;
  },
  setCustomer(customer) {
    this.customer = customer;
  },
  setProductsData(productsData) {
    this.productsData = productsData;
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

export const setAuth = state.setAuth.bind(state);
export const setCustomer = state.setCustomer.bind(state);
export const setProductsData = state.setProductsData.bind(state);
export const getState = state.getState.bind(state);
export const subscribe = state.subscribe.bind(state);
