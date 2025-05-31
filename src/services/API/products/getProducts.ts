import { ProductsData } from "../../../interfaces/products/Product";
import { getAccessTokenData } from "../../auth/getAccessTokenData";

export const getProducts = async (): Promise<ProductsData> => {
  const productsUrl = `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/products`;

  const accessToken = (await getAccessTokenData()).access_token;

  const result = await fetch(productsUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!result.ok) throw new Error("Network Problem");

  const data = await result.json();

  return data;
};
