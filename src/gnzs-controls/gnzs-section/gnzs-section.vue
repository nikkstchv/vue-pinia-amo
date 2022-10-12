<template>
  <section :class="$style.root">
      <div :class="$style.item" @click="$emit('click', $event)">
          <div v-if="disabled" :class="$style.cover">
              <div :class="$style.cover__caption">{{disabledText}}</div>
          </div>
          <div :class="$style.headerWrapper">
              <div :class="headerClasses(theme, headerClass)">
                  <slot name="header" v-if="!header.length"></slot>
                  <div v-else>{{ header }}</div>
              </div>
          </div>
          <div :class="$style.description">
              <slot name="description"></slot>
          </div>
          <div :class="$style.body" v-if="$slots.default">
              <slot></slot>
          </div>
      </div>
      <slot name="header-control"></slot>
  </section>
</template>

<script>

export default {
  props: {
      header: {
          type: String,
          default: '',
      },
      additionalClass: {
          type: String,
          default: ''
      },
      headerClass: {
          type: String,
          default: ''
      },
      disabled: {
          type: Boolean,
          default: false
      },
      disabledText: {
          type: String,
          default: 'Недоступно'
      },
      theme: {
          type: String,
          default: 'default',
      },
  },

  computed: {
      headerClasses() {
          return (theme, headerClass) => [
              this.$style.header,
              { [headerClass]: headerClass.length },
              { [this.$style.link]: theme === 'link' }
          ]
      },
  },
}
</script>

<style lang="scss" module>
  @import './style.scss';
</style>