<script setup lang="ts">

import { computed, nextTick, onMounted, onUnmounted, ref, useCssModule, type Ref } from "vue";
import { useIframeStore } from "@/stores/iframe.store";
import { useRouter } from "vue-router";

const props = defineProps({
  mainTitle: {
    type: String,
    require: true,
  },
  mainRoute: {
    type: String,
    default: "",
  },
  currentTitle: {
    type: String,
    default: "",
  },
  editableTitle: {
    type: Boolean,
    default: false,
  },
  fixed: {
    type: Boolean,
    default: false,
  },
  isFullScreen: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(["onSaveCurrentTitle", "goToMainRoute"]);

let input: Ref<string> = ref("");
let isEdit: Ref<boolean> = ref(false);
let isLoad: Ref<boolean> = ref(false);
let isScrolled: Ref<boolean> = ref(false);

const router = useRouter();
const style = useCssModule();
const inputRef: Ref<HTMLElement | null> = ref(null);
const editRef: Ref<HTMLElement | null> = ref(null);
const iframeStore = useIframeStore();

onMounted(() => {
  window.addEventListener('scroll', setIsScrolled);
});

onUnmounted(() => {
  window.removeEventListener('scroll', setIsScrolled);
});

// methods
const onShowSidebar = (): void => {
  if (props.isFullScreen) iframeStore.asaidToggle();
  else iframeStore.showSidebar();
};

const setIsScrolled = (): void => {
  isScrolled.value = window.scrollY > 1 ? true : false;
};

const goToMainRoute = (): void => {
  if (props.mainRoute === "") return;
  router.push({ name: props.mainRoute });
  emit("goToMainRoute");
};

const editOpen = async (): Promise<void> => {
  isEdit.value = true;
  await nextTick();
  inputRef.value?.focus();
  input.value = props.currentTitle;
};

const focusOut = (event: any): void => {
  const isTargetChild = event && event.relatedTarget && editRef.value === event.relatedTarget.closest(`.${style.edit}`);
  if (isTargetChild) return;
  if (isLoad.value) return;
  editClose();
};

const editClose = (): void => {
  isEdit.value = false;
};

const setIsLoad = (value: boolean): void => {
  isLoad.value = value;
};

const onSaveCurrentTitle = (): void => {
  emit("onSaveCurrentTitle", input.value);
  editClose()
  // setIsLoad();
};

// computed
const windowWidth = computed((): number | null => iframeStore.windowWidth);
const isNotMainPage = computed((): boolean => props.mainRoute !== "" ? true : false);
const inputIsChange = computed((): boolean => {
  return input.value === props.currentTitle ? false : true;
});
const inputIsNotEmpty = computed((): boolean => {
  return input.value !== "" ? false : true;
})

</script>

<template>
  <div :class="$style.root">
    <div :class="[ $style.header, { [$style.fixed]: props.fixed && isScrolled } ]">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: none">
        <symbol id="gnzs-1c-icon__edit-pen" viewbox="0 0 10 10">
          <path fill="currentColor"
            d="M0 7.895V10h2.1l6.108-6.154-2.11-2.105L0 7.895zM9.834 2.24a.54.54 0 00.123-.177.544.544 0 000-.42.54.54 0 00-.123-.177L8.535.166a.54.54 0 00-.178-.123.54.54 0 00-.424 0 .54.54 0 00-.178.123L6.776 1.2l2.11 2.073.94-1.056.006.032z">
          </path>
        </symbol>
        <symbol id="gnsz-icon__check" viewBox="0 0 512 512">
          <path fill="currentColor"
            d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"
            class=""></path>
        </symbol>
      </svg>
      <div :class="$style.breadcrumbs">
        <div :class="$style.burger" v-if="windowWidth && windowWidth <= 1100" @click="onShowSidebar">
          <span></span>
        </div>
        <div :class="[ $style.item, $style.main, { [$style.itsLink]: props.mainRoute.length !== 0 } ]"
          @click="goToMainRoute">{{ mainTitle }}</div>
        <div :class="$style.separator" v-if="isNotMainPage">
          <div :class="$style.arrow"></div>
        </div>
        <div :class="[$style.item, $style.current]" v-if="isNotMainPage" v-show="!isEdit">
          <div :class="$style.title">
            {{ currentTitle }}
          </div>
          <div :class="$style.editButton" v-if="editableTitle" @click="editOpen">
            <svg>
              <use xlink:href="#gnzs-1c-icon__edit-pen"></use>
            </svg>
          </div>
        </div>
        <div :class="[$style.item, $style.edit]" ref="editRef" tabindex="-1" @focusout="focusOut" v-if="isNotMainPage"
          v-show="isEdit">
          <input type="text" ref="inputRef" v-model="input">
          <div :class="$style.saveButton" @click="onSaveCurrentTitle"
            v-if="inputIsChange && !inputIsNotEmpty && !isLoad">
            <svg>
              <use xlink:href="#gnsz-icon__check"></use>
            </svg>
          </div>
          <div :class="$style.spinner" v-if="isLoad">
            <span :class="$style.spinnerIcon"></span>
          </div>
        </div>
      </div>
      <div :class="$style.slots">
        <div :class="$style.paid" v-if="$slots.paid">
          <slot name="paid"></slot>
        </div>
        <div :class="$style.buttons" v-if="$slots.buttons">
          <slot name="buttons"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
@import './style.scss';
</style>