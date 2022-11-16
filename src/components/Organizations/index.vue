<template>
  <Section :header="localization.views.adSettings.headers.organizations">
    <template v-slot:description>{{
        localization.views.adSettings.descriptions.organizations
    }}</template>
    <OrganizationTable />
  </Section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useInitializationStore } from "@/stores/initializationStore";
import Section from "@/gnzs-controls/gnzs-section/gnzs-section.vue";
import OrganizationTable from "@/components/OrganizationTable";

const initializationStore = useInitializationStore();
const localization = computed(() => initializationStore.localization);
</script>
  
<style lang="scss" module>
@import "@/style.scss";
</style>

<style lang="scss" scoped>
@import "./table-style.scss";
</style>