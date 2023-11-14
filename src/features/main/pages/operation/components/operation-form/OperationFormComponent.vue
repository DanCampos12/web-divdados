<template>
  <v-dialog
    max-width="400"
    persistent
    transition="dialog-transition"
    :value="value"
  >
    <v-card
      height="320"
      width="400"
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
          <div class="d-flex align-center mb-2">
            <dd-date-input
              v-model="operation.date"
              autocomplete="off"
              class="mr-1"
              dense
              :disabled="disableForEditing(false)"
              :hint="fieldHintMessage(false)"
              label="Data"
              name="date"
              outlined
              persistent-hint
              :rules="[rules.required]"
              style="width: 50%"
            />
            <dd-money-input
              v-model="operation.value"
              autocomplete="off"
              class="ml-1"
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
          </div>
          <div class="d-flex align-center mb-2">
            <v-autocomplete
              v-model="operation.type"
              autocomplete="off"
              class="mr-1"
              dense
              :disabled="disableForEditing(false)"
              :hint="fieldHintMessage(false)"
              item-text="name"
              item-value="key"
              :items="operationTypes"
              label="Tipo"
              name="type"
              outlined
              persistent-hint
              :rules="[rules.required]"
              style="width: 50%"
            />
            <v-autocomplete
              v-model="operation.categoryId"
              autocomplete="off"
              class="ml-1"
              dense
              :disabled="disableForEditing(false)"
              :hint="fieldHintMessage(false)"
              item-text="name"
              item-value="id"
              :items="categories"
              label="Categoria"
              name="category"
              outlined
              persistent-hint
              :rules="[rules.required]"
              style="width: 50%"
            />
          </div>
          <v-text-field
            v-model="operation.description"
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
<script lang="ts" src="./OperationFormComponent.ts"></script>
