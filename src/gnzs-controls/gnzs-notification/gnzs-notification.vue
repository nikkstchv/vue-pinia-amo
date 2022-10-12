<template>
  <div :class="$style.container" :data-type="type">
    <div :class="$style.title" v-if="title.length">
      {{ title }}
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from "vue";
  //import type { PropType } from "vue";

  //type NotificationType = "" | "error";

  export default defineComponent({
    props: {
      type: {
        type: String, // as PropType<NotificationType>,
        default: "",
      },
      title: {
        type: String,
        default: "",
      },
    },
  });
</script>

<style lang="scss" module>
  .container {
    position: relative;
    padding: 13px 10px 11px 11px;
    border-left: 3px solid #5796f8;
    background: white;

    &[data-type="error"] {
      border-color: #ff7779;
    }
  }

  .title {
    margin-bottom: 4px;
    font-weight: bold;
  }
</style>
