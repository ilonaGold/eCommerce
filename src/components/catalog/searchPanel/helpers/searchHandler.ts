import { productProjectionSearch } from "../../../../services/API/products/productProjectionSearch";
import { setProducts } from "../../../../state/state";

export const searchHandler = async (e: Event): Promise<void> => {
  e.preventDefault();
  const form = e.target as HTMLFormElement | null;
  if (!form) throw new Error("Form elemend doesnt exist");
  const formData = new FormData(form);
  const fields = Object.fromEntries(
    formData.entries().filter(([, /* key */ value]) => Boolean(value))
  ) as {
    [key: string]: string;
  };
  const products = await productProjectionSearch(fields);
  setProducts(products.results);
};
