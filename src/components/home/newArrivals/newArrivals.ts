import { createElement } from "../../../utils/dom/createElement";
import { productProjectionSearch } from "../../../services/API/products/productProjectionSearch";
import { productList } from "../../catalog/productsList/productList";
import { queryBuilder } from "../../catalog/searchPanel/helpers/queryBuilder";

import "./newArrivals.css";
import "../../../components/catalog/productsList/productList.css";

export const newArrivals = async (): Promise<HTMLElement> => {
  const container = createElement("section", { class: "home-page__new-items-section" }, [
    createElement("h2", { class: "home-page__header" }, ["Explore our new items"]),
  ]);

  // Search for new arrivals in a specific category
  const newArrivals = await productProjectionSearch({
    categoryId: "8b5c1dae-7d50-48ea-921d-9a90dcc387cf",
    limit: 8,
    sort: "createdAt desc",
  });

  const newArrivalsList = productList(newArrivals.results);
  container.append(newArrivalsList);
  return container;
};
