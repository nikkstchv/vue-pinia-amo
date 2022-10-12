<script setup lang="ts">
  import { ref } from "vue";
  import GnzsSection from "@/gnzs-controls/gnzs-section/gnzs-section.vue";
  import GnzsTabs from "@/gnzs-controls/gnzs-tabs/gnzs-tabs.vue";

  const tabs = [
    { id: "main", title: "Основные" },
    { id: "seconday", title: "Дополнительные" },
  ];
  const activeTab = ref(tabs[0].id);

  const setActiveTab = (tab: string) => {
    console.log("tab changed, id=", tab);
    activeTab.value = tab;
  };
</script>

<template>
  <GnzsSection>
    <template #header>Вкладки (Табы/Tabs)</template>

    <div :class="$style.sectionContent">
      <div :class="$style.rowFlex">
        <GnzsTabs :tabs="tabs" @change="setActiveTab">
          <div gnzs-tab-id="main">Тут контент основных настроек</div>
          <div gnzs-tab-id="seconday">Тут контент дополнительных настроек</div>
        </GnzsTabs>
      </div>
    </div>
  </GnzsSection>
</template>

<style lang="scss" module>
  @import "@/style.scss";
</style>
