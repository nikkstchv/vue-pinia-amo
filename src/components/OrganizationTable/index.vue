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
              <a @click="changeRoute(item.id)">{{ item.name }}</a>
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
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from 'vue-router';
import { computed } from "@vue/reactivity";

import PATHS from "@/router/paths"

import { useInitializationStore } from "@/stores/initializationStore";
import { useOrganizationsStore } from "@/stores/organizationsStore";

import GnzsButton from "@/gnzs-controls/gnzs-button/gnzs-button.vue";

const initializationStore = useInitializationStore();
const { items } = storeToRefs(useOrganizationsStore());

const localization = computed(() => initializationStore.localization);

const router = useRouter();
const route = useRoute()

const changeRoute = (id) => {
  router.push({ name: PATHS.ORGANIZATION.name, params: { id }, query: { ...route.query } })
}

const addItem = () => {
  router.push({ path: PATHS.NEW_ORGANIZATION.path, query: { ...route.query } })
}
</script>

<style lang="scss" module>
@import './style.scss';
</style>