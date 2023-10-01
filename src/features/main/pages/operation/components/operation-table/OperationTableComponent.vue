<template>
  <div>
    <component
      :is="template"
      :loading="loading"
      :operations="operations"
      @addOperation="$emit('addOperation')"
      @operationSelectedToDelete="startDeleteOperation"
      @operationSelectedToEdit="$emit('operationSelectedToEdit', $event)"
      @operationSelectedToEffect="startEffectOperation"
      @sortOperations="$emit('sortOperations', $event)"
    />
    <v-dialog
      v-model="showDeleteDialog"
      max-width="340px"
      persistent
      transition="dialog-transition"
    >
      <v-card :loading="operationInProgress">
        <v-card-title primary-title>
          Deseja excluir essa operação?
        </v-card-title>
        <v-card-text>Essa operação não pode ser desfeita.</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="finishDeleteOperationProcess"
          >
            Cancelar
          </v-btn>
          <v-btn
            class="offset--text"
            color="action"
            :disabled="operationInProgress"
            elevation="0"
            :loading="operationInProgress"
            @click="onDeleteOperation"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="showEffectDialog"
      max-width="340px"
      persistent
      transition="dialog-transition"
    >
      <v-card :loading="operationInProgress">
        <v-card-title primary-title>
          Deseja efetuar essa operação?
        </v-card-title>
        <v-card-text>Essa operação não pode ser desfeita.</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="finishEffectOperationProcess"
          >
            Cancelar
          </v-btn>
          <v-btn
            class="offset--text"
            color="action"
            :disabled="operationInProgress"
            elevation="0"
            :loading="operationInProgress"
            @click="onEffectOperation"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" src="./OperationTableComponent.ts"></script>
