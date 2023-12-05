<template>
  <div
    class="full-width offset rounded pa-2"
    :class="{ 'full-height': !isMobile, 'text-center': isMobile }"
  >
    <span class="d-flex align-center justify-space-between subtitle-2 font-weight-bold">
      Alocação por operação
      <v-tooltip
        v-if="!!operationTypeAllocations.length && !loading"
        left
      >
        <template #activator="{ on }">
          <v-btn
            fab
            text
            x-small
            v-on="on"
            @click="$router.push({ name: 'Main.Operation' })"
          >
            <v-icon>
              mdi-open-in-new
            </v-icon>
          </v-btn>
        </template>
        Ir para operações
      </v-tooltip>
    </span>
    <div
      v-if="loading"
      class="full-width d-flex flex-column align-center justify-center font-weight-thin"
      style="height: calc(100% - 24px)"
    >
      <v-progress-circular
        class="ma-4"
        color="primary"
        indeterminate
      />
      <div style="font-size: 24px">
        Carregando alocação por operação...
      </div>
    </div>
    <div
      v-else-if="!operationTypeAllocations.length"
      class="full-width d-flex flex-column align-center justify-center font-weight-thin"
      style="height: calc(100% - 24px)"
    >
      <v-icon
        class="ma-4"
        size="80"
      >
        mdi-cash-check
      </v-icon>
      <div style="font-size: 24px">
        Ainda não há movimentações na sua conta.
      </div>
      <v-btn
        text
        @click="$router.push({ name: 'Main.Operation' })"
      >
        Ir para operações
      </v-btn>
    </div>
    <highcharts
      v-else-if="!isResizing"
      :options="chartOptions"
    />
  </div>
</template>
<script lang="ts" src="./OperationTypeAllocationComponent.ts"></script>
