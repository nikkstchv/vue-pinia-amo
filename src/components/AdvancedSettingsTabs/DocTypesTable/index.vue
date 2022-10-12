<template>
  <div class="">
    <div :class="[$style.root, $style.bots]">
      <div v-for="item in items" :key="item.id">
        <DocTypeRow :type-name="item.name" :type-id="item.id"/>
      </div>
    </div>

    <div :class="$style.rowFlex" v-if="!isAddMode">
      <GnzsButton :type="`append`" @click="itemAddModeToggle()">{{
        localization.components.typeTemplate.buttons.message.add
      }}</GnzsButton>
    </div>
    <div v-else>
      <div :class="$style.addDescription"></div>
      <div :class="$style.rowFlex">
        <GnzsInput
          :class="[$style.typeInput]"
          v-model="inputValue"
          positive-only
          :placeholder="localization.components.typeTemplate.buttons.descriptionInput"
        />
        <GnzsButton @click="addItem()"
          >{{ localization.components.typeTemplate.buttons.button.add }}
        </GnzsButton>
        <GnzsButton @click="itemAddModeToggle()" :type="`cancel`">
          {{ localization.components.typeTemplate.buttons.button.cancel }}
        </GnzsButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useInitializationStore } from "@/stores/initialization.store";
import { useDocTypeStore } from "@/stores/doctype.store";

import GnzsSpinner from "@/gnzs-controls/gnzs-spinner/gnzs-spinner.vue";
import GnzsButton from "@/gnzs-controls/gnzs-button/gnzs-button.vue";
import GnzsInput from "@/gnzs-controls/gnzs-input/gnzs-input.vue";
import DocTypeRow from "@/components/AdvancedSettingsTabs/DocTypeRow";


import { storeToRefs } from "pinia";

const initializationStore = useInitializationStore();
const localization = computed(() => initializationStore.localization);

const { items, isAddMode, inputValue } = storeToRefs(useDocTypeStore());
const { addItem, itemAddModeToggle, loadItems } = useDocTypeStore();

onMounted(async () => {
  return await loadItems();
});

</script>

<style lang="scss" module>
@import "./style.scss";
</style>