<template>
  <v-dialog
    max-width="320"
    persistent
    transition="dialog-transition"
    :value="value"
  >
    <v-card
      :height="category.isAutomaticInput ? 300 : 340"
      width="320"
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
            v-model="category.name"
            autocomplete="off"
            background-color="offset"
            dense
            :disabled="category.isAutomaticInput"
            :hint="fieldHintMessage"
            label="Nome"
            name="name"
            outlined
            persistent-hint
            :rules="[rules.required]"
          />
          <dd-money-input
            v-model="category.maxValueMonthly"
            autocomplete="off"
            background-color="offset"
            dense
            :disabled="category.isAutomaticInput"
            :hint="fieldHintMessage"
            label="Valor máximo mensal"
            name="maxValueMonthly"
            outlined
            persistent-hint
          />
          <div
            v-if="!category.isAutomaticInput"
            @click="menuColor = true"
          >
            Clique para selecionar uma cor
          </div>
          <v-menu
            v-model="menuColor"
            :close-on-content-click="false"
            :disabled="category.isAutomaticInput"
            offset-y
          >
            <template #activator="{ on }">
              <v-btn
                block
                :color="category.color"
                elevation="0"
                large
                v-on="on"
              />
            </template>
            <v-card>
              <v-card-text>
                <v-color-picker
                  v-model="category.color"
                  class="elevation-0"
                  hide-inputs
                  hide-mode-switch
                  mode="hexa"
                />
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  class="on-primary--text"
                  color="primary"
                  elevation="0"
                  fab
                  x-small
                  @click="menuColor = false"
                >
                  <v-icon size="20">
                    mdi-check
                  </v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
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
<script lang="ts" src="./CategoryFormComponent.ts"></script>
