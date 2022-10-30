import { defineStore } from "pinia";
import type { DocTemplateState, Template} from "../types/doctemplate.types";
import * as api from "@/api/docflow";

const initItem = () => ({
  name: "",
  requiredSign: false,
  prefix: "",
  suffix: "",
  nextNumber: 0,
  doc_number: "",
  doc_date: "",
  numberLength: 0,
  url: "",
  isActive: false,
  isDeleted: false,
  accessUsers: {},
  signUsers: false,
  documentType: 0,// указать отношения
  requiredSignStatuses: {},
  createdAt: 0,
  updatedAt: 0,
})


export const useDocTemplateStore = defineStore('doctemplate', {
  state: (): DocTemplateState => ({
    items: [],
    newItem: initItem(),
  }),
  getters: {
    getCurrentItem(state) {
      return (id: number) => state.items.find(item => +item.id == id);
    },
    getCurrentTitle(state) {
      return (id: number) => state.items.find(item => +item.id == id)?.name
    }
  },
  actions: {
    async loadItems() {
      try {
        this.items = (await api.getTemplates());
      } catch (error) {
        return error
      }
    },

    async addItem() {
      try {
        await api.addTemplate(this.newItem);
        this.newItem = initItem();
      } catch (error) {
        return error
      }
    },

    async saveItem(id: number, currItem: Template) {
      try {
        await api.updateTemplate(id, currItem);
      } catch (error) {
        return error
      }
    },

    async removeItem(id: number) {
      try {
        await api.deleteTemplate(id);
        await this.loadItems()
      } catch (error) {
        return error
      }
    }
  }
})


////// ДЕЛАЕМ СОХРАНЕНИЕ ШАБЛОНОВ