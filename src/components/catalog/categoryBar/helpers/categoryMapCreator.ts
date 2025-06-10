import {
  CategoryPagedQueryResponse,
  CategoryWithChildren,
} from "../../../../interfaces/products/categories/categories";
import { PagedSearchResponse } from "../../../../interfaces/products/ProductProjection";

export const categoryMapCreator = (
  productsData: PagedSearchResponse,
  categoriesData: CategoryPagedQueryResponse
): {
  categoryMap: { [id: string]: CategoryWithChildren };
  rootCategories: CategoryWithChildren[];
} => {
  const categoryMap: { [id: string]: CategoryWithChildren } = {};
  const rootCategories: CategoryWithChildren[] = [];

  // first pass
  categoriesData.results.forEach((category): void => {
    categoryMap[category.id] = {
      ...category,
      children: [],
      directCount: 0,
      aggregatedCount: 0,
    };
  });

  // second pass
  categoriesData.results.forEach((category): void => {
    if (category.parent) {
      const parent = categoryMap[category.parent.id];
      if (parent) {
        parent.children.push(categoryMap[category.id]);
      }
    } else {
      rootCategories.push(categoryMap[category.id]);
    }
  });

  // add facet counts
  if (productsData.facets?.["categories.id"]?.terms) {
    productsData.facets["categories.id"].terms.forEach((term): void => {
      if (categoryMap[term.term]) {
        categoryMap[term.term].directCount = term.count;
      }
    });
  }

  // calculate  aggregated counts
  function calculateAggregatedCount(node: CategoryWithChildren): number {
    let total = node.directCount;
    node.children.forEach((child) => {
      total += calculateAggregatedCount(child);
    });
    node.aggregatedCount = total;
    return total;
  }

  // populate aggregated counts
  rootCategories.forEach((rootCategory) => calculateAggregatedCount(rootCategory));

  // sort category helper
  function sortCategories(categories: CategoryWithChildren[]): CategoryWithChildren[] {
    return [...categories].sort((a, b) => {
      return parseFloat(a.orderHint || "0") - parseFloat(b.orderHint || "0");
    });
  }

  rootCategories.forEach((rootCategory) => {
    rootCategory.children = sortCategories(rootCategory.children);
  });

  return {
    categoryMap,
    rootCategories: sortCategories(rootCategories),
  };
};
