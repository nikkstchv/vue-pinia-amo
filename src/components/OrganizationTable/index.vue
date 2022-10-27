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
            <!-- <th data-code="text">
              {{
              localization.components.organizations.tables.headers.info
              }}
            </th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td :class="$style.blueText" data-code="name">
              <router-link :to="`organization/${item.id}`">{{ item.name }}</router-link>
            </td>
            <td :class="$style.blueText" data-code="name">
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
import { useRouter } from 'vue-router';
import { computed } from "@vue/reactivity";
import { storeToRefs } from "pinia";
import { useOrganizationsStore } from "@/stores/organizations.store";
import { useInitializationStore } from "@/stores/initialization.store";
import GnzsButton from "@/gnzs-controls/gnzs-button/gnzs-button.vue";

const router = useRouter();
const initializationStore = useInitializationStore();
const localization = computed(() => initializationStore.localization);

const { items } = storeToRefs(useOrganizationsStore());
const { loadItems } = useOrganizationsStore();

const addItem = () => {
  router.push('newOrganization')
}

onMounted(async () => {
  return await loadItems();
});
</script>

<style lang="scss" module>
@import './style.scss';
</style>