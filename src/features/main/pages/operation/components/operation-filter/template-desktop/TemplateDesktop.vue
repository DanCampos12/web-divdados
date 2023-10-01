<template>
  <div class="d-flex align-center justify-space-between px-2">
    <div class="d-flex align-center">
      <v-text-field
        v-model="filters.searchText"
        append-icon="mdi-magnify"
        autocomplete="off"
        background-color="offset"
        class="mr-2"
        dense
        hide-details
        label="Filtrar operação"
        name="filterOperation"
        outlined
        style="width: 400px"
      />
      <v-checkbox
        v-model="filters.inflow"
        class="mr-2"
        color="success"
        label="Entradas"
      />
      <v-checkbox
        v-model="filters.outflow"
        class="mr-2"
        color="error"
        label="Saídas"
      />
    </div>
    <v-btn
      class="offset--text"
      color="action"
      elevation="0"
      @click="$emit('addOperation')"
    >
      Adicionar Operação
    </v-btn>
  </div>
</template>
<script lang="ts" src="./TemplateDesktop.ts"></script>
