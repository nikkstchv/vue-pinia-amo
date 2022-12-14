export type Template = {
  id: string,
  name: string, 
  requiredSign: boolean,
  prefix: string,
  suffix: string,
  nextNumber: number,
  numberLength: number,
  url: string,
  isActive: boolean,
  documentType: string,
  isDeleted: boolean,
  accessUsers: object,
  signUsers: object,
  requiredSignStatuses: object,
  createdAt: number,
  updatedAt: number,
}

export type NewTemplate = {
  name: string,
  requiredSign: boolean,
  prefix: string,
  suffix: string,
  nextNumber: number,
  numberLength: number,
  url: string,
  isActive: boolean,
  documentType: string,
  isDeleted: boolean,
  accessUsers: object,
  signUsers: object,
  requiredSignStatuses: object,
  createdAt: number,
  updatedAt: number,
}


export class DocTemplateState {
  items: Template[];
  currItem: object;
  currItemCopy: object;
  newItem: NewTemplate;
  editMode: boolean;
  isLoad: boolean;

}