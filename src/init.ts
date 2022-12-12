import PATHS from '@/router/paths';
import { useInitializationStore } from "@/stores/initializationStore";
import { useOrganizationsStore } from "./stores/organizationsStore";
import { useSettlementStore } from './stores/settlementStore';
import { useDocTemplateStore } from './stores/doctemplateStore';
import { useDocumentStore } from "./stores/documentStore";

export default async function (route: any) {
  const initializationStore = useInitializationStore();
  await initializationStore.iframeInit();
  console.log('%cinit.ts line:13 route.name', 'color: #007acc;', route.name);

  switch (route.name) {
    case PATHS.ADVANCED_SETTINGS.name: {
      await useOrganizationsStore().loadItems();
      // await useDocumentStore().loadPaginated();
    }
      break;
    // case PATHS.NEW_TEMPLATE.name: {
    //   await useDocTemplateStore().loadItems();
    // }
    //   break;
    case PATHS.DOCUMENT_TAB.name:
      {
        await useOrganizationsStore().loadItems();
        useOrganizationsStore().setMappedOrgs();
        await useSettlementStore().loadItems();
        await useDocTemplateStore().loadItems();
      }
      break;
  }
}