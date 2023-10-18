<template>
  <v-sheet class="home--container rounded">
    <div class="first-row--grid">
      <div class="first-column">
        <summary-component
          :loading="loading"
          :summary="overview.summary"
        />
        <accumulated-values-component
          :accumulated-values="overview.accumulatedValues"
          :loading="loading"
        />
      </div>
      <div class="second-column">
        <operation-type-allocation-component
          :loading="loading"
          :operation-type-allocations="overview.operationTypeAllocations"
        />
        <next-objective-component
          :loading="loading"
          :next-objective="overview.nextObjective"
        />
      </div>
    </div>
    <div class="second-row--grid">
      <next-operations-component
        :loading="loading"
        :next-operations="overview.nextOperations"
      />
      <category-allocation-component
        :category-allocations="overview.categoryAllocations"
        :loading="loading"
      />
    </div>
  </v-sheet>
</template>
<script lang="ts" src="./TemplateDesktop.ts"></script>
<style lang="scss" scoped>
  .v-sheet.home--container {
    margin-top: 8px;
    padding: 8px;
    background: transparent;
    height: calc(100vh - 8px);

    div.first-row--grid {
      display: grid;
      column-gap: 8px;
      height: calc(100% - 288px);
      width: 100%;

      @media screen and (min-width: 1366px) {
        grid-template-columns: 1fr 440px;
      }

      @media screen and (min-width: 1920px) {
        grid-template-columns: 1fr 600px;
      }

      div.first-column {
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 8px;
        height: 100%;
        width: 100%;

        @media screen and (min-width: 1366px) {
          grid-template-rows: 96px 1fr;
        }

        @media screen and (min-width: 1920px) {
          grid-template-rows: 120px 1fr;
        }
      }

      div.second-column {
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 8px;
        height: 100%;
        width: 100%;

        @media screen and (min-width: 1366px) {
          grid-template-rows: 1fr 112px;
        }

        @media screen and (min-width: 1920px) {
          grid-template-rows: 1fr 200px;
        }
      }
    }

    div.second-row--grid {
      display: grid;
      column-gap: 8px;
      height: 280px;
      width: 100%;
      margin-top: 8px;

      @media screen and (min-width: 1366px) {
        grid-template-columns: 1fr 440px;
      }

      @media screen and (min-width: 1920px) {
        grid-template-columns: 1fr 600px;
      }
    }
  }
</style>
