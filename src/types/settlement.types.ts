export type Settlement = {
  id: number,
  corporateEntityId: 0,
  name: "",
  bankName: "",
  correspondentAccount: "",
  bic: "",
  settlementAccount: "",
  isActive: 1,
  isDeleted: 0
}


export type NewSettlement = {
  corporateEntityId: 0,
  name: "",
  bankName: "",
  correspondentAccount: "",
  bic: "",
  settlementAccount: "",
  isActive: 1,
  isDeleted: 0
}

export type CurrItem = {
  id?: number,
  corporateEntityId?: 0,
  name?: "",
  bankName?: "",
  correspondentAccount?: "",
  bic?: "",
  settlementAccount?: "",
  isActive?: 1,
  isDeleted?: 0
}

export class SettlementState {
  items: Settlement[];
  currItemsList: Settlement[];
  currItem: CurrItem;
  currItemCopy: object;
  newItem: NewSettlement;
  isAddMode: boolean;
  isLoad: boolean;
}