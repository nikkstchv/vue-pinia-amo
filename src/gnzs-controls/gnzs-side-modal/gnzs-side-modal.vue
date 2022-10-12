<template>
  <div :class="$style.sideModal">
    <div :class="$style.overlay" @click="$destroy()"></div>

    <div
      :class="['custom-scroll', $style.modalContainer, $style['modalContainer_size_' + size]]"
      ref="container"
      @scroll="onScroll"
    >
      <div :class="$style.topActions">
        <div :class="$style.header">
          <slot name="header"></slot>
        </div>

        <slot name="buttons"></slot>
      </div>

      <div :class="$style.body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from "vue";
  import jquery from "jquery";
  global.$ = jquery;

  export default defineComponent({
    props: {
      size: {
        type: String,
        default: "med", // min, med, max
      },
    },
    methods: {
      onScroll(e) {
        const isScrolled = e.target.scrollTop > 1;

        if (isScrolled) this.$refs["container"].classList.add(this.$style.modalContainer_scrolled);
        else this.$refs["container"].classList.remove(this.$style.modalContainer_scrolled);

        const bottomOffset = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
        this.$emit("scroll", { bottomOffset, e });
      },
      fixPageBody() {
        $("body").attr("data-body-fixed", 1).css({ overflow: "hidden" });
      },
      unfixPageBody() {
        $("body").attr("data-body-fixed", 0).removeAttr("style");
      },
    },
    created() {
      this.fixPageBody();
    },
    mounted() {
      setTimeout(
        () => this.$refs["container"].classList.add(this.$style.modalContainer_mounted),
        100
      );
    },
    beforeDestroy() {
      this.$refs["container"].classList.remove(this.$style.modalContainer_mounted);
      this.$emit("destroy");
      this.unfixPageBody();
    },
    destroyed() {
      setTimeout(() => this.$el.remove(), 150);
    },
  });
</script>

<style lang="scss" module>
  .sideModal {
    display: block;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    visibility: hidden;
    animation: fadeIn-fixed 0.2s ease both;
    visibility: visible;
    z-index: 115;
  }

  .modalContainer {
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 116;
    top: 0;
    bottom: 0;
    right: -800px;
    background: #f5f5f5;
    box-shadow: -4px 0 0 rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
    overflow: auto;
    transition: right 0.1s ease-in-out;

    &_mounted {
      right: 0;
    }

    &_scrolled {
      .topActions {
        background: rgba(255, 255, 255, 0.9);
        border-bottom: 1px solid #eaeced;
      }
    }

    &_size_med {
      width: 785px;
    }

    &_size_min {
      width: 580px;
    }

    &_size_max {
      width: 950px;
    }
  }

  .body {
    padding: 30px;
    padding-top: 80px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .topActions {
    display: flex;
    padding: 14px 30px;
    z-index: 20;
    align-items: center;
    position: fixed;
    width: inherit;
    box-sizing: border-box;
  }

  .header {
    margin-right: auto;
    text-transform: uppercase;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
