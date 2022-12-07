<template>
  <Icons />
  <Header />
  <Section>
    <div :class="$style.rowFlex">
      <div :class="$style.fieldsWrapper">
        <div :class="$style.inputDesc">{{ localization.tab.titles.organization }}</div>
        <GnzsDropdown :items="mappedOrgs" v-model="currOrgId" :class="[$style.inputName, $style.orgInput]"
          positive-only />
      </div>
      <div>
        <div :class="$style.inputDesc">{{ localization.tab.titles.settlement }}</div>
        <GnzsDropdown :items="getSettlementsList" v-model="currSettlmentId" :class="$style.orgInput" positive-only />
      </div>
    </div>
    <div :class="$style.rowFlex">
      <div :class="$style.templateContainer">
        <div :class="$style.inputDesc">{{ localization.tab.titles.document }}</div>
        <GnzsDropdown :items="getTemplatesList" v-model="currTemplateId" :class="$style.orgInput" positive-only />
      </div>
      <GnzsButton :loading="isLoading" @click="addItem" :class="$style.templateBtn">
        {{ localization.buttons.create }}
      </GnzsButton>
    </div>

    <div :class="$style.columnFlex">
      <div v-for="document in documents" :class="$style.rowFlexDocField">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="7 0 48 48">
          <path fill="#2196f3"
            d="M37,45H11c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h19l10,10v29C40,43.657,38.657,45,37,45z"></path>
          <path fill="#bbdefb" d="M40 13L30 13 30 3z"></path>
          <path fill="#1565c0" d="M30 13L40 23 40 13z"></path>
          <path fill="#e3f2fd" d="M15 23H33V25H15zM15 27H33V29H15zM15 31H33V33H15zM15 35H25V37H15z"></path>
        </svg>
        <div>
          <p>
            {{ getCurrTemplateName(document.templateId) }}
            №{{ document.number || "--" }} от {{ document.createdAt }}
          </p>
          <p :class="$style.docDescription">
            {{ getCurrOrganizationName(document.organizationId) || "--"}},
            {{ getCurrSettlementName(document.settlementAccountId) || "--"}}
          </p>
        </div>
      </div>
    </div>
  </Section>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";

import { useInitializationStore } from "@/stores/initializationStore";
import { useOrganizationsStore } from "@/stores/organizationsStore";
import { useDocumentStore } from "@/stores/documentStore";

import Icons from "@/gnzs-controls/gnzs-icons-sprite/gnzs-icons-sprite.vue";
import Header from "@/components/TabHeader";
import Section from "@/gnzs-controls/gnzs-section/gnzs-section.vue";
import GnzsButton from "@/gnzs-controls/gnzs-button/gnzs-button.vue";
import GnzsDropdown from "@/gnzs-controls/gnzs-dropdown/gnzs-dropdown.vue";

import init from "@/init";

const { mappedOrgs } = storeToRefs(useOrganizationsStore());
const {
  items: documents,
  userId,
  entityId,
  entityType,
  isLoading,
  currOrgId,
  currSettlmentId,
  currTemplateId,
  getSettlementsList,
  getTemplatesList,
  getCurrTemplateName,
  getCurrOrganizationName,
  getCurrSettlementName,
} = storeToRefs(useDocumentStore());
const { loadItems: loadDocuments, addItem } = useDocumentStore();

// computed
const localization = computed(() => useInitializationStore().localization);

const route = useRoute();

userId.value = +route.query['user-id'] || 0;
entityId.value = +route.query['entity-id'] || 0;
entityType.value = +route.query['entity-type'] || 0;
console.log('%cindex.vue line:93 object', 'color: #007acc;', entityType.value);



onMounted(async () => {
  const route = useRoute();
  await init(route);
  loadDocuments();
});
</script>

<style lang="scss" module>
@import "./style.scss";
</style>
