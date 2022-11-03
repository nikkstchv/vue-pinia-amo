import { defineStore } from "pinia";
import type { DocTemplateState, Template } from "../types/doctemplate.types";
import * as api from "@/api/docflow";

const initItem = () => ({
  name: "",
  required_sign: false,
  prefix: "",
  suffix: "",
  next_number: 0,
  number_length: 0,
  url: "",
  is_active: false,
  document_type: 0, // doctype id
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