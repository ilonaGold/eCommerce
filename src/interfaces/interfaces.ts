import { Customer } from "./dataInterfaces";
import { ProductProjection } from "./products/ProductProjection";

export interface AppState {
  view: string;
  userAuth: boolean;
  customer: Customer | null;
  products: ProductProjection[];
  subscribers: Set<SubscriberFunction>;
  setView: (view: string) => void;
  setAuth: (isAuth: boolean) => void;
  setCustomer: (customer: Customer | null) => void;
  setProducts: (products: ProductProjection[]) => void;
  subscribe: (callback: SubscriberFunction) => () => void;
  getState: <K extends keyof Omit<AppState, "getState" | "setView" | "setAuth" | "setProducts">>(
    property: K
  ) => AppState[K];
}

export type SubscriberFunction = (state: AppState) => void;

export interface Routes {
  [index: string]: string;
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
