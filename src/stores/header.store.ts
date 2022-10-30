import { defineStore } from "pinia";
import { useInitializationStore } from "./initialization.store";
import { useOrganizationsStore } from "@/stores/organizations.store"
import * as api from "@/api/docflow";



import router from "@/router"
import PATHS from "@/router/paths"
// import store from "./router.store";

// types
import type { HeaderState } from "@/types/header.types";
import type { SaveResourceTitleCallbacksDto } from "@/types/general.types";

const getCurrItem = async (id: string) => await api.getOrganizationById(+id)

export const useHeaderStore = defineStore("header", {
  state: (): HeaderState => ({
    currentRouteName: "",
    currentRouteId: 0
  }),

  getters: {
    getCurrentRouteId: (state): number => state.currentRouteId,
    isNotMainPage: (state): boolean => state.currentRouteName !== PATHS.ADVANCED_SETTINGS.name,
    isMainPage: (state): boolean => state.currentRouteName === PATHS.ADVANCED_SETTINGS.name,
    isOrganizationPage: (state): boolean => state.currentRouteName === PATHS.ORGANIZATION.name,
    isNewOrganizationPage: (state) => state.currentRouteName === PATHS.NEW_ORGANIZATION.name,


    async getCurrentTitle(state)  {
      if (this.isNewOrganizationPage) return useInitializationStore().localization.views.newOrganization.headers;
      if (this.isOrganizationPage) {
        const result = await useOrganizationsStore().getCurrItem(state.currentRouteId)
        return result.name;
      } 
      return "";
    }
  },

  actions: {
    goToMainRoute(): void {
      router.push({ name: PATHS.ADVANCED_SETTINGS.name });
    },

    setCurrentRouteName(routeName: string): void {
      this.currentRouteName = routeName;
    },
    setCurrentRouteId(routeId: number): void {
      this.currentRouteId = routeId;
    },
  },

});