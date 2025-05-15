import { AppState } from "../interfaces/interfaces";

const state: AppState = {
  view: "login",
  userAuth: false,
  setView(view) {
    this.view = view;
  },
  setAuth(isAuth) {
    this.userAuth = isAuth;
  },
  getState(property) {
    return this[property];
  },
};

export const setView = state.setView.bind(state);
export const setAuth = state.setAuth.bind(state);
export const getState = state.getState.bind(state);
