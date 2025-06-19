import { Customer } from "../dataInterfaces";
import { LocalizedString, Reference, TypedMoney } from "../products/ProductProjection";

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

export interface DiscountCodePagedQueryResponse {
  limit: number;
  offset: number;
  count: number;
  total?: number;
  results: DiscountCode[];
}

export interface DiscountCode {
  id: string;
  version: number;
  key?: string;
  name?: LocalizedString;
  description?: LocalizedString;
  code: string;
  cartDiscounts: CartDiscountReference[];
  cartPredicate?: string;
  isActive: boolean;
  references: Reference[];
  maxApplications?: number;
  maxApplicationsPerCustomer?: number;
  groups: string[];
  validFrom?: string;
  validUntil?: string;
  applicationVersion?: number;
  custom?: CustomFields;
  createdAt: string;
  createdBy?: CreatedBy;
  lastModifiedAt: string;
  lastModifiedBy?: LastModifiedBy;
}

interface CustomFields {
  type: TypeReference;
  fields: FieldContainer;
}

interface TypeReference {
  id: string;
  typeId: string;
  obj?: Type;
}

interface Type {
  id: string;
  version: number;
  key: string;
  name: LocalizedString;
  description?: LocalizedString;
  resourceTypeIds: string[];
  fieldDefinitions: FieldDefinition[];
  createdAt: string;
  createdBy?: CreatedBy;
  lastModifiedAt: string;
  lastModifiedBy?: LastModifiedBy;
}

interface FieldDefinition {
  type: FieldType;
  name: string;
  label: LocalizedString;
  required: boolean;
  inputHint?: TypeTextInputHint;
}

type TypeTextInputHint = "SingleLine" | "MultiLine";

interface BasicFieldType {
  name: string;
}

interface EnumFieldType extends BasicFieldType {
  values: CustomFieldEnumValue[];
}

interface CustomFieldEnumValue {
  key: string;
  label: string | LocalizedString;
}

interface FieldReferenceType extends BasicFieldType {
  referenceTypeId: string;
}

interface FieldSetType extends BasicFieldType {
  elementType: FieldType;
}

type FieldType = BasicFieldType | EnumFieldType | FieldReferenceType | FieldSetType;

interface FieldContainer {
  [key: string]: FieldType;
}

interface CartDiscountReference {
  id: string;
  typeId: string;
  obj?: CartDiscount;
}

interface CartDiscount {
  id: string;
  version: number;
  key?: string;
  name: LocalizedString;
  description?: LocalizedString;
  value: CartDiscountValue;
  cartPredicate: string;
  target?: CartDiscountTarget;
  sortOrder: string;
  stores: StoreKeyReference[];
  isActive: boolean;
  validFrom?: string;
  validUntil?: string;
  requiresDiscountCode: boolean;
  references: Reference[];
  stackingMode: StackingMode;
  custom?: CustomFields;
  createdAt: string;
  createdBy?: CreatedBy;
  lastModifiedAt: string;
  lastModifiedBy?: LastModifiedBy;
}

type StackingMode = "Stacking" | "StopAfterThisDiscount";

interface StoreKeyReference {
  key: string;
  typeId: string;
}

interface CartDiscountTarget {
  type: string;
  predicate?: string;
}

interface CartDiscountValue {
  type: string;
  permyriad?: number;
  money?: TypedMoney;
  applicationMode?: string;
}
