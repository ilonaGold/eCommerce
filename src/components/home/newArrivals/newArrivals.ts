import { createElement } from "../../../utils/dom/createElement";
import { productProjectionSearch } from "../../../services/API/products/productProjectionSearch";
import { productList } from "../../catalog/productsList/productList";
import { queryBuilder } from "../../catalog/searchPanel/helpers/queryBuilder";

export const newArrivals = async (): Promise<HTMLElement> => {
  const container = createElement("section", { class: "home-page__new-items" }, [
    createElement("h2", { class: "home-page__header" }, ["Explore our new items"]),
  ]);
  const field = {
    category: "8b5c1dae-7d50-48ea-921d-9a90dcc387cf",
  };
  const query = queryBuilder(field);
  const newArrivals = await productProjectionSearch(query);
  const newArrivalsList = productList(newArrivals.results);
  container.append(newArrivalsList);
  return container;
};
