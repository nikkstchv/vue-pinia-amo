<template>
  <div :class="$style.container">
    <Section :header="initializationStore.localization.components.documents.header">
      <DocumentsTable />
    </Section>
  </div>
</template>

<script setup lang="ts">
import Section from "@/gnzs-controls/gnzs-section/gnzs-section.vue";
import DocumentsTable from "@/components/DocumentsTable"
import { useInitializationStore } from "@/stores/initializationStore";

const initializationStore = useInitializationStore();

</script>

<style lang="scss" module>
@import "@/style.scss";
</style>