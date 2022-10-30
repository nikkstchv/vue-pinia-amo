export type Template = {
  id: string,
  name: string,
  [key: string]: string,
}

export class DocTemplateState {
  items: Template[];
  newItem: {};
}