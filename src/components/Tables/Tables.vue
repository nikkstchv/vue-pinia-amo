<template>
  <GnzsSection>
    <div :class="$style.sectionContent">
      <div :class="$style.rowFlex">
        Настройка столбцов (название, ?ширина), ? сопоставление столбца с полем
        какого-либо списка amoCRM
      </div>
    </div></GnzsSection
  >
</template>

<script setup lang="ts">
    import GnzsSection from "@/gnzs-controls/gnzs-section/gnzs-section.vue";
</script>

<style lang="scss" module>
@import "@/style.scss";
</style>