import { defineStore } from "pinia";
import type { DocumentState } from "../types/document.types";
import { useSettlementStore } from "./settlementStore";
import { useDocTemplateStore } from "./doctemplateStore";
import { useOrganizationsStore } from "./organizationsStore";
import * as api from "@/api/docflow";

const initItem = () => ({
  entityType: 0,
  entityId: 0,
  url: "",
  number: "",
  templateId: 0,
  organizationId: 0,
  settlementAccountId: 0,
  isSigned: "",
  userId: "",
  isDeleted: "",
  createdAt: 0,
});

export const useDocumentStore = defineStore("document", {
  state: (): DocumentState => ({
    items: [],
    paginated: [],
    page: 1,
    limit: 0,
    total: 0,
    isLoading: false,
    currOrgId: "",
    currSettlmentId: "",
    currSettlment: {},
    currOrganization: {},
    currTemplateId: "",
    newItem: initItem(),
  }),

  getters: {
    getSettlementsList(state) {
      return useSettlementStore()
        .items.filter((item) => {
          return item.corporateEntityId === state.currOrgId;
        })
        .map((item) => ({
          value: item.id,
          title: item.name,
        }));
    },

    getTemplatesList(state) {
      return useDocTemplateStore().items.map((item) => ({
        value: item.id,
        title: item.name,
      }));
    },

    getCurrTemplate(state) {
      return (id: number) =>
        useDocTemplateStore().items.find((item) => +item.id == id);
    },

    getCurrTemplateName(state) {
      return (id: number) =>
        useDocTemplateStore().items.find((item) => +item.id == id)?.name;
    },

    getCurrOrganizationName(state) {
      return (id: number) =>
        useOrganizationsStore().items.find((item) => +item.id == id)?.name;
    },

    getCurrSettlementName(state) {
      return (id: number) =>
        useSettlementStore().items.find((item) => +item.id == id)?.name;
    },
  },

  actions: {
    async nextPage(total: number) {
      console.log("%cdocumentStore.ts line:80 total", "color: #007acc;", total);
      if (this.page < total) {
        this.page = this.page + 1;
        await this.loadPaginated();
      }
    },

    async prevPage() {
      if (this.page > 1) {
        this.page = this.page - 1;
        await this.loadPaginated();
      }
    },

    async selectPage(page: number) {
      this.page = page;
      await this.loadPaginated();
    },

    async changeLimit(limit: number) {
      this.limit = limit;
      await this.loadPaginated();
    },

    async loadItems() {
      try {
        this.items = await api.getDocuments();
      } catch (error) {
        console.debug(error);
      }
    },

    async loadPaginated() {
      try {
        this.paginated = await api.getPaginatedDocuments(
          this.page,
          this.limit,
          ""
        );
      } catch (error) {
        console.debug(error);
      }
    },

    async addItem() {
      try {
        // padStart polyfill START
        if (!String.prototype.padStart) {
          String.prototype.padStart = function padStart(
            targetLength,
            padString
          ) {
            targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
            padString = String(padString || " ");
            if (this.length > targetLength) {
              return String(this);
            } else {
              targetLength = targetLength - this.length;
              if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
              }
              return padString.slice(0, targetLength) + String(this);
            }
          };
        }
        // padStart polyfill END

        this.isLoading = true;

        const template = await api.getTemplateById(+this.currTemplateId);
        const counter = template.nextNumber
          .toString()
          .padStart(template.numberLength, "0");
        const number = `${template.prefix}${counter}${template.suffix}`;
        const nextNumber = template.nextNumber + 1;

        await api.addDocument({
          ...this.newItem,
          number: number,
          templateId: +this.currTemplateId,
          organizationId: +this.currOrgId,
          settlementAccountId: +this.currSettlmentId,
          createdAt: new Date().toLocaleDateString("ru-RU", {}),
        });

        await api.updateTemplate(+this.currTemplateId, {
          ...template,
          nextNumber: nextNumber,
        });

        this.loadItems();
      } catch (error) {
        console.debug(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
