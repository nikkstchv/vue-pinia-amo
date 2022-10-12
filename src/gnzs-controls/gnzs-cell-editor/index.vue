<template>
  <div :class="$style.cellEditor" ref="control">
    <GnzsButton :class="$style.button" @click="showForm">
      <svg>
        <use xlink:href="#gnzs-1c-icon__edit-pen"></use>
      </svg>
    </GnzsButton>

    <form
      ref="form"
      tabindex="0"
      :class="[$style.form, { [$style[`form_align_${align}`]]: align.length }]"
      @focusout="onFocusout"
    >
      <div
        :class="$style.formControl"
        ref="controlContainer"
        @keydown="onKeydown"
      >
        <slot></slot>
      </div>
      <div>
        <GnzsButton type="primary" @click="onSave">Сохранить</GnzsButton>
        <GnzsButton type="cancel" @click="onCancel">Отменить</GnzsButton>
      </div>
    </form>
  </div>
</template>


<script>
import GnzsButton from "@/gnzs-controls/gnzs-button/gnzs-button.vue";

export default {
  props: {
    submitOnEnter: {
      type: Boolean,
      default: true,
    },
    align: {
      type: String,
      default: "right", // 'left' | 'right'
      validator(value) {
        return ["left", "right"].indexOf(value) !== -1;
      },
    },
  },
  data() {
    return {
      isShown: false,
    };
  },
  methods: {
    showForm() {
      this.isShown = true;
      this.$refs["form"].classList.add(this.$style.form_opened);
      this.$refs["controlContainer"].childNodes[0].focus();
    },
    onSave() {
      this.$emit("save");
      this.hideForm();
    },
    onCancel() {
      // Нажали cancel, а затем при потере фокуса.
      if (this.isShown) {
        this.$emit("cancel");
        this.hideForm();
      }
    },
    onKeydown(e) {
      if (this.submitOnEnter && e.key == "Enter") {
        e.preventDefault();
        this.onSave();
      }
    },
    onFocusout(e) {
      let isStayInsideForm = false;

      if (e.relatedTarget) {
        const parentForm = e.relatedTarget.closest(`.${this.$style.form}`);
        isStayInsideForm = parentForm && parentForm.length;
      }

      if (!isStayInsideForm) {
        this.onCancel();
      }
    },
    hideForm() {
      this.isShown = false;
      this.$refs["form"].classList.remove(this.$style.form_opened);
    },
  },
  components: {
    GnzsButton,
  },
};
</script>


<style lang="scss" module>
@import "./style.scss";
</style>