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
              <th data-code="text">
                {{
                  localization.components.messageTemplate.tables.messages.type
                }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td :class="$style.blueText" data-code="name">
                <!-- <router-link :to="'message/' + message.id">{{
                  message.name
                }}</router-link> -->
                {{ item.name }}
              </td>
              <td data-code="text">{{ item.type }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <GnzsButton
      :type="`append`"
      @click="addMessage"
      :loading="docTemplateStore.loadingAddTemplate"
    >
      {{ localization.components.messageTemplate.buttons.message.add }}
    </GnzsButton>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, type ComputedRef } from "vue";
import { useInitializationStore } from "@/stores/initialization.store";
import { useDocTemplateStore } from "@/stores/doctemplate.store";

import GnzsSpinner from "@/gnzs-controls/gnzs-spinner/gnzs-spinner.vue";
import GnzsButton from "@/gnzs-controls/gnzs-button/gnzs-button.vue";

const docTemplateStore = useDocTemplateStore();
const initializationStore = useInitializationStore();

// computed
const localization = computed(() => initializationStore.localization);
const items: ComputedRef<[]> = computed(() => docTemplateStore.items);

onMounted(async () => {
  return await docTemplateStore.loadItems();
});
</script>

<style lang="scss" module>
@import "./style.scss";
</style>