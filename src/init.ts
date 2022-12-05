import PATHS from '@/router/paths';
import { useInitializationStore } from "@/stores/initializationStore";
import { useOrganizationsStore } from "./stores/organizationsStore";
import { useSettlementStore } from './stores/settlementStore';
import { useDocTemplateStore } from './stores/doctemplateStore';
import { useDocumentStore } from "./stores/documentStore";

export default async function (route: any) {
  const initializationStore = useInitializationStore();
  await initializationStore.iframeInit();

  switch (route.name) {
    case PATHS.ADVANCED_SETTINGS.name: {
      await useOrganizationsStore().loadItems();
      await useDocumentStore().loadPaginated();
    }
    case PATHS.DOCUMENT_TAB.name:
      {
        await useOrganizationsStore().loadItems();
        useOrganizationsStore().setMappedOrgs();
        await useSettlementStore().loadItems();
        await useDocTemplateStore().loadItems();

        const id = route.query["entity-id"];
        const type = route.query["entity-type"];
        const userId = route.query["user-id"];
        // store.dispatch('setCurrentUserId', userId)
        // store.dispatch('order/setCurrentEntity', {id, type})
        // await store.dispatch('loadCardTab');
      }
      break;
  }
}