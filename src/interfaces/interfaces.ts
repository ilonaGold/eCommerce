import { Customer } from "./dataInterfaces";

export interface AppState {
  view: string;
  userAuth: boolean;
  customer: Customer | null;
  setView: (view: string) => void;
  setAuth: (isAuth: boolean) => void;
  getState: <K extends keyof Omit<AppState, "getState" | "setView" | "setAuth" | "setState">>(
    property: K
  ) => AppState[K];
  setState: <K extends keyof Omit<AppState, "getState" | "setView" | "setAuth" | "setState">>(
    property: K,
    value: AppState[K]
  ) => void;
}

export interface Routes {
  [index: string]: string;
}

export interface Rule {
  test: () => boolean;
  message: string;
}

export interface InputError {
  fieldInput: HTMLInputElement;
  fieldError: HTMLDivElement | null;
  text: string;
}
