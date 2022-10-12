<script setup lang="ts">
  import GznsHeader from "@/gnzs-controls/gnzs-header/gnzs-header.vue";
  import GnzsSection from "@/gnzs-controls/gnzs-section/gnzs-section.vue";
  import SectionButtons from "@/components/example-advanced-settings/section-buttons.vue";
  import SectionInputs from "@/components/example-advanced-settings/section-inputs.vue";
  import SectionCheckboxes from "@/components/example-advanced-settings/section-checkboxes.vue";
  import SectionDropdowns from "@/components/example-advanced-settings/section-dropdowns.vue";
  import SectionNotifications from "@/components/example-advanced-settings/section-notifications.vue";
  import SectionSpinner from "@/components/example-advanced-settings/section-spinner.vue";
  import SectionTabs from "@/components/example-advanced-settings/section-tabs.vue";

  import GnzsButton from "@/gnzs-controls/gnzs-button/gnzs-button.vue";

  const isChanged = true;
</script>

<template>
  <div :class="$style.container">
    <GznsHeader main-title="Название виджета" :fixed="isChanged">
      <template #paid> оплата </template>
      <template #buttons>
        <GnzsButton type="cancel">Отмена</GnzsButton>
        <GnzsButton type="primary">Сохранить</GnzsButton>
      </template>
    </GznsHeader>

    <GnzsSection>
      <template #header>Slot#header</template>
      <template #header-control>Slot#header-control</template>
      <template #description>Slot#description</template>
      <div>Slot content here</div>
    </GnzsSection>

    <SectionButtons />
    <SectionInputs />
    <SectionCheckboxes />
    <SectionDropdowns />
    <SectionNotifications />
    <SectionSpinner />
    <SectionTabs />
  </div>
</template>

<style lang="scss" module>
  .container {
    padding: 0 25px;
    padding-bottom: 15px;
  }
</style>
