<template>
  <v-sheet
    class="category--container rounded"
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
        Carregando Categorias...
      </div>
    </div>
    <div
      v-else-if="!categories.length"
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
        :class="{ 'mr-3': hasScroll }"
      >
        <div
          class="pl-2 button-sort"
          @click="setSortConfig('name', !sortConfig.desc)"
        >
          Categoria
          <v-icon
            :class="{ 'rotate-icon': sortConfig.column === 'name' && sortConfig.desc }"
            size="18"
          >
            mdi-chevron-down
          </v-icon>
        </div>
        <div
          class="text-center button-sort"
          @click="setSortConfig('maxValueMonthly', !sortConfig.desc)"
        >
          Valor máximo mensal
          <v-icon
            :class="{ 'rotate-icon': sortConfig.column === 'maxValueMonthly' && sortConfig.desc }"
            size="18"
          >
            mdi-chevron-down
          </v-icon>
        </div>
        <div
          class="text-center button-sort"
          @click="setSortConfig('allocation', !sortConfig.desc)"
        >
          Alocação em operações
          <v-icon
            :class="{ 'rotate-icon': sortConfig.column === 'allocation' && sortConfig.desc }"
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
        :items="categories"
        max-height="calc(100vh - 208px)"
        min-height="calc(100vh - 208px)"
      >
        <template v-slot:default="{ item }">
          <div class="table--body">
            <div class="pl-2 d-flex align-center">
              <div
                :style="{
                  height: '24px',
                  width: '24px',
                  borderRadius: '6px',
                  background: item.color,
                  marginRight: '8px'
                }"
              />
              <span>
                {{ item.name }}
              </span>
              <v-tooltip
                v-if="item.isAutomaticInput"
                max-width="200"
                right
              >
                <template #activator="{ on }">
                  <v-icon
                    class="ml-2"
                    size="18"
                    v-on="on"
                  >
                    mdi-information-outline
                  </v-icon>
                </template>
                Categorias cadastradas automaticamente não podem ser alteradas
              </v-tooltip>
            </div>
            <div class="text-right pr-2">
              <dd-money
                :value="item.maxValueMonthly"
                zero-text="-"
              />
            </div>
            <div class="text-center">
              <dd-percent :value="item.allocation" />
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
                    @click="$emit('categorySelectedToEdit', item)"
                  >
                    <v-icon size="20">
                      {{ item.isAutomaticInput ? 'mdi-eye-outline' : 'mdi-pencil-outline' }}
                    </v-icon>
                  </v-btn>
                </template>
                {{ item.isAutomaticInput ? 'Visualizar' : 'Alterar' }}
              </v-tooltip>
              <v-tooltip left>
                <template #activator="{ on }">
                  <v-btn
                    class="ml-1"
                    :disabled="item.isAutomaticInput"
                    icon
                    small
                    text
                    v-on="on"
                    @click="$emit('categorySelectedToDelete', item)"
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
  .v-sheet.category--container {
    margin: 8px;
    padding: 0px 16px 16px 16px;

    div.table--header {
      display: grid;
      align-items: center;
      grid-template-rows: 42px;
      grid-template-columns: 1fr repeat(2, 200px) 112px;
      font-size: 14px;
      font-weight: bold;
      border-bottom: 1px solid var(--v-border-base);
    }

    div.table--body {
      display: grid;
      align-items: center;
      grid-template-rows: 42px;
      grid-template-columns: 1fr repeat(2, 200px) 112px;
      font-size: 14px;
      font-weight: light;
      border-bottom: 1px solid var(--v-border-base);
    }
  }
</style>
