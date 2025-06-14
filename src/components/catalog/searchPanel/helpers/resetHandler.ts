import { setSearchFormData } from "../../../../state/state";

export const resetHandler = (e: Event): void => {
  e.preventDefault();
  location.search = "";
  if (location.pathname.endsWith("?")) {
    const cleanPath = location.pathname.replace(/\?$/, "");
    history.replaceState(null, "", cleanPath);
  }
  setSearchFormData({
    keyword: "",
    sort: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });
};
