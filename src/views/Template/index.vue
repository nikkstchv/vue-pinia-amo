<template>
  <div :class="$style.container">
    <GnzsHeader :mainTitle="localization.title" :mainRoute="getMainRoute" :currentTitle="getCurrentTitle(routeId)"
      :editableTitle="false" :isFullScreen="true">
      <template #buttons>
        <GnzsButton type="cancel" @click="goToMainRoute">{{
            getHeaderBtnCancelText
        }}</GnzsButton>
        <GnzsButton type="primary" @click="onSaveClick">{{ getHeaderBtnPrimaryText }}</GnzsButton>
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
            <GnzsInput v-model="currItem.name" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <GnzsCheckBox :label="localization.views.newTemplate.inputs.required_sign" v-model="currItem.required_sign" />

          <hr :class="$style.gnzsHr" />

          <div :class="$style.inputWrapper">
            <div :class="$style.inputSection">{{ localization.views.newTemplate.section.numbering }}</div>
            <div :class="$style.rowFlex">
              <div :class="$style.inputDesc">{{ localization.views.newTemplate.inputs.prefix }}</div>
              <GnzsInput v-model="currItem.prefix" :class="[$style.inputName, $style.orgInput]" positive-only />
            </div>
            <div :class="$style.rowFlex">
              <div :class="$style.inputDesc">{{ localization.views.newTemplate.inputs.suffix }}</div>
              <GnzsInput v-model="currItem.suffix" :class="[$style.inputName, $style.orgInput]" positive-only />
            </div>
            <div :class="$style.rowFlex">
              <div :class="$style.inputDesc">{{ localization.views.newTemplate.inputs.next_number }}</div>
              <GnzsInput v-model="currItem.next_number" :class="[$style.inputName, $style.orgInput]" positive-only />
            </div>
          </div>

          <hr :class="$style.gnzsHr" />

          <div :class="$style.inputWrapper">
            <div :class="$style.inputSection">{{ localization.views.newTemplate.section.lead_data }}</div>
            <div :class="$style.rowFlex">
              <div :class="$style.inputDesc">{{ localization.views.newTemplate.inputs.doc_number }}</div>
              <GnzsInput v-model="currItem.doc_number" :class="[$style.inputName, $style.orgInput]" positive-only />
            </div>
            <div :class="$style.rowFlex">
              <div :class="$style.inputDesc">{{ localization.views.newTemplate.inputs.doc_date }}</div>
              <GnzsInput v-model="currItem.doc_date" :class="[$style.inputName, $style.orgInput]" positive-only />
            </div>
          </div>
        </div>
      </div>
      <hr :class="$style.gnzsHr" />
      <GnzsButton :type="`remove`" @click="onRemoveClick">
        {{ localization.views.template.buttons.delete }}
      </GnzsButton>
    </Section>
  </div>

</template>

<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { computed } from "@vue/reactivity";
import { useRoute } from 'vue-router';

import { useHeaderStore } from "@/stores/header.store";
import { useDocTemplateStore } from "@/stores/doctemplate.store";
import { useInitializationStore } from "@/stores/initialization.store";

import Section from "@/gnzs-controls/gnzs-section/gnzs-section.vue";
import GnzsHeader from "@/gnzs-controls/gnzs-header/gnzs-header.vue";
import GnzsButton from "@/gnzs-controls/gnzs-button/gnzs-button.vue";
import GnzsInput from "@/gnzs-controls/gnzs-input/gnzs-input.vue";


import PATHS from "@/router/paths"
import { useIframeStore } from '@/stores/iframe.store';

const localization = computed(() => initializationStore.localization);

const { getCurrentTitle } = storeToRefs(useDocTemplateStore());
const { loadItems, getCurrentItem } = useDocTemplateStore();

const { openConfirmModal } = useIframeStore();

const { setCurrentRouteId, isNotMainPage, goToMainRoute } = useHeaderStore();
const initializationStore = useInitializationStore();

const { saveItem } = useDocTemplateStore();

const route = useRoute();
const routeId = +route.params.id;
const currItem = getCurrentItem(routeId);

const getMainRoute = computed(() => isNotMainPage ? PATHS.ADVANCED_SETTINGS.name : "");
const getHeaderBtnCancelText = computed(() => initializationStore.localization.buttons.cancel);
const getHeaderBtnPrimaryText = computed(() => initializationStore.localization.buttons.save);

const onSaveClick = () => {
  if (currItem) {
    saveItem(routeId, currItem);
    goToMainRoute();
  }
}

const onRemoveClick = async () => {
  await openConfirmModal({
    name: '',
    id: routeId,
    confirmEventName: 'deleteTemplate',
    text: localization.value.confirm.deleteQuestion.type,
    declineText: localization.value.buttons.cancel,
    acceptText: localization.value.buttons.yes
  });
}

onMounted(() => {
  loadItems()
  setCurrentRouteId(routeId)
})

</script>

<style lang="scss" module>
@import './style.scss';
</style>