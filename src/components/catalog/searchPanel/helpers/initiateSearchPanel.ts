import { getState } from "../../../../state/state";
import { createSearchFormData } from "./createSearchFormData";
import { populateForm } from "./populateForm";
import { resetHandler } from "./resetHandler";
import { searchHandler } from "./searchHandler";

export const initiateSearchPanel = (
  searchForm: HTMLElement,
  filterFieldsContainer: HTMLElement
): void => {
  const searchInput = searchForm.querySelector<HTMLInputElement>(".search-input");
  const clearButton = searchForm.querySelector<HTMLButtonElement>(".clear-button");
  const filterButton = searchForm.querySelector<HTMLButtonElement>(".filter-button");
  const resetButton = searchForm.querySelector<HTMLButtonElement>(".reset-button");

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

  // ===================        Populate form data from state & url search        ===================
  const statedFormData = getState("searchFormData");
  const filteredFormData = Object.fromEntries(
    Object.entries(statedFormData).filter(([, value]) => value !== "")
  );
  const formDataFromURL = createSearchFormData(location.search);
  Object.assign(formDataFromURL, filteredFormData); // Make stated form data override data from URL

  console.log({ statedFormData, formDataFromURL });

  populateForm(searchForm, formDataFromURL);
  // ===================        Populate form data from state & url search        ===================

  searchForm.addEventListener("submit", searchHandler, { once: true });

  resetButton?.addEventListener("click", resetHandler);
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
