<template>
  <div>
    <v-sheet
      class="grid-layout--container rounded scroller"
      :class="{ 'background--offset': loading || !objectiveGridLayout.length, 'hide-scroll': isMobile }"
      :style="{ height: isMobile ? 'calc(100vh - 290px)' : 'calc(100vh - 180px)' }"
    >
      <div
        v-if="loading"
        class="full-width full-height d-flex flex-column align-center justify-center font-weight-thin"
      >
        <v-progress-circular
          class="ma-4"
          color="primary"
          indeterminate
        />
        <div style="font-size: 32px">
          Carregando Objetivos...
        </div>
      </div>
      <div
        v-else-if="!objectiveGridLayout.length"
        class="full-width full-height d-flex flex-column align-center justify-center font-weight-thin text-center"
      >
        <v-icon
          class="ma-4"
          size="80"
        >
          mdi-database-minus-outline
        </v-icon>
        <div style="font-size: 24px">
          A consulta não retornou dados para serem exibidos.
        </div>
      </div>
      <grid-layout
        v-else
        :col-num="1"
        :is-draggable="isEditMode"
        :is-resizable="false"
        :layout="objectiveGridLayout"
        :margin="[0, 8]"
        :row-height="140"
        vertical-compact
      >
        <grid-item
          v-for="(item, index) in objectiveGridLayout"
          :key="index"
          :h="item.h"
          :i="item.i"
          :w="item.w"
          :x="item.x"
          :y="item.y"
        >
          <v-progress-linear
            v-model="item.progress"
            color="primary"
            height="10"
            rounded
          />
          <div class="d-flex align-center px-2">
            <v-spacer />
            <dd-percent
              class="subtitle-1"
              :value="item.objective.progress"
            />
          </div>
          <div
            class="full-height full-width d-flex flex-column justify-center px-4"
            style="position: absolute; top: 0; left: 0"
          >
            <div class="d-flex align-center">
              <span class="text-h5 font-weight-bold">
                {{ item.objective.description }}
              </span>
              <v-tooltip
                v-if="(item.objective.progress === 1 && item.objective.status === 'inProgress' && !isEditMode)"
                max-width="200"
                right
              >
                <template #activator="{ on }">
                  <v-icon
                    class="ml-1"
                    size="18"
                    v-on="on"
                  >
                    mdi-information-outline
                  </v-icon>
                </template>
                Este objetivo já pode ser concluído
              </v-tooltip>
            </div>
            <dd-money
              class="subtitle-1 mt-n2"
              :value="item.objective.value"
            />
          </div>
          <div
            class="full-width d-flex align-center justify-space-between px-4"
            style="position: absolute; bottom: 4px; left: 0"
          >
            <div
              v-if="(item.objective.progress === 1 && item.objective.status === 'inProgress' && !isEditMode)"
              class="d-flex align-center blue--text button-sort"
              @click="startCompleteObjective(item.objective)"
            >
              <v-icon
                class="mr-1"
                color="blue"
                size="18"
              >
                mdi-progress-download
              </v-icon>
              Concluir objetivo
            </div>
            <div
              v-else
              class="d-flex align-center"
              :class="`${statusConfig[item.objective.status].color}--text`"
            >
              <v-icon
                class="mr-1"
                :color="statusConfig[item.objective.status].color"
                size="18"
              >
                {{ statusConfig[item.objective.status].icon }}
              </v-icon>
              {{ statusConfig[item.objective.status].description }}
            </div>
            <div class="d-flex align-center">
              <div class="d-flex flex-column justify-center mr-4">
                <span class="text-small font-weight-bold">
                  Data de término
                </span>
                <dd-date
                  class="subtitle-1 mt-n2"
                  :value="item.objective.finalDate"
                />
              </div>
              <v-btn
                class="mr-1"
                :disabled="isEditMode"
                icon
                small
                text
                @click="$emit('objectiveSelectedToEdit', item.objective)"
              >
                <v-icon size="18">
                  {{ item.objective.status !== 'inProgress' ? 'mdi-eye-outline' : 'mdi-pencil-outline' }}
                </v-icon>
              </v-btn>
              <v-btn
                :disabled="isEditMode"
                icon
                small
                text
                @click="startDeleteObjective(item.objective)"
              >
                <v-icon size="18">
                  mdi-delete-outline
                </v-icon>
              </v-btn>
            </div>
          </div>
        </grid-item>
      </grid-layout>
    </v-sheet>
    <v-dialog
      v-model="showDeleteDialog"
      max-width="340px"
      persistent
      transition="dialog-transition"
    >
      <v-card :loading="operationInProgress">
        <v-card-title primary-title>
          Deseja excluir esse objetivo?
        </v-card-title>
        <v-card-text>Essa operação não pode ser desfeita.</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="finishDeleteObjectiveProcess"
          >
            Cancelar
          </v-btn>
          <v-btn
            class="offset--text"
            color="action"
            :disabled="operationInProgress"
            elevation="0"
            :loading="operationInProgress"
            @click="onDeleteObjective"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="showCompleteDialog"
      max-width="340px"
      persistent
      transition="dialog-transition"
    >
      <v-card :loading="operationInProgress">
        <div class="text-h6 px-6 pt-6 pb-2">
          Deseja concluir o objetivo <b>{{ objectiveSelected.description }}</b>?
        </div>
        <v-card-text>
          <span>Essa operação não pode ser desfeita.</span>
          <v-checkbox
            v-model="shouldLaunchOperation"
            color="primary"
            label="Lançar operação de saída"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="finishCompleteObjectiveProcess"
          >
            Cancelar
          </v-btn>
          <v-btn
            class="offset--text"
            color="action"
            :disabled="operationInProgress"
            elevation="0"
            :loading="operationInProgress"
            @click="onCompleteObjective"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts" src="./ObjectiveGridLayoutComponent.ts"></script>
<style lang="scss" scoped>
  .scroller.hide-scroll::-webkit-scrollbar {
    width: 0px;
    height: 16px;
  }

  .v-sheet.grid-layout--container {
    padding: 0px 8px;
    overflow-x: hidden;
    background: transparent;

    &.background--offset {
      background: var(--v-offset-base);
      margin: 8px;
      height: calc(100vh - 180px);
    }

    .vue-grid-item:not(.vue-grid-placeholder) {
      background: var(--v-offset-base);
      border-radius: 8px;
      border: 3px solid var(--v-primary-base);
      padding: 8px;
    }

    &.theme--light {
      .vue-grid-item.vue-draggable-dragging {
        box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2),
        0px 12px 17px 2px rgba(0, 0, 0, 0.14),
        0px 5px 22px 4px rgba(0, 0, 0, 0.12);
        transition: box-shadow 300ms ease-in-out;
      }

      .vue-grid-item:not(.vue-grid-placeholder) {
        color: var(--v-primary-base);
      }
    }

    &.theme--dark {
      .vue-grid-item.vue-draggable-dragging {
        background: rgba(255, 255, 255, 0.08);
        transition: box-shadow 300ms ease-in-out;
      }
    }
  }

  ::v-deep .vue-grid-layout .vue-grid-item.vue-grid-placeholder {
    background: var(--v-primary-base);
    border-radius: 8px;
  }
</style>
