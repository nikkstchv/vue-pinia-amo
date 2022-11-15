import { useDocTypeStore } from "@/stores/doctype.store";
import { useDocTemplateStore } from "@/stores/doctemplate.store";
import { useOrganizationsStore } from "@/stores/organizations.store";
import { useHeaderStore } from "./stores/header.store";
import { useSettlementStore } from "@/stores/settlement.store"


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