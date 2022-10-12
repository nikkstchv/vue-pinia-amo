<template>
  <GnzsSection>
    <div :class="$style.sectionContent">
    <div :class="$style.rowFlex">
      ? формат: текст, картинка, выражение шаблонизатора
    </div>
  </div>
  </GnzsSection>
</template>

<script setup lang="ts">
  import GnzsSection from "@/gnzs-controls/gnzs-section/gnzs-section.vue";
</script>

<style lang="scss" module>
@import "@/style.scss";
</style>