<template>
  <v-sheet class="home--container rounded scroller">
    <div class="first-column">
      <summary-component
        :loading="loading"
        :summary="overview.summary"
      />
      <accumulated-values-component
        :accumulated-values="overview.accumulatedValues"
        :is-resizing="isResizing"
        :loading="loading"
      />
      <next-operations-component
        :loading="loading"
        :next-operations="overview.nextOperations"
      />
    </div>
    <div class="second-column">
      <category-allocation-component
        :category-allocations="overview.categoryAllocations"
        :is-resizing="isResizing"
        :loading="loading"
      />
      <next-objective-component
        v-if="$vuetify.breakpoint.xl"
        :loading="loading"
        :next-objective="overview.nextObjective"
      />
      <operation-type-allocation-component
        :is-resizing="isResizing"
        :loading="loading"
        :operation-type-allocations="overview.operationTypeAllocations"
      />
    </div>
    <next-objective-component
      v-if="!$vuetify.breakpoint.xl"
      :loading="loading"
      :next-objective="overview.nextObjective"
      style="height: 120px"
    />
  </v-sheet>
</template>
<script lang="ts" src="./TemplateDesktop.ts"></script>
<style lang="scss" scoped>
  .v-sheet.home--container {
    margin-top: 8px;
    padding: 8px;
    background: transparent;
    height: calc(100vh - 8px);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, auto);
    column-gap: 8px;
    row-gap: 8px;

    div.first-column {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 112px 440px 280px;
      row-gap: 8px;
    }

    div.second-column {
      display: grid !important;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: 440px;
      column-gap: 8px;
    }

    @media screen and (min-width: 1904px) {
      display: grid;
      grid-template-columns: 1fr 600px;
      grid-template-rows: auto;
      column-gap: 8px;
      row-gap: 8px;

      div.first-column {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 112px 1fr 280px;
        row-gap: 8px;
      }

      div.second-column {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 120px 280px;
        row-gap: 8px;
      }
    }
  }
</style>
