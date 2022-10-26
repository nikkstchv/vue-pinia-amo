import { defineStore } from "pinia";
import type { OrganizationsState } from "../types/organizations.types";
import * as api from "@/api/docflow";


export const useOrganizationsStore = defineStore('organizations', {
  state: (): OrganizationsState => ({
    items: [],
    currItem: {},
  }),
  getters: {
    getCurrentTitle(state) {
      return (id: string | string[]) => state.items.find(org => org.id == id)?.name
    }
  },
  actions: {
    async loadItems() {
      try {
        this.items = (await api.getOrganizations());
      } catch (error) {
        return error
      }
    },
    async getCurrItem(id: number) {
      const item  = await api.getOrganizationById(id).then(value => value)
      return item;
    }
  }
}) 