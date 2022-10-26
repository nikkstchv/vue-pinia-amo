<template>
 <div :class="$style.main">
   <Section :header="localization.views.newOrganization.headers.text">
   <template v-slot:description>{{localization.views.newOrganization.description}}</template>
    <OrganizationTemplate/>
   </Section>
 </div>
</template>

<script setup>
import { useInitializationStore } from "@/stores/initialization.store";
import { computed } from "@vue/reactivity";
import Section from "@/gnzs-controls/gnzs-section/gnzs-section.vue";
import OrganizationTemplate from "@/components/OrganizationTemplate";

const initializationStore = useInitializationStore();
const localization = computed(() => initializationStore.localization);
</script>

<style lang="scss" module>
  @import "./style.scss";
</style>
