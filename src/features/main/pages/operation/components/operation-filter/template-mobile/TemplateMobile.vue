<template>
  <div class="mt-4">
    <div class="d-flex align-center justify-space-between px-2">
      <div
        class="mr-2"
        style="width: 304px"
      >
        <v-text-field
          v-model="filters.searchText"
          append-icon="mdi-magnify"
          autocomplete="off"
          background-color="offset"
          dense
          hide-details
          label="Filtrar operação"
          name="filterOperation"
          outlined
        />
      </div>
      <v-btn
        class="offset--text"
        color="action"
        elevation="0"
        fab
        x-small
        @click="$emit('addOperation')"
      >
        <v-icon size="20">
          mdi-plus
        </v-icon>
      </v-btn>
    </div>
    <div class="d-flex align-center px-2">
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
  </div>
</template>
<script lang="ts" src="./TemplateMobile.ts"></script>
