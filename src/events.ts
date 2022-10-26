import * as api from "@/api/docflow";
import { useDocTypeStore } from "@/stores/doctype.store";


export default (iframeName: string) => {
  window.addEventListener('message', async (event) => {
    let eventName = event.data.event;
    switch (eventName) {
      case `${iframeName}:deleteType`: {
        let { elementId, modalId } = event.data.data;
        try {
          const docTypeStore = useDocTypeStore()
          await docTypeStore.removeItem(elementId);
        } catch (error) {
          return error
        }
        window.parent.postMessage({ event: `${iframeName}:closeConfirm`, data: { modalId } }, '*');
        break;
      }
      // case `${iframeName}:getWindowSize`: {
      //   let { width, height } = event.data.data;
      //   store.dispatch('iframe/setWindowSize', { width, height });
      //   break;
      // }
      default: break;
    }
  });
}