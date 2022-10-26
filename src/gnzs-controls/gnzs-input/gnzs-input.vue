<template>
  <div :class="$style.root">
    <svg v-if="dateIcon" @click="focus" :class="[$style.dims, $style.dateIcon]">
      <use xlink:href="#card-calendar"></use>
    </svg>
    <input
      :class="[
        $style.input,
        clipboardEnabled ? $style.rightShift : '',
        dateIcon ? $style.leftShift : '',
      ]"
      :type="type"
      :value="modelValue"
      :data-name="name"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
      @keypress="prevent"
      tabindex=""
      ref="input"
    />
    <button v-if="clipboardEnabled" :class="$style.toggleButton" @click="copyToClipboard">
      <svg>
        <use xlink:href="#gnzs-docflow-icon__clipboard"></use>
      </svg>
    </button>
  </div>
</template>

<script>
  import { defineComponent } from "vue";
  // import type { PropType } from "vue";

  //type InputType = "text" | "number";

  export default defineComponent({
    props: {
      name: {
        type: String,
        default: "",
      },
      modelValue: {
        type: [String, Number],
      },
      type: {
        type: String, // as PropType<InputType>,
        default: "text",
      },
      placeholder: {
        type: String,
        default: "",
      },
      positiveOnly: {
        type: Boolean,
        default: false,
      },
      clipboardEnabled: {
        type: Boolean,
        default: false,
      },
      dateIcon: {
        type: Boolean,
        default: false,
      },
    },
    computed: {},
    methods: {
      focus() {
        this.$refs.input.focus();
      },
      prevent($event) {
        if (this.$props.type == "number" && this.$props.positiveOnly) {
          if ($event.key == "-") {
            $event.preventDefault();
          }
        }
      },

      copyToClipboard() {
        const el = document.createElement("textarea");
        //const input: HTMLInputElement | null = <HTMLInputElement>this.$refs.input;
        const input = this.$refs.input;
        el.value = input?.value;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      },
    },
  });
</script>

<style lang="scss" module>
  @import "./style.scss";
</style>
