import { defineStore } from "pinia";
import type { DocTemplateState, Template, NewTemplate } from "../types/doctemplate.types";
import * as api from "@/api/docflow";
import { useHeaderStore } from "./headerStore";

const initItem = (): NewTemplate => ({
  name: "",
  requiredSign: false,
  prefix: "",
  suffix: "",
  nextNumber: 0,
  numberLength: 0,
  url: "",
  isActive: false,
  documentType: "",
  isDeleted: false,
  accessUsers: {},
  signUsers: {},
  requiredSignStatuses: {},
  createdAt: 0,
  updatedAt: 0,
})


export const useDocTemplateStore = defineStore('doctemplate', {
  state: (): DocTemplateState => ({
    items: [],
    currItem: {},
    currItemCopy: {},
    newItem: initItem(),
    editMode: false,
    isLoad: true
  }),

  getters: {
    getCurrentItem(state) {
      const currId: number = useHeaderStore().currentRouteId;
      if (Number.isNaN(currId)) {
        return () => state.newItem
      }
      return (id: number) => {
        return state.items.find(item => +item.id == id)
      }
    },

    getTypeId(state) {
      return (id: number) => {
        return state.items.find(item => +item.id == id)?.documentType
      }
    },

    getCurrentTitle(state) {
      return (id: number): string | undefined => state.items.find(item => +item.id == id)?.name
    },

    isItemChanged(state): boolean {
      return JSON.stringify(state.currItemCopy) !== JSON.stringify(state.currItem)
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
        this.isLoad = false
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
