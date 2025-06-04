import { setView } from "../../../state/state";
import { getRoot } from "../../../routing/router";
import { productProjectionSearchByText } from "../../../services/API/products/productProjectionSearchByText";
import { PagedSearchResponse } from "../../../interfaces/products/ProductProjection";
import { renderProductDetails } from "../../../views/renderProductDetails/renderProductDetails";
import { renderError } from "../../../views/renderError/renderError";

export async function handleProductDetails(): Promise<void> {
  setView("product-details");
  const root = getRoot();
  const path = location.pathname;
  const arr = path.split("/").filter(Boolean);
  const slug = arr.at(-1);
  let product: PagedSearchResponse;
  if (slug) {
    product = await productProjectionSearchByText(slug);
    if (product.total) {
      renderProductDetails({ parent: root, product: product.results[0] });
    } else {
      renderError(root);
    }
  }
}
