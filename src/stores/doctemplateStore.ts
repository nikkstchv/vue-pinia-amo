import { defineStore } from "pinia";
import type { DocTemplateState, Template } from "../types/doctemplate.types";
import * as api from "@/api/docflow";
import { useHeaderStore } from "./headerStore";

const initItem = () => ({
  name: "",
  required_sign: false,
  prefix: "",
  suffix: "",
  next_number: 0,
  number_length: 0,
  url: "",
  is_active: false,
  document_type: "",
  is_deleted: false,
  access_users: {},
  sign_users: {},
  required_sign_statuses: {},
  created_at: 0,
  updated_at: 0,
})


export const useDocTemplateStore = defineStore('doctemplate', {
  state: (): DocTemplateState => ({
    items: [],
    currItem: {},
    currItemCopy: {},
    newItem: initItem(),
    editMode: false
  }),

  getters: {
    getCurrentItem(state) {
      const currId: number = useHeaderStore().currentRouteId;
      if (Number.isNaN(currId)) {
        return () => state.newItem
      }
      return (id: number) => state.items.find(item => +item.id == id);
    },

    getCurrentTitle(state) {
      return (id: number) => state.items.find(item => +item.id == id)?.name
    },

    isItemChanged(state) {
      return JSON.stringify(state.currItemCopy) === JSON.stringify(state.currItem)
    }
  },

  actions: {
    setEditMode() {
      const currId: number = useHeaderStore().currentRouteId
      if (Number.isNaN(currId)) {
        this.editMode = false;
      } else {
        this.editMode = true;
      }
    },

    cancelItemChanges() {
      this.currItem = { ...this.currItemCopy }
    },

    setCurrItem() {
      const currId: number = useHeaderStore().currentRouteId;
      this.currItem = { ...this.getCurrentItem(currId) }
    },

    setItemCopy() {
      this.currItemCopy = { ...this.currItem }
    },

    async loadItems() {
      try {
        this.items = (await api.getTemplates());
      } catch (error) {
       console.debug(error)
      }
    },

    async addItem() {
      try {
        await api.addTemplate({ ...this.currItem });
        this.newItem = initItem();
      } catch (error) {
       console.debug(error)
      }
    },

    async saveItem(id: number, currItem: Template) {
      try {
        await api.updateTemplate(id, currItem);
        await this.loadItems()
        this.setItemCopy()
      } catch (error) {
       console.debug(error)
      }
    },

    async removeItem(id: number) {
      try {
        await api.deleteTemplate(id);
        await this.loadItems()
      } catch (error) {
       console.debug(error)
      }
    }
  }
})
