export interface PagedSearchResponse {
  limit: number;
  offset: number;
  count: number;
  total?: number;
  results: ProductProjection[];
  facets?: Record<string, FacetResult>;
}

export interface ProductProjection {
  id: string;
  key?: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  productType: Reference;
  name: LocalizedString;
  description?: LocalizedString;
  slug: LocalizedString;
  categories: Reference[];
  categoryOrderHints?: Record<string, string>;
  metaTitle?: LocalizedString;
  metaDescription?: LocalizedString;
  metaKeywords?: LocalizedString;
  searchKeywords: SearchKeywords;
  hasStagedChanges: boolean;
  published: boolean;
  masterVariant: ProductVariant;
  variants: ProductVariant[];
  taxCategory?: Reference;
  state?: Reference;
  reviewRatingStatistics?: ReviewRatingStatistics;
}

interface Reference {
  typeId: string;
  id: string;
}

interface LocalizedString {
  [locale: string]: string;
}

interface SearchKeywords {
  [locale: string]: SearchKeyword[];
}

interface SearchKeyword {
  text: string;
  suggestTokenizer?: SuggestTokenizer;
}

interface SuggestTokenizer {
  type: string;
}

interface ProductVariant {
  id: number;
  sku?: string;
  key?: string;
  prices?: Price[];
  attributes?: Attribute[];
  assets?: Asset[];
  images?: Image[];
  availability?: ProductVariantAvailability;
}

export interface Price {
  id: string;
  value: TypedMoney;
  country?: string;
  customerGroup?: Reference;
  channel?: Reference;
  validFrom?: string;
  validUntil?: string;
  discounted?: DiscountedPrice;
  custom?: CustomFields;
}

interface TypedMoney {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

interface DiscountedPrice {
  value: TypedMoney;
  discount: Reference;
}

interface Attribute {
  name: string;
  value: unknown;
}

interface Asset {
  id: string;
  sources: AssetSource[];
  name: LocalizedString;
  description?: LocalizedString;
  tags?: string[];
  custom?: CustomFields;
}

interface AssetSource {
  uri: string;
  key?: string;
  dimensions?: AssetDimensions;
  contentType?: string;
}

interface AssetDimensions {
  w: number;
  h: number;
}

interface Image {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
  label?: string;
}

interface ProductVariantAvailability {
  isOnStock?: boolean;
  availableQuantity?: number;
  channels?: Record<string, ProductVariantChannelAvailability>;
}

interface ProductVariantChannelAvailability {
  isOnStock: boolean;
  availableQuantity: number;
}

interface ReviewRatingStatistics {
  averageRating: number;
  highestRating: number;
  lowestRating: number;
  count: number;
  ratingsDistribution: Record<string, string>;
}

interface CustomFields {
  type: Reference;
  fields: Record<string, unknown>;
}

interface FacetResult {
  type: string;
  dataType: string;
  missing: number;
  total: number;
  other: number;
  terms?: FacetTerm[];
  ranges?: FacetRange[];
}

interface FacetTerm {
  term: string;
  count: number;
}

interface FacetRange {
  from: number;
  fromStr?: string;
  to: number;
  toStr?: string;
  count: number;
}
