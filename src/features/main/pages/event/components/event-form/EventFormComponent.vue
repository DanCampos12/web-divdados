<template>
  <v-dialog
    max-width="400"
    persistent
    transition="dialog-transition"
    :value="value"
  >
    <v-card
      height="388"
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
              v-model="event.initialDate"
              autocomplete="off"
              class="mr-1"
              dense
              :disabled="disableForEditing"
              :hint="fieldHintMessage"
              label="Início"
              name="initialDate"
              outlined
              persistent-hint
              :rules="[rules.required]"
              style="width: 50%"
            />
            <dd-date-input
              v-model="event.finalDate"
              autocomplete="off"
              class="ml-1"
              dense
              :disabled="disableForEditing"
              :hint="fieldHintMessage"
              label="Fim"
              name="finalDate"
              outlined
              persistent-hint
              :rules="[rules.required]"
              style="width: 50%"
            />
          </div>
          <div class="d-flex align-center mb-2">
            <v-autocomplete
              v-model="event.period"
              autocomplete="off"
              class="mr-1"
              dense
              :disabled="disableForEditing"
              :hint="fieldHintMessage"
              item-text="name"
              item-value="key"
              :items="eventPeriods"
              label="Repetição"
              name="period"
              outlined
              persistent-hint
              :rules="[rules.required]"
              style="width: 50%"
            />
            <dd-money-input
              v-model="event.value"
              autocomplete="off"
              class="ml-1"
              dense
              label="Valor"
              name="value"
              outlined
              :rules="[rules.required]"
              style="width: 50%"
            />
          </div>
          <div class="d-flex align-center mb-2">
            <v-autocomplete
              v-model="event.type"
              autocomplete="off"
              class="mr-1"
              dense
              :disabled="disableForEditing"
              :hint="fieldHintMessage"
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
              v-model="event.categoryId"
              autocomplete="off"
              class="ml-1"
              dense
              item-text="name"
              item-value="id"
              :items="categories"
              label="Categoria"
              name="category"
              outlined
              :rules="[rules.required]"
              style="width: 50%"
            />
          </div>
          <v-text-field
            v-model="event.description"
            autocomplete="off"
            dense
            label="Descrição"
            name="description"
            outlined
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
<script lang="ts" src="./EventFormComponent.ts"></script>
