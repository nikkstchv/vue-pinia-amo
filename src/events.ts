import { useDocTypeStore } from "@/stores/doctypeStore";
import { useDocTemplateStore } from "@/stores/doctemplateStore";
import { useOrganizationsStore } from "@/stores/organizationsStore";
import { useHeaderStore } from "@/stores/headerStore";
import { useSettlementStore } from "@/stores/settlementStore"


export default (iframeName: string) => {
  window.addEventListener('message', async (event) => {
    let eventName = event.data.event;
    switch (eventName) {
      case `${iframeName}:deleteType`: {
        let { elementId, modalId } = event.data.data;
        try {
          await useDocTypeStore().removeItem(elementId);
        } catch (error) {
          return error
        }
        window.parent.postMessage({ event: `${iframeName}:closeConfirm`, data: { modalId } }, '*');
        break;
      };
      case `${iframeName}:deleteOrganization`: {
        let { elementId, modalId } = event.data.data;
        try {
          await useOrganizationsStore().removeItem(elementId);
          useHeaderStore().goToMainRoute();
        } catch (error) {
          return error
        }
        window.parent.postMessage({ event: `${iframeName}:closeConfirm`, data: { modalId } }, '*');
        break;
      };
      case `${iframeName}:deleteTemplate`: {
        let { elementId, modalId } = event.data.data;
        try {
          await useDocTemplateStore().removeItem(elementId);
        } catch (error) {
          return error
        }
        window.parent.postMessage({ event: `${iframeName}:closeConfirm`, data: { modalId } }, '*');
        break;
      };
      case `${iframeName}:deleteSettlement`: {
        let { elementId, modalId } = event.data.data;
        try {
          await useSettlementStore().removeItem(elementId);
        } catch (error) {
          return error
        }
        window.parent.postMessage({ event: `${iframeName}:closeConfirm`, data: { modalId } }, '*');
        break;
      }
      default: break;
    }
  });
}