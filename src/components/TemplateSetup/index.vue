<template>
  <Section :header="initializationStore.localization.views.adSettings.headers.template">
    <template v-slot:description>{{
        initializationStore.localization.views.adSettings.descriptions.template
    }}</template>
    <TemplatesTable />
  </Section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useInitializationStore } from "@/stores/initializationStore";
import Section from "@/gnzs-controls/gnzs-section/gnzs-section.vue";
import TemplatesTable from "@/components/TemplatesTable";

const initializationStore = useInitializationStore();
</script>

<style lang="scss" module>
@import "@/style.scss";
</style>

<style lang="scss" scoped>
@import "./table-style.scss";
</style>