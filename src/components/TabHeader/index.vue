<template>
  <div :class="$style.header" v-once>
    <svg :class="$style.headerLogo">
      <use xlink:href="#gnzs-docflow-icon__company-logo"></use>
    </svg>
    <span :class="$style.headerTitle">ГЕНЕЗИС: Документы 2.0</span>

    <a :class="$style.instruction"
      href="https://gnzs.ru/instructions/integration-1c-amocrm-user-guide?utm_source=widget_card_tab" target="_blank">
      Инструкция
    </a>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" module>
@import './style.scss';
</style>