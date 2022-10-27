import { defineStore } from "pinia";
import type { DocTemplateState } from "../types/doctemplate.types";
import * as api from "@/api/docflow";

const initItem = () => ({
  name: "",
  required_sign: "",
  prefix: "",
  suffix: "",
  next_number: "",
  doc_number: "",
  doc_date: "",
  
})


export const useDocTemplateStore = defineStore('doctemplate', {
  state: (): DocTemplateState => ({
    items: [],
    newItem: initItem(),
  }),
  getters: {
    // 
  },
  actions: {
    async loadItems() {
      try {
        this.items = (await api.getTemplates());
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