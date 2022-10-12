<script setup lang="ts">
  import GnzsSection from "@/gnzs-controls/gnzs-section/gnzs-section.vue";
  import GnzsNotification from "@/gnzs-controls/gnzs-notification/gnzs-notification.vue";
</script>

<template>
  <GnzsSection>
    <template #header>Уведомления</template>

    <div :class="$style.sectionContent">
      <div :class="$style.rowFlex">
        <GnzsNotification>Обычное уведомление</GnzsNotification>
      </div>
      <div :class="$style.rowFlex">
        <GnzsNotification title="C заголовком">Обычное уведомление</GnzsNotification>
      </div>

      <div :class="$style.rowFlex">
        <GnzsNotification type="error">Уведомление об ошибке</GnzsNotification>
      </div>
      <div :class="$style.rowFlex">
        <GnzsNotification type="error" title="C заголовком">Уведомление об ошибке</GnzsNotification>
      </div>
    </div>
  </GnzsSection>
</template>

<style lang="scss" module>
  @import "@/style.scss";
</style>
