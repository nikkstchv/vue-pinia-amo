import { defineStore } from "pinia";
import type { SettlementState, Settlement } from "@/types/settlement.types";
import * as api from "@/api/docflow";

const initItem = () => ({
  corporate_entity_id: 0, // organization id
  name: "",
  bank_name: "",
  correspondent_account: "",
  bic: "",
  settlement_account: "",
  is_active: 1,
  is_deleted: 0
})


export const useSettlementStore = defineStore('settlement', {
  state: (): SettlementState => ({
    items: [],
    currItemsList: [],
    currItem: {},
    currItemCopy: {},
    newItem: initItem(),
    isAddMode: false,

  }),

  getters: {
    getCurrItems(state) {
      return (id: number) => state.items.filter(item => +item.corporate_entity_id == id);
    },

    getCurrentItem(state) {
      return (id: number) => state.items.find(item => +item.id == id);
    },

    isItemChanged(state) {
      return JSON.stringify(state.currItemCopy) !== JSON.stringify(state.currItem)
    }
  },

  actions: {
    itemAddModeToggle() {
      this.isAddMode = !this.isAddMode;
    },

    setCurrItem(id: number) {
      this.currItem = { ...this.getCurrentItem(id) }
    },

    setCurrItemsList(id: number) {
      // console.log(id);
      this.currItemsList = [...this.getCurrItems(id)]
      // console.log(this.getCurrItems(id));
    },

    setItemCopy() {
      this.currItemCopy = { ...this.currItem }      
    },

    cancelItemChanges() {
      this.currItem = { ...this.currItemCopy }
    },

    async loadItems() {
      try {
        this.items = await api.getSettlements();
      } catch (error) {
        return error
      }
    },
    async addItem(inputValue: object) {
      try {
        this.itemAddModeToggle();
        await api.addSettlement(inputValue);
        this.items = await api.getSettlements();
      } catch (error) {
        return error
      }
    },
    async updateItem(id: number, item: Settlement) {
      try {
        await api.updateSettlement(id, item);
        await this.loadItems()
        this.setItemCopy()
      } catch (error) {
        return error
      }
    },
    async removeItem(typeId: number) {
      try {
        await api.deleteSettlement(typeId);
        this.items = await api.getSettlements();
      } catch (error) {
        return error
      }
    },
  }
})