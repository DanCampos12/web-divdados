<template>
  <v-sheet
    class="operation--container rounded"
    color="offset"
    :style="{ height: 'calc(100vh - 194px)' }"
  >
    <div
      v-if="loading"
      class="full-width full-height d-flex flex-column align-center justify-center font-weight-thin"
    >
      <v-progress-circular
        class="ma-4"
        color="primary"
        indeterminate
      />
      <div style="font-size: 32px">
        Carregando Operações...
      </div>
    </div>
    <div
      v-else-if="!operations.length"
      class="full-width full-height d-flex flex-column align-center justify-center font-weight-thin text-center"
    >
      <v-icon
        class="ma-4"
        size="80"
      >
        mdi-database-remove-outline
      </v-icon>
      <div style="font-size: 24px">
        A consulta não retornou dados para serem exibidos.
      </div>
    </div>
    <div v-else>
      <div
        class="table--header"
        :class="{ 'mr-3': hasScroll}"
      >
        <div class="pl-2">
          Descrição
        </div>
        <div class="text-center">
          Categoria
        </div>
        <div class="text-center">
          Operação
        </div>
        <div class="text-center">
          Data
        </div>
        <div class="text-right pr-2">
          Valor
        </div>
        <div class="text-center">
          Ações
        </div>
      </div>
      <v-virtual-scroll
        class="scroller"
        item-height="42"
        :items="operations"
        max-height="calc(100vh - 252px)"
        min-height="calc(100vh - 252px)"
      >
        <template v-slot:default="{ item }">
          <div class="table--body">
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
              {{ getCategoryName(item) }}
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
            <div class="d-flex justify-center">
              <v-btn
                class="mr-1"
                icon
                small
                text
                @click="$emit('operationSelectedToEdit', item)"
              >
                <v-icon size="18">
                  {{ item.eventId ? 'mdi-eye-outline' : 'mdi-pencil-outline' }}
                </v-icon>
              </v-btn>
              <v-btn
                class="ml-1"
                :disabled="!!item.eventId"
                icon
                small
                text
                @click="$emit('operationSelectedToDelete', operation)"
              >
                <v-icon size="18">
                  mdi-delete-outline
                </v-icon>
              </v-btn>
            </div>
          </div>
        </template>
      </v-virtual-scroll>
    </div>
  </v-sheet>
</template>
<script lang="ts" src="./TemplateDesktop.ts"></script>
<style lang="scss" scoped>
  .v-sheet.operation--container {
    margin: 8px;
    padding: 0px 16px 16px 16px;

    div.table--header {
      display: grid;
      align-items: center;
      grid-template-rows: 42px;
      grid-template-columns: 1fr repeat(2, 200px) repeat(3, 112px);
      font-size: 14px;
      font-weight: bold;
      border-bottom: 1px solid var(--v-border-base);
    }

    div.table--body {
      display: grid;
      align-items: center;
      grid-template-rows: 42px;
      grid-template-columns: 1fr repeat(2, 200px) repeat(3, 112px);
      font-size: 14px;
      font-weight: light;
      border-bottom: 1px solid var(--v-border-base);
    }
  }
</style>
