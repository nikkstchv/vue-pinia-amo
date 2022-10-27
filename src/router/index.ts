import { createRouter, createWebHistory } from "vue-router";
import { useHeaderStore } from "@/stores/header.store";
import PATHS from "@/router/paths";



// views
import AdvancedSettings from "@/views/Main";
import NewOrganization from "@/views/NewOrganization";
import Organization from "@/views/Organization";
import NewTemplate from "@/views/NewTemplate";
import Template from "@/views/Template";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: PATHS.ADVANCED_SETTINGS.path,
      name: PATHS.ADVANCED_SETTINGS.name,
      component: AdvancedSettings,
      beforeEnter: (to, from, next) => {
        useHeaderStore().setCurrentRouteName(<string>PATHS.ADVANCED_SETTINGS.name);
        next();
      }
    },
    {
      path: PATHS.ORGANIZATION.path,
      name: PATHS.ORGANIZATION.name,
      component: Organization,
      beforeEnter: (to, from, next) => {
        useHeaderStore().setCurrentRouteName(<string>PATHS.ORGANIZATION.name);
        next();
      },
    },
    {
      path: PATHS.NEW_ORGANIZATION.path,
      name: PATHS.NEW_ORGANIZATION.name,
      component: NewOrganization,
      beforeEnter: (to, from, next) => {
        useHeaderStore().setCurrentRouteName(<string>PATHS.NEW_ORGANIZATION.name);
        next();
      },
    },
    ,
    {
      path: PATHS.TEMPLATE.path,
      name: PATHS.TEMPLATE.name,
      component: Template,
      beforeEnter: (to, from, next) => {
        useHeaderStore().setCurrentRouteName(<string>PATHS.TEMPLATE.name);
        next();
      },
    },
    {
      path: PATHS.NEW_TEMPLATE.path,
      name: PATHS.NEW_TEMPLATE.name,
      component: NewTemplate,
      beforeEnter: (to, from, next) => {
        useHeaderStore().setCurrentRouteName(<string>PATHS.NEW_TEMPLATE.name);
        next();
      },
    }
  ]
});

export default router;
