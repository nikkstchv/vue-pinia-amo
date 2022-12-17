<template>
  <div :class="[$style.root, $style.bots]">
    <div :class="$style.tableContainer">
      <table :class="$style.table" v-if="!isDataEmpty">
        <thead>
          <tr>
            <th data-code="number">
              {{ localization.components.documents.tables.headers.number }}
            </th>
            <th data-code="name">
              {{ localization.components.documents.tables.headers.name }}
            </th>
            <th data-code="type">
              {{ localization.components.documents.tables.headers.type }}
            </th>
            <th data-code="entity">
              {{ localization.components.documents.tables.headers.entity }}
            </th>
            <th data-code="organizations">
              {{ localization.components.documents.tables.headers.organizations }}
            </th>
            <th data-code="responsible">
              {{ localization.components.documents.tables.headers.responsible }}
            </th>
            <th data-code="created">
              {{ localization.components.documents.tables.headers.created }}
            </th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="doc in paginated.data" :key="doc.id">
                <td :class="$style.blueText" data-code="number">
                  {{ doc.number }}
                </td>
                <td :class="$style.blueText" data-code="name">
                  {{ getCurrentTemplate(doc.templateId)?.name}}
                </td>
                <td :class="$style.blueText" data-code="type">
                  {{ getCurrentType(+getTypeId(doc.templateId))?.name}}
                </td>
                <td :class="$style.blueText" data-code="entity">
                  <a target="_blank"
                    :href="`https://${accountData?.amoSubdomain}.amocrm.ru/${entityTypesList[doc.entityType]}/detail/${doc.entityId}`">{{
                    doc.entityId
                    }}</a>
                </td>
                <td :class="$style.blueText" data-code="organizations">
                  {{ getCurrentOrg(doc.organizationsId)?.name }}
            </td>
            <td :class="$style.blueText" data-code="responsible">
            {{userName(doc.userId)}}
            </td>
            <td :class="$style.blueText" data-code="created">
              {{ doc.createdAt }}
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else :class="$style.noData">Нет сгенерированных документов</div>
    </div>
  </div>
  <Pagination v-show="!isDataEmpty"
    :range="paginated.total"
    :page-count="paginated.pageCount"
    :current-page="page"
    :limit="limit"
    @on-next-page="nextPage(paginated.pageCount)"
    @on-prev-page="prevPage"
    @on-select-page="selectPage"
    @on-change-limit="changeLimit"
  />
</template>

<script setup>
import { storeToRefs } from "pinia";
import { computed } from "@vue/reactivity";

import Pagination from "@/gnzs-controls/gnzs-pagination/gnzs-pagination.vue";
import { useInitializationStore } from "@/stores/initializationStore";
import { useDocumentStore } from "@/stores/documentStore";
import { useDocTemplateStore } from "@/stores/docTemplateStore";
import { useDocTypeStore } from "@/stores/docTypeStore";
import { useOrganizationsStore } from "@/stores/organizationsStore";

const initializationStore = useInitializationStore();
const localization = computed(() => initializationStore.localization);

const { getCurrentItem: getCurrentTemplate, getTypeId } = storeToRefs(useDocTemplateStore());
const { userName } = useInitializationStore();
const { accountData } = storeToRefs(useInitializationStore());
const { getCurrentItem: getCurrentOrg } = storeToRefs(useOrganizationsStore());
const { getCurrentItem: getCurrentType } = storeToRefs(useDocTypeStore());
const { paginated, page, limit } = storeToRefs(useDocumentStore());
const { nextPage, prevPage, selectPage, changeLimit } = useDocumentStore();

// const isDataEmpty = computed(() => paginated.value.length === 0)
const isDataEmpty = true


const entityTypesList = {
  1: "leads",
  2: "contacts",
  3: "companies",
  12: "customers"
}
</script>

<style lang="scss" module>
@import "./style.scss";
</style>
