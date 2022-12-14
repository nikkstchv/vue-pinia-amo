<template>
  <div :class="$style.container">
    <GznsHeader :fixed="isChanged" :mainTitle="localization.title" />
    <GnzsTabs v-if="!isLoad" :tabs="tabs" :current="currActiveTab" @change="saveActiveTab($event)">
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
    <GnzsSpinner v-else-if="isLoad" :class="$style.spinner" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { computed } from "@vue/reactivity";

import TemplateSetup from "@/components/TemplateSetup/index.vue";
import TemplateTypes from "@/components/TemplateTypes/TemplateTypes.vue";
import Organizations from "@/components/Organizations/index.vue";
import Variables from "@/components/Variables/Variables.vue";
import Account from "@/components/Account/Account.vue";
import Tables from "@/components/Tables/Tables.vue";

import GnzsSpinner from "@/gnzs-controls/gnzs-spinner/gnzs-spinner.vue";
import GznsHeader from "@/gnzs-controls/gnzs-header/gnzs-header.vue";
import GnzsTabs from "@/gnzs-controls/gnzs-tabs/gnzs-tabs.vue";

import init from "@/init";

import { useInitializationStore } from "@/stores/initializationStore";
import { useOrganizationsStore } from "@/stores/organizationsStore";
import { useDocTemplateStore } from "@/stores/docTemplateStore";
import { useDocumentStore } from "@/stores/documentStore";
import { useDocTypeStore } from "@/stores/docTypeStore";

const { saveActiveTab } = useInitializationStore();
const { currActiveTab, isLoad } = storeToRefs(useInitializationStore()); 

const tabs = [
  { id: "account", title: "Подключение Google" },
  { id: "templates", title: "Шаблоны" },
  { id: "tables", title: "Таблицы" },
  { id: "variables", title: "Переменные" },
];

const initializationStore = useInitializationStore();
const localization = computed(() => initializationStore.localization);

const isChanged = true;

const loadData = async () => {
  switch (currActiveTab.value) {
    case "account": {
      await useOrganizationsStore().loadItems();
    }
      break;
    case "templates": {
      await useDocTemplateStore().loadItems();
      await useDocTypeStore().loadItems();

    }
      break;
    case "tables": {
      await useDocTemplateStore().loadItems();
      await useDocTypeStore().loadItems();
      await useDocumentStore().loadPaginated();
    }
      break;
  }
}

watch(currActiveTab, () => {
  loadData()
})


onMounted(async () => {
  const route = useRoute()
  await init(route)
  await loadData()
})
</script>

<style lang="scss" module>
@import "./style.scss";
@import "@/assets/fonts/fonts.scss";
</style>
