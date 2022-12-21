import PATHS from '@/router/paths';
import { useInitializationStore } from "@/stores/initializationStore";
import { useOrganizationsStore } from "./stores/organizationsStore";
import { useSettlementStore } from './stores/settlementStore';
import { useDocTemplateStore } from './stores/docTemplateStore';
import { useDocumentStore } from './stores/documentStore';

export default async function (route: any) {
  const initializationStore = useInitializationStore(); // переместить в App.vue и протестить
  await initializationStore.iframeInit();

  switch (route.name) {
    case PATHS.DOCUMENT_TAB.name:
      {
        await useDocumentStore().loadItems()
        await useOrganizationsStore().loadItems();
        await useSettlementStore().loadItems();
        await useDocTemplateStore().loadItems();
        useOrganizationsStore().setMappedOrgs();
      }
      break;
  }
}