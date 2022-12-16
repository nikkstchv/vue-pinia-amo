<template>
  <div class="">
    <div :class="[$style.root, $style.bots]">
      <div :class="$style.tableContainer">
        <table :class="$style.table">
          <thead>
            <tr>
              <th data-code="name">
                {{
                    localization.components.messageTemplate.tables.messages.name
                }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td :class="$style.blueText" data-code="name">
                <a @click="changeRoute(item.id)">{{ item.name }}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <GnzsButton :class="$style.addButton" :type="`append`" @click="addItem">{{
        localization.buttons.append
    }}</GnzsButton>
  </div>
</template> 

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from 'vue-router';

import PATHS from "@/router/paths";

import { useInitializationStore } from "@/stores/initializationStore";
import { useDocTemplateStore } from "@/stores/docTemplateStore";

import GnzsButton from "@/gnzs-controls/gnzs-button/gnzs-button.vue";

const docTemplateStore = useDocTemplateStore();
const initializationStore = useInitializationStore();

// computed
const localization = computed(() => initializationStore.localization);
const items = computed(() => docTemplateStore.items);

const router = useRouter();
const route = useRoute()

const changeRoute = (id) => {
  router.push({ name: PATHS.TEMPLATE.name, params: { id: id }, query: { ...route.query } })
}

const addItem = () => {
  router.push({ path: PATHS.NEW_TEMPLATE.path, query: { ...route.query } })

}
</script>

<style lang="scss" module>
@import "./style.scss";
</style>