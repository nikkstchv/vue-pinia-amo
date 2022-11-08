export type Organization = {
  [key: string]: string,
}

export class OrganizationsState {
  items: Organization[];
  currItem: Organization;
  currItemCopy: {};
  newItem: {};
  editMode: boolean;
}  