<template>
  <v-sheet
    class="category--container rounded"
    color="offset"
    :style="{ height: 'calc(100vh - 200px)' }"
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
        mdi-database-minus-outline
      </v-icon>
      <div style="font-size: 24px">
        A consulta não retornou dados para serem exibidos.
      </div>
    </div>
    <div v-else>
      <v-virtual-scroll
        class="scroller"
        item-height="76"
        :items="categories"
        max-height="calc(100vh - 220px)"
        min-height="calc(100vh - 220px)"
      >
        <template v-slot:default="{ item }">
          <div class="table--body">
            <div class="category--info">
              <div
                :style="{
                  height: '24px',
                  width: '24px',
                  borderRadius: '6px',
                  background: item.color,
                  marginRight: '8px'
                }"
              />
              <div class="d-flex flex-column justify-center pl-1">
                <div class="d-flex align-center font-weight-bold">
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
                <dd-money
                  class="text-caption"
                  style="margin-top: -6px"
                  :value="item.maxValueMonthly"
                />
              </div>
              <div class="d-flex flex-column justify-center align-end text-right">
                <dd-percent
                  class="font-weight-bold"
                  :value="item.allocation"
                />
                <div
                  class="d-flex align-center text-caption"
                  style="margin-top: -6px"
                >
                  Alocação
                </div>
              </div>
            </div>
            <div class="action--buttons text-caption d-flex align-center">
              <v-spacer />
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
<script lang="ts" src="./TemplateMobile.ts"></script>
<style lang="scss" scoped>
  .scroller::-webkit-scrollbar {
    width: 0px;
    height: 16px;
  }

  .v-sheet.category--container {
    margin: 0px 8px;
    padding: 8px;

    div.table--body {
      border-bottom: 1px solid var(--v-border-base);

      div.category--info {
        display: grid;
        align-items: center;
        grid-template-columns: 26px repeat(2, 1fr);
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
