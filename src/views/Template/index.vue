<template>
  <div :class="$style.container">
    <GnzsHeader :fixed="isItemChanged" :mainTitle="localization.title" :mainRoute="getMainRoute"
      :currentTitle="getCurrentTitle(routeId)" :editableTitle="false" :isFullScreen="true">
      <template #buttons>
        <GnzsButton type="cancel" @click="onCancelClick">{{
            !isItemChanged ? localization.buttons.back : localization.buttons.cancel
        }}</GnzsButton>
        <GnzsButton :disabled="!isItemChanged" type="primary" @click="onSaveClick">{{ localization.buttons.save }}
        </GnzsButton>
      </template>
    </GnzsHeader>
    <Section>
      <div :class="$style.orgHeader">{{ localization.views.template.description }}</div>
      <div :class="$style.inputContainer">
        <div :class="$style.orgColumn">
          <div :class="$style.inputWrapper">

            <div :class="$style.rowFlex">
              <div :class="$style.inputDesc">{{ localization.views.newTemplate.inputs.name }}</div>
              <GnzsInput v-model="currItem.name" :class="[$style.inputName, $style.orgInput]" positive-only />
            </div>

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
              <GnzsInput v-model="currItem.nextNumber" :class="[$style.inputName, $style.orgInput]" positive-only />
            </div>

            <div :class="$style.rowFlex">
              <div :class="$style.inputDesc">{{ localization.views.newTemplate.inputs.number_length }}</div>
              <GnzsInput v-model="currItem.numberLength" :class="[$style.inputName, $style.orgInput]" positive-only />
            </div>

            <div :class="$style.rowFlex">
              <div :class="$style.inputDesc">{{ localization.views.newTemplate.inputs.url }}</div>
              <GnzsInput v-model="currItem.url" :class="[$style.inputName, $style.orgInput]" positive-only />
            </div>

            <div :class="$style.rowFlex">
              <div :class="$style.inputDesc">{{ localization.views.newTemplate.inputs.is_active }}</div>
              <GnzsSwitcher v-model="currItem.isActive" :class="[$style.inputName, $style.orgInput]" positive-only />
            </div>

            <div :class="$style.rowFlex">
              <div :class="$style.inputDesc">{{ localization.views.newTemplate.inputs.document_type }}</div>
              <GnzsDropdown :items="typesList" v-model="currItem.documentType"
                :class="[$style.inputName, $style.orgInput]" positive-only />
            </div>

            <div :class="$style.rowFlex">
              <GnzsCheckBox :label="localization.views.newTemplate.inputs.required_sign"
                v-model="currItem.requiredSign" />
            </div>

          </div>
        </div>
      </div>
      <GnzsButton v-if="editMode" :type="`remove`" @click="onRemoveClick">
        {{ localization.views.template.buttons.delete }}
      </GnzsButton>
    </Section>
  </div>

</template>

<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { computed } from "@vue/reactivity";

import { useIframeStore } from "@/stores/iframeStore";
import { useHeaderStore } from "@/stores/headerStore";
import { useDocTypeStore } from "@/stores/docTypeStore"
import { useDocTemplateStore } from "@/stores/docTemplateStore";
import { useInitializationStore } from "@/stores/initializationStore";

import PATHS from "@/router/paths"

import GnzsInput from "@/gnzs-controls/gnzs-input/gnzs-input.vue";
import Section from "@/gnzs-controls/gnzs-section/gnzs-section.vue";
import GnzsHeader from "@/gnzs-controls/gnzs-header/gnzs-header.vue";
import GnzsButton from "@/gnzs-controls/gnzs-button/gnzs-button.vue";
import GnzsCheckBox from "@/gnzs-controls/gnzs-checkbox/gnzs-checkbox.vue";
import GnzsDropdown from "@/gnzs-controls/gnzs-dropdown/gnzs-dropdown.vue";
import GnzsSwitcher from '@/gnzs-controls/gnzs-switcher/gnzs-switcher.vue';

const route = useRoute();
const routeId = +route.params.id;

const { getCurrentTitle, currItem, editMode, isItemChanged } = storeToRefs(useDocTemplateStore());

const { loadItems, saveItem, setItemCopy, setCurrItem, setEditMode, cancelItemChanges, addItem, browserConfirm } = useDocTemplateStore();
const { setCurrentRouteId, isNotMainPage, goToMainRoute } = useHeaderStore();
const { openConfirmModal } = useIframeStore();
const { items } = useDocTypeStore()

const typesList = items.map(item => ({
  value: item.id,
  title: item.name
}))

// computed
const localization = computed(() => useInitializationStore().localization);
const getMainRoute = computed(() => isNotMainPage ? PATHS.ADVANCED_SETTINGS.name : "");


const onCancelClick = () => {
  if (!isItemChanged.value) {
    goToMainRoute();
  } else {
    cancelItemChanges()
  }
}

const onSaveClick = () => {
  if (currItem.value && editMode.value) {
    saveItem(routeId, currItem.value);
  } else {
    addItem();
    goToMainRoute();
  }
}

const onRemoveClick = () => {
  console.log('%cisInsideAmo line:136 object', 'color: #007acc;', useInitializationStore().isInsideAmo);
  if (useInitializationStore().isInsideAmo) {
    openConfirmModal({
      name: '',
      id: routeId,
      confirmEventName: 'deleteTemplate',
      text: localization.value.confirm.deleteQuestion.template,
      declineText: localization.value.buttons.cancel,
      acceptText: localization.value.buttons.yes
    });
  } else {
    browserConfirm({
      name: '',
      id: routeId,
      confirmEventName: 'deleteTemplate',
      text: localization.value.confirm.deleteQuestion.template,
      declineText: localization.value.buttons.cancel,
      acceptText: localization.value.buttons.yes
    })
  }
}

onMounted(() => {
  loadItems()
  setCurrentRouteId(routeId)
  setEditMode()
  setCurrItem()
  setItemCopy()
})

</script>

<style lang="scss" module>
@import './style.scss';
</style>