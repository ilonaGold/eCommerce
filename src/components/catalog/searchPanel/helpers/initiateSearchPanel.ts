import { searchHandler } from "./searchHandler";

export const initiateSearchPanel = (
  searchForm: HTMLElement,
  filterFieldsContainer: HTMLElement
): void => {
  const searchInput = searchForm.querySelector<HTMLInputElement>(".search-input");
  const clearButton = searchForm.querySelector<HTMLButtonElement>(".clear-button");
  const filterButton = searchForm.querySelector<HTMLButtonElement>(".filter-button");

  let isFilterOpen = false;

  if (!searchInput) {
    console.error("Search input element not found.");
    return;
  }

  searchInput.addEventListener("input", () => {
    if (clearButton) {
      clearButton.style.display = searchInput.value ? "block" : "none";
    }
  });

  if (clearButton) {
    clearButton.addEventListener("click", () => {
      searchInput.value = "";
      clearButton.style.display = "none";
      searchInput.focus();
    });
  }

  searchForm.addEventListener("submit", searchHandler);

  if (filterButton) {
    filterButton.addEventListener("click", (e) => {
      e.preventDefault();
      isFilterOpen = !isFilterOpen;

      if (isFilterOpen) {
        filterFieldsContainer.classList.add("expanded");
        filterFieldsContainer.style.maxHeight = `calc(${filterFieldsContainer.scrollHeight}px + 3rem + 2px)`;
      } else {
        filterFieldsContainer.classList.remove("expanded");
        filterFieldsContainer.style.maxHeight = "0";
      }
    });
  }
};
