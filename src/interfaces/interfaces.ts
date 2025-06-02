import { Customer } from "./dataInterfaces";
import { ProductProjection } from "./products/ProductProjection";

export interface AppState {
  view: string;
  userAuth: boolean;
  customer: Customer | null;
  product: ProductProjection | null;
  setView: (view: string) => void;
  setAuth: (isAuth: boolean) => void;
  setCustomer: (customer: Customer | null) => void;
  setProduct: (customer: ProductProjection | null) => void;
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
