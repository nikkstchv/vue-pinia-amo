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
              <!-- <th data-code="text">
                {{
                    localization.components.messageTemplate.tables.messages.type
                }}
              </th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td :class="$style.blueText" data-code="name">
                <router-link :to="'template/' + item.id">{{
                    item.name
                }}</router-link>
              </td>
              <!-- <td data-code="text">{{ item.type }}</td> -->
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
import { useInitializationStore } from "@/stores/initialization.store";
import { useDocTemplateStore } from "@/stores/doctemplate.store";

import GnzsButton from "@/gnzs-controls/gnzs-button/gnzs-button.vue";
import { useRouter } from "vue-router";

const docTemplateStore = useDocTemplateStore();
const initializationStore = useInitializationStore();

// computed
const localization = computed(() => initializationStore.localization);
const items = computed(() => docTemplateStore.items);

const router = useRouter();
const addItem = () => {
  router.push('newTemplate')
}

onMounted(async () => {
  return await docTemplateStore.loadItems();
});
</script>

<style lang="scss" module>
@import "./style.scss";
</style>