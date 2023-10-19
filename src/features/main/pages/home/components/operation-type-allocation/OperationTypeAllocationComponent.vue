<template>
  <div
    class="full-width offset rounded pa-2"
    :class="{ 'full-height': !isMobile, 'text-center': isMobile }"
  >
    <span class="subtitle-2 font-weight-bold">
      Alocação por operação
    </span>
    <highcharts
      v-if="!isResizing"
      :options="chartOptions"
    />
  </div>
</template>
<script lang="ts" src="./OperationTypeAllocationComponent.ts"></script>
