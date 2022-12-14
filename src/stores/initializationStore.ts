import { defineStore } from "pinia";
import { getAccountInfo, getDevJwtToken, getDNAInfo, verifyAndDecodeToken } from "@/api/gnzs-core-api";
import { getUserAvatar } from "@/utilities/stores/helper";
import { GNZS_WIDGET_ID } from "./constants";
import { useIframeStore } from "./iframeStore";
import setEvents from "@/events";

// types
import type { AccountDataDto, InitializationState, UsersAvatartDto } from "../types/initialization.types";

// localizations
import RU from "@/localizations/ru";
import type { Ref } from "vue";
// import EN from "@/localizations/en";
// import ES from "@/localizations/es";
// import PT from "@/localizations/pt";

export const useInitializationStore = defineStore({

  id: "initialization",

  state: (): InitializationState => ({
    isLoad: true,
    decodeToken: null,
    accountData: null,
    token: null,
    lang: null,
    extAccountId: null,
    amoUserId: null,
    users: [],
    tokenError: null,
    DNAInfo: null,
    currActiveTab: "account"
  }),

  getters: {
    userName: (state) => {
      return (id: number) => {
        return state.accountData?.amoUsers.find(user => user.id === id)?.name
      }
    },

    isInsideAmo: (state) => state.decodeToken?.iss && state.decodeToken.iss.includes(".amocrm.") ? true : false,

    isDevMode: (): boolean => import.meta.env.DEV,

    localization: (state) => {
      if (state.lang === "ru") return RU;
      // if (state.lang === "en") return EN;
      // if (state.lang === "es") return ES;
      // if (state.lang === "pt") return PT;
      return RU;
    },

    isAdmin: (state): boolean => {
      const isUserAdmin = state.users.find(user => user.id === state.amoUserId)?.isAdmin;
      const isAdminPanel = state.decodeToken?.is_gnzs_admin_panel ? true : false;
      return isUserAdmin || isAdminPanel ? true : false;
    },
  },

  actions: {
    saveActiveTab(currTab: any): void {
      this.currActiveTab = currTab
    },

    async iframeInit(): Promise<void> {
      const currUrl: URL = new URL(location.href);
      const lang: string = currUrl.searchParams.get("lang") || "ru";
      const iframeName: string = currUrl.searchParams.get("iframe-name") || "";
      const iframeStore = useIframeStore();

      try {
        let token: string = currUrl.searchParams.get("token") || "";

        if (!token?.length && this.isDevMode) {
          token = await getDevJwtToken(
            import.meta.env.VITE_APP_DEVELOPER_API_TOKEN,
            GNZS_WIDGET_ID,
            import.meta.env.VITE_APP_DEVELOPER_AMO_ACCOUNT_ID // Указываем id аккаунта, на котором тестируем и разрабатываем
          ); 
          console.debug("DEVELOPMENT MODE", { token });
        }

        this.token = token;
        this.lang = lang;
        this.decodeToken = await verifyAndDecodeToken(GNZS_WIDGET_ID);
        this.extAccountId = +this.decodeToken.account_id;
        this.accountData = await getAccountInfo();
        this.amoUserId = Number(currUrl.searchParams.get("user-id")) || +this.decodeToken.user_id || import.meta.env.VITE_APP_DEVELOPER_AMO_USER_ID;
        this.setUsers();
        setEvents(iframeName);
        iframeStore.setIframeName(iframeName);
        iframeStore.resizeWindow();

        this.isLoad = false;
      } catch (error: any) {
        console.debug(error);
        if (error?.response?.data?.statusCode === 403) {
          this.tokenError = error.response.data.message;
        }
      }
    },

    setUsers(): void {
      const { amoUsers, amoUserGroups, amoSubdomain, amoTopLevelDomain, amoObjectAmocrm } = <AccountDataDto>this.accountData;
      let avatars: UsersAvatartDto[];

        amoObjectAmocrm ? avatars = amoObjectAmocrm._users_avatars : avatars = [];

        this.users = amoUsers.map(user => {
        return {
          id: +user.id,
          name: user.name,
          group: amoUserGroups[user.group_id].name,
          image: getUserAvatar(+user.id, avatars, amoSubdomain, amoTopLevelDomain) || "",
          email: user.login,
          isAdmin: user.is_admin || false,
        };
      });
    },

  },

});