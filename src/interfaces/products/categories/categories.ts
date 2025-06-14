export interface CategoryPagedQueryResponse {
  limit: number;
  offset: number;
  count: number;
  total?: number;
  results: Category[];
}

export interface Category {
  id: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  key?: string;
  name: LocalizedString;
  slug: LocalizedString;
  description?: LocalizedString;
  ancestors: Reference[];
  parent?: Reference;
  orderHint: string;
  externalId?: string;
  metaTitle?: LocalizedString;
  metaDescription?: LocalizedString;
  metaKeywords?: LocalizedString;
  custom?: CustomFields;
  assets?: Asset[];
}

export interface CategoryWithChildren extends Category {
  children: CategoryWithChildren[];
  directCount: number;
  aggregatedCount: number;
}

interface LocalizedString {
  [locale: string]: string;
}

interface Reference {
  typeId: string;
  id: string;
  key?: string;
  obj?: Category;
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
  contentType?: string;
  dimensions?: {
    w: number;
    h: number;
  };
}

interface CustomFields {
  type: Reference;
  fields: {
    [fieldName: string]: unknown;
  };
}
