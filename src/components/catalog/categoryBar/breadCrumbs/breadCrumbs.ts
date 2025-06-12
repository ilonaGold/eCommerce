import { createElement } from "../../../../utils/dom/createElement";

export const breadCrumbs = (): HTMLElement => {
  return createElement("div", {}, ["Home > Products"]);
};
