import { SubscriberFunction, BasketItem } from "./../interfaces/interfaces";
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
  searchFormData: {
    keyword: "",
    sort: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  },
  basket: [],
  subscribersMap: {},
  setAuth(isAuth: boolean) {
    this.userAuth = isAuth;
  },
  setCustomer(customer) {
    this.customer = customer;
  },
  setProductsData(productsData) {
    this.productsData = productsData;
    this.subscribersMap["productsData"]?.forEach((cb) => cb(this));
  },
  setSearchFormData(searchFormData) {
    this.searchFormData = searchFormData;
    this.subscribersMap["searchFormData"]?.forEach((cb) => cb(this));
  },
  setBasket(basket: BasketItem[]) {
    this.basket = basket;
    this.subscribersMap["basket"]?.forEach((cb) => cb(this));
  },
  getState(property) {
    return this[property];
  },
  subscribe(keys: (keyof AppState)[], cb: SubscriberFunction) {
    for (const key of keys) {
      if (!this.subscribersMap[key]) {
        this.subscribersMap[key] = new Set();
      }
      this.subscribersMap[key]!.add(cb);
    }
    return () => {
      for (const key of keys) {
        this.subscribersMap[key]?.delete(cb);
      }
    };
  },
};

export const setAuth = state.setAuth.bind(state);
export const setCustomer = state.setCustomer.bind(state);
export const setProductsData = state.setProductsData.bind(state);
export const getState = state.getState.bind(state);
export const subscribe = state.subscribe.bind(state);
export const setSearchFormData = state.setSearchFormData.bind(state);
export const setBasket = state.setBasket.bind(state);
