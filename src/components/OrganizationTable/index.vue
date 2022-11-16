<template>
  <div :class="[$style.root, $style.bots]">
    <div :class="$style.tableContainer">
      <table :class="$style.table">
        <thead>
          <tr>
            <th data-code="name">
              {{
                  localization.components.organizations.tables.headers.name
              }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td :class="$style.blueText" data-code="name">
              <router-link :to="`organization/${item.id}`">{{ item.name }}</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <GnzsButton :class="$style.addButton" :type="`append`" @click="addItem">{{
  localization.components.organizations.buttons.add
  }}</GnzsButton>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router';
import { computed } from "@vue/reactivity";

import { useInitializationStore } from "@/stores/initializationStore";
import { useOrganizationsStore } from "@/stores/organizationsStore";

import GnzsButton from "@/gnzs-controls/gnzs-button/gnzs-button.vue";

const initializationStore = useInitializationStore();
const { items } = storeToRefs(useOrganizationsStore());
const { loadItems } = useOrganizationsStore();

const localization = computed(() => initializationStore.localization);

const router = useRouter();

const addItem = () => {
  router.push('newOrganization')
}

onMounted(async () => {
  await loadItems();
});
</script>

<style lang="scss" module>
@import './style.scss';
</style>