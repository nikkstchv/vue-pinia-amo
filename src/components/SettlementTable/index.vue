<template>
  <div :class="$style.main">
    <div :class="$style.orgHeader">
      {{ initializationStore.localization.views.adSettings.headers.settlement }}
    </div>
    <div v-if="!isLoad">
      <div v-for="item in items" :key="item.id">
        <SettlementEditor
          :item-id="item.id"
          @save-click="updateItem(item.id, $event)"
        />
      </div>
    </div>
    <GnzsSpinner v-else="isLoad" :class="$style.settlementSpinner"/>
  </div>
  <div :class="$style.rowFlex" v-if="!isAddMode">
    <GnzsButton
      :class="$style.addButton"
      :type="`append`"
      @click="addItemButtonClick()"
      >{{ localization.buttons.append }}</GnzsButton
    >
  </div>
  <SettlementEditor
    v-if="isAddMode"
    :is-add-mode="isAddMode"
    @save-click="addItem"
    @add-mode-toggle="itemAddModeToggle()"
  />
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useInitializationStore } from "@/stores/initializationStore";
import { useSettlementStore } from "@/stores/settlementStore";

import SettlementEditor from "@/components/SettlementEditor";
import GnzsSpinner from "@/gnzs-controls/gnzs-spinner/gnzs-spinner.vue";
import GnzsButton from "@/gnzs-controls/gnzs-button/gnzs-button.vue";
import type { Settlement } from "@/types/settlement.types";

const {
  addItem,
  setCurrItemAsNew,
  setItemCopy,
  updateItem,
  itemAddModeToggle,
  loadItems,
} = useSettlementStore();
const { isAddMode, isLoad } = storeToRefs(useSettlementStore());

const initializationStore = useInitializationStore();

const props = defineProps({
  items: {
    type: Array<Settlement>,
    required: true,
  },
});

// computed
const localization = computed(() => initializationStore.localization);

const addItemButtonClick = () => {
  itemAddModeToggle();
  // setCurrItemAsNew();
  // setItemCopy();
};

onMounted(async () => {
  await loadItems();
});
</script>

<style lang="scss" module>
@import "./style.scss";
</style>
s
