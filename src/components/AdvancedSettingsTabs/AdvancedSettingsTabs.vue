<script setup lang="ts">
import { ref } from "vue";

import GnzsSection from "@/gnzs-controls/gnzs-section/gnzs-section.vue";
import GnzsTabs from "@/gnzs-controls/gnzs-tabs/gnzs-tabs.vue";

import Account from "@/components/AdvancedSettingsTabs/Account/Account.vue";
import TemplateSetup from "@/components/AdvancedSettingsTabs/TemplateSetup/TemplateSetup.vue";
import TemplateTypes from "@/components/AdvancedSettingsTabs/TemplateTypes/TemplateTypes.vue";
import Organizations from "@/components/AdvancedSettingsTabs/Organizations/Organizations.vue";
import Tables from "@/components/AdvancedSettingsTabs/Tables/Tables.vue";
import Variables from "@/components/AdvancedSettingsTabs/Variables/Variables.vue";

const tabs = [
  { id: "account", title: "Подключение Google" },
  { id: "templates", title: "Шаблоны" },
  { id: "organizations", title: "Юр. лица" },
  { id: "tables", title: "Таблицы" },
  { id: "variables", title: "Переменные" },
];

const activeTab = ref(tabs[0].id);

const setActiveTab = (tab: any) => {
  activeTab.value = tab;
};
</script>

<template>
  <GnzsTabs :tabs="tabs" @change="setActiveTab">
    <div gnzs-tab-id="account">
      <Account />
    </div>
    <div gnzs-tab-id="templates" :class="$style.columnFlex">
      <TemplateSetup />
      <TemplateTypes />
    </div>
    <div gnzs-tab-id="organizations">
      <Organizations />
    </div>
    <div gnzs-tab-id="tables">
      <Tables />
    </div>
    <div gnzs-tab-id="variables">
      <Variables />
    </div>
  </GnzsTabs>
</template>

<style lang="scss" module>
@import "@/style.scss";
</style>
