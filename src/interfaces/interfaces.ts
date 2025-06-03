import { Customer } from "./dataInterfaces";

export interface AppState {
  view: string;
  userAuth: boolean;
  customer: Customer | null;
  productId: string | undefined;
  setView: (view: string) => void;
  setAuth: (isAuth: boolean) => void;
  setCustomer: (customer: Customer | null) => void;
  setProductId: (productId: string) => void;
  getState: <K extends keyof Omit<AppState, "getState" | "setView" | "setAuth">>(
    property: K
  ) => AppState[K];
}

export interface Routes {
  path: string;
  handle: (route?: string) => void;
}

export interface Fields {
  [index: string]: (input: HTMLInputElement) => string;
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

export interface ValidationProps {
  input: HTMLInputElement;
  validate: (input: HTMLInputElement) => string;
  divError: HTMLDivElement;
}
