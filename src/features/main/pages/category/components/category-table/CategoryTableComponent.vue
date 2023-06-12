<template>
  <v-sheet
    class="category--container scroller rounded"
    color="offset"
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
        Carregando <span class="font-weight-bold">Categorias</span>...
      </div>
    </div>
    <div
      v-else-if="!categories.length"
      class="full-width full-height d-flex flex-column align-center justify-center font-weight-thin"
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
      <div class="table--header">
        <div class="pl-2">
          Categoria
        </div>
        <div class="text-center">
          Ações
        </div>
      </div>
      <div
        v-for="(category, index) in categories"
        :key="index"
        class="table--body"
      >
        <div class="pl-2 d-flex align-center">
          <div
            :style="{
              height: '24px',
              width: '4px',
              borderRadius: '6px',
              background: category.color,
              marginRight: '8px'
            }"
          />
          {{ category.name }}
        </div>
        <div class="d-flex justify-center">
          <v-btn
            class="mr-1"
            icon
            small
            text
          >
            <v-icon size="18">
              mdi-pencil-outline
            </v-icon>
          </v-btn>
          <v-btn
            class="ml-1"
            icon
            small
            text
          >
            <v-icon size="18">
              mdi-delete-outline
            </v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </v-sheet>
</template>

<script lang="ts" src="./CategoryTableComponent.ts"></script>
<style lang="scss" scoped>
  .v-sheet.category--container {
    margin: 8px;
    padding: 0px 16px 16px 16px;
    height: calc(100vh - 140px);

    div.table--header {
      display: grid;
      align-items: center;
      grid-template-rows: 42px;
      grid-template-columns: 1fr 112px;
      font-size: 14px;
      font-weight: bold;
      border-bottom: 1px solid var(--v-border-base);
    }

    div.table--body {
      display: grid;
      align-items: center;
      grid-template-rows: 42px;
      grid-template-columns: 1fr 112px;
      font-size: 14px;
      font-weight: light;
      border-bottom: 1px solid var(--v-border-base);
    }
  }
</style>
