<template>
  <div :class="classes">
    <div :class="[$style.container, {[$style.openUp]: openUp}]" ref="container" tabindex="-1" @focusout="closeList">
      <div v-if="isSearchable" :class="$style.search">
        <svg :class="$style.searchIcon" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
          <path
            id="deSearch"
            class="decls-1"
            d="M818.493 273.994a6.5 6.5 0 116.5-6.5 6.5 6.5 0 01-6.5 6.5zm0-11.007a4.506 4.506 0 104.5 4.506 4.5 4.5 0 00-4.5-4.506zm9.516 12.124l-.893.9-3.108-2.633 1.381-1.388z"
            transform="translate(-812 -261)"
          />
        </svg>
        <input
          v-model="search"
          :class="$style.searchInput"
          type="text"
          :placeholder="searchPlaceholderTextLocale"
          ref="searchInput"
        />
      </div>

      <ul v-if="!isGrouped" :class="['custom-scroll', $style.list]" ref="list" tabindex="-1">
        <li
          v-if="useEmptyItem && isSearchEmpty"
          :class="$style.listItem"
          @click="onListItemClickHandler({ value: '', title: emptyItemTitleLocale })"
        >
          <span :class="$style.listItemInner" :data-value="-1">{{ emptyItemTitleLocale }}</span>
        </li>

        <li
          :class="[$style.listItem, { [$style.listItem_selected]: item.value == selectedValue }]"
          v-for="(item, index) in searchItems"
          :key="index"
          @click="onListItemClickHandler(item)"
        >
          <span :class="$style.listItemInner" :data-value="item.value">{{ item.title }}</span>
          <span v-if="item.info && item.info.length" :class="$style.listItemInfo">{{
            item.info
          }}</span>
        </li>
      </ul>

      <ul v-else :class="['custom-scroll', $style.list]" ref="list" tabindex="-1">
        <li
          v-if="useEmptyItem && isSearchEmpty"
          :class="$style.listItem"
          @click="onListItemClickHandler({ value: '', title: emptyItemTitleLocale }, { value: '' })"
        >
          <span :class="$style.listItemInner" :data-value="-1">{{ emptyItemTitleLocale }}</span>
        </li>

        <li :class="$style.groupItem" v-for="(group, index) in items" :key="index">
          <span :class="$style.groupTitle" :data-value="group.value">{{ group.title }}</span>

          <ul :class="$style.groupInnerList">
            <li
              :class="[
                $style.listItem,
                { [$style.listItem_selected]: item.value == selectedValue },
              ]"
              v-for="(item, index) in group.items"
              :key="index"
              @click="onListItemClickHandler(item, group)"
            >
              <span :class="$style.listItemInner" :data-value="item.value">{{ item.title }}</span>
              <span v-if="item.info && item.info.length" :class="$style.listItemInfo">{{
                item.info
              }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <button type="button" :class="$style.button" @click="onButtonClickHandler">
      <div :class="$style.buttonInner">{{ selectedTitle }}</div>
      <span :class="$style.icon"></span>
    </button>
    <input :class="$style.input" type="hidden" ref="input-control" :value="modelValue" />
  </div>
</template>

<script>
  import { defineComponent } from "vue";

  export default defineComponent({
    data() {
      return {
        search: "",
        lang: "ru",
      };
    },
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
      theme: {
        type: String,
        default: "", // card
      },
      useEmptyItem: {
        type: Boolean,
        default: true,
      },
      emptyItemTitle: {
        type: String,
        default: "",
      },
      isGrouped: {
        type: Boolean,
        default: false,
      },
      modelValue: {
        type: [String, Number],
        default: "",
      },
      items: {
        type: Array,
        default: () => [],
      },
      isSearchable: {
        type: Boolean,
        default: false,
      },
      openUp: {
        type: Boolean,
        default: false,
      }
    },
    computed: {
      classes() {
        return [
          this.$style.dropdown,
          {
            [this.$style.dropdown_disabled]: this.disabled,
            [this.$style[`theme_${this.theme}`]]: this.theme.length,
          },
        ];
      },
      searchPlaceholderTextLocale() {
        if (this.lang == "en") return "Search";
        if (this.lang == "es") return "Búsqueda";
        if (this.lang == "pt") return "Procurar";
        return "Поиск";
      },
      selectedValue() {
        return this.modelValue;
      },
      emptyItemTitleLocale() {
        if (this.emptyItemTitle.length) return this.emptyItemTitle;
        if (this.lang == "en") return "Select";
        if (this.lang == "es") return "Elegir";
        if (this.lang == "pt") return "Selecionar";
        return "Выбрать";
      },
      selectedTitle() {
        if (!this.items.length) return this.emptyItemTitleLocale;

        if (this.isGrouped) {
          for (let g of this.items) {
            const item = g.items.find((item) => item.value == this.selectedValue);

            if (item) return item.title;
          }

          return this.emptyItemTitleLocale;
        }

        const elem = this.items.find((item) => item.value == this.selectedValue);
        if (elem) return elem.title;
        return this.emptyItemTitleLocale;
      },
      isSearchEmpty() {
        return !this.search.length;
      },
      searchItems() {
        const s = this.search.trim().toLowerCase();

        return this.search.length
          ? this.items.filter((i) => i.title.toLowerCase().includes(s))
          : this.items;
      },
    },
    created() {
      this.lang = localStorage.getItem("GNZS_SYSTEM_LANG") || "ru";
    },
    methods: {
      openList() {
        this.$refs["container"].classList.add(this.$style.container_opened);
        this.$refs["container"].focus();

        if (this.isSearchable) {
          this.$refs["searchInput"].focus();
        }
      },
      closeList(e) {
        const isTargetChild =
          e &&
          e.relatedTarget &&
          this.$refs["container"] === e.relatedTarget.closest(`.${this.$style.container}`);
        if (isTargetChild) return;

        this.$refs["container"].classList.remove(this.$style.container_opened);
        this.search = "";
      },
      onButtonClickHandler() {
        if (!this.disabled) {
          this.openList();
        }
      },
      onListItemClickHandler(item, group) {
        this.$refs["input-control"].value = item.value;

        if (this.isGrouped) {
          this.$refs["input-control"].dataset.groupValue = group.value;
          this.$emit("update:modelValue", item.value, group.value);
          this.$emit("click", item.value, group.value);
        } else {
          this.$emit("update:modelValue", item.value, item);
          this.$emit("click", item.value, item);
        }

        this.closeList();
      },
    },
  });
</script>

<style lang="scss" module>
  @import "./style.scss";
</style>
