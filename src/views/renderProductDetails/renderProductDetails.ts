import { ProductDetailsProps } from "../../interfaces/interfaces";

export function renderProductDetails({ parent, product }: ProductDetailsProps): void {
  console.log(`Dummy page appends to ${parent}`);
  console.log(product?.results);
}
