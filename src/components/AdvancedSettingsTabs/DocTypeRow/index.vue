<template>
  <div :class="[$style.item, $style.current]" v-show="!isEdit">
    <div :class="[$style.name]" data-code="name">
      {{ props.typeName }}
    </div>
    <div :class="$style.editButton" @click="editOpen">
      <svg>
        <use xlink:href="#gnzs-1c-icon__edit-pen"></use>
      </svg>
    </div>
  </div>
  <div
    :class="[$style.item, $style.edit]"
    ref="typeEdit"
    tabindex="-1"
    @focusout="focusOut"
    v-show="isEdit"
  >
    <input
      type="text"
      ref="typeInput"
      v-model="inputValue"
    />
    <div
      :class="$style.saveButton"
      @click="saveType(props.typeId, inputValue)"
    >
      <svg>
        <use xlink:href="#gnsz-icon__check"></use>
      </svg>
    </div>
    <GnzsButton @click="removeType(props.typeId)" :type="`remove`" />
  </div>
</template>

<script setup>
import { nextTick, ref, useCssModule } from "vue";
import { useDocTypeStore } from "@/stores/doctype.store";
import GnzsButton from "../../../gnzs-controls/gnzs-button/gnzs-button.vue";

const { loadItems, updateItem, removeType } = useDocTypeStore();
const $style = useCssModule();
const props = defineProps({
  typeName: {
    type: String,
  },
  typeId: {
    type: Number,
  },
});


const typeInput = ref(null);
const typeEdit = ref(null);
const isEdit = ref(false);
const inputValue = ref(props.typeName)

const editOpen = async () => {
  isEdit.value = true;
  await nextTick();
  typeInput.value.value = props.typeName;
  typeInput.value.focus();
};

const editClose = () => {
  isEdit.value = false;
};

const focusOut = (event) => {
  const isTargetChild = event 
    && event.relatedTarget 
    && typeEdit.value === event.relatedTarget.closest(`.${$style.edit}`);

  if (isTargetChild) return;
  editClose();
};

const saveType =  async (typeId, typeName) => {
  await updateItem(typeId, typeName);
  await loadItems();
  editClose();
}
</script>


<style lang="scss" module>
@import "./style.scss";
</style>