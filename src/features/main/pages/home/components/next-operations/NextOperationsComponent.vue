<template>
  <div class="full-height full-width offset rounded pa-2">
    <span class="subtitle-2 font-weight-bold">
      Próximas operações
    </span>
    <div
      class="scroller mt-2"
      style="height: 220px"
    >
      <div
        v-for="(item, index) in nextOperations"
        :key="index"
        class="table--body"
      >
        <div class="pl-2 d-flex align-center">
          <v-icon
            class="mr-2"
            :color="item.type === 'I' ? 'success' : 'error'"
            size="22"
          >
            {{ item.type === 'I' ? 'mdi-arrow-top-right-bold-box-outline' : 'mdi-arrow-bottom-right-bold-box-outline' }}
          </v-icon>
          {{ item.description }}
          <v-tooltip
            v-if="item.eventId"
            max-width="200"
            right
          >
            <template #activator="{ on }">
              <v-icon
                class="ml-2"
                size="16"
                v-on="on"
              >
                mdi-information-outline
              </v-icon>
            </template>
            Operações geradas por eventos automáticos não podem ser alteradas.
          </v-tooltip>
        </div>
        <div class="d-flex align-center justify-center">
          {{ item.categoryName }}
        </div>
        <div class="d-flex align-center justify-center">
          {{ item.type === 'I' ? 'Entrada' : 'Saída' }}
        </div>
        <div class="d-flex align-center justify-center">
          <dd-date :value="item.date" />
        </div>
        <div class="pr-2 d-flex align-center justify-end">
          <dd-money :value="item.value" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./NextOperationsComponent.ts"></script>
<style lang="scss" scoped>
  div.table--body {
    display: grid;
    align-items: center;
    grid-template-rows: 42px;
    grid-template-columns: 1fr repeat(4, 120px);
    font-size: 14px;
    font-weight: light;
    border-bottom: 1px solid var(--v-border-base);
  }
</style>
