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

    setCurrItemAsNew(id: number) {
      this.currItem = { ...this.newItem }
    },

    setCurrItemsList(routeId: number) {
      this.currItemsList = [...this.getCurrItems(routeId)]
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
    async addItem(item: object) {
      try {
        await api.addSettlement(item);
        this.items = await api.getSettlements();
        this.itemAddModeToggle();
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
    async removeItem(id: number) {
      try {
        await api.deleteSettlement(id);
        this.items = await api.getSettlements();
      } catch (error) {
        return error
      }
    },
  }
})