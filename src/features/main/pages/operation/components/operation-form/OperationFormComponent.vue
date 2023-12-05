<template>
  <v-dialog
    max-width="400"
    persistent
    transition="dialog-transition"
    :value="value"
  >
    <v-card
      :height="isNewCategory ? 520 : 360"
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
              :disabled="disableForEditing(false) || isNewCategory"
              :hint="fieldHintMessage(false, 'category')"
              item-text="name"
              item-value="id"
              :items="categories"
              label="Categoria"
              name="category"
              outlined
              persistent-hint
              :rules="isNewCategory ? [] : [rules.required]"
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
          <div
            v-if="!operation.isEdit()"
            class="d-flex align-center mb-3"
            style="cursor: pointer"
            @click="isNewCategory = !isNewCategory"
          >
            <v-simple-checkbox
              v-model="isNewCategory"
              color="primary"
              dense
            />
            Nova categoria
          </div>
          <div v-if="isNewCategory">
            <v-text-field
              v-model="category.name"
              autocomplete="off"
              dense
              :disabled="category.isAutomaticInput"
              :hint="fieldHintMessage"
              label="Nome"
              name="name"
              outlined
              persistent-hint
              :rules="[rules.required]"
            />
            <div @click="menuColor = true">
              Clique para selecionar uma cor
            </div>
            <v-menu
              v-model="menuColor"
              :close-on-content-click="false"
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
<script lang="ts" src="./OperationFormComponent.ts"></script>
