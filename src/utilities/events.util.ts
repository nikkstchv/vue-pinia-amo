import { useIframeStore } from "@/stores/iframeStore";
import { PAYMENTS_IFRAME_NAME } from "@/stores/constants";

export default (iframeName: string): void => {
  const iframeStore = useIframeStore();
  window.addEventListener("message", async (event) => {
    const eventName = event.data.event;

    switch (eventName) {
      case `${iframeName}:getWindowSize`: {
        const { width, height } = event.data.data;
        const frames: { [key: string]: any } = window.frames;
        const paymentsIframe = frames[PAYMENTS_IFRAME_NAME];
        iframeStore.setWindowSize(+width, +height);

        if (paymentsIframe) {
          paymentsIframe.postMessage(
            {
              event: `${PAYMENTS_IFRAME_NAME}:getWindowSize`,
              data: { width, height },
            },
            "*"
          );
        }

        break;
      }

      case `${PAYMENTS_IFRAME_NAME}:getWindowSize`: {
        iframeStore.resizeWindow();
        break;
      } 

      case `${PAYMENTS_IFRAME_NAME}:showSidebar`: {
        iframeStore.asaidToggle();
        break;
      }

      default: break;
    }
  });
}