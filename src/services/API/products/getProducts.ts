import { Product } from "../../../interfaces/products/Product";
import { getAccessTokenData } from "../../auth/getAccessTokenData";

export const getProducts = async (): Promise<Product[]> => {
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
  console.log(data);

  return data;
};
