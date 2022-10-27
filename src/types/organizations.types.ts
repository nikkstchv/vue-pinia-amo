export type Organization = {
  id: string,
  name: string,
  [key: string]: string,
}

export class OrganizationsState {
  items: Organization[];
  newItem: {};
}  