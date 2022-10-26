<template>
  <div :class="[$style.contextButton, { [$style.contextButton_opened]: opened }]">
    <button :class="$style.button" type="button" tabindex="-1" @click="open">
      <svg :class="$style.icon">
        <use xlink:href="#gnzs-docflow-icon__button-more"></use>
      </svg>
    </button>

    <ul :class="$style.menu">
      <li
        v-for="item in items"
        :key="item.text"
        :class="$style.menuItem"
        @click="onClickWrapper(item.onClick)"
      >
        <svg :class="$style.menuItemIcon">
          <use :xlink:href="item.iconLink"></use>
        </svg>
        <span :class="$style.menuItemText">
          {{ item.text }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
  import { defineComponent } from "vue";

  export default defineComponent({
    props: {
      items: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        opened: false,
      };
    },
    methods: {
      open() {
        this.opened = true;
      },
      clickOutside(e) {
        if (!this.$el.contains(e.target)) {
          this.opened = false;
        }
      },
      onClickWrapper(func) {
        if (func) func();
        this.opened = false;
      },
    },
    mounted() {
      document.addEventListener("click", this.clickOutside);
    },
    beforeUnmount() {
      document.removeEventListener("click", this.clickOutside);
    },
  });
</script>

<style lang="scss" module>
  @import "./style.scss";
</style>
