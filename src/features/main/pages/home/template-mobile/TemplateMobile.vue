<template>
  <v-sheet class="home--container rounded scroller">
    <summary-component
      :loading="loading"
      :summary="overview.summary"
    />
    <accumulated-values-component
      :accumulated-values="overview.accumulatedValues"
      class="mt-2"
      :loading="loading"
    />
    <category-allocation-component
      :category-allocations="overview.categoryAllocations"
      class="mt-2"
      :loading="loading"
    />
    <operation-type-allocation-component
      class="mt-2"
      :loading="loading"
      :operation-type-allocations="overview.operationTypeAllocations"
    />
    <next-objective-component
      class="mt-2"
      :loading="loading"
      :next-objective="overview.nextObjective"
    />
    <next-operations-component
      class="mt-2"
      :loading="loading"
      :next-operations="overview.nextOperations"
    />
  </v-sheet>
</template>
<script lang="ts" src="./TemplateMobile.ts"></script>
<style lang="scss" scoped>
  .scroller::-webkit-scrollbar {
    width: 0px;
    height: 16px;
  }

  .v-sheet.home--container {
    margin-top: 8px;
    padding: 8px;
    background: transparent;
    height: calc(100vh - 72px);
  }
</style>
