export type Settlement = {
  id: string,
  name: string,
  [key: string]: string,
}

export class SettlementState {
  items: [];
  isAddMode: boolean;
  inputValue: string;
}