import { Customer } from "./dataInterfaces";
import { PagedSearchResponse } from "./products/ProductProjection";

export interface AppState {
  view: string;
  userAuth: boolean;
  customer: Customer | null;
  productsData: PagedSearchResponse;
  subscribers: Set<SubscriberFunction>;
  setView: (view: string) => void;
  setAuth: (isAuth: boolean) => void;
  setCustomer: (customer: Customer | null) => void;
  setProductsData: (productsData: PagedSearchResponse) => void;
  subscribe: (callback: SubscriberFunction) => () => void;
  getState: <
    K extends keyof Omit<
      AppState,
      "getState" | "setView" | "setAuth" | "setProductsData" | "subscribe" | "setCustomer"
    >,
  >(
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
