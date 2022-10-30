<template>
  <div :class="$style.container">
    <div :class="$style.tabItems">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        :class="[$style.tabItem, { [$style.tabItem_active]: tab.id == activeId }]"
        @click="onChange(tab)"
      >
        <span>{{ tab.title }}</span>
      </div>
    </div>
    <div :class="$style.tabContent" v-show="initialized">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from "vue";
  //import type { PropType } from "vue";

  //type Tab = { id: string; title: string };

  export default defineComponent({
    data() {
      return {
        activeId: "",
        initialized: false,
      };
    },
    props: {
      tabs: {
        type: Array, // as PropType<Tab[]>,
        default: () => [],
        //   validator: function (tabs) {
        //     let res = true;
        //     tabs.forEach((val) => {
        //       if (!(typeof val.id == "string" && typeof val.title == "string")) {
        //         res = false;
        //       }
        //     });
        //     return res;
        //   },
      },
    },
    methods: {
      onChange(tab) {
        this.activeId = tab.id;
        this.$emit("change", tab.id);
        this.showActiveContent();
      },
      showActiveContent() {
        if (!this.$slots?.default()?.length) return;

        this.$slots?.default()?.forEach((s) => {
          if (typeof s.elm.getAttribute == "function") {
            s.elm.hidden = s.elm.getAttribute("gnzs-tab-id") !== this.activeId;
          }
        });
      },
    },
    mounted() {
      this.activeId = this.tabs.length ? this.tabs[0].id : "";
      this.showActiveContent();
      this.initialized = true;
    },
  });
</script>

<style lang="scss" module>
  .container {
    position: relative;
    width: 100%;
  }

  .tabItems {
    display: flex;
    widows: 100%;
    border-bottom: 1px solid #4c8bf7;
  }

  .tabItem {
    position: relative;
    padding: 7px 10px;
    margin-right: 20px;
    cursor: pointer;
    opacity: 0.6;
    box-sizing: border-box;

    &_active {
      opacity: 1;

      &:after {
        content: "";
        position: absolute;
        height: 3px;
        background: #4c8bf7;
        bottom: 0;
        width: 100%;
        left: 0;
        right: 0;
      }
    }
  }
</style>
