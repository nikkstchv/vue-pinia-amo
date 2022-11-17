import { defineStore } from "pinia";
import type { SettlementState, Settlement } from "@/types/settlement.types";
import * as api from "@/api/docflow";
import { useHeaderStore } from "./headerStore";

const initItem = () => ({
  corporateEntityId: 0,
  name: "",
  bankName: "",
  correspondentAccount: "",
  bic: "",
  settlementAccount: "",
  isActive: 1,
  isDeleted: 0
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
      return (id: number) => state.items.filter(item => +item.corporateEntityId == id);
    },

    getCurrentItem(state) {
      return (id: number) => state.items.find(item => +item.id == id);
    },

    isItemChanged(state) {
      return JSON.stringify(state.currItemCopy) !== JSON.stringify(state.currItem)
    }
  },

  actions: {
    disableAddMode() {
      this.isAddMode = false;
    },

    itemAddModeToggle() {
      this.isAddMode = !this.isAddMode;
    },

    setCurrItem(id: number) {
      this.currItem = { ...this.getCurrentItem(id) }
    },

    setCurrItemAsNew(id: number) {
      this.currItem = { ...this.newItem }
    },

    setCurrItemsList() {
      const routeId: number = useHeaderStore().currentRouteId;
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
       console.debug(error)
      }
    },
    async addItem(item: object) {
      try {
        await api.addSettlement(item);
        this.items = await api.getSettlements();
        this.itemAddModeToggle();
      } catch (error) {
       console.debug(error)
      }
    },
    async updateItem(id: number, item: Settlement) {
      try {
        await api.updateSettlement(id, item);
        await this.loadItems()
        this.setItemCopy()
      } catch (error) {
       console.debug(error)
      }
    },
    async removeItem(id: number) {
      try {
        await api.deleteSettlement(id);
        this.items = await api.getSettlements();
        this.setCurrItemsList();
      } catch (error) {
       console.debug(error)
      }
    },
  }
})