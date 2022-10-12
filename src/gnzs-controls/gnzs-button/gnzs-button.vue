<template>
  <button @click="onClick" type="button" :class="buttonClasses" tabindex="">
    <div v-if="showRemoveIcon" :class="$style.icon">
      <RemoveIcon />
    </div>
    <span v-if="!isSlotEmpty" :class="$style.inner">
      <slot></slot>
    </span>
    <div v-if="showSpinner" :class="$style.spinner">
      <span :class="$style.spinnerIcon"></span>
    </div>
    <span :class="$style.loadingText" v-if="showLoadingText">
      {{ loadingText }}
    </span>
  </button>
</template>

<script>
  import { defineComponent } from "vue";
  //import type { PropType } from "vue";
  import RemoveIcon from "./remove-icon.vue";

  // type BtnType = "" | "primary" | "append" | "cancel" | "remove";

  export default defineComponent({
    props: {
      loading: {
        type: Boolean,
        default: false,
      },
      loadingText: {
        type: String,
        default: "",
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String, // as PropType<BtnType>,
        default: "",
      },
    },
    computed: {
      showRemoveIcon() {
        return this.type === "remove";
      },
      showSpinner() {
        return this.type !== "cancel";
      },
      isSlotEmpty() {
        return !this.$slots.default;
      },
      showLoadingText() {
        return this.loading && this.loadingText.length;
      },
      buttonClasses() {
        return [
          this.$style.button,
          { [this.$style[`button_${this.type}`]]: this.type.length },
          { [this.$style.button_loading]: this.loading },
          { [this.$style.button_disabled]: this.disabled },
        ];
      },
    },
    methods: {
      onClick() {
        if (!this.loading && !this.disabled) {
          this.$emit("action", this);
        }
      },
    },
    components: {
      RemoveIcon,
    },
  });
</script>

<style lang="scss" module>
  @import "./style.scss";
</style>
