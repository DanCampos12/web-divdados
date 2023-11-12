<template>
  <v-sheet
    class="event--container rounded"
    color="offset"
    :style="{ height: 'calc(100vh - 150px)' }"
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
        Carregando Eventos...
      </div>
    </div>
    <div
      v-else-if="!events.length"
      class="full-width full-height d-flex flex-column align-center justify-center font-weight-thin text-center"
    >
      <v-icon
        class="ma-4"
        size="80"
      >
        mdi-database-minus-outline
      </v-icon>
      <div style="font-size: 24px">
        A consulta não retornou dados para serem exibidos.
      </div>
    </div>
    <div v-else>
      <div
        class="table--header"
        :class="{ 'mr-3': hasScroll }"
      >
        <div
          class="pl-2 button-sort"
          @click="setSortConfig('description', !sortConfig.desc)"
        >
          Descrição
          <v-icon
            :class="{ 'rotate-icon': sortConfig.column === 'description' && sortConfig.desc }"
            size="18"
          >
            mdi-chevron-down
          </v-icon>
        </div>
        <div
          class="text-center button-sort"
          @click="setSortConfig('categoryName', !sortConfig.desc)"
        >
          Categoria
          <v-icon
            :class="{ 'rotate-icon': sortConfig.column === 'categoryName' && sortConfig.desc }"
            size="18"
          >
            mdi-chevron-down
          </v-icon>
        </div>
        <div
          class="text-center button-sort"
          @click="setSortConfig('type', !sortConfig.desc)"
        >
          Tipo
          <v-icon
            :class="{ 'rotate-icon': sortConfig.column === 'type' && sortConfig.desc }"
            size="18"
          >
            mdi-chevron-down
          </v-icon>
        </div>
        <div
          class="text-center button-sort"
          @click="setSortConfig('initialDate', !sortConfig.desc)"
        >
          Início
          <v-icon
            :class="{ 'rotate-icon': sortConfig.column === 'initialDate' && sortConfig.desc }"
            size="18"
          >
            mdi-chevron-down
          </v-icon>
        </div>
        <div
          class="text-center button-sort"
          @click="setSortConfig('finalDate', !sortConfig.desc)"
        >
          Fim
          <v-icon
            :class="{ 'rotate-icon': sortConfig.column === 'finalDate' && sortConfig.desc }"
            size="18"
          >
            mdi-chevron-down
          </v-icon>
        </div>
        <div
          class="text-center button-sort"
          @click="setSortConfig('period', !sortConfig.desc)"
        >
          Repetição
          <v-icon
            :class="{ 'rotate-icon': sortConfig.column === 'period' && sortConfig.desc }"
            size="18"
          >
            mdi-chevron-down
          </v-icon>
        </div>
        <div
          class="text-center button-sort"
          @click="setSortConfig('value', !sortConfig.desc)"
        >
          Valor
          <v-icon
            :class="{ 'rotate-icon': sortConfig.column === 'value' && sortConfig.desc }"
            size="18"
          >
            mdi-chevron-down
          </v-icon>
        </div>
        <div
          class="text-center button-sort"
          @click="setSortConfig('completed', !sortConfig.desc)"
        >
          Status
          <v-icon
            :class="{ 'rotate-icon': sortConfig.column === 'completed' && sortConfig.desc }"
            size="18"
          >
            mdi-chevron-down
          </v-icon>
        </div>
        <div class="text-center">
          Ações
        </div>
      </div>
      <v-virtual-scroll
        class="scroller"
        item-height="42"
        :items="events"
        max-height="calc(100vh - 208px)"
        min-height="calc(100vh - 208px)"
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
            </div>
            <div class="d-flex align-center justify-center">
              {{ item.categoryName }}
            </div>
            <div class="d-flex align-center justify-center">
              {{ item.type === 'I' ? 'Entrada' : 'Saída' }}
            </div>
            <div class="d-flex align-center justify-center">
              <dd-date :value="item.initialDate" />
            </div>
            <div class="d-flex align-center justify-center">
              <dd-date :value="item.finalDate" />
            </div>
            <div class="d-flex align-center justify-center">
              {{ getPeriodDescription(item.period) }}
            </div>
            <div class="pr-2 d-flex align-center justify-end">
              <dd-money :value="item.value" />
            </div>
            <div class="d-flex align-center justify-center">
              <v-tooltip left>
                <template #activator="{ on }">
                  <v-icon
                    :color="item.completed ? 'success' : 'accent'"
                    size="22"
                    v-on="on"
                  >
                    {{ item.completed ? 'mdi-progress-check' : 'mdi-progress-clock' }}
                  </v-icon>
                </template>
                {{ item.completed ? 'Finalizado' : 'Em andamento' }}
              </v-tooltip>
            </div>
            <div class="d-flex justify-center">
              <v-tooltip left>
                <template #activator="{ on }">
                  <v-btn
                    class="mr-1"
                    icon
                    small
                    text
                    v-on="on"
                    @click="$emit('eventSelectedToEdit', item)"
                  >
                    <v-icon size="20">
                      mdi-pencil-outline
                    </v-icon>
                  </v-btn>
                </template>
                Alterar
              </v-tooltip>
              <v-tooltip left>
                <template #activator="{ on }">
                  <v-btn
                    class="ml-1"
                    icon
                    small
                    text
                    v-on="on"
                    @click="$emit('eventSelectedToDelete', item)"
                  >
                    <v-icon size="20">
                      mdi-delete-outline
                    </v-icon>
                  </v-btn>
                </template>
                Excluir
              </v-tooltip>
            </div>
          </div>
        </template>
      </v-virtual-scroll>
    </div>
  </v-sheet>
</template>
<script lang="ts" src="./TemplateDesktop.ts"></script>
<style lang="scss" scoped>
  .v-sheet.event--container {
    margin: 8px;
    padding: 0px 16px 16px 16px;

    div.table--header {
      display: grid;
      align-items: center;
      grid-template-rows: 42px;
      grid-template-columns: 1fr repeat(2, 112px) repeat(3, 94px) 112px 72px 112px;
      font-size: 14px;
      font-weight: bold;
      border-bottom: 1px solid var(--v-border-base);
    }

    div.table--body {
      display: grid;
      align-items: center;
      grid-template-rows: 42px;
      grid-template-columns: 1fr repeat(2, 112px) repeat(3, 94px) 112px 72px 112px;
      font-size: 14px;
      font-weight: light;
      border-bottom: 1px solid var(--v-border-base);
    }
  }
</style>
