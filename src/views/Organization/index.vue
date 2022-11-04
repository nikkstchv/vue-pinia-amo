<template>
  <div :class="$style.container">
    <GnzsHeader :mainTitle="localization.title" :mainRoute="getMainRoute" :currentTitle="getCurrentTitle(routeId)"
      :editableTitle="false" :isFullScreen="true">
      <template #buttons>
        <GnzsButton v-if="isItemChanged" type="cancel" @click="goToMainRoute">{{
            localization.buttons.back
        }}</GnzsButton>
        <GnzsButton v-else type="cancel" @click="cancelItemChanges">{{
            localization.buttons.cancel
        }}</GnzsButton>
        <GnzsButton :disabled="isItemChanged" type="primary" @click="onSaveClick">{{ localization.buttons.save }}
        </GnzsButton>
      </template>
    </GnzsHeader>
    <Section>
      <div :class="$style.orgHeader">{{ localization.views.organization.description }}</div>
      <div :class="$style.inputContainer" v-if="currItem">
        <div :class="$style.orgColumn">
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.name }}</div>
            <GnzsInput v-model="currItem.name" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.inn }}</div>
            <GnzsInput v-model="currItem.inn" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.kpp }}</div>
            <GnzsInput v-model="currItem.kpp" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.ogrn }}</div>
            <GnzsInput v-model="currItem.ogrn" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.signatory_position }}</div>
            <GnzsInput v-model="currItem.signatory_position" :class="[$style.inputName, $style.orgInput]"
              positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.signatory_name }}</div>
            <GnzsInput v-model="currItem.signatory_name" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.signatory_short_name }}</div>
            <GnzsInput v-model="currItem.signatory_short_name" :class="[$style.inputName, $style.orgInput]"
              positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.accountant_fio }}</div>
            <GnzsInput v-model="currItem.accountant_fio" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.based_on }}</div>
            <GnzsInput v-model="currItem.based_on" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.signatory_fio }}</div>
            <GnzsInput v-model="currItem.signatory_fio" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
        </div>
        <div :class="$style.orgColumn">
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.power_of_attorney }}</div>
            <GnzsInput v-model="currItem.power_of_attorney" :class="[$style.inputName, $style.orgInput]"
              positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.power_of_attorney_date }}</div>
            <GnzsInput v-model="currItem.power_of_attorney_date" :class="[$style.inputName, $style.orgInput]"
              positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.legal_address }}</div>
            <GnzsInput v-model="currItem.legal_address" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.postal_address }}</div>
            <GnzsInput v-model="currItem.postal_address" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.other_address }}</div>
            <GnzsInput v-model="currItem.other_address" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.certificate_number }}</div>
            <GnzsInput v-model="currItem.certificate_number" :class="[$style.inputName, $style.orgInput]"
              positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.certificate_date }}</div>
            <GnzsInput v-model="currItem.certificate_date" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.phone_number }}</div>
            <GnzsInput v-model="currItem.phone_number" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.email }}</div>
            <GnzsInput v-model="currItem.email" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.views.newOrganization.inputs.web }}</div>
            <GnzsInput v-model="currItem.web" :class="[$style.inputName, $style.orgInput]" positive-only />
          </div>
        </div>
      </div>

      <GnzsButton :type="`remove`" @click="onRemoveClick">
        {{ localization.views.organization.buttons.delete }}
      </GnzsButton>
    </Section>
  </div>

</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { computed } from "@vue/reactivity";

import { useIframeStore } from "@/stores/iframe.store";
import { useHeaderStore } from "@/stores/header.store";
import { useOrganizationsStore } from "@/stores/organizations.store";
import { useInitializationStore } from "@/stores/initialization.store";

import GnzsInput from "@/gnzs-controls/gnzs-input/gnzs-input.vue";
import Section from "@/gnzs-controls/gnzs-section/gnzs-section.vue";
import GnzsHeader from "@/gnzs-controls/gnzs-header/gnzs-header.vue";
import GnzsButton from "@/gnzs-controls/gnzs-button/gnzs-button.vue";

import PATHS from "@/router/paths"

const route = useRoute()
const routeId = +route.params.id

const { loadItems, saveItem, getCurrentTitle, setItemCopy, setCurrItem, cancelItemChanges } = useOrganizationsStore()
const { setCurrentRouteId, isNotMainPage, goToMainRoute } = useHeaderStore()
const { openConfirmModal } = useIframeStore()

const { currItem, isItemChanged } = storeToRefs(useOrganizationsStore())

// computed
const localization = computed(() => useInitializationStore().localization)
const getMainRoute = computed(() => isNotMainPage ? PATHS.ADVANCED_SETTINGS.name : "")

const onSaveClick = () => {
  if (currItem.value) {
    saveItem(routeId, currItem.value);
  }
}

const onRemoveClick = () => {
  openConfirmModal({
    name: "",
    id: routeId,
    confirmEventName: 'deleteOrganization',
    text: localization.value.confirm.deleteQuestion.organization,
    declineText: localization.value.buttons.cancel,
    acceptText: localization.value.buttons.yes
  });
}

onMounted(async () => {
  await loadItems()
  setCurrentRouteId(routeId)
  setCurrItem()
  setItemCopy()
})

</script>

<style lang="scss" module>
@import './style.scss';
</style>