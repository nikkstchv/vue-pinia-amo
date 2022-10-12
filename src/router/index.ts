import { createRouter, createWebHistory } from "vue-router";
import AdvancedSettings from "@/views/advanced-settings.vue";
import RightArea from "@/views/example-right-area.vue";
import Example from "@/views/example-advanced-settings.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "AdvancedSettings",
      component: AdvancedSettings,
    },
    {
      path: "/right-area",
      name: "RightArea",
      component: RightArea,
    },
    {
      path: "/example-advanced-settings",
      name: "Example",
      component: Example,
    },
  ],
});

export default router;
