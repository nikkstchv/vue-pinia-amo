export type Settlement = {
  [key: string]: string,
}

export class SettlementState {
  items: Settlement[];
  currItemsList: Settlement[];
  currItem: Settlement;
  currItemCopy: object;
  newItem: object;
  isAddMode: boolean;
}