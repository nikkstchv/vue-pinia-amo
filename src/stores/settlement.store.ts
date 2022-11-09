import { defineStore } from "pinia";
import type { SettlementState, Settlement } from "@/types/settlement.types";
import * as api from "@/api/docflow";

const initItem = () => ({
  corporate_entity_id: 0,
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
    isAddMode: false,
    inputValue: ''
  }),

  actions: {
    itemAddModeToggle() {
      this.isAddMode = !this.isAddMode;
      this.inputValue = '';
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
        this.inputValue = '';
      } catch (error) {
        return error
      }
    },
    async updateItem(id: number, item: Settlement) {
      try {
        await api.updateSettlement(id, item);
        await this.loadItems()
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