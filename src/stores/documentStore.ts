import { defineStore } from "pinia";
import type { DocumentState } from "../types/document.types";
import { useSettlementStore } from "./settlementStore";
import { useDocTemplateStore } from "./doctemplateStore";
import { useOrganizationsStore } from "./organizationsStore";
import * as api from "@/api/docflow";

const initItem = () => ({
  amoEntityType: 0,
  amoEntityId: 0, 
  url: '',
  number: '',
  templateId: 0,
  organizationId: 0,
  settlementAccountId: 0,
  isSigned: '',
  amoUserId: '',
  isDeleted: '',
  createdAt: 0
})


export const useDocumentStore = defineStore('document', {
  state: (): DocumentState => ({
    items: [],
    currOrgId: '',
    currSettlmentId: '',
    currSettlment: {},
    currOrganization: {},
    currTemplateId: '',
    newItem: initItem(),
  }),

  getters: {
    getSettlementsList(state) {
      return useSettlementStore().items
      .filter(item => {
        return item.corporateEntityId === state.currOrgId
      })
      .map(item => ({
        value: item.id,
        title: item.name
      }))
    },

    getTemplatesList(state) {
      return useDocTemplateStore().items.map(item => ({
        value: item.id,
        title: item.name
      }))
    },

    getCurrTemplateName(state) {
      return (id: number) => useDocTemplateStore().items.find(item => +item.id == id)?.name
    },

    getCurrOrganizationName(state) {
      return (id: number) => useOrganizationsStore().items.find(item => +item.id == id)?.name
    },

    getCurrSettlementName(state) {
      return (id: number) => useSettlementStore().items.find(item => +item.id == id)?.name
    },
  },

  actions: {
    async loadItems() {
      try {
        this.items = (await api.getDocuments());
      } catch (error) {
       console.debug(error)
      }
    },
    async addItem() {
      try {
        // true прелоадер
        await api.addDocument({...this.newItem, templateId: +this.currTemplateId, organizationId: +this.currOrgId, settlementAccountId: +this.currSettlmentId, createdAt: new Date().toLocaleDateString('ru-RU', {}) });
        this.loadItems()
      } catch (error) {
       console.debug(error)
      } finally {
        // false прелоадер
      }
    },
  }
}) 