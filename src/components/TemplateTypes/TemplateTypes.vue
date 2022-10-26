<template>
  <Section :header="initializationStore.localization.views.adSettings.headers.type">
    <template v-slot:description>{{
      initializationStore.localization.views.adSettings.descriptions.type  
    }}</template>
    <DocTypesTable />
  </Section>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { useInitializationStore } from "@/stores/initialization.store";
  import Section from "@/gnzs-controls/gnzs-section/gnzs-section.vue";
  import DocTypesTable from "@/components/DocTypesTable";
  
  const initializationStore = useInitializationStore();
  
  const localization = computed(() => initializationStore.localization);
  </script>
  
  <style lang="scss" module>
  @import "@/style.scss";
  </style>

<style lang="scss" scoped>
  @import "./table-style.scss";
</style>