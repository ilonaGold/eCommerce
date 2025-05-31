import { getState } from "../../state/state";
import { createElement } from "../../utils/dom/createElement";
import { createHeader } from "../../components/header/header";
import { mainComponent } from "../../components/main/main";
import { createFooter } from "../../components/footer/footer";
import { ProductList } from "../../components/products/productList";
import { getProducts } from "../../services/API/products/getProducts";
import { Product } from "../../interfaces/products/Product";

import "./renderMain.css";

export async function renderMain(parent: HTMLElement): Promise<void> {
  const isAuth = getState("userAuth");
  const customer = getState("customer");

  // Fetch products
  // const products = await getProducts();

  // Create product list
  // const productList = new ProductList(products);

  // Create product list with dummy data for now
  const dummyProducts: Product[] = [
    {
      id: "1",
      version: 1,
      createdAt: "2025-05-31T10:00:00.000Z",
      lastModifiedAt: "2025-05-31T10:00:00.000Z",
      productType: {
        id: "1",
        typeId: "product-type",
      },
      taxCategory: {
        id: "1",
        typeId: "tax-category",
      },
      masterData: {
        current: {
          name: { "en-US": "Test Product" },
          slug: { "en-US": "test-product" },
          description: { "en-US": "Test Description" },
          categories: [],
          masterVariant: {
            prices: [{ value: { centAmount: 1999, currencyCode: "USD" } }],
            images: [
              {
                url: "../../assets/images/red-panda.png",
                dimensions: {
                  w: 500,
                  h: 500,
                },
              },
            ],
          },
          variants: [],
          searchKeywords: {},
        },
        staged: {
          name: { "en-US": "Test Product" },
          slug: { "en-US": "test-product" },
          description: { "en-US": "Test Description" },
          categories: [],
          masterVariant: {
            prices: [{ value: { centAmount: 1999, currencyCode: "USD" } }],
            images: [
              {
                url: "../../assets/images/red-panda.png",
                dimensions: {
                  w: 500,
                  h: 500,
                },
              },
            ],
          },
          variants: [],
          searchKeywords: {},
        },
        hasStagedChanges: false,
        published: true,
      },
    },
  ];

  const productList = new ProductList(dummyProducts);

  const viewContainer = createElement("div", { class: "view-container" }, [
    createHeader(isAuth, customer),
    mainComponent(isAuth, productList.render()),
    createFooter(),
  ]);

  parent.append(viewContainer);
}
