import { searchPanel } from "./searchPanel/searchPanel";
import { PagedSearchResponse } from "../../interfaces/products/ProductProjection";
import { createElement } from "../../utils/dom/createElement";
import { productList } from "./productsList/productList";
import { Pagination } from "./pagination/pagination";
import { createProductListSkeleton } from "./productsList/productListSkeleton";

import { getCategories } from "../../services/API/products/getCategories";
import { categorySidebar } from "./categoryBar/categoryBar";

import "./catalogComponent.css";

export const catalogComponent = async (
  productsData: PagedSearchResponse,
  onPageChange?: (page: number) => void
): Promise<HTMLElement> => {
  const searchPanelComponent = searchPanel();
  const products = productList(productsData.results);

  const categories = await getCategories();
  const categoryBar = categorySidebar(productsData, categories);

  // Calculate pagination data
  const currentPage = Math.floor((productsData.offset || 0) / (productsData.limit || 16)) + 1;
  const totalPages = Math.ceil((productsData.total || 0) / (productsData.limit || 16));

  // Create pagination component
  const paginationComponent = new Pagination({
    currentPage,
    totalPages,
    totalItems: productsData.total || 0,
    itemsPerPage: productsData.limit || 16,
    onPageChange: onPageChange || (() => {}),
  }).render();

  const catalog = createElement("section", { class: "catalog-section" }, [
    createElement("div", { class: "center catalog-center" }, [
      searchPanelComponent,
      categoryBar,
      products,
      paginationComponent,
    ]),
  ]);

  return catalog;
};

export const catalogComponentLoading = (): HTMLElement => {
  const searchPanelComponent = searchPanel();
  const skeletonProducts = createProductListSkeleton(12); // 12 products for better responsive design

  const catalog = createElement("section", { class: "catalog-section" }, [
    createElement("div", { class: "center catalog-center" }, [
      searchPanelComponent,
      createElement("div", { class: "category-loading" }, ["Loading categories..."]),
      skeletonProducts,
    ]),
  ]);

  return catalog;
};
