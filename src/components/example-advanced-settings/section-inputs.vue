<script setup lang="ts">
  import { ref } from "vue";
  import GnzsSection from "@/gnzs-controls/gnzs-section/gnzs-section.vue";
  import GnzsInput from "@/gnzs-controls/gnzs-input/gnzs-input.vue";
  import GnzsInputHints from "@/gnzs-controls/gnzs-input-hints/gnzs-input-hints.vue";

  let searchText = ref("test");
  let inputNumberVal = ref(22);
  let selectedHint = ref({});

  const hints = [
    { title: "Один", value: "Один", info: "One" },
    { title: "Два", value: "Два", info: "Two" },
    { title: "Три", value: "Три", info: "Three" },
  ];
</script>

<template>
  <GnzsSection>
    <template #header>Поля ввода</template>
    <template #description>Значение ввода: {{ searchText }}</template>

    <div :class="$style.sectionContent">
      <div :class="$style.rowFlex">
        <div :class="$style.rowTitle">Текстовое поле</div>
        <GnzsInput placeholder="eee" v-model="searchText" positive-only />
      </div>

      <div :class="$style.rowFlex">
        <div :class="$style.rowTitle">Числовое поле</div>
        <GnzsInput v-model="inputNumberVal" type="number" positive-only />
      </div>

      <div :class="$style.rowFlex">
        <div :class="$style.rowTitle">С подсказками</div>
        <GnzsInputHints v-model="searchText" v-model:hint="selectedHint" :hints="hints" />
      </div>
    </div>
  </GnzsSection>
</template>

<style lang="scss" module>
  @import "@/style.scss";
</style>
