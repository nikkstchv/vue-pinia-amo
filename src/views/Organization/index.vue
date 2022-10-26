<template>
  <div :class="$style.main">
    <GznsHeader :fixed="isChanged" :mainTitle="getMainTitle" />
    <Section :header="localization.views.organization.headers.text">
      <template v-slot:description>{{localization.views.organization.description}}</template>
      <OrganizationTemplate />
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

//     Устанавливаем имя роута (необходимо для корректной работы GnzsHeader)
//     this.$store.dispatch("header/setCurrentRouteName", this.$route.name);

</script>

<style lang="scss" module>
@import "./style.scss";
</style>
