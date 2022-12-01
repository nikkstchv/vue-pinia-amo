export type Type = {
  id: string,
  name: string,
  [key: string]: string,
}

export class DocTypeState {
  items: Type[];
  isAddMode: boolean;
  inputValue: string;
}