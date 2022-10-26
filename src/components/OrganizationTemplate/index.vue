<template>
  <!-- <GnzsHeader :mainTitle="getMainTitle" :mainRoute="getMainRoute" :currentTitle="getCurrentTitle(routeId)"
    :editableTitle="isEditableTitle" :isFullScreen="true" @onSaveCurrentTitle="onSaveResourceTitle">
    <template #buttons>
      <GnzsButton type="cancel" @click="onHeaderBtnCancelClick">{{
      getHeaderBtnCancelText }}</GnzsButton>
      <GnzsButton type="primary" :loading="isHeaderBtnPrimaryLoading" :disabled="isHeaderBtnPrimaryDisabled"
        @click="onHeaderBtnSaveClick">{{ getHeaderBtnPrimaryText }}</GnzsButton>
    </template>
  </GnzsHeader> -->
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

import { useHeaderStore } from "@/stores/header.store";
import { useOrganizationsStore } from "@/stores/organizations.store";
import { useInitializationStore } from '@/stores/initialization.store';

import GnzsHeader from "@/gnzs-controls/gnzs-header/gnzs-header.vue";
import GnzsButton from "@/gnzs-controls/gnzs-button/gnzs-button.vue";

import PATHS from "@/router/paths"

const { getCurrentTitle } = storeToRefs(useOrganizationsStore());

const { setCurrentRouteId, isMainPage, isOrganizationPage, isNotMainPage, onHeaderBtnCancelClick, onSaveResourceTitle } = useHeaderStore();
const initializationStore = useInitializationStore();


const route = useRoute();
const routeId = +route.params.id;

// computed
const getMainTitle = computed(() => {
  if (isMainPage) return initializationStore.localization.title;
  if (isOrganizationPage) return initializationStore.localization.menu.organizations;
  return "";
});
const getMainRoute = computed(() => isNotMainPage ? PATHS.ADVANCED_SETTINGS.name : "");
const isEditableTitle = computed(() => isNotMainPage ? true : false);
const getHeaderBtnCancelText = computed(() => initializationStore.localization.buttons.cancel);
const getHeaderBtnPrimaryText = computed(() => initializationStore.localization.buttons.save);



onMounted(() => {
  setCurrentRouteId(routeId)
})

</script>

<style lang="scss" module>
@import './style.scss';
</style>