<template>
  <div>
    <div class="d-flex align-center justify-space-between pa-2">
      <div
        class="mr-2"
        :style="{ width: isMobile ? '304px' : '400px' }"
      >
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
        :fab="isMobile"
        :x-small="isMobile"
        @click="setFormVisible(true)"
      >
        <v-icon
          v-if="isMobile"
          size="20"
        >
          mdi-plus
        </v-icon>
        <span v-else>Adicionar Categoria</span>
      </v-btn>
    </div>
    <category-table-component
      :categories="categoriesFiltered"
      :loading="loading"
      @categorySelectedToEdit="onCategorySelectedToEdit"
      @operationPerformed="getCategories"
    />
    <category-form-component
      v-model="formVisible"
      :category-selected="categorySelected"
      @closeForm="setFormVisible(false)"
      @operationPerformed="getCategories"
    />
  </div>
</template>
<script lang="ts" src="./CategoryComponent.ts"></script>
