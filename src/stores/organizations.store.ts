import { defineStore } from "pinia";
import type { OrganizationsState, Organization } from "../types/organizations.types";
import * as api from "@/api/docflow";


const initItem = () => ({
  name: "",
  inn: "",
  kpp: "",
  ogrn: "",
  signatory_position: "",
  signatory_name: "",
  signatory_short_name: "",
  accountant_fio: "",
  based_on: "",
  signatory_fio: "",
  power_of_attorney: "",
  power_of_attorney_date: "",
  legal_address: "",
  postal_address: "",
  other_address: "",
  certificate_number: "",
  certificate_date: "",
  phone_number: "",
  email: "",
  web: "",
  use_nds: "",
  url_sign: "",
  url_stamp: "",
  is_active: "",
  is_deleted: "",
  created_at: ""
})


export const useOrganizationsStore = defineStore('organizations', {
  state: (): OrganizationsState => ({
    items: [],
    newItem: initItem(),
  }),
  getters: {
    getCurrentItem(state) {
      return (id: number) => state.items.find(item => +item.id == id);
    },
    getCurrentTitle(state) {
      return (id: number) => state.items.find(item => +item.id == id)?.name
    },
    hasNotChanged(state) {
      return () => {
        // const - ПОСМОТРЕТЬ РЕАЛИЗАЦИЮ В ТЕЛЕГРАМ!!!
      }
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
    },

    async addItem() {
      try {
        await api.addOrganization(this.newItem);
        this.newItem = initItem();
      } catch (error) {
        return error
      }
    },

    async saveItem(id: number, currItem: Organization) {
      try {
        await api.updateOrganization(id, currItem);
      } catch (error) {
        return error
      }
    },

    async removeItem(id: number) {
      try {
        await api.deleteOrganization(id);
        await this.loadItems()
      } catch (error) {
        return error
      }
    }
  }
}) 