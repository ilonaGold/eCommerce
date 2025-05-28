export interface Product {
  id: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  productType: {
    id: string;
    typeId: "product-type";
  };
  taxCategory: {
    id: string;
    typeId: "tax-category";
  };
  masterData: {
    current: ProductDataView;
    staged: ProductDataView;
    hasStagedChanges: boolean;
    published: boolean;
  };
}

interface ProductDataView {
  name: LocalizedString;
  slug: LocalizedString;
  description?: LocalizedString;
  categories: Reference[];
  masterVariant: ProductVariant;
  variants: ProductVariant[];
  searchKeywords: Record<string, unknown>;
}

interface ProductVariant {
  id?: number;
  sku?: string;
  prices?: Price[];
  images?: Image[];
  attributes?: Attribute[];
}

interface Price {
  id?: string;
  value: {
    type?: "centPrecision";
    currencyCode: string;
    centAmount: number;
    fractionDigits?: number;
  };
}

interface Image {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
  label?: string;
}

interface Attribute {
  name: string;
  value: AttributeValue;
}

interface LocalizedString {
  [locale: string]: string;
}

interface Reference {
  id: string;
  typeId: string;
}

interface Money {
  type: "centPrecision";
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

type AttributeValue =
  | string
  | number
  | boolean
  | LocalizedString
  | Reference
  | Money
  | Array<string | number>
  | { [key: string]: unknown };
