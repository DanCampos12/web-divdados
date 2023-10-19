<template>
  <div class="full-height full-width offset rounded pa-2">
    <span class="subtitle-2 font-weight-bold">
      Patrimônio acumulado desde o início
    </span>
    <highcharts
      v-if="!isResizing"
      :options="chartOptions"
    />
  </div>
</template>
<script lang="ts" src="./AccumulatedValuesComponent.ts"></script>
