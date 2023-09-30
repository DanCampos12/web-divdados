<template>
  <div>
    <v-tabs
      v-model="tabSelected"
      background-color="transparent"
      class="ma-2"
      dense
      height="38"
    >
      <v-tab active-class="primary offset--text">
        Efetuadas
      </v-tab>
      <v-tab active-class="primary offset--text">
        Pendentes
      </v-tab>
    </v-tabs>
    <operation-filter-component @addOperation="setFormVisible(true)" />
    <v-fade-transition>
      <operation-table-component
        v-if="tabSelected === 0"
        :categories="categories"
        :loading="loading"
        :operations="operationsEffected"
      />
      <operation-table-component
        v-else
        :categories="categories"
        :loading="loading"
        :operations="operationsPending"
      />
    </v-fade-transition>
  </div>
</template>
<script lang="ts" src="./OperationComponent.ts"></script>
