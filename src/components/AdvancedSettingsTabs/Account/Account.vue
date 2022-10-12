<template>
  <GnzsSection>
    <div :class="$style.sectionContent">
      <div :class="$style.rowFlex">
        Подключите ваш Google аккаунт. Все документы сохраняются на вашем Google
        Диске.
      </div>
      <div :class="$style.rowFlex">
        <GnzsButton type="primary">
          <GoogleIcon />
          <span>Авторизоваться через Google Account</span>
        </GnzsButton>
      </div>
    </div></GnzsSection
  >
</template>

<script setup lang="ts">
  import GnzsButton from "@/gnzs-controls/gnzs-button/gnzs-button.vue";
  import GoogleIcon from "@/components/AdvancedSettingsTabs/Account/GoogleIcon.vue";
  import GnzsSection from "@/gnzs-controls/gnzs-section/gnzs-section.vue";
</script>

<style lang="scss" module>
@import "@/style.scss";
</style>