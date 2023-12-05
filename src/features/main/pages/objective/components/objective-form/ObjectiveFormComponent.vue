<template>
  <v-dialog
    max-width="380"
    persistent
    transition="dialog-transition"
    :value="value"
  >
    <v-card
      height="240"
      width="380"
    >
      <div
        class="d-flex align-center full-width px-3"
        style="height: 40px"
      >
        {{ formTitle }}
      </div>
      <div class="pa-3">
        <v-form
          ref="form"
          v-model="formValid"
        >
          <v-text-field
            v-model="objective.description"
            autocomplete="off"
            dense
            :disabled="disableForEditing(false)"
            :hint="fieldHintMessage(false)"
            label="Descrição"
            name="description"
            outlined
            persistent-hint
            :rules="[rules.required]"
          />
          <div class="d-flex align-center mb-2">
            <dd-money-input
              v-model="objective.value"
              autocomplete="off"
              class="mr-1"
              dense
              :disabled="disableForEditing(false)"
              :hint="fieldHintMessage(false)"
              label="Valor"
              name="value"
              outlined
              persistent-hint
              :rules="[rules.required]"
              style="width: 50%"
            />
            <dd-date-input
              v-model="objective.finalDate"
              autocomplete="off"
              class="ml-1"
              dense
              :disabled="disableForEditing(true)"
              :hint="fieldHintMessage(true)"
              label="Término"
              name="finalDate"
              outlined
              persistent-hint
              :rules="[rules.required]"
              style="width: 50%"
            />
          </div>
        </v-form>
      </div>
      <div
        class="d-flex align-center justify-end full-width px-3"
        style="position: absolute; bottom: 0; height: 56px"
      >
        <v-btn
          class="mr-2"
          text
          @click="cancel"
        >
          <span>Cancelar</span>
        </v-btn>
        <v-btn
          class="offset--text"
          color="action"
          :disabled="disableConfirmButton"
          elevation="0"
          :loading="operationInProgress"
          @click="save"
        >
          Confirmar
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>
<script lang="ts" src="./ObjectiveFormComponent.ts"></script>
