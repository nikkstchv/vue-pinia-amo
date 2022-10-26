import { useInitializationStore } from "@/stores/initialization.store";
import { useOrganizationsStore } from "./stores/organizations.store";


export default async function (route: any) {
  const initializationStore = useInitializationStore();
  await initializationStore.iframeInit();

  switch (route.name) {
    case "AdvancedSettings": {
      await useOrganizationsStore().loadItems()
    }
  }
}