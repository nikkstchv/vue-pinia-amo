<template>
  <div :class="$style.container">
    <GnzsHeader :mainTitle="localization.title" :mainRoute="getMainRoute"
      :currentTitle="localization.views.newOrganization.headers.text" :editableTitle="isEditableTitle"
      :isFullScreen="true" @onSaveCurrentTitle="onSaveResourceTitle">
      <template #buttons>
        <GnzsButton type="cancel" @click="onHeaderBtnCancelClick">{{
            getHeaderBtnCancelText
        }}</GnzsButton>
        <GnzsButton type="primary" @click="onAddClick">{{ getHeaderBtnPrimaryText }}</GnzsButton>
      </template>
    </GnzsHeader>
    <Section>
      <div :class="$style.orgHeader">{{ localization.views.newOrganization.headers.text }}</div>
      <div :class="$style.orgDescription">{{ localization.views.newOrganization.description }}</div>
      <div :class="$style.inputContainer">
        <div :class="$style.orgColumn">
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.name }}</div>
            <GnzsInput v-model="newItem.name" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.inn }}</div>
            <GnzsInput v-model="newItem.inn" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.kpp }}</div>
            <GnzsInput v-model="newItem.kpp" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.ogrn }}</div>
            <GnzsInput v-model="newItem.ogrn" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.signatory_position }}</div>
            <GnzsInput v-model="newItem.signatory_position" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.signatory_name }}</div>
            <GnzsInput v-model="newItem.signatory_name" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.signatory_short_name }}</div>
            <GnzsInput v-model="newItem.signatory_short_name" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.accountant_fio }}</div>
            <GnzsInput v-model="newItem.accountant_fio" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.based_on }}</div>
            <GnzsInput v-model="newItem.based_on" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.signatory_fio }}</div>
            <GnzsInput v-model="newItem.signatory_fio" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
        </div>
        <div :class="$style.orgColumn">
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.power_of_attorney }}</div>
            <GnzsInput v-model="newItem.power_of_attorney" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.power_of_attorney_date }}</div>
            <GnzsInput v-model="newItem.power_of_attorney_date" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.legal_address }}</div>
            <GnzsInput v-model="newItem.legal_address" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.postal_address }}</div>
            <GnzsInput v-model="newItem.postal_address" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.other_address }}</div>
            <GnzsInput v-model="newItem.other_address" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.certificate_number }}</div>
            <GnzsInput v-model="newItem.certificate_number" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.certificate_date }}</div>
            <GnzsInput v-model="newItem.certificate_date" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.phone_number }}</div>
            <GnzsInput v-model="newItem.phone_number" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.email }}</div>
            <GnzsInput v-model="newItem.email" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.web }}</div>
            <GnzsInput v-model="newItem.web" :class="[$style.inputName, $style.orgInput]" positive-only />
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
