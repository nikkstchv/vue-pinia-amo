<template>
  <div :class="$style.main">
    <div :class="$style.orgHeader">{{ initializationStore.localization.views.adSettings.headers.settlement }}</div>
    <div v-for="item in items" :key="item.id">
      <SettlementEditor :item="item" :item-name="item.name" :item-id="item.id" @save-click="updateItem(item.id, $event)"
        @remove-click="deleteItem(item.id, item.name)" />
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
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useInitializationStore } from "@/stores/initialization.store";
import { useSettlementStore } from "@/stores/settlement.store";
import { useIframeStore } from "@/stores/iframe.store";

import SettlementEditor from "@/components/SettlementEditor";
import GnzsButton from "@/gnzs-controls/gnzs-button/gnzs-button.vue";

const localization = computed(() => initializationStore.localization);

const { openConfirmModal } = useIframeStore();
const initializationStore = useInitializationStore();

const { items, isAddMode } = storeToRefs(useSettlementStore());
const { addItem, updateItem, itemAddModeToggle, loadItems } = useSettlementStore();

const addItemButtonClick = () => {
  itemAddModeToggle();
};

const deleteItem = (id, name) => {
  openConfirmModal({
    name: name,
    id: id,
    confirmEventName: 'deleteSettlement',
    text: localization.value.confirm.deleteQuestion.settlement,
    declineText: localization.value.buttons.cancel,
    acceptText: localization.value.buttons.yes
  });
}

onMounted(async () => {
  return await loadItems();
});
</script>

<style lang="scss" module>
@import "./style.scss";
</style>s