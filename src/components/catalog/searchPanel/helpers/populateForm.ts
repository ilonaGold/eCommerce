import { SearchFormData } from "../../../../interfaces/products/search/searchQuery";

export const populateForm = (searchForm: HTMLElement, statedFormData: SearchFormData): void => {
  Object.entries(statedFormData).forEach(([key, value]) => {
    const input = searchForm.querySelector(`[name="${key}"]`) as
      | HTMLInputElement
      | HTMLSelectElement
      | null;

    if (input) {
      input.value = value;
    }
  });
};
