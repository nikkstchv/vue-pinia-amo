export type Type = {
  id: string,
  name: string,
}

export class DocTypeState {
  items: Type[];
  isAddMode: boolean;
  inputValue: string;
  isLoad: boolean;

}