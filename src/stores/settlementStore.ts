import { defineStore } from "pinia";
import type { SettlementState, Settlement, CurrItem, NewSettlement } from "@/types/settlement.types";
import * as api from "@/api/docflow";
import { useOrganizationsStore } from "./organizationsStore";

const initItem = (): NewSettlement => ({
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
    isLoad: true
  }),

  getters: {
    getCurrItems(state) {
      return (id: number) => state.items.filter(item => +item.corporateEntityId == id);
    },

    getCurrentItem(state) {
      return (id: number) => state.items.find(item => +item.id == id);
    },

    isItemChanged(state) {
      // return JSON.stringify(state.currItemCopy) !== JSON.stringify(state.currItem)
      return (id: number) => {
        const currItemCopy = this.getCurrentItem(id);
        // console.log('%csettlementStore.ts line:41 currItemCopy', 'color: #007acc;', currItemCopy);
        return JSON.stringify(currItemCopy) !== JSON.stringify(this.getCurrentItem(id));
      }
      // переписать так чтоб item и itemCopy вычислялось динамически
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

    setCurrItemAsNew() {
      this.currItem = { ...this.newItem }
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
        this.isLoad = false
      } catch (error) {
        console.debug(error)
      }
    },
    async addItem(item: NewSettlement) {
      try {
        await api.addSettlement(item);
        this.items = await api.getSettlements();
        this.itemAddModeToggle();
        useOrganizationsStore().setSettlementsList()
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
        // await this.loadItems()
        this.items = await api.getSettlements()
      } catch (error) {
        console.debug(error)
      }
    },
    async browserConfirm({ id, text }:
      { id: number, text: string }) {
      let shouldDelete = confirm(text);
      if (shouldDelete) {
        this.removeItem(id);
      }
    }
  }
})