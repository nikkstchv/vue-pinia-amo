<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      style="display: none"
    >
      <symbol id="gnzs-docflow-icon__edit-pen" viewbox="0 0 10 10">
        <path
          fill="currentColor"
          d="M0 7.895V10h2.1l6.108-6.154-2.11-2.105L0 7.895zM9.834 2.24a.54.54 0 00.123-.177.544.544 0 000-.42.54.54 0 00-.123-.177L8.535.166a.54.54 0 00-.178-.123.54.54 0 00-.424 0 .54.54 0 00-.178.123L6.776 1.2l2.11 2.073.94-1.056.006.032z"
        ></path>
      </symbol>
    </svg>
    <div
      :class="[$style.item, $style.current]"
      v-show="!editMode && !props.isAddMode"
    >
      <div :class="[$style.name]" data-code="name">
        {{ item?.name }}
      </div>
      <div :class="$style.editButton" @click="onEditClick">
        <svg>
          <use xlink:href="#gnzs-docflow-icon__edit-pen"></use>
        </svg>
      </div>
    </div>
    <div
      :class="[$style.edit]"
      tabindex="-1"
      v-show="editMode || props.isAddMode"
    >
      <div :class="$style.orgColumn">
        <div :class="$style.inputWrapper">
          <div :class="$style.inputTitle">
            {{ localization.components.settlements.inputs.name }}
          </div>
          <GnzsInput v-model="item.name" :class="[$style.orgInput]" />
        </div>
        <div :class="$style.inputWrapper">
          <div :class="$style.inputTitle">
            {{ localization.components.settlements.inputs.bank_name }}
          </div>
          <GnzsInput v-model="item.bankName" :class="[$style.orgInput]" />
        </div>
        <div :class="$style.inputWrapper">
          <div :class="$style.inputTitle">
            {{
              localization.components.settlements.inputs.correspondent_account
            }}
          </div>
          <GnzsInput
            v-model="item.correspondentAccount"
            :class="[$style.orgInput]"
          />
        </div>
        <div :class="$style.inputWrapper">
          <div :class="$style.inputTitle">
            {{ localization.components.settlements.inputs.bic }}
          </div>
          <GnzsInput v-model="item.bic" :class="[$style.orgInput]" />
        </div>
        <div :class="$style.inputWrapper">
          <div :class="$style.inputTitle">
            {{ localization.components.settlements.inputs.settlement_account }}
          </div>
          <GnzsInput
            v-model="item.settlementAccount"
            :class="[$style.orgInput]"
          />
        </div>
        <div :class="$style.buttons">
          <GnzsButton
            v-if="!props.isAddMode"
            :class="$style.removeBtn"
            @click="onRemoveClick"
            :type="`remove`"
          >
            {{ localization.components.settlements.buttons.remove }}
          </GnzsButton>
          <div :class="$style.btnsWrapper">
            <GnzsButton type="cancel" @click="onCancelClick">{{
              !isItemChanged
                ? localization.buttons.close
                : localization.buttons.cancel
            }}</GnzsButton>
            <GnzsButton
              :disabled="!isItemChanged"
              type="primary"
              @click="onSaveClick"
              >{{ localization.buttons.save }}
            </GnzsButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

import GnzsButton from "@/gnzs-controls/gnzs-button/gnzs-button.vue";
import GnzsInput from "@/gnzs-controls/gnzs-input/gnzs-input.vue";

import { useInitializationStore } from "@/stores/initializationStore";
import { useSettlementStore } from "@/stores/settlementStore";
import { useIframeStore } from "@/stores/iframeStore";

const { updateItem, addItem, disableAddMode, browserConfirm } =
  useSettlementStore();
const { items, newItem } = storeToRefs(useSettlementStore());
const { openConfirmModal } = useIframeStore();

const route = useRoute();
const routeId = +route.params.id;

const props = defineProps({
  itemId: {
    required: false,
    type: Number,
  },
  isAddMode: {
    type: Boolean,
  },
});

const editMode = ref(false);

const editOpen = () => {
  editMode.value = true;
};
const editClose = () => {
  editMode.value = false;
};

// computed
const localization = computed(() => useInitializationStore().localization);

const item = ref({})
item.value = 
  props.itemId
    ? items.value.find((item) => item.id === props.itemId)
    : newItem.value;

let itemCopy = {...item.value};

const isItemChanged = computed(() => {
  // console.log("%cindex.vue line:168 copy", "color: #007acc;", itemCopy);
  // console.log("%cindex.vue line:168 item", "color: #007acc;", item.value);
  return JSON.stringify(itemCopy) !== JSON.stringify(item.value);
});

// clicks
const onEditClick = () => {
  editOpen();
};

const onCancelClick = () => {
  if (isItemChanged.value) {
    item.value = { ...itemCopy };
  } else {
    editClose();
    disableAddMode();
  }
};

const onSaveClick = async () => {
  if (editMode.value) {
    updateItem(props.itemId, item.value);
    itemCopy = {...item.value};
    editClose();
  } else {
    newItem.value.corporateEntityId = routeId;
    await addItem(newItem.value);
  }
};

const onRemoveClick = () => {
  if (useInitializationStore().isInsideAmo) {
    openConfirmModal({
      name: "",
      id: props.itemId,
      confirmEventName: "deleteSettlement",
      text: localization.value.confirm.deleteQuestion.settlement,
      declineText: localization.value.buttons.cancel,
      acceptText: localization.value.buttons.yes,
    });
  } else {
    browserConfirm({
      name: "",
      id: props.itemId,
      confirmEventName: "deleteSettlement",
      text: localization.value.confirm.deleteQuestion.settlement,
      declineText: localization.value.buttons.cancel,
      acceptText: localization.value.buttons.yes,
    });
  }
  editClose();
};

// onMounted(() => {
//   // itemCopy = { ...item.value };
// });
</script>

<style lang="scss" module>
@import "./style.scss";
</style>
