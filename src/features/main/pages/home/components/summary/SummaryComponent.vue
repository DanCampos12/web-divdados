<template>
  <div class="summary">
    <div class="offset rounded">
      {{ summary.totalValue }}
    </div>
    <div class="offset rounded">
      {{ summary.inflowValue }}
    </div>
    <div class="offset rounded">
      {{ summary.outflowValue }}
    </div>
  </div>
</template>
<script lang="ts" src="./SummaryComponent.ts"></script>
<style lang="scss" scoped>
  div.summary {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 8px;
    height: 100%;
    width: 100%;
  }
</style>
