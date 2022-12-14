import { defineStore } from "pinia";
import type { DocTypeState } from "@/types/doctype.types";
import * as api from "@/api/docflow";


export const useDocTypeStore = defineStore('doctype', {
  state: (): DocTypeState => ({
    items: [],
    isAddMode: false,
    inputValue: '',
    isLoad: true
  }),

  getters: {
    getCurrentItem(state) {
      return (id: number) => {
        return state.items.find(item => +item.id == id)
      }
    }
  },

  actions: {
    itemAddModeToggle() {
      this.isAddMode = !this.isAddMode;
      this.inputValue = '';
    },
    async loadItems() {
      try {
        this.items = await api.getTypes();
        this.isLoad = false
      } catch (error) {
        console.debug(error)
      }
    },
    async addItem(inputValue: string) {
      try {
        this.itemAddModeToggle();
        await api.addType(inputValue);
        this.items = await api.getTypes();
        this.inputValue = '';
      } catch (error) {
        console.debug(error)
      }
    },
    async updateItem(id: number, name: string) {
      try {
        await api.updateType(id, name);
        await this.loadItems()
      } catch (error) {
        console.debug(error)
      }
    },
    async removeItem(typeId: number) {
      try {
        await api.deleteType(typeId);
        this.items = await api.getTypes();
      } catch (error) {
        console.debug(error)
      }
    },

    async browserConfirm({ name, id, confirmEventName, text, declineText, acceptText }:
      { name: string, id: number, confirmEventName: string, text: string, declineText: string, acceptText: string }) {
      let shouldDelete = confirm(text);
      if (shouldDelete) {
        this.removeItem(id);
      }
    }
  }
})