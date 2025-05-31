import { createElement } from "../../utils/dom/createElement";
import "./main.css";

export const mainComponent = (content: HTMLElement): HTMLElement => {
  // Create the content container

  // Create main section with proper structure
  return createElement("main", { class: "main" }, [content]);
};
