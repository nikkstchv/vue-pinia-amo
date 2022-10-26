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
      <div :class="$style.editButton" @click="editOpen">
        <svg>
          <use xlink:href="#gnzs-docflow-icon__edit-pen"></use>
        </svg>
      </div>
    </div>
    <div :class="[$style.item, $style.edit]" ref="edit" tabindex="-1" @focusout="focusOut"
      v-show="isEditMode || props.isAddMode">
      <input :class="{[$style.hasError]: hasError}" ref="input" type="text" v-model="inputValue"
        @input="event => isInputValueValid" />
      <div :class="$style.buttons">
        <GnzsButton v-if="!props.isAddMode" @mousedown="$emit('removeClick')" :type="`remove`" />
        <div :class="$style.saveButton" @mousedown="onSaveClick" v-show="!hasError">
          <svg>
            <use xlink:href="#gnsz-icon__check"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  nextTick,
  onMounted,
  ref,
  useCssModule,
  type Ref,
} from "vue";
import GnzsButton from "@/gnzs-controls/gnzs-button/gnzs-button.vue";

const emit = defineEmits(["saveClick", "removeClick", "addModeToggle", "focusout"]);

const $style = useCssModule();

const props = defineProps({
  itemName: {
    default: "",
    type: String,
  },
  itemId: {
    required: true,
    type: Number,
  },
  isAddMode: {
    type: Boolean,
  },
});

const input: Ref<HTMLInputElement | null> = ref(null);
const edit = ref(null);
const isEditMode = ref(false);
const inputValue = ref(props.itemName);
const hasError = ref(false);


const isInputValueValid = computed(() =>
  inputValue.value ? (hasError.value = false) : (hasError.value = true)
);

const editOpen = async () => {
  isEditMode.value = true;
  await nextTick();
  if (!input?.value) return;
  input.value.value = props.itemName;
  input.value.focus();
};

const editClose = () => {
  isEditMode.value = false;
};

const onSaveClick = () => {
  if (!inputValue.value) {
    return;
  } else if (props.isAddMode) {
    emit("addModeToggle");
  } else {
    editClose();
  }
  emit("saveClick", inputValue.value);
};

const focusOut = (event: any) => {
  hasError.value = false;
  emit("focusout");
  const isTargetChild =
    event &&
    event.rel &&
    edit.value === event.relatedTarget.closest(`.${$style.edit}`);
  if (isTargetChild) return;
  editClose();
};


onMounted(() => {
  if (!input?.value) return;
  if (props.isAddMode) {
    input.value.focus();
  }
});
</script>


<style lang="scss" module>
@import "./style.scss";
</style>