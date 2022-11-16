import { useInitializationStore } from "@/stores/initializationStore";
import { useOrganizationsStore } from "./stores/organizationsStore";


export default async function (route: any) {
  const initializationStore = useInitializationStore();
  await initializationStore.iframeInit();

  switch (route.name) {
    case "AdvancedSettings": {
      await useOrganizationsStore().loadItems()
    }
  }
}