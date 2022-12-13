import { defineStore } from "pinia";
import type { OrganizationsState, Organization, SettlementList } from "../types/organizations.types";
import { useHeaderStore } from "@/stores/headerStore";
import { useSettlementStore } from "./settlementStore";
import * as api from "@/api/docflow";


const initItem = () => ({
  name: "",
  inn: "",
  kpp: "",
  ogrn: "",
  signatoryPosition: "",
  signatoryName: "",
  signatoryShortName: "",
  accountantFio: "",
  basedOn: "",
  signatoryFio: "",
  powerOfAttorney: "",
  powerOfAttorneyDate: "",
  legalAddress: "",
  postalAddress: "",
  otherAddress: "",
  certificateNumber: "",
  certificateDate: "",
  phoneNumber: "",
  email: "",
  web: "",
  useNds: "",
  urlSign: "",
  urlStamp: "",
  isActive: "",
  isDeleted: "",
  createdAt: ""
})


export const useOrganizationsStore = defineStore('organizations', {
  state: (): OrganizationsState => ({
    items: [],
    mappedOrgs: [],
    currItem: {},
    currItemCopy: {},
    newItem: initItem(),
    editMode: false,
    settlementsList: []
  }),

  getters: {
    getCurrentItem(state) {
      const currId: number = useHeaderStore().currentRouteId;
      if (Number.isNaN(currId)) {
        return () => state.newItem
      }
      return (id: number | string) => {
        return state.items.find(item => +item.id == id)
      };
    },
    getCurrentTitle(state) {
      return (id: number) => state.items.find(item => +item.id == id)?.name
    },
    isItemChanged(state) {
      return JSON.stringify(state.currItemCopy) !== JSON.stringify(state.currItem)
    }
  },

  actions: {
    setSettlementsList() {
      this.settlementsList = useSettlementStore().items.filter(item => item.corporateEntityId === this.currItem.id)
    },

    setMappedOrgs() {
      this.mappedOrgs = this.items.map(item => ({
        value: item.id,
        title: item.name
      }))
    },

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
        await api.addOrganization({ ...this.currItem });
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