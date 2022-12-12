export type Organization = {
  [key: string]: string,
}

export type SettlementList = {
  [key: string]: string,
}

export type mappedOrgs = {
  [key: string]: string,
}

export class OrganizationsState {
  items: Organization[];
  mappedOrgs: mappedOrgs[];
  currItem: Organization;
  currItemCopy: object;
  newItem: object;
  editMode: boolean;
  settlementsList: SettlementList[]
}  