<template>
  <div
    :id="_uid"
    class="full-width offset rounded pa-2"
    :class="{ 'full-height': !isMobile, 'text-center': isMobile }"
  >
    <span class="d-flex align-center justify-space-between subtitle-2 font-weight-bold">
      Alocação por categoria
      <v-tooltip
        v-if="!!categoryAllocations.length && !loading"
        left
      >
        <template #activator="{ on }">
          <v-btn
            fab
            text
            x-small
            v-on="on"
            @click="$router.push({ name: 'Main.Category' })"
          >
            <v-icon>
              mdi-open-in-new
            </v-icon>
          </v-btn>
        </template>
        Ir para categorias
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
        Carregando alocação por categoria...
      </div>
    </div>
    <div
      v-else-if="!categoryAllocations.length"
      class="full-width d-flex flex-column align-center justify-center font-weight-thin"
      style="height: calc(100% - 24px)"
    >
      <v-icon
        class="ma-4"
        size="80"
      >
        mdi-shape-outline
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
<script lang="ts" src="./CategoryAllocationComponent.ts"></script>
