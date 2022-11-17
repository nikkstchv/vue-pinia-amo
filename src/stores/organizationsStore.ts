import { defineStore } from "pinia";
import type { OrganizationsState, Organization, SettlementList } from "../types/organizations.types";
import { useHeaderStore } from "@/stores/headerStore";
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
    currSettlementAccountlist: [],
    currItem: {},
    currItemCopy: {},
    newItem: initItem(),
    editMode: false
  }),

  getters: {
    getCurrentItem(state) {
      const currId: number = useHeaderStore().currentRouteId;
      if (Number.isNaN(currId)) {
        return () => state.newItem
      }
      return (id: number) => state.items.find(item => +item.id == id);
    },
    getCurrentTitle(state) {
      return (id: number) => state.items.find(item => +item.id == id)?.name
    },
    isItemChanged(state) {
      return JSON.stringify(state.currItemCopy) === JSON.stringify(state.currItem)
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
        this.items = (await api.getOrganizations());
      } catch (error) {
       console.debug(error)
      }
    },


    async addItem() {
      try {
        await api.addOrganization({...this.currItem});
        this.newItem = initItem();
      } catch (error) {
       console.debug(error)
      }
    },

    async saveItem(id: number, currItem: Organization) {
      try {
        await api.updateOrganization(id, currItem);
        await this.loadItems()
        this.setItemCopy()
      } catch (error) {
       console.debug(error)
      }
    },

    async removeItem(id: number) {
      try {
        await api.deleteOrganization(id);
        await this.loadItems()
      } catch (error) {
       console.debug(error)
      }
    }
  }
}) 