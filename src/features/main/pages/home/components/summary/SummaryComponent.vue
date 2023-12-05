<template>
  <div
    class="summary"
    :class="{ 'full-height': !isMobile, 'layout--mobile': isMobile }"
  >
    <div
      class="offset rounded d-flex flex-column justify-center pa-2"
      :class="{ 'align-center': isMobile }"
    >
      <span class="subtitle-2 font-weight-bold">Patrimônio total</span>
      <v-progress-circular
        v-if="loading"
        class="mt-2"
        color="primary"
        indeterminate
      />
      <dd-money
        v-else
        class="text-h4 font-weight-thin"
        :value="summary.totalValue"
      />
    </div>
    <div
      class="offset rounded d-flex flex-column justify-center pa-2"
      :class="{ 'align-center': isMobile }"
    >
      <span class="subtitle-2 font-weight-bold">Entradas</span>
      <v-progress-circular
        v-if="loading"
        class="mt-2"
        color="primary"
        indeterminate
      />
      <div
        v-else
        class="d-flex align-center text-h4 success--text font-weight-thin"
      >
        <dd-money :value="summary.inflowValue" />
        <v-icon
          class="ml-2"
          color="success"
          size="22"
        >
          mdi-arrow-up-thin-circle-outline
        </v-icon>
      </div>
    </div>
    <div
      class="offset rounded d-flex flex-column justify-center pa-2"
      :class="{ 'align-center': isMobile }"
    >
      <span class="subtitle-2 font-weight-bold">Saídas</span>
      <v-progress-circular
        v-if="loading"
        class="mt-2"
        color="primary"
        indeterminate
      />
      <div
        v-else
        class="d-flex align-center text-h4 error--text font-weight-thin"
      >
        <dd-money :value="summary.outflowValue" />
        <v-icon
          class="ml-2"
          color="error"
          size="22"
        >
          mdi-arrow-down-thin-circle-outline
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
