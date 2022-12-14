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
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';

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
  router.push({ path: `template/${id}`, query: { ...route.query } })
}

const addItem = () => {
  console.log('%addItem.vue line:56 route.query', 'color: #007acc;', route.query);
  router.push({ path: '/newTemplate', query: { ...route.query } })

}

onMounted(async () => {
  return await docTemplateStore.loadItems();
});
</script>

<style lang="scss" module>
@import "./style.scss";
</style>