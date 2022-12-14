<template>
  <div :class="$style.spinner">
      <span :class="$style.spinnerIcon"></span>
  </div>
</template>

<style lang="scss" module>
.spinner {
    position: relative;
    height: 22px;
    width: 22px;
    margin: auto;
      top: 40vh;
  }

  .spinnerIcon {
    display: block;
    width: 19px;
    height: 19px;
    position: absolute;
    top: 1px;
    left: 0;
    border: solid 2px transparent;
    border-top-color: #158fd2;
    border-left-color: #158fd2;
    border-radius: 100%;
    animation: gnzs-amo--nprogress-spinner-elem 900ms linear infinite;
  }

  @keyframes gnzs-amo--nprogress-spinner-elem {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>
