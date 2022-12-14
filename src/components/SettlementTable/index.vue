<template>
  <div :class="$style.main">
    <div :class="$style.orgHeader">{{ initializationStore.localization.views.adSettings.headers.settlement }}</div>
    <div v-for="item in items" :key="item.id">
      <SettlementEditor :item-id="item.id" @save-click="updateItem(item.id, $event)" />
    </div>
  </div>
  <div :class="$style.rowFlex" v-if="!isAddMode">
    <GnzsButton :class="$style.addButton" :type="`append`" @click="addItemButtonClick()">{{
        localization.buttons.append
    }}</GnzsButton>
  </div>
  <SettlementEditor v-if="isAddMode" :is-add-mode="isAddMode" @save-click="addItem"
    @add-mode-toggle="itemAddModeToggle()" />
</template>

<script setup>
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useInitializationStore } from "@/stores/initializationStore";
import { useSettlementStore } from "@/stores/settlementStore";
import { useIframeStore } from "@/stores/iframeStore";

import SettlementEditor from "@/components/SettlementEditor";
import GnzsButton from "@/gnzs-controls/gnzs-button/gnzs-button.vue";

const { addItem, setCurrItemAsNew, setItemCopy, updateItem, itemAddModeToggle, loadItems } = useSettlementStore();
const { isAddMode } = storeToRefs(useSettlementStore());

const initializationStore = useInitializationStore();
const { openConfirmModal } = useIframeStore();

const props = defineProps({
  items: {
    required: false
  }
});

// computed
const localization = computed(() => initializationStore.localization);

const addItemButtonClick = () => {
  itemAddModeToggle();
  setCurrItemAsNew();
  setItemCopy();
};

onMounted(async () => {
  await loadItems();
});
</script>

<style lang="scss" module>
@import "./style.scss";
</style>s