import { createElement } from "../../../utils/dom/createElement";
import { createFilterFields } from "./filterFields/filterFields";
import { initiateSearchPanel } from "./helpers/initiateSearchPanel";
import "./searchPanel.css";

export const searchPanel = (): HTMLDivElement => {
  const searchInput = createElement("input", {
    class: "search-input",
    type: "text",
    placeholder: "Search...",
    name: "keyword",
  });

  const clearButton = createElement(
    "button",
    {
      type: "button",
      class: "clear-button",
    },
    ["×"],
    { styles: { display: "none", color: "red" } }
  );

  const searchInputContainer = createElement("div", { class: "search-input-container" }, [
    searchInput,
    clearButton,
  ]);

  const filterButton = createElement(
    "button",
    {
      class: "filter-button",
      type: "button",
      "aria-expanded": "false",
    },
    ["⚙️ Detailed Filter"]
  );

  const searchButton = createElement(
    "button",
    {
      type: "submit",
      class: "search-button",
    },
    ["🔍 Search"]
  );

  const resetButton = createElement(
    "button",
    {
      type: "reset",
      class: "search-button",
    },
    ["↺ Reset"]
  );

  const formSimpleView = createElement("div", { class: "form-simple-view" }, [
    searchInputContainer,
    filterButton,
    searchButton,
    resetButton,
  ]);
  const filterFieldsContainer = createFilterFields();

  const searchForm = createElement(
    "form",
    {
      class: "search-form",
    },
    [formSimpleView, filterFieldsContainer]
  );

  const searchPanelContainer = createElement("div", { class: "search-panel" }, [searchForm]);

  initiateSearchPanel(searchForm, filterFieldsContainer);

  return searchPanelContainer;
};
