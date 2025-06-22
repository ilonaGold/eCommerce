import { getState, setProductsData, subscribe } from "../../state/state";
import { createElement } from "../../utils/dom/createElement";
import { createHeader } from "../../components/header/header";
import { mainComponent } from "../../components/main/main";
import { createFooter } from "../../components/footer/footer";
import {
  catalogComponent,
  catalogComponentLoading,
} from "../../components/catalog/catalogComponent";

import {
  productProjectionSearch,
  ProductSearchParams,
} from "../../services/API/products/productProjectionSearch";
import { loadingAnimation } from "../../components/loadingAnimation/loadingAnimation";

import { readFiltersFromUrl } from "./helpers/readFiltersFromUrl";
import "./renderProducts.css";

let unsubscribeProducts: () => void = () => {};

export async function renderProducts(parent: HTMLElement): Promise<void> {
  if (unsubscribeProducts) unsubscribeProducts();
  const isAuth = getState("userAuth");
  const customer = getState("customer");

  const header = createHeader(isAuth, customer);
  const main = mainComponent(loadingAnimation());
  const footer = createFooter();

  const viewContainer = createElement("div", { class: "view-container" }, [header, main, footer]);

  parent.append(viewContainer);

  // Handle pagination from URL
  const urlParams = new URLSearchParams(location.search);
  const currentPage = parseInt(urlParams.get("page") || "1");
  // Prepare search parameters
  const searchParams: ProductSearchParams = {
    page: currentPage,
    limit: 12, // Better for responsive design (4x3 grid)
    sort: "createdAt desc",
  };
  // Handle existing filters and search
  if (location.search) {
    const filters = readFiltersFromUrl();
    if (filters.query) {
      searchParams.query = filters.query;
    }
    if (filters.categoryId) {
      searchParams.categoryId = filters.categoryId;
    }
    // Add facets for category sidebar
    searchParams.facet = ["categories.id"];
  } else {
    // Default view with category facets
    searchParams.facet = ["categories.id"];
  }

  // Page change handler
  const handlePageChange = async (newPage: number): Promise<void> => {
    // Show loading state
    const loadingCatalog = catalogComponentLoading();
    main.replaceChildren(loadingCatalog);

    // Update URL with new page
    const newUrl = new URL(location.href);
    newUrl.searchParams.set("page", newPage.toString());
    history.pushState({}, "", newUrl.toString());

    // Fetch new data
    const newSearchParams = { ...searchParams, page: newPage };
    const newProductsData = await productProjectionSearch(newSearchParams);

    // Update state and render
    setProductsData(newProductsData);
    const newCatalog = await catalogComponent(newProductsData, handlePageChange);
    main.replaceChildren(newCatalog);
  };

  // Fetching & Appending
  let productsData;
  try {
    productsData = await productProjectionSearch(searchParams);
  } catch (error) {
    console.error("Error fetching products:", error);
    // Fallback to basic search
    productsData = await productProjectionSearch({ limit: 12 });
  }

  setProductsData(productsData);
  let productsCatalog = await catalogComponent(productsData, handlePageChange);
  main.replaceChildren(productsCatalog);

  unsubscribeProducts = subscribe(["productsData"], async (state) => {
    const newCatalog = await catalogComponent(state.productsData, handlePageChange);
    productsCatalog.replaceWith(newCatalog);
    productsCatalog = newCatalog;
  });
}
