<script setup lang="ts">
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { computed } from "@vue/reactivity";

import { useInitializationStore } from "@/stores/initialization.store";

import TemplateSetup from "@/components/TemplateSetup/index.vue";
import TemplateTypes from "@/components/TemplateTypes/TemplateTypes.vue";
import Organizations from "@/components/Organizations/index.vue";
import Variables from "@/components/Variables/Variables.vue";
import Account from "@/components/Account/Account.vue";
import Tables from "@/components/Tables/Tables.vue";

import GznsHeader from "@/gnzs-controls/gnzs-header/gnzs-header.vue";
import GnzsTabs from "@/gnzs-controls/gnzs-tabs/gnzs-tabs.vue";

import init from "@/init";

const { saveActiveTab } = useInitializationStore();
const { currActiveTab } = storeToRefs(useInitializationStore());
const tabs = [
  { id: "account", title: "Подключение Google" },
  { id: "templates", title: "Шаблоны" },
  { id: "tables", title: "Таблицы" },
  { id: "variables", title: "Переменные" },
];
const activeTab = ref(currActiveTab.value);
const setActiveTab = (tab: any) => {
  saveActiveTab(tab);
  activeTab.value = currActiveTab.value;
};

const initializationStore = useInitializationStore();
const localization = computed(() => initializationStore.localization);

const isChanged = true;

onMounted(async () => {
  const route = useRoute()
  await init(route)
})
</script>
<template>
  <div :class="$style.container">
    <GznsHeader :fixed="isChanged" :mainTitle="localization.title" />
    <GnzsTabs :tabs="tabs" @change="setActiveTab">
      <div gnzs-tab-id="account" :class="$style.columnFlex">
        <Account />
        <Organizations />
      </div>
      <div gnzs-tab-id="templates" :class="$style.columnFlex">
        <TemplateSetup />
        <TemplateTypes />
      </div>
      <div gnzs-tab-id="tables">
        <Tables />
      </div>
      <div gnzs-tab-id="variables">
        <Variables />
      </div>
    </GnzsTabs>
  </div>
</template>

<style lang="scss" module>
@import "./style.scss";
@import "@/assets/fonts/fonts.scss";
</style>
