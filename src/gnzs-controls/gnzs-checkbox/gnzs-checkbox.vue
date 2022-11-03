<template>
  <label :class="[$style.checkbox]">
    <span :class="$style.text" v-if="label.length">
      {{ label }}
    </span>
    <span v-if="info && info.length" :class="$style.info">{{ info }}</span>
    <div :class="$style.body">
      <input :class="$style.input" type="checkbox" :value="modelValue" :checked="!!modelValue" :disabled="disabled"
        @change="$emit('update:modelValue', $event.target.checked)" />
      <span :class="[$style.helper, { [$style.helper_minus]: isSomeChecked }]"></span>
    </div>
  </label>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    isSomeChecked: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    info: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
});
</script>

<style lang="scss" module>
@import "./style.scss";
</style>
