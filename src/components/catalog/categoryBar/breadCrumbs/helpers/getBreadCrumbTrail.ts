import { CategoryWithChildren } from "../../../../../interfaces/products/categories/categories";

export const getBreadCrumbTrail = (
  categoryMap: { [id: string]: CategoryWithChildren },
  categoryId: string
): CategoryWithChildren[] => {
  const trail: CategoryWithChildren[] = [];
  let current: CategoryWithChildren | undefined = categoryMap[categoryId];

  while (current) {
    trail.unshift(current);
    const parentId: string | undefined = current.parent?.id;
    current = parentId ? categoryMap[parentId] : undefined;
  }

  return trail;
};
