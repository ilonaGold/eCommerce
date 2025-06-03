import { createElement } from "../../utils/dom/createElement";

export const dummyLoading = (): HTMLElement =>
  createElement("div", {}, ["Loading..."], {
    styles: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      color: "white",
      fontWeight: "bold",
    },
  });
