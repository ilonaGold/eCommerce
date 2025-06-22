import { SearchFormData } from "./products/search/searchQuery";
import { Customer } from "./dataInterfaces";
import { PagedSearchResponse, ProductProjection } from "./products/ProductProjection";

export interface AppState {
  userAuth: boolean;
  customer: Customer | null;
  productsData: PagedSearchResponse;
  searchFormData: SearchFormData;
  basket: BasketItem[];
  subscribersMap: { [key: string]: Set<SubscriberFunction> | undefined };
  setAuth: (isAuth: boolean) => void;
  setCustomer: (customer: Customer | null) => void;
  setProductsData: (productsData: PagedSearchResponse) => void;
  setSearchFormData: (searchFormData: SearchFormData) => void;
  setBasket(basket: BasketItem[]): void;
  subscribe: (keys: (keyof AppState)[], callback: SubscriberFunction) => () => void;
  getState: <K extends keyof Omit<AppState, "getState">>(property: K) => AppState[K];
}

export type SubscriberFunction = (state: AppState) => void;

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

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
  githubUrl: string;
  contributions?: string[];
  bioHtml?: string;
}

export interface BasketItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  imageUrl: string;
  quantity: number;
  slug: string;
  sku?: string;
  lineItemId?: string; // Add line item ID for commercetools integration
}
