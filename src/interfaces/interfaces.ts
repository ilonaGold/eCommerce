import { Customer } from "./dataInterfaces";
import { ProductProjection } from "./products/ProductProjection";

export interface AppState {
  userAuth: boolean;
  customer: Customer | null;
  setAuth: (isAuth: boolean) => void;
  setCustomer: (customer: Customer | null) => void;
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

export interface ProductDetailsProps {
  parent: HTMLElement;
  product: ProductProjection | null;
}

export interface infoGroupProps {
  headerText: string;
  contentClass: string;
  contentText: string;
}
