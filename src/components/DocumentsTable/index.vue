<template>
  <div :class="[$style.root, $style.bots]">
    <div :class="$style.tableContainer">
      <table :class="$style.table">
        <thead>
          <tr>
            <th data-code="name">
              {{
                  localization.components.documents.tables.headers.number
              }}
            </th>
            <th data-code="name">
              {{
                  localization.components.documents.tables.headers.name
              }}
            </th>
            <th data-code="name">
              {{
                  localization.components.documents.tables.headers.type
              }}
            </th>
            <th data-code="name">
              {{
                  localization.components.documents.tables.headers.entity
              }}
            </th>
            <th data-code="name">
              {{
                  localization.components.documents.tables.headers.organization
              }}
            </th>
            <th data-code="name">
              {{
                  localization.components.documents.tables.headers.responsible
              }}
            </th>
            <th data-code="name">
              {{
                  localization.components.documents.tables.headers.created
              }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="doc in documents" :key="doc.id">
            <td :class="$style.blueText" data-code="number">
              {{ doc.number }}
            </td>
            <td :class="$style.blueText" data-code="name">
              {{ getCurrentTemplate(doc.templateId).name }}
            </td>
            <td :class="$style.blueText" data-code="type">
              {{ getCurrentType(+getTypeId(doc.templateId)).name }}
            </td>
            <td :class="$style.blueText" data-code="entity">
              {{ doc.entityType }}
            </td>
            <td :class="$style.blueText" data-code="organization">
              {{ getCurrentOrg(doc.organizationId)?.name }}
            </td>
            <td :class="$style.blueText" data-code="responsible">
              {{ doc.userId }}
            </td>
            <td :class="$style.blueText" data-code="created">
              {{ doc.createdAt }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, toRaw } from "vue";
import { storeToRefs } from "pinia";
import { computed } from "@vue/reactivity";

import { useInitializationStore } from "@/stores/initializationStore";
import { useDocumentStore } from "@/stores/documentStore";
import { useDocTemplateStore } from "@/stores/doctemplateStore"
import { useDocTypeStore } from "@/stores/doctypeStore"
import { useOrganizationsStore } from "@/stores/organizationsStore";

const initializationStore = useInitializationStore();
const localization = computed(() => initializationStore.localization);


const { getCurrentItem: getCurrentOrg } = storeToRefs(useOrganizationsStore());
const { getCurrentItem: getCurrentType } = storeToRefs(useDocTypeStore());
const { getCurrentItem: getCurrentTemplate, getTypeId } = storeToRefs(useDocTemplateStore());
const { items: documents } = storeToRefs(useDocumentStore());

const { loadItems } = useDocumentStore();


onMounted(async () => {
  await loadItems();
});
</script>

<style lang="scss" module>
@import './style.scss';
</style>