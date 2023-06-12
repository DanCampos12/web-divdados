<template>
  <div>
    <div class="d-flex align-center justify-space-between pa-2">
      <div style="width: 400px">
        <v-text-field
          v-model="searchText"
          append-icon="mdi-magnify"
          autocomplete="off"
          background-color="offset"
          dense
          hide-details
          label="Filtrar categoria"
          name="filterCategory"
          outlined
        />
      </div>
      <v-btn
        class="offset--text"
        color="action"
        elevation="0"
      >
        Adicionar Categoria
      </v-btn>
    </div>
    <category-table-component
      :categories="categoriesFiltered"
      :loading="loading"
    />
  </div>
</template>
<script lang="ts" src="./CategoryComponent.ts"></script>
