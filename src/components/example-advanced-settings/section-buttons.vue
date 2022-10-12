<script setup lang="ts">
  import { ref } from "vue";
  import GnzsSection from "@/gnzs-controls/gnzs-section/gnzs-section.vue";
  import GnzsButton from "@/gnzs-controls/gnzs-button/gnzs-button.vue";

  const isLoading = ref(false);
  function clickLoadingBtn() {
    console.log("click 1");
    isLoading.value = true;
    setTimeout(() => (isLoading.value = false), 3000);
  }
</script>

<template>
  <GnzsSection>
    <template #header>Кнопки</template>
    <template #description
      >Понажимай по кнопкам, посмотри эффект загрузки (пока происходи загрузка, повторный клик не
      срабатывает)</template
    >

    <div :class="$style.rowFlex">
      <GnzsButton @action="clickLoadingBtn" :loading="isLoading">Обычная</GnzsButton>
    </div>
    <div :class="$style.rowFlex">
      <GnzsButton @action="clickLoadingBtn" type="primary" :loading="isLoading">Primary</GnzsButton>
    </div>
    <div :class="$style.rowFlex">
      <GnzsButton :type="`append`">Добавление</GnzsButton>
    </div>
    <div :class="$style.rowFlex">
      <GnzsButton :type="`cancel`">Отмена</GnzsButton>
    </div>
  </GnzsSection>
</template>

<style lang="scss" module>
  @import "@/style.scss";
</style>
