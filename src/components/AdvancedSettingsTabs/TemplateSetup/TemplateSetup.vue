<template>
  <Section :header="initializationStore.localization.views.adSettings.headers.template">
    <template v-slot:description>{{
      initializationStore.localization.views.adSettings.descriptions.template
    }}</template>
    <MessageTemplatesTable />
  </Section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useInitializationStore } from "@/stores/initialization.store";
import Section from "@/gnzs-controls/gnzs-section/gnzs-section.vue";
import MessageTemplatesTable from "@/components/MessageTemplatesTable";

const initializationStore = useInitializationStore();

const localization = computed(() => initializationStore.localization);
</script>

<style lang="scss" module>
@import "@/style.scss";
</style>

<style lang="scss" scoped>
@import "./table-style.scss";
</style>