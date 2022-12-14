export type Template = {
  id: string,
  name: string, 
  [key: string]: string,
}

export class DocTemplateState {
  items: Template[];
  currItem: object;
  currItemCopy: object;
  newItem: object;
  editMode: boolean;
  isLoad: boolean;

}