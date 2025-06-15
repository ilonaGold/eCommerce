import { Customer } from "../dataInterfaces";
import { LocalizedString, Reference } from "../products/ProductProjection";

export interface ProductDiscountPagedQueryResponse {
  limit: number;
  offset: number;
  count: number;
  total?: number;
  results: ProductDiscount[];
}

export interface ProductDiscount {
  id: string;
  version: number;
  key?: string;
  name: LocalizedString;
  description?: LocalizedString;
  value: ProductDiscountValue;
  predicate: string;
  sortOrder: string;
  isActive: boolean;
  references: Reference[];
  validFrom?: string;
  validUntil?: string;
  createdAt: string;
  createdBy?: CreatedBy;
  lastModifiedAt: string;
  lastModifiedBy?: LastModifiedBy;
}

type ProductDiscountValue = "relative" | "absolute" | "external";

interface CreatedBy {
  clientId?: string;
  externalUserId?: string;
  customer?: CustomerReference;
  anonymousId?: string;
  associate?: CustomerReference;
  attributedTo?: Attribution;
}

interface LastModifiedBy {
  clientId?: string;
  externalUserId?: string;
  customer?: CustomerReference;
  anonymousId?: string;
  associate?: CustomerReference;
  attributedTo?: Attribution;
}

interface Attribution {
  clientId?: string;
  source: AttributionSource;
}

type AttributionSource = "Import" | "Export";

interface CustomerReference {
  id: string;
  typeId: "customer";
  obj?: Customer;
}
