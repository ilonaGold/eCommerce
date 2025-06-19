import { Customer } from "../dataInterfaces";
import {
  LocalizedString,
  ProductTypeReference,
  Reference,
  TypedMoney,
} from "../products/ProductProjection";

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

export interface CreatedBy {
  clientId?: string;
  externalUserId?: string;
  customer?: CustomerReference;
  anonymousId?: string;
  associate?: CustomerReference;
  attributedTo?: Attribution;
}

export interface LastModifiedBy {
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

export interface AttributeDefinition {
  type: AttributeType;
  name: string;
  label: LocalizedString;
  isRequired: boolean;
  attributeConstraint: AttributeConstraintEnum;
  inputTip?: LocalizedString;
  inputHint: string;
  isSearchable: boolean;
}

interface BasicAttributeType {
  name: string;
}

interface AttributeEnumType extends BasicAttributeType {
  values: AttributePlainEnumValue[];
}

interface AttributeReferenceType extends BasicAttributeType {
  referenceTypeId: string;
}

interface AttributeSetType extends BasicAttributeType {
  elementType: AttributeType;
}

interface AttributeNestedType extends BasicAttributeType {
  typeReference: ProductTypeReference;
}

type AttributeType =
  | BasicAttributeType
  | AttributeEnumType
  | AttributeReferenceType
  | AttributeSetType
  | AttributeNestedType;

type AttributeConstraintEnum = "None" | "Unique" | "CombinationUnique" | "SameForAll";

interface AttributePlainEnumValue {
  key: string;
  label: string | LocalizedString;
}

export interface CustomerReference {
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

export interface CustomFields {
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

export interface CartDiscountReference {
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

export interface DiscountCodeInfo {
  discountCode: DiscountCodeReference;
  state: DiscountCodeState;
}

interface DiscountCodeReference {
  id: string;
  typeId: string;
  obj?: DiscountCode;
}

type DiscountCodeState =
  | "NotActive"
  | "NotValid"
  | "DoesNotMatchCart"
  | "MatchesCart"
  | "MaxApplicationReached"
  | "ApplicationStoppedByPreviousDiscount";

export interface DirectDiscount {
  id: string;
  value: CartDiscountValue;
  target?: CartDiscountTarget;
}

export type DiscountTypeCombination = BestDeal | Stacking;

interface BestDeal {
  type: "BestDeal";
  chosenDiscountType: string;
}

interface Stacking {
  type: "Stacking";
}
