import { defineStore } from "pinia";

// types
import type { IframeStore } from "@/types/iframe.types";

export const useIframeStore = defineStore({
  id: "iframe",

  state: (): IframeStore => ({
    iframeName: null,
    windowWidth: null,
    windowHeight: null,
    asaidIsActive: false,
  }),

  getters: {
    isSmallSizeWindow: (state): boolean => state.windowWidth !== null && state.windowWidth <= 1100,
  },

  actions: {
    setIframeName(iframeName: string): void {
      this.iframeName = iframeName;
    },

    setWindowSize(width: number, height: number): void {
      const toggleValue: boolean = width <= 1100 ? false : true;
      this.asaidIsActive = toggleValue;
      this.windowWidth = width;
      this.windowHeight = height;
    },

    resizeWindow(): void {
      if (window.self === window.top) {
        const width: number = document.documentElement.clientWidth;
        const height: number = document.documentElement.clientHeight;
        this.setWindowSize(width, height);
      } else {
        window.parent.postMessage({ event: `${this.iframeName}:getWindowSize` }, "*");
      }
    },

    showSidebar(): void {
      window.parent.postMessage({ event: `${this.iframeName}:showSidebar` }, "*");
    },

    asaidToggle(): void {
      this.asaidIsActive ? (this.asaidIsActive = false) : (this.asaidIsActive = true);
    },

    openConfirmModal({ name, id, confirmEventName, text, declineText, acceptText }:
      { name: string, id: number, confirmEventName: string, text: string, declineText: string, acceptText: string }): void {
        return window.parent.postMessage({
        event: `${this.iframeName}:openConfirmModal`,

        data: { elementName: name, elementId: id, confirmEventName, text, declineText, acceptText },
      }, "*")
    },
  },
});
