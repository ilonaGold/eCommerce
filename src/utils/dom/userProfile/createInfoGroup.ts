import { infoGroupProps } from "../../../interfaces/interfaces";
import { createElement } from "../createElement";

export function createInfoGroup({
  headerText,
  contentClass,
  contentText,
}: infoGroupProps): HTMLDivElement {
  const header = createElement("h3", { class: "user-profile__header" }, [`${headerText}`]);
  const content = createElement("p", { class: contentClass }, [`${contentText}`]);
  const infoGroup = createElement("div", { class: "user-profile__info-group" }, [header, content]);
  return infoGroup;
}
