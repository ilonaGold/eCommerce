import { getState } from "../../state/state";

export function renderProductDetails(parent: HTMLElement): void {
  console.log(`Dummy page appends to ${parent}`);
  console.log(getState("productId"));
}
