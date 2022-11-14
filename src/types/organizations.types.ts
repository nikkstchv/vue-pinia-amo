export type Organization = {
  [key: string]: string,
}

export type SettlementList = {
  [key: string]: string,
}

export class OrganizationsState {
  items: Organization[];
  currSettlementAccountlist: SettlementList[];
  currItem: Organization;
  currItemCopy: {};
  newItem: {};
  editMode: boolean;
}  