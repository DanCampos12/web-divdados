<template>
  <v-sheet class="home--container rounded">
    <div class="first-row--grid">
      <div class="first-column">
        <div class="summary">
          <div class="offset rounded" />
          <div class="offset rounded" />
          <div class="offset rounded" />
        </div>
        <div class="accumulated-values offset rounded" />
      </div>
      <div class="second-column">
        <div class="operation-type-allocation offset rounded" />
        <div class="next-objective offset rounded" />
      </div>
    </div>
    <div class="second-row--grid">
      <div class="next-operations offset rounded" />
      <div class="category-allocation offset rounded" />
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

        div.summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          column-gap: 8px;
          height: 100%;
          width: 100%;
        }

        div.accumulated-values {
          height: 100%;
          width: 100%;
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

        div.operation-type-allocation {
          height: 100%;
          width: 100%;
        }

        div.next-objective {
          height: 100%;
          width: 100%;
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

      div.next-operations {
        height: 100%;
        width: 100%;
      }

      div.category-allocation {
        height: 100%;
        width: 100%;
      }
    }
  }
</style>
