<template>
  <div
    ref="root"
    :class="[
      $style.root,
      {
        [$style.root_disabled]: disabled,
        [$style[`theme_${theme}`]]: theme.length,
      },
    ]"
  >
    <div :class="$style.container" ref="container" tabindex="-1" @focusout="closeList">
      <!-- Поиск START -->
      <li v-if="isSearchable" :class="$style.search">
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
      </li>
      <!-- Поиск END -->

      <!-- Обычная выпадашка START -->
      <ul v-if="!isGrouped" :class="['custom-scroll', $style.list]" ref="list" tabindex="-1">
        <li :class="$style.listItem" v-show="!search.length">
          <GnzsCheckbox
            :modelValue="isAllChecked || isSomeChecked"
            :isSomeChecked="isSomeChecked"
            :label="allTitle"
            @input="setCheckAll"
            :class="[$style.listCheckbox, $style.checkboxMaster]"
          />
        </li>

        <li :class="$style.listItem" v-for="(item, index) in searchItems" :key="index">
          <GnzsCheckbox
            :modelValue="isChecked(item)"
            :label="item.title"
            :class="$style.listCheckbox"
            @input="onCheckItem(item, $event)"
            :info="item.info"
          />
        </li>
      </ul>
      <!-- Обычная выпадашка END -->

      <!-- Групповая выпадашка START -->
      <ul v-else :class="['custom-scroll', $style.list]" ref="list" tabindex="-1">
        <li :class="$style.listItem" v-show="!search.length">
          <GnzsCheckbox
            :modelValue="isAllChecked || isSomeChecked"
            :isSomeChecked="isSomeChecked"
            :label="allTitle"
            @input="setCheckAll"
            :class="[$style.listCheckbox, $style.checkboxMaster]"
          />
        </li>

        <li :class="$style.groupItem" v-for="(group, index) in searchItems" :key="index">
          <GnzsCheckbox
            :modelValue="
              isGroupCheckedByValue[group.value] || isGroupSomeCheckedByValue[group.value]
            "
            :label="group.title"
            :isSomeChecked="isGroupSomeCheckedByValue[group.value]"
            :class="[$style.listCheckbox, $style.groupCheckbox]"
            @input="checkGroup(group)"
            :info="group.info"
          />

          <ul :class="['custom-scroll', $style.list]">
            <li v-for="item in group.items" :key="item.value">
              <GnzsCheckbox
                :modelValue="isChecked(item)"
                :label="item.title"
                :class="$style.listCheckbox"
                @input="onCheckItem(item, $event)"
                :info="item.info"
              />
            </li>
          </ul>
        </li>
      </ul>
      <!-- Групповая выпадашка END -->
    </div>

    <div :class="$style.titleWrapper" @click="onWrapperClickHandler">
      <GnzsCheckbox
        :modelValue="isAllChecked || isSomeChecked"
        :isSomeChecked="isSomeChecked"
        @input="setCheckAll"
        :class="$style.checkboxMaster"
      />
      <div :class="$style.titleSelected">
        <template v-if="isAllChecked || !isSomeChecked">
          <div :class="$style.titleItem">
            {{ isAllChecked ? allSelectedTextLocale : initialTextLocale }}
          </div>
        </template>
        <template v-else-if="isInlineTitle">
          <div :class="$style.inlineTitle">
            {{ checkedTitles.join(", ") }}
          </div>
        </template>
        <template v-else-if="!isAllChecked && isSomeChecked">
          <div :class="$style.titleItem" v-for="itemTitle in checkedTitles" :key="itemTitle">
            {{ itemTitle }}
          </div>
        </template>
      </div>
      <span :class="$style.icon"></span>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from "vue";
  import GnzsCheckbox from "../gnzs-checkbox/gnzs-checkbox.vue";

  export default defineComponent({
    props: {
      name: String,
      disabled: Boolean,
      initialText: {
        type: String,
        default: "",
      },
      allSelectedText: {
        type: String,
        default: "",
      },
      theme: {
        type: String,
        default: "", // card
      },
      isGrouped: {
        type: Boolean,
        default: false,
      },
      modelValue: {
        type: Array,
        default: () => [],
      },
      items: {
        type: Array,
        default: () => [],
      },
      isSearchable: {
        type: Boolean,
        default: false,
      },
      isInlineTitle: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        search: "",
        showCount: 5,
        lang: "ru",
      };
    },
    computed: {
      searchPlaceholderTextLocale() {
        if (this.lang == "en") return "Search";
        if (this.lang == "es") return "Búsqueda";
        if (this.lang == "pt") return "Procurar";
        return "Поиск";
      },
      initialTextLocale() {
        if (this.initialText.length > 1) return this.initialText;
        if (this.lang == "en") return "Select";
        if (this.lang == "es") return "Elegir";
        if (this.lang == "pt") return "Selecionar";
        return "Выбрать";
      },
      allSelectedTextLocale() {
        if (this.allSelectedText.length > 1) return this.allSelectedText;
        if (this.lang == "en") return "All values";
        if (this.lang == "es") return "Todos los  valores";
        if (this.lang == "pt") return "Todos os valores";
        return "Все значения";
      },
      checkedValues() {
        return this.modelValue;
      },
      checkedItems() {
        return this.items.filter((i) => this.checkedValues.includes(i.value));
      },
      moreSelectedItemsTextLocale() {
        const count = this.checkedItems.length - this.showCount;
        if (this.lang == "en") return count + " more";
        if (this.lang == "es") return count + " màs";
        if (this.lang == "pt") return count + " mais";
        return "Ещё " + count;
      },
      checkedTitles() {
        if (!this.isGrouped) {
          if (!this.isInlineTitle) {
            const result = [...this.checkedItems.slice(0, this.showCount).map((i) => i.title)];
            if (this.checkedItems.length > this.showCount) {
              result.push(this.moreSelectedItemsTextLocale);
            }
            return result;
          } else {
            return this.checkedItems.map((i) => i.title);
          }
        } else {
          const result = [];

          this.items.forEach((group) => {
            if (this.isGroupCheckedByValue[group.value]) {
              result.push(group.title);
            } else {
              group.items.forEach((item) => {
                if (this.checkedValues.includes(item.value)) {
                  result.push(item.title);
                }
              });
            }
          });

          if (this.isInlineTitle || result.length <= this.showCount) return result;

          return [...result.slice(0, this.showCount), this.moreSelectedItemsTextLocale];
        }
      },
      isSearchEmpty() {
        return !this.search.length;
      },
      searchItems() {
        const s = this.search.trim().toLowerCase();

        if (this.search.length) {
          if (!this.isGrouped) {
            return this.items.filter((i) => i.title.toLowerCase().includes(s));
          } else {
            const result = [];

            this.items.forEach((group) => {
              if (group.title.toLowerCase().includes(s)) {
                // выводим всю группу, если нашли по названию группы
                result.push(group);
              } else {
                // иначе выводим элементы группы и саму группу
                const groupItems = group.items.filter((i) => i.title.toLowerCase().includes(s));
                if (groupItems.length) {
                  result.push(Object.assign({}, { ...group, items: groupItems }));
                }
              }
            });

            return result;
          }
        }

        return this.items;
      },
      groupedItemsCount() {
        if (!this.isGrouped) return 0;
        return this.items.reduce((res, group) => (res += group.items.length), 0);
      },
      isSomeChecked() {
        if (this.isGrouped) {
          return !!(
            this.checkedValues.length && this.groupedItemsCount !== this.checkedValues.length
          );
        } else {
          return !!(this.checkedValues.length && this.items.length !== this.checkedValues.length);
        }
      },
      isAllChecked() {
        if (this.isGrouped) {
          return this.groupedItemsCount === this.checkedValues.length;
        } else {
          return this.items.length === this.checkedValues.length;
        }
      },
      allTitle() {
        if (this.isSomeChecked || this.isAllChecked) {
          if (this.lang == "en") return "Select none";
          if (this.lang == "es") return "Ninguno";
          if (this.lang == "pt") return "Nem";
          return "Снять выделение";
        }

        if (this.lang == "en") return "Select all";
        if (this.lang == "es") return "Seleccionar todo";
        if (this.lang == "pt") return "Selecionar tudo";

        return "Выбрать всё";
      },

      isGroupCheckedByValue() {
        const result = {};
        this.items.forEach((group) => {
          const isGroupChecked = group.items.every(({ value }) =>
            this.checkedValues.includes(value)
          );
          result[group.value] = isGroupChecked;
        });
        return result;
      },
      isGroupSomeCheckedByValue() {
        const result = [];
        this.items.forEach((group) => {
          const checkedItems = group.items.filter(({ value }) =>
            this.checkedValues.includes(value)
          );
          const isGroupSomeChecked =
            checkedItems.length > 0 && group.items.length != checkedItems.length;
          result[group.value] = isGroupSomeChecked;
        });
        return result;
      },
    },
    created() {
      this.lang = localStorage.getItem("GNZS_SYSTEM_LANG") || "ru";
    },
    methods: {
      openList() {
        this.$refs["container"].classList.add(this.$style.container_opened);
        this.$refs["root"].classList.add(this.$style.root_opened);
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
        this.$refs["root"].classList.remove(this.$style.root_opened);
        this.search = "";
      },
      onWrapperClickHandler(e) {
        if (e.target.classList.contains(this.$style.input)) return;
        if (e.target.closest(`.${this.$style.checkboxMaster}`)) return;

        if (!this.disabled) {
          this.openList();
        }
      },
      onCheckItem(item, isChecked) {
        this.checkItem(item, isChecked);
        this.$emit("update:modelValue", this.checkedValues);
        this.$emit("click", item);
      },
      checkItem(item, isChecked) {
        const index = this.checkedValues.indexOf(item.value);

        if (isChecked && index == -1) {
          this.checkedValues.push(item.value);
        } else if (index > -1) {
          this.checkedValues.splice(index, 1);
        }
      },
      setCheckAll() {
        let isChecked = this.isSomeChecked || this.isAllChecked ? false : true;

        if (!this.isGrouped) {
          this.items.forEach((item) => {
            this.checkItem(item, isChecked);
          });
        } else {
          this.items.forEach((group) => {
            group.items.forEach((item) => {
              this.checkItem(item, isChecked);
            });
          });
        }

        this.$emit("update:modelValue", this.checkedValues);
        this.$emit("click", { value: 0 });
      },

      isChecked(item) {
        return this.modelValue.includes(item.value);
      },

      checkGroup(group) {
        let groupChecked =
          this.isGroupCheckedByValue[group.value] || this.isGroupSomeCheckedByValue[group.value];

        if (groupChecked) {
          group.items.forEach((item) => {
            const index = this.checkedValues.findIndex((v) => v == item.value);
            if (index > -1) this.checkItem(item, false);
          });
        } else {
          group.items.forEach((item) => {
            if (!this.checkedValues.includes(item.value)) {
              this.checkItem(item, true);
            }
          });
        }

        this.$emit("update:modelValue", this.checkedValues);
      },
    },
    components: {
      GnzsCheckbox,
    },
  });
</script>

<style lang="scss" module>
  @import "./style.scss";
</style>
