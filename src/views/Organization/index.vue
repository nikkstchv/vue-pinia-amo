<template>
  <div :class="$style.container" v-if="!isCurrentLoad">
    <GnzsHeader
      :fixed="isItemChanged"
      :mainTitle="localization.title"
      :mainRoute="getMainRoute"
      :currentTitle="getCurrentTitle(routeId)"
      :editableTitle="false"
      :isFullScreen="true"
    >
      <template #buttons>
        <GnzsButton type="cancel" @click="onCancelClick">{{
          !isItemChanged
            ? localization.buttons.back
            : localization.buttons.cancel
        }}</GnzsButton>
        <GnzsButton
          :disabled="!isItemChanged"
          type="primary"
          @click="onSaveClick"
          >{{ localization.buttons.save }}
        </GnzsButton>
      </template>
    </GnzsHeader>
    <Section>
      <div :class="$style.orgHeader">
        {{ localization.views.organizations.description }}
      </div>
      <div :class="$style.inputContainer">
        <div :class="$style.orgColumn">
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">
              {{ localization.views.newOrganization.inputs.name }}
            </div>
            <GnzsInput
              v-model="currItem.name"
              :class="[$style.inputName, $style.orgInput]"
            />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">
              {{ localization.views.newOrganization.inputs.inn }}
            </div>
            <GnzsInput
              v-model="currItem.inn"
              :class="[$style.inputName, $style.orgInput]"
            />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">
              {{ localization.views.newOrganization.inputs.kpp }}
            </div>
            <GnzsInput
              v-model="currItem.kpp"
              :class="[$style.inputName, $style.orgInput]"
            />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">
              {{ localization.views.newOrganization.inputs.ogrn }}
            </div>
            <GnzsInput
              v-model="currItem.ogrn"
              :class="[$style.inputName, $style.orgInput]"
            />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">
              {{ localization.views.newOrganization.inputs.signatory_position }}
            </div>
            <GnzsInput
              v-model="currItem.signatoryPosition"
              :class="[$style.inputName, $style.orgInput]"
            />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">
              {{ localization.views.newOrganization.inputs.signatory_name }}
            </div>
            <GnzsInput
              v-model="currItem.signatoryName"
              :class="[$style.inputName, $style.orgInput]"
            />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">
              {{
                localization.views.newOrganization.inputs.signatory_short_name
              }}
            </div>
            <GnzsInput
              v-model="currItem.signatoryShortName"
              :class="[$style.inputName, $style.orgInput]"
            />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">
              {{ localization.views.newOrganization.inputs.accountant_fio }}
            </div>
            <GnzsInput
              v-model="currItem.accountantFio"
              :class="[$style.inputName, $style.orgInput]"
            />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">
              {{ localization.views.newOrganization.inputs.based_on }}
            </div>
            <GnzsInput
              v-model="currItem.basedOn"
              :class="[$style.inputName, $style.orgInput]"
            />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">
              {{ localization.views.newOrganization.inputs.signatory_fio }}
            </div>
            <GnzsInput
              v-model="currItem.signatoryFio"
              :class="[$style.inputName, $style.orgInput]"
            />
          </div>
        </div>
        <div :class="$style.orgColumn">
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">
              {{ localization.views.newOrganization.inputs.power_of_attorney }}
            </div>
            <GnzsInput
              v-model="currItem.powerOfAttorney"
              :class="[$style.inputName, $style.orgInput]"
            />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">
              {{
                localization.views.newOrganization.inputs.power_of_attorney_date
              }}
            </div>
            <GnzsInput
              v-model="currItem.powerOfAttorneyDate"
              :class="[$style.inputName, $style.orgInput]"
            />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">
              {{ localization.views.newOrganization.inputs.legal_address }}
            </div>
            <GnzsInput
              v-model="currItem.legalAddress"
              :class="[$style.inputName, $style.orgInput]"
            />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">
              {{ localization.views.newOrganization.inputs.postal_address }}
            </div>
            <GnzsInput
              v-model="currItem.postalAddress"
              :class="[$style.inputName, $style.orgInput]"
            />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">
              {{ localization.views.newOrganization.inputs.other_address }}
            </div>
            <GnzsInput
              v-model="currItem.otherAddress"
              :class="[$style.inputName, $style.orgInput]"
            />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">
              {{ localization.views.newOrganization.inputs.certificate_number }}
            </div>
            <GnzsInput
              v-model="currItem.certificateNumber"
              :class="[$style.inputName, $style.orgInput]"
            />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">
              {{ localization.views.newOrganization.inputs.certificate_date }}
            </div>
            <GnzsInput
              v-model="currItem.certificateDate"
              :class="[$style.inputName, $style.orgInput]"
            />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">
              {{ localization.views.newOrganization.inputs.phone_number }}
            </div>
            <GnzsInput
              v-model="currItem.phoneNumber"
              :class="[$style.inputName, $style.orgInput]"
            />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">
              {{ localization.views.newOrganization.inputs.email }}
            </div>
            <GnzsInput
              v-model="currItem.email"
              :class="[$style.inputName, $style.orgInput]"
            />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">
              {{ localization.views.newOrganization.inputs.web }}
            </div>
            <GnzsInput
              v-model="currItem.web"
              :class="[$style.inputName, $style.orgInput]"
            />
          </div>
        </div>
      </div>
      <GnzsButton v-if="editMode" :type="`remove`" @click="onRemoveClick">
        {{ localization.views.organizations.buttons.delete }}
      </GnzsButton>
    </Section>
    <Section>
      <SettlementTable :items="getCurrItems(routeId)" />
    </Section>
  </div>
  <GnzsSpinner v-else="isCurrentLoad" />
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { computed } from "@vue/reactivity";

