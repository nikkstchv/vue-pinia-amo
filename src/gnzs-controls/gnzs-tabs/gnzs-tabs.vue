<script setup lang="ts">
  import { onMounted, ref, shallowRef, useCssModule, type PropType, type Ref } from "vue";

  interface Tab {
    title: string;
    id: string;
    main?: boolean;
  }

  interface TabRef {
    id: string;
    HTMLElement: Element;
  }

  const props = defineProps({
    tabs: {
      type: Array as PropType<Tab[]>,
      default: () => [],
      require: true,
    },
    current: {
      type: String,
      require: true
    }
  });

  onMounted(() => {
    setTabsList();
    showActiveContent();
  });

  const emit = defineEmits(["change"]);
  const style = useCssModule();

let currentTab: Ref<Tab> = shallowRef(props.tabs.find(tab => tab.id === props.current) || props.tabs[0]);
  let tabsList: Ref<TabRef[]> = ref([]);
  let tabsRef: Ref<HTMLElement | null> = ref(null);

  // methods
  const setTabsList = (): void => {
    const tabsNodeList = tabsRef.value?.querySelectorAll("div[gnzs-tab-id]");
    tabsNodeList?.forEach((el: any) => {
      tabsList.value.push({
        id: el.getAttribute("gnzs-tab-id"),
        HTMLElement: el,
      });
    });
  };

  const onChange = (tab: Tab): void => {
    currentTab.value = tab;
    emit("change", tab.id);
    showActiveContent();
  };

  const showActiveContent = (): void => {
    tabsList.value.forEach((el: TabRef) => {
      if (currentTab.value.id === el.id) {
        el.HTMLElement.classList.remove(`${style.hide}`);
        el.HTMLElement.classList.add(`${style.show}`);
      } else {
        el.HTMLElement.classList.remove(`${style.show}`);
        el.HTMLElement.classList.add(`${style.hide}`);
      }
    });
  };
</script>

<template>
  <div :class="$style.root" ref="tabsRef">
    <div :class="$style.switches">
      <div
        v-for="(tab, index) in props.tabs"
        :key="index"
        :class="[$style.switcher, { [$style.active]: currentTab === tab }]"
        @click="onChange(tab)"
      >
        {{ tab.title }}
      </div>
    </div>

    <div :class="$style.content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" module>
  @import "./style.scss";
</style>
