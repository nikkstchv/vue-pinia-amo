<script setup lang="ts">
  import GznsHeader from "@/gnzs-controls/gnzs-header/gnzs-header.vue";
  import GnzsButton from "@/gnzs-controls/gnzs-button/gnzs-button.vue";
  import AdvancedSettingsTabs from "@/components/AdvancedSettingsTabs/AdvancedSettingsTabs.vue";


  const isChanged = true;
</script>

<template>
  <div :class="$style.container">
    <GznsHeader main-title="Документы 2.0" :fixed="isChanged">
      <template #paid> Оплата </template>
      <template #buttons>
        <GnzsButton type="cancel">Отмена</GnzsButton>
        <GnzsButton type="primary">Сохранить</GnzsButton>
      </template>
    </GznsHeader>
    <AdvancedSettingsTabs />
  </div>
</template>

<style lang="scss" module>
  .container {
    padding: 0 25px;
    padding-bottom: 15px;
  }
</style>
