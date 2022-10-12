<script setup lang="ts">
  import { ref } from "vue";
  import GnzsSection from "@/gnzs-controls/gnzs-section/gnzs-section.vue";
  import GnzsCheckbox from "@/gnzs-controls/gnzs-checkbox/gnzs-checkbox.vue";
  import GnzsSwitcher from "@/gnzs-controls/gnzs-switcher/gnzs-switcher.vue";

  let checkboxVal = ref(true);
</script>

<template>
  <GnzsSection>
    <template #header>Чекбоксы</template>
    <template #header-control>
      <GnzsSwitcher v-model="checkboxVal" />
    </template>
    <template #description>Значение ввода: {{ checkboxVal ? "Включено" : "Выключено" }}</template>

    <div :class="$style.sectionContent">
      <div :class="$style.rowFlex">
        <div :class="$style.rowTitle">Обычный чекбокс</div>
        <GnzsCheckbox v-model="checkboxVal" />
      </div>

      <div :class="$style.rowFlex">
        <div :class="$style.rowTitle">Переключатель</div>
        <GnzsSwitcher v-model="checkboxVal" />
      </div>

      <div :class="$style.rowFlex">
        <GnzsCheckbox v-model="checkboxVal" label="С надписью" />
      </div>
    </div>
  </GnzsSection>
</template>

<style lang="scss" module>
  @import "@/style.scss";
</style>
