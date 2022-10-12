import { defineStore } from "pinia";
import type { DocTypeState } from "@/types/doctype.types";
import * as api from "@/api/docflow";


export const useDocTypeStore = defineStore('doctype', {
  state: (): DocTypeState => ({
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
        this.items = await api.getTypes();
      } catch (error) {
        return error
      }
    },
    async addItem() {
      try {
        await api.addType(this.inputValue);
        this.items = await api.getTypes();
        this.itemAddModeToggle();
        this.inputValue = '';
      } catch (error) {
        return error
      }
    },
    async updateItem(typeId: number, typeName: string) {
      try {
        await api.updateType(typeId, typeName);
      } catch (error) {
        return error
      }
    },
    async removeType(typeId: number) {
      try {
        await api.deleteType(typeId);
        this.items = await api.getTypes();
      } catch (error) {
        return error
      }
    },
  }
})