<script setup lang="ts">
  import { ref } from "vue";
  import GnzsSection from "@/gnzs-controls/gnzs-section/gnzs-section.vue";
  import GnzsDropdown from "@/gnzs-controls/gnzs-dropdown/gnzs-dropdown.vue";
  import GnzsDropdownCheckboxes from "@/gnzs-controls/gnzs-dropdown-checkboxes/gnzs-dropdown-checkboxes.vue";

  const dropdownItems = [
    { title: "Один", value: 1 },
    { title: "Два", value: 2 },
    { title: "Три", value: 3 },
  ];
  const dropdownItemsWithInfo = [
    { title: "Один", value: 1, info: "info 1" },
    { title: "Два", value: 2, info: "info 2" },
    { title: "Три", value: 3, info: "info 3" },
  ];

  const groupedDropdownItems = [
    {
      title: "Группа 1",
      value: 1,
      items: [
        { title: "Гр1 Значение 1", value: "1_1" },
        { title: "Гр1 Значение 2", value: "1_2" },
        { title: "Гр1 Значение 3", value: "1_3" },
      ],
    },
    {
      title: "Группа 2",
      value: 2,
      items: [
        { title: "Гр2 Значение 1", value: "2_1" },
        { title: "Гр2 Значение 2", value: "2_2" },
      ],
    },
  ];

  const dropdownValue = ref(1);
  const dropdownCheckValues = ref([1]);
  const groupedValues = ref([]);
</script>

<template>
  <GnzsSection>
    <template #header>Выпадающие списки (единичный выбор)</template>
    <template #description>
      <div>Единичное значение: {{ dropdownValue }}</div>
    </template>

    <div :class="$style.sectionContent">
      <div :class="$style.rowFlex">
        <div :class="$style.rowTitle">Обычный</div>
        <GnzsDropdown v-model="dropdownValue" :items="dropdownItems" />
      </div>

      <div :class="$style.rowFlex">
        <div :class="$style.rowTitle">Без пустого значения</div>
        <GnzsDropdown v-model="dropdownValue" :items="dropdownItems" :use-empty-item="false" />
      </div>

      <div :class="$style.rowFlex">
        <div :class="$style.rowTitle">Элементы с info</div>
        <GnzsDropdown
          v-model="dropdownValue"
          :items="dropdownItemsWithInfo"
          :use-empty-item="false"
        />
      </div>

      <div :class="$style.rowFlex">
        <div :class="$style.rowTitle">С поиском</div>
        <GnzsDropdown v-model="dropdownValue" :items="dropdownItems" is-searchable />
      </div>

      <div :class="$style.rowFlex">
        <div :class="$style.rowTitle">Группированная</div>
        <GnzsDropdown v-model="dropdownValue" :items="groupedDropdownItems" :is-grouped="true" />
      </div>
    </div>
  </GnzsSection>

  <GnzsSection>
    <template #header>Выпадающие списки (множественный выбор)</template>
    <template #description>
      <div>Множественное значение: {{ dropdownCheckValues }}</div>
    </template>

    <div :class="$style.sectionContent">
      <div :class="$style.rowFlex">
        <div :class="$style.rowTitle">Обычная</div>
        <GnzsDropdownCheckboxes v-model="dropdownCheckValues" :items="dropdownItems" />
      </div>

      <div :class="$style.rowFlex">
        <div :class="$style.rowTitle">В одну строку</div>
        <GnzsDropdownCheckboxes
          v-model="dropdownCheckValues"
          :items="dropdownItems"
          :is-inline-title="true"
        />
      </div>

      <div :class="$style.rowFlex">
        <div :class="$style.rowTitle">Элементы с info</div>
        <GnzsDropdownCheckboxes
          v-model="dropdownCheckValues"
          :items="dropdownItemsWithInfo"
          :is-inline-title="true"
        />
      </div>

      <div :class="$style.rowFlex">
        <div :class="$style.rowTitle">Группированная</div>
        <GnzsDropdownCheckboxes
          v-model="groupedValues"
          :items="groupedDropdownItems"
          :is-grouped="true"
        />
      </div>

      <div :class="$style.rowFlex">
        <div :class="$style.rowTitle">С поиском</div>
        <GnzsDropdownCheckboxes
          v-model="groupedValues"
          :items="groupedDropdownItems"
          :is-grouped="true"
          :is-searchable="true"
        />
      </div>
    </div>
  </GnzsSection>
</template>

<style lang="scss" module>
  @import "@/style.scss";
</style>
