<template>
  <div
    :class="$style.root"
    tabindex="-1"
    @focusin="onFocusinHandler"
    @focusout="onFocusoutHandler"
    ref="container"
  >
    <input
      :type="type"
      :class="$style.input"
      :data-name="name"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      ref="input"
    />
    <div :class="['custom-scroll', $style.hints]" v-if="hints.length" ref="hints">
      <div
        :class="$style.hintItem"
        v-for="(hint, i) of hints"
        :key="i"
        @click="onHintClickHandler(hint)"
      >
        <div :class="$style.hintValue">{{ hint.title }}</div>
        <div :class="$style.hintInfo">{{ hint.info }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "gnzs-input-with-hints",
    props: {
      name: {
        type: String,
        default: "",
      },
      modelValue: {
        default: "",
      },
      hints: {
        type: Array,
        default: () => [], // [{id: 1, value: 100, title: '100 руб', info: '(Розничная)'}]
      },
      type: {
        type: String,
        default: "text",
      },
    },
    methods: {
      onFocusinHandler() {
        if (!this.hints.length) return;
        this.showHints();
      },
      showHints() {
        this.$refs["container"].classList.add(this.$style.root_opened);
        this.$refs["input"].style.width = this.$refs["hints"].offsetWidth + "px";
      },
      hideHints() {
        this.$refs["input"].style.width = "";
        this.$refs["container"].classList.remove(this.$style.root_opened);
      },
      onFocusoutHandler(e) {
        const isTargetChild =
          e &&
          e.relatedTarget &&
          this.$refs["container"] === e.relatedTarget.closest(`.${this.$style.root}`);

        if (isTargetChild) return;
        this.hideHints();
      },
      onHintClickHandler(hint) {
        this.$refs["input"].value = hint.value;
        this.$emit("update:modelValue", hint.value);
        this.$emit("update:hint", hint);
        this.hideHints();
      },
    },
  });
</script>

<style lang="scss" module>
  @import "./style.scss";
</style>
