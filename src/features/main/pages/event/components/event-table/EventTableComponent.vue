<template>
  <div>
    <component
      :is="template"
      :events="events"
      :loading="loading"
      @eventSelectedToDelete="startDeleteEvent"
      @eventSelectedToEdit="$emit('eventSelectedToEdit', $event)"
      @sortEvents="$emit('sortEvents', $event)"
    />
    <v-dialog
      v-model="showDeleteDialog"
      max-width="340px"
      persistent
      transition="dialog-transition"
    >
      <v-card :loading="operationInProgress">
        <v-card-title primary-title>
          Deseja excluir esse evento?
        </v-card-title>
        <v-card-text>
          Essa operação não pode ser desfeita. <br>
          Isso <b>apagará todas as operações</b>
          criadas a partir deste evento.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="finishDeleteEventProcess"
          >
            Cancelar
          </v-btn>
          <v-btn
            class="offset--text"
            color="action"
            :disabled="operationInProgress"
            elevation="0"
            :loading="operationInProgress"
            @click="onDeleteEvent"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" src="./EventTableComponent.ts"></script>
