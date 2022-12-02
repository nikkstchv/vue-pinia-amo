<script setup lang="ts">

  import { computed, onMounted, ref, watch, type PropType, type Ref } from "vue";
  import { LOCALIZATION, displayItemsLimits } from "./constants";

import GnzsDropdown from "@/gnzs-controls/gnzs-dropdown-new/gnzs-dropdown.vue";

  //types
  import type { displayItemsLimit } from "./types";

  const props = defineProps({
    pageCount: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: displayItemsLimits[1].value,
    },
    displayItemsLimits: {
      type: Array as PropType<displayItemsLimit[]>,
      default: (): displayItemsLimit[] => displayItemsLimits,
    },
    range: {
      type: Number,
      default: 5,
    },
    language: {
      type: String,
      default: "ru",
    }
  });

  const emit = defineEmits(["onPrevPage", "onNextPage", "onSelectPage", "onChangeLimit"]);

  onMounted(() => {
    setPages();
  });

  watch(() => props.pageCount, () => { 
      setPages();
    }
  );

  let pages: Ref<number[]> = ref([]);

  // methods
  const setPages = () => {
    pages.value = [];
    for (let i = 1; i <= props.pageCount; i++) {
      pages.value.push(i);
    };
  };

  const selectLimit = (limit: number): void => {
    emit('onChangeLimit', limit);
  };

  // computed
  const notEnoughItems = computed((): boolean => {
    if (props.range >= props.pageCount) return true;
    else return false;
  });

  const isStartRange = computed((): boolean => {
    if (notEnoughItems.value) return false;
    return props.currentPage < props.range;
  });

  const isEndRagne = computed((): boolean => {
    if (notEnoughItems.value) return false;
    return props.currentPage > (props.pageCount - props.range + 1);
  });

  const isMeddleRange = computed((): boolean => {
    if (notEnoughItems.value) return false;
    return props.currentPage >= props.range && props.currentPage <= (props.pageCount - props.range + 1);
  });

  const getRangePages = computed((): number[] => {
    let from: number = 0;
    let to: number = props.pageCount;
    const step = Math.floor(props.range / 2);

    if (isStartRange.value) to = props.range;
    if (isEndRagne.value) from = props.pageCount - props.range;
    if (isMeddleRange.value) {
      from = (props.currentPage - step) - 1;
      to = props.currentPage + step;
    }

    return pages.value.slice(from, to);
  });

  const showFirstPage = computed((): boolean => {
    return isMeddleRange.value || isEndRagne.value;
  });

  const showLastPage = computed((): boolean => {
    return isMeddleRange.value || isStartRange.value;
  });

</script>

<template>

  <div :class="$style.root">
    
    <div :class="$style.controls">
      <div :class="$style.buttons">
        <div :class="$style.arrow" @click="emit('onPrevPage')">
          <svg :class="$style.arrow__left">
            <use xlink:href="#common--bold-arrow"></use>
          </svg>
        </div>
        <div :class="$style.arrow" @click="emit('onNextPage')">
          <svg :class="$style.arrow__right">
            <use xlink:href="#common--bold-arrow"></use>
          </svg>
        </div>
      </div>

      <div :class="$style.pages">
        <div :class="$style.page" v-if="showFirstPage">
          <div 
            :class="$style.button" 
            @click="emit('onSelectPage', pages[0])"
          >{{ pages[0] }}</div>
          <div :class="$style.dots">...</div>
        </div>

        <div 
          :class="[$style.page, {[$style.page__active]: page === props.currentPage}]" 
          v-for="page in getRangePages"
        >
          <div 
            :class="$style.button"
            @click="emit('onSelectPage', page)"
          >{{ page }}</div>
        </div>

        <div :class="$style.page" v-if="showLastPage">
          <div :class="$style.dots">...</div>
          <div 
            :class="$style.button" 
            @click="emit('onSelectPage', pages[pages.length - 1])"
          >{{ pages[pages.length - 1] }}</div>
        </div>
      </div>
    </div>

    <div :class="$style.displayItems">
      <div :class="$style.displayItemsTitle">{{ LOCALIZATION.count[props.language] }}</div>
      <GnzsDropdown
        openUp
        :useEmptyItem="false"
        :items="displayItemsLimits"
        :modelValue="limit"
        @update:modelValue="selectLimit"
      />
    </div>
  
  </div>

</template>

<style module lang="scss">
  @import "./style.scss";
</style>