<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: none">
      <symbol id="gnzs-docflow-icon__edit-pen" viewbox="0 0 10 10">
        <path fill="currentColor"
          d="M0 7.895V10h2.1l6.108-6.154-2.11-2.105L0 7.895zM9.834 2.24a.54.54 0 00.123-.177.544.544 0 000-.42.54.54 0 00-.123-.177L8.535.166a.54.54 0 00-.178-.123.54.54 0 00-.424 0 .54.54 0 00-.178.123L6.776 1.2l2.11 2.073.94-1.056.006.032z">
        </path>
      </symbol>
    </svg>
    <div :class="[$style.item, $style.current]" v-show="!isEditMode && !props.isAddMode">
      <div :class="[$style.name]" data-code="name">
        {{ props.itemName }}
      </div>
      <div :class="$style.editButton" @click="onEditClick">
        <svg>
          <use xlink:href="#gnzs-docflow-icon__edit-pen"></use>
        </svg>
      </div>
    </div>
    <transition name="fade">
      <div :class="[$style.edit]" ref="edit" tabindex="-1" @focusout="focusOut" v-if="isEditMode || props.isAddMode">
        <div :class="$style.orgColumn">
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.components.settlements.inputs.name }}</div>
            <GnzsInput v-model="currItem.name" :class="[$style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.components.settlements.inputs.bank_name }}</div>
            <GnzsInput v-model="currItem.bank_name" :class="[$style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.components.settlements.inputs.correspondent_account }}</div>
            <GnzsInput v-model="currItem.correspondent_account" :class="[$style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.components.settlements.inputs.bic }}</div>
            <GnzsInput v-model="currItem.bic" :class="[$style.orgInput]" positive-only />
          </div>
          <div :class="$style.inputWrapper">
            <div :class="$style.inputTitle">{{ localization.components.settlements.inputs.settlement_account }}</div>
            <GnzsInput v-model="currItem.settlement_account" :class="[$style.orgInput]" positive-only />
          </div>
          <!-- ========================== buttons ======================= -->
          <div :class="$style.buttons">
            <GnzsButton v-if="!props.isAddMode" :class="$style.removeBtn" @mousedown="$emit('removeClick')"
              :type="`remove`">
              {{ localization.components.settlements.buttons.remove }}
            </GnzsButton>
            <GnzsButton type="cancel" @click="onCancelClick">{{
                !isItemChanged ? localization.buttons.back : localization.buttons.cancel
            }}</GnzsButton>
            <GnzsButton :disabled="!isItemChanged" type="primary" @click="onSaveClick">{{ localization.buttons.save }}
            </GnzsButton>
          </div>

        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import {
  computed,
  nextTick,
  onMounted,
  ref,
  useCssModule
} from "vue"

import GnzsButton from "@/gnzs-controls/gnzs-button/gnzs-button.vue"
import GnzsInput from "@/gnzs-controls/gnzs-input/gnzs-input.vue"

import { useInitializationStore } from "@/stores/initialization.store"
import { useSettlementStore } from "@/stores/settlement.store";
import { storeToRefs } from "pinia";

const { currItem, isAddMode, isItemChanged } = storeToRefs(useSettlementStore());

const { setCurrItem, setItemCopy, cancelItemChanges, updateItem } = useSettlementStore()

const emit = defineEmits(["saveClick", "removeClick", "addModeToggle", "focusout"]);

const $style = useCssModule();

const props = defineProps({
  itemId: {
    required: false,
    type: Number,
  },
  itemName: {
    required: false,
    type: String,
  },
  isAddMode: {
    type: Boolean,
  },
});


const input = ref(null);
const edit = ref(null);
const isEditMode = ref(false);
const inputValue = ref(props.itemName);
const hasError = ref(false);

const localization = computed(() => useInitializationStore().localization);

const editOpen = () => {
  isEditMode.value = true;
};

const editClose = () => {
  isEditMode.value = false;
};

//clicks
const onEditClick = () => {
  setCurrItem(props.itemId)
  setItemCopy()
  editOpen();
}

const onCancelClick = () => {
  if (isItemChanged.value) {
    cancelItemChanges();
  } else {

    editClose()
  }
}

const onSaveClick = () => {
  if (currItem.value && isEditMode.value) {
    updateItem(props.itemId, currItem.value);
  } else {
    addItem();
  }
}


// onMounted(() => {
//   if (!input?.value) return;
//   if (props.isAddMode) {
//     input.value.focus();
//   }
// });
</script>


<style lang="scss" module>
@import "./style.scss";
</style>