import { useIframeStore } from "@/stores/iframeStore";
import { useHeaderStore } from "@/stores/headerStore";
import { useSettlementStore } from "@/stores/settlementStore";
import { useOrganizationsStore } from "@/stores/organizationsStore";
import { useInitializationStore } from "@/stores/initializationStore";

import Section from "@/gnzs-controls/gnzs-section/gnzs-section.vue";
import GnzsHeader from "@/gnzs-controls/gnzs-header/gnzs-header.vue";
import GnzsButton from "@/gnzs-controls/gnzs-button/gnzs-button.vue";
import GnzsInput from "@/gnzs-controls/gnzs-input/gnzs-input.vue";
import GnzsSpinner from "@/gnzs-controls/gnzs-spinner/gnzs-spinner.vue";

import SettlementTable from "@/components/SettlementTable";

import PATHS from "@/router/paths";

const route = useRoute();
const routeId = +route.params.id;

const { getCurrItems } = storeToRefs(useSettlementStore());

const { getCurrentTitle, currItem, editMode, isItemChanged, isCurrentLoad } =
  storeToRefs(useOrganizationsStore());
const {
  saveItem,
  setItemCopy,
  setCurrItem,
  setEditMode,
  cancelItemChanges,
  addItem,
  setSettlementsList,
  browserConfirm,
} = useOrganizationsStore();
const { setCurrentRouteId, isNotMainPage, goToMainRoute } = useHeaderStore();
const { openConfirmModal } = useIframeStore();

// computed
const localization = computed(() => useInitializationStore().localization);
const getMainRoute = computed(() =>
  isNotMainPage ? PATHS.ADVANCED_SETTINGS.name : ""
);

//clicks
const onCancelClick = () => {
  if (!isItemChanged.value) {
    goToMainRoute();
  } else {
    cancelItemChanges();
  }
};

const onSaveClick = () => {
  if (currItem.value && editMode.value) {
    saveItem(routeId, currItem.value);
  } else {
    addItem();
    goToMainRoute();
  }
};

const onRemoveClick = () => {
  if (useInitializationStore().isInsideAmo) {
    openConfirmModal({
      name: "",
      id: routeId,
      confirmEventName: "deleteOrganization",
      text: localization.value.confirm.deleteQuestion.organizations,
      declineText: localization.value.buttons.cancel,
      acceptText: localization.value.buttons.yes,
    });
  } else {
    browserConfirm({
      id: routeId,
      text: localization.value.confirm.deleteQuestion.template,
    });
  }
};

onMounted(async () => {
  setCurrentRouteId(routeId);
  setEditMode();
  setCurrItem();
  setItemCopy();
  setSettlementsList();
});
</script>

<style lang="scss" module>
@import "./style.scss";
</style>
