<template>
  <div
    class="summary"
    :class="{ 'full-height': !isMobile, 'layout--mobile text-center': isMobile }"
  >
    <div class="offset rounded d-flex flex-column justify-center pa-2">
      <span class="subtitle-2 font-weight-bold">Patrimônio total</span>
      <dd-money
        class="text-h4 font-weight-thin"
        :value="summary.totalValue"
      />
    </div>
    <div
      class="offset rounded d-flex flex-column justify-center pa-2"
      :class="{ 'align-center': isMobile }"
    >
      <span class="subtitle-2 font-weight-bold">Entradas</span>
      <div class="d-flex align-center text-h4 success--text font-weight-thin">
        <dd-money :value="summary.inflowValue" />
        <v-icon
          class="ml-2"
          color="success"
          size="22"
        >
          mdi-arrow-top-right-bold-box-outline
        </v-icon>
      </div>
    </div>
    <div
      class="offset rounded d-flex flex-column justify-center pa-2"
      :class="{ 'align-center': isMobile }"
    >
      <span class="subtitle-2 font-weight-bold">Saídas</span>
      <div class="d-flex align-center text-h4 error--text font-weight-thin">
        <dd-money :value="summary.outflowValue" />
        <v-icon
          class="ml-2"
          color="error"
          size="22"
        >
          mdi-arrow-bottom-right-bold-box-outline
        </v-icon>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./SummaryComponent.ts"></script>
<style lang="scss" scoped>
  div.summary {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 8px;
    row-gap: 8px;
    width: 100%;

    &.layout--mobile {
      grid-template-columns: 1fr;
    }
  }
</style>
