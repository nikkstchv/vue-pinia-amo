<template>
  <div :class="$style.root">
    <label :class="$style.label">
      <input
        type="checkbox"
        :class="$style.checkbox"
        :data-name="name"
        :checked="!!modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
      />
      <span :class="$style.helper"></span>
    </label>
  </div>
</template>

<script>
  import { defineComponent } from "vue";

  export default defineComponent({
    props: {
      name: {
        type: String,
        default: "",
      },
      modelValue: {
        default: false,
      },
    },
  });
</script>

<style lang="scss" module>
  @import "./style.scss";
</style>
