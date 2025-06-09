import { productProjectionSearch } from "../../../../services/API/products/productProjectionSearch";
import { setProductsData } from "../../../../state/state";
import { queryBuilder } from "./queryBuilder";

export const searchHandler = async (e: Event): Promise<void> => {
  e.preventDefault();
  const form = e.target as HTMLFormElement | null;
  if (!form) throw new Error("Form element doesnt exist");
  const formData = new FormData(form);
  const fields = Object.fromEntries(formData.entries().filter(([, value]) => Boolean(value))) as {
    [key: string]: string;
  };
  const query = queryBuilder(fields);

  const products = await productProjectionSearch(query);
  setProductsData(products);
};
