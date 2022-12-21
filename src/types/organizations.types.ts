import type { Settlement } from "@/types/settlement.types";


export type Organization = {
  id: number,
  name: string,
  inn: string,
  kpp: string,
  ogrn: string,
  signatoryPosition: string,
  signatoryName: string,
  signatoryShortName: string,
  accountantFio: string,
  basedOn: string,
  signatoryFio: string,
  powerOfAttorney: string,
  powerOfAttorneyDate: string,
  legalAddress: string,
  postalAddress: string,
  otherAddress: string,
  certificateNumber: string,
  certificateDate: string,
  phoneNumber: string,
  email: string,
  web: string,
  useNds: string,
  urlSign: string,
  urlStamp: string,
  isActive: string,
  isDeleted: string,
  createdAt: string
}

export type NewOrganization = {
  name: string,
  inn: string,
  kpp: string,
  ogrn: string,
  signatoryPosition: string,
  signatoryName: string,
  signatoryShortName: string,
  accountantFio: string,
  basedOn: string,
  signatoryFio: string,
  powerOfAttorney: string,
  powerOfAttorneyDate: string,
  legalAddress: string,
  postalAddress: string,
  otherAddress: string,
  certificateNumber: string,
  certificateDate: string,
  phoneNumber: string,
  email: string,
  web: string,
  useNds: string,
  urlSign: string,
  urlStamp: string,
  isActive: string,
  isDeleted: string,
  createdAt: string
}

export type MappedOrg = {
  value: number,
  title: string
}

export type CurrItem = {
  id?: number,
  name?: string,
  inn?: string,
  kpp?: string,
  ogrn?: string,
  signatoryPosition?: string,
  signatoryName?: string,
  signatoryShortName?: string,
  accountantFio?: string,
  basedOn?: string,
  signatoryFio?: string,
  powerOfAttorney?: string,
  powerOfAttorneyDate?: string,
  legalAddress?: string,
  postalAddress?: string,
  otherAddress?: string,
  certificateNumber?: string,
  certificateDate?: string,
  phoneNumber?: string,
  email?: string,
  web?: string,
  useNds?: string,
  urlSign?: string,
  urlStamp?: string,
  isActive?: string,
  isDeleted?: string,
  createdAt?: string
}

export class OrganizationsState {
  items: Organization[];
  mappedOrgs: MappedOrg[];
  currItem: CurrItem;
  currItemCopy: object;
  newItem: NewOrganization;
  editMode: boolean;
  settlementsList: Settlement[];
  isLoad: boolean;
  isCurrentLoad: boolean;
}  