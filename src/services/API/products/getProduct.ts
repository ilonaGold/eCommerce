import { ProductProjection } from "./../../../interfaces/products/ProductProjection";
import { getAccessTokenData } from "../../auth/getAccessTokenData";

export const getProduct = async (id: string): Promise<ProductProjection> => {
  const productUrl = `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/product-projections/${id}`;
  const accessToken = (await getAccessTokenData()).access_token;

  const result = await fetch(productUrl, {
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
