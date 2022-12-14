<template>
  <div class="">
    <div :class="[$style.root, $style.bots]">
      <div v-for="item in items" :key="item.id">
        <GnzsNameEditor :item-name="item.name" :item-id="item.id" @save-click="updateItem(item.id, $event)"
          @remove-click="deleteItem(item.id, item.name)" />
      </div>
    </div>

    <div :class="$style.rowFlex" v-if="!isAddMode">
      <GnzsButton :class="$style.addButton" :type="`append`" @click="addTypeButtonClick()">{{
          localization.components.typeTemplate.buttons.message.add
      }}</GnzsButton>
    </div>
    <GnzsNameEditor v-if="isAddMode" :is-add-mode="isAddMode" @save-click="addItem"
      @add-mode-toggle="itemAddModeToggle()" @focusout="itemAddModeToggle()" />
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useInitializationStore } from "@/stores/initializationStore";
import { useDocTypeStore } from "@/stores/docTypeStore";
import { useIframeStore } from "@/stores/iframeStore";

import GnzsNameEditor from "@/gnzs-controls/gnzs-name-editor/gnzs-name-editor.vue";
import GnzsButton from "@/gnzs-controls/gnzs-button/gnzs-button.vue";

const localization = computed(() => initializationStore.localization);

const { openConfirmModal } = useIframeStore();
const initializationStore = useInitializationStore();

const { items, isAddMode } = storeToRefs(useDocTypeStore());
const { addItem, updateItem, itemAddModeToggle, loadItems, browserConfirm } = useDocTypeStore();

const addTypeButtonClick = () => {
  itemAddModeToggle();
};

const deleteItem = (id, name) => {
  if (useInitializationStore().isInsideAmo) {
  openConfirmModal({
    name: name,
    id: id,
    confirmEventName: 'deleteType',
    text: localization.value.confirm.deleteQuestion.type,
    declineText: localization.value.buttons.cancel,
    acceptText: localization.value.buttons.yes
  });
  } else {
    browserConfirm({
      name: '',
      id: id,
      confirmEventName: 'deleteType',
      text: localization.value.confirm.deleteQuestion.type,
      declineText: localization.value.buttons.cancel,
      acceptText: localization.value.buttons.yes
    })
  }
}

// onMounted(async () => {
//   return await loadItems();
// });
</script>

<style lang="scss" module>
@import "./style.scss";
</style>s