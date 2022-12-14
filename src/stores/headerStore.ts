import { defineStore } from "pinia";
import { useInitializationStore } from "@/stores/initializationStore";
import { useOrganizationsStore } from "@/stores/organizationsStore"

import router from "@/router"
import PATHS from "@/router/paths"

import { useRoute } from "vue-router";

// types
import type { HeaderState } from "@/types/header.types";

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


    async getCurrentTitle(state) {
      if (this.isNewOrganizationPage) return useInitializationStore().localization.views.newOrganization.headers;
      if (this.isOrganizationPage) {
        const result = useOrganizationsStore().getCurrentItem(state.currentRouteId)
        return result?.name;
      }
      return "";
    }
  },

  actions: {
    goToMainRoute() {
      const route = useRoute()
      const query = route ? route.query : {}
      router.push({ name: PATHS.ADVANCED_SETTINGS.name, query: { ...query } });
    },

    setCurrentRouteName(routeName: string) {
      this.currentRouteName = routeName;
    },
    setCurrentRouteId(routeId: number) {
      this.currentRouteId = routeId;
    },
  },

});