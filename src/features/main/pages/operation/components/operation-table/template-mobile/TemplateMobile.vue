<template>
  <v-sheet
    class="operation--container rounded"
    color="offset"
    :style="{ height: 'calc(100vh - 294px)' }"
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
      <v-virtual-scroll
        class="scroller"
        item-height="76"
        :items="operations"
        max-height="calc(100vh - 320px)"
        min-height="calc(100vh - 320px)"
      >
        <template v-slot:default="{ item }">
          <div class="table--body">
            <div class="operation--info">
              <div class="d-flex justify-center">
                <v-icon
                  class="mr-2"
                  :color="item.type === 'I' ? 'success' : 'error'"
                  size="22"
                >
                  {{ item.type === 'I' ? 'mdi-arrow-top-right-bold-box-outline' : 'mdi-arrow-bottom-right-bold-box-outline' }}
                </v-icon>
              </div>
              <div class="d-flex align-center justify-space-between">
                <div class="d-flex flex-column justify-center">
                  <div class="d-flex align-center font-weight-bold">
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
                  <div
                    class="text-caption"
                    style="margin-top: -6px"
                  >
                    {{ item.categoryName }}
                  </div>
                </div>
                <div class="d-flex flex-column justify-center text-right">
                  <dd-money
                    class=" font-weight-bold"
                    :value="item.value"
                  />
                  <dd-date
                    class="text-caption"
                    style="margin-top: -6px"
                    :value="item.date"
                  />
                </div>
              </div>
            </div>
            <div class="action--buttons d-flex align-center text-caption justify-space-between">
              <div>
                {{ item.type === 'I' ? 'Entrada' : 'Saída' }}
              </div>
              <div class="d-flex align-center pr-1">
                <v-tooltip left>
                  <template #activator="{ on }">
                    <v-btn
                      class="mr-1"
                      icon
                      text
                      x-small
                      v-on="on"
                      @click="$emit('operationSelectedToEdit', item)"
                    >
                      <v-icon size="20">
                        {{ item.eventId ? 'mdi-eye-outline' : 'mdi-pencil-outline' }}
                      </v-icon>
                    </v-btn>
                  </template>
                  {{ item.eventId ? 'Visualizar' : 'Alterar' }}
                </v-tooltip>
                <v-tooltip
                  v-if="!!item.effected"
                  left
                >
                  <template #activator="{ on }">
                    <v-btn
                      class="ml-1"
                      :disabled="!!item.eventId"
                      icon
                      text
                      x-small
                      v-on="on"
                      @click="$emit('operationSelectedToDelete', item)"
                    >
                      <v-icon size="20">
                        mdi-delete-outline
                      </v-icon>
                    </v-btn>
                  </template>
                  Excluir
                </v-tooltip>
                <v-tooltip
                  v-else
                  left
                >
                  <template #activator="{ on }">
                    <v-btn
                      class="ml-1"
                      icon
                      text
                      x-small
                      v-on="on"
                      @click="$emit('operationSelectedToEffect', item)"
                    >
                      <v-icon size="20">
                        mdi-cash-plus
                      </v-icon>
                    </v-btn>
                  </template>
                  Efetuar
                </v-tooltip>
              </div>
            </div>
          </div>
        </template>
      </v-virtual-scroll>
    </div>
  </v-sheet>
</template>
<script lang="ts" src="./TemplateMobile.ts"></script>
<style lang="scss" scoped>
  .scroller::-webkit-scrollbar {
    width: 0px;
    height: 16px;
  }

  .v-sheet.operation--container {
    margin: 0px 8px;
    padding: 8px;

    div.table--body {
      border-bottom: 1px solid var(--v-border-base);

      div.operation--info {
        display: grid;
        align-items: center;
        grid-template-columns: 26px 1fr;
        font-size: 14px;
        font-weight: light;
      }

      div.action--buttons {
        height: 24px;
        margin-top: 4px;
        margin-bottom: 8px;
        border-radius: 4px;
        padding: 0px 4px;
        background-color: var(--v-background-base);
      }
    }
  }
</style>
