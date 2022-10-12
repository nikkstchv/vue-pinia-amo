import { defineStore } from "pinia";
import type { DocTemplateState } from "../types/doctemplate.types";
import * as api from "@/api/docflow";


export const useDocTemplateStore = defineStore('doctemplate', {
  state: (): DocTemplateState => ({
    items: [],
  }),
  getters: {
    // 
  },
  actions: {
    async loadItems() {
      this.items = (await api.getTemplates());
    },
  }
})