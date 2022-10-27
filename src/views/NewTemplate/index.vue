<template>
  <div :class="$style.container">
    <GnzsHeader :mainTitle="localization.title" :mainRoute="getMainRoute"
      :currentTitle="localization.views.newTemplate.headers.text" :editableTitle="false" :isFullScreen="true"
      @onSaveCurrentTitle="onSaveResourceTitle">
      <template #buttons>
        <GnzsButton type="cancel" @click="onHeaderBtnCancelClick">{{
            getHeaderBtnCancelText
        }}</GnzsButton>
        <GnzsButton type="primary" @click="onAddClick">{{ getHeaderBtnPrimaryText }}</GnzsButton>
      </template>
    </GnzsHeader>
    <Section>
      <div :class="$style.orgHeader">{{ localization.views.newTemplate.headers.text }}</div>
      <div :class="$style.orgDescription">{{ localization.views.newTemplate.description }}</div>
      <hr :class="$style.gnzsHr" />
      <div :class="$style.inputContainer">
        <div :class="$style.orgColumn">
          <div :class="$style.inputWrapper">
            <div :class="$style.inputSection">{{ localization.views.newTemplate.inputs.name }}</div>
            <GnzsInput v-model="newItem.name" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <GnzsCheckBox :label="localization.views.newTemplate.inputs.required_sign" />
          
          <hr :class="$style.gnzsHr" />

          <div :class="$style.inputWrapper">
            <div :class="$style.inputSection">{{ localization.views.newTemplate.section.numbering }}</div>
            <div :class="$style.rowFlex">
              <div :class="$style.inputDesc">{{ localization.views.newTemplate.inputs.prefix }}</div>
              <GnzsInput v-model="newItem.prefix" :class="[$style.inputName, $style.orgInput]" positive-only />
            </div>
            <div :class="$style.rowFlex">
              <div :class="$style.inputDesc">{{ localization.views.newTemplate.inputs.suffix }}</div>
              <GnzsInput v-model="newItem.suffix" :class="[$style.inputName, $style.orgInput]" positive-only />
            </div>
            <div :class="$style.rowFlex">
              <div :class="$style.inputDesc">{{ localization.views.newTemplate.inputs.next_number }}</div>
              <GnzsInput v-model="newItem.next_number" :class="[$style.inputName, $style.orgInput]" positive-only />
            </div>
          </div>

          <hr :class="$style.gnzsHr" />

          <div :class="$style.inputWrapper">
            <div :class="$style.inputSection">{{ localization.views.newTemplate.section.lead_data }}</div>
            <div :class="$style.rowFlex">
              <div :class="$style.inputDesc">{{ localization.views.newTemplate.inputs.doc_number }}</div>
              <GnzsInput v-model="newItem.kpp" :class="[$style.inputName, $style.orgInput]" positive-only />
            </div>
            <div :class="$style.rowFlex">
              <div :class="$style.inputDesc">{{ localization.views.newTemplate.inputs.doc_date }}</div>
              <GnzsInput v-model="newItem.kpp" :class="[$style.inputName, $style.orgInput]" positive-only />
            </div>
          </div>
        </div>
      </div>
    </Section>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { computed } from "@vue/reactivity";
import { useRoute } from 'vue-router';

import { useHeaderStore } from "@/stores/header.store";
import { useOrganizationsStore } from "@/stores/organizations.store";
import { useInitializationStore } from "@/stores/initialization.store";

import Section from "@/gnzs-controls/gnzs-section/gnzs-section.vue";
import GnzsHeader from "@/gnzs-controls/gnzs-header/gnzs-header.vue";
import GnzsButton from "@/gnzs-controls/gnzs-button/gnzs-button.vue";
import GnzsInput from "@/gnzs-controls/gnzs-input/gnzs-input.vue";
import GnzsCheckBox from "@/gnzs-controls/gnzs-checkbox/gnzs-checkbox.vue";



import PATHS from "@/router/paths"

const localization = computed(() => initializationStore.localization);

const { isNotMainPage, isNewOrganizationPage, setCurrentRouteId, goToMainRoute, onSaveResourceTitle } = useHeaderStore();
const initializationStore = useInitializationStore();

const { addItem } = useOrganizationsStore();

const { newItem } = storeToRefs(useOrganizationsStore());


const route = useRoute();
const routeId = +route.params.id;

const getMainRoute = computed(() => isNotMainPage ? PATHS.ADVANCED_SETTINGS.name : "");
const isEditableTitle = computed(() => isNotMainPage && !isNewOrganizationPage ? true : false);
const getHeaderBtnCancelText = computed(() => initializationStore.localization.buttons.cancel);
const getHeaderBtnPrimaryText = computed(() => initializationStore.localization.buttons.save);

const onAddClick = () => {
  addItem();
  goToMainRoute();
}

onMounted(() => {
  setCurrentRouteId(routeId)
})
</script>

<style lang="scss" module>
@import "./style.scss";
</style>
