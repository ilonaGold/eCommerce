import { AppState } from "../interfaces/interfaces";

const state: AppState = {
  view: "/",
  userAuth: false,
  customer: null,
  setView(view) {
    this.view = view;
  },
  setAuth(isAuth: boolean) {
    this.userAuth = isAuth;
  },
  getState(property) {
    return this[property];
  },
  setState(property, value) {
    this[property] = value;
  },
};

export const setView = state.setView.bind(state);
export const setAuth = state.setAuth.bind(state);
export const getState = state.getState.bind(state);
export const setState = state.setState.bind(state);
