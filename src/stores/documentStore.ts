import { defineStore } from "pinia";
import type { DocumentState } from "../types/document.types";
import { useSettlementStore } from "./settlementStore";
import { useDocTemplateStore } from "./doctemplateStore";
import { useOrganizationsStore } from "./organizationsStore";
import * as api from "@/api/docflow";

const initItem = () => ({
  entityType: 0,
  entityId: 0, 
  url: '',
  number: '',
  templateId: 0,
  organizationId: 0,
  settlementAccountId: 0,
  isSigned: '',
  userId: '',
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

    getCurrTemplate(state) {
      return (id: number) => useDocTemplateStore().items.find(item => +item.id == id)
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
        if (!String.prototype.padStart) {
          String.prototype.padStart = function padStart(targetLength,padString) {
              targetLength = targetLength>>0; //floor if number or convert non-number to 0;
              padString = String(padString || ' ');
              if (this.length > targetLength) {
                  return String(this);
              }
              else {
                  targetLength = targetLength-this.length;
                  if (targetLength > padString.length) {
                      padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
                  }
                  return padString.slice(0,targetLength) + String(this);
              }
          };
      }
        const template = await api.getTemplateById(+this.currTemplateId)
        const counter = template.nextNumber.toString().padStart(template.numberLength , "0")
        const number = `${template.prefix}${counter}${template.suffix}`

        await api.addDocument({
          ...this.newItem,
          number: number,
          templateId: +this.currTemplateId,
          organizationId: +this.currOrgId,
          settlementAccountId: +this.currSettlmentId,
          createdAt: new Date().toLocaleDateString('ru-RU', {})
        });

        const nextNumber = template.nextNumber + 1;
        await api.updateTemplate(+this.currTemplateId, {...template, nextNumber: nextNumber});
        this.loadItems()
      } catch (error) {
       console.debug(error)
      } finally {
        // false прелоадер
      }
    },
  }
}) 