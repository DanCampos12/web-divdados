<template>
  <div
    :id="_uid"
    class="full-width offset rounded pa-2"
    :class="{ 'full-height': !isMobile, 'text-center': isMobile }"
  >
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
