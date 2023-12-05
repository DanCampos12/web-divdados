<template>
  <div>
    <component
      :is="template"
      :categories="categories"
      :loading="loading"
      @categorySelectedToDelete="startDeleteCategory"
      @categorySelectedToEdit="$emit('categorySelectedToEdit', $event)"
      @sortCategories="$emit('sortCategories', $event)"
    />
    <v-dialog
      v-model="showDeleteDialog"
      max-width="340px"
      persistent
      transition="dialog-transition"
    >
      <v-card :loading="operationInProgress">
        <v-card-title primary-title>
          Deseja excluir essa categoria?
        </v-card-title>
        <v-card-text>Essa operação não pode ser desfeita.</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="finishDeleteCategoryProcess"
          >
            Cancelar
          </v-btn>
          <v-btn
            class="offset--text"
            color="action"
            :disabled="operationInProgress"
            elevation="0"
            :loading="operationInProgress"
            @click="onDeleteCategory"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts" src="./CategoryTableComponent.ts"></script>
