<template>
  <div :class="$style.main">
    <div :class="$style.orgHeader">{{ initializationStore.localization.views.adSettings.headers.settlement }}</div>
    <div v-for="item in currItemsList" :key="item.id">
      <SettlementEditor :item-id="item.id" :item-name="item.name" @save-click="updateItem(item.id, $event)"
        @remove-click="deleteItem(item.id)" />
    </div>
  </div>
  <div :class="$style.rowFlex" v-if="!isAddMode">
    <GnzsButton :class="$style.addButton" :type="`append`" @click="addItemButtonClick()">{{
        localization.buttons.append
    }}</GnzsButton>
  </div>
  <SettlementEditor v-if="isAddMode" :is-add-mode="isAddMode" @save-click="addItem"
    @add-mode-toggle="itemAddModeToggle()" @focusout="itemAddModeToggle()" />
</template>

<script setup>
import { computed, onMounted, toRaw } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from 'vue-router';


import { useInitializationStore } from "@/stores/initialization.store";
import { useOrganizationsStore } from "@/stores/organizations.store";
import { useSettlementStore } from "@/stores/settlement.store";
import { useIframeStore } from "@/stores/iframe.store";

import SettlementEditor from "@/components/SettlementEditor";
import GnzsButton from "@/gnzs-controls/gnzs-button/gnzs-button.vue";

const { addItem, updateItem, itemAddModeToggle, loadItems, setCurrItemsList } = useSettlementStore();
const { currItemsList, isAddMode } = storeToRefs(useSettlementStore());

const initializationStore = useInitializationStore();
const { openConfirmModal } = useIframeStore();

const route = useRoute()
const routeId = +route.params.id


// computed
const localization = computed(() => initializationStore.localization);
// const itemsList = computed(() => getCurrItems(currOrganization.id))

const addItemButtonClick = () => {
  itemAddModeToggle();
};

const deleteItem = (id) => {
  openConfirmModal({
    name: "",
    id: id,
    confirmEventName: 'deleteSettlement',
    text: localization.value.confirm.deleteQuestion.settlement,
    declineText: localization.value.buttons.cancel,
    acceptText: localization.value.buttons.yes
  });
}

onMounted(async () => {
  await loadItems();
  setCurrItemsList(routeId)
});
</script>

<style lang="scss" module>
@import "./style.scss";
</style>s