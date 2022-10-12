<script setup lang="ts">
  import GnzsSection from "@/gnzs-controls/gnzs-section/gnzs-section.vue";
  import GnzsSpinner from "@/gnzs-controls/gnzs-spinner/gnzs-spinner.vue";
</script>

<template>
  <GnzsSection>
    <template #header>Spinner</template>

    <div :class="$style.sectionContent">
      <div :class="$style.rowFlex">
        <GnzsSpinner />
      </div>
    </div>
  </GnzsSection>
</template>

<style lang="scss" module>
  @import "@/style.scss";
</style>
