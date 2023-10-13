<template>
  <div class="d-flex align-center justify-space-between pa-2">
    <div
      class="d-flex align-center subtitle-2"
      style="line-height: 1.2"
    >
      <v-icon size="20">
        mdi-information
      </v-icon>
      <span
        v-if="tabSelected === 1"
        class="ml-1"
      >
        Os objetivos concluídos/expirados não podem ser reordenados.
      </span>
      <span
        v-else-if="isEditMode"
        class="ml-1"
      >
        Arraste os cards para alterar a ordem de prioridade dos objetivos.
      </span>
      <span
        v-else
        class="ml-1"
      >
        Clique no ícone de edição para alterar a ordenação dos objetivos.
      </span>
    </div>
    <div class="d-flex align-center">
      <v-btn
        v-if="tabSelected === 0"
        class="offset--text mr-2"
        :color="toggleIsEditButtonConfig[Number(isEditMode)].color"
        elevation="0"
        :fab="isMobile"
        :x-small="isMobile"
        @click="onIsEditModeChange(!isEditMode)"
      >
        <v-icon :left="!isMobile">
          {{ toggleIsEditButtonConfig[Number(isEditMode)].icon }}
        </v-icon>
        <span v-if="!isMobile">
          {{ toggleIsEditButtonConfig[Number(isEditMode)].description }}
        </span>
      </v-btn>
      <v-btn
        class="offset--text"
        color="action"
        :disabled="isEditMode"
        elevation="0"
        :fab="isMobile"
        :x-small="isMobile"
        @click="$emit('addObjective')"
      >
        <v-icon
          v-if="isMobile"
          size="20"
        >
          mdi-plus
        </v-icon>
        <span v-else>Adicionar Objetivo</span>
      </v-btn>
    </div>
    <v-fade-transition>
      <v-btn
        v-if="isEditMode"
        bottom
        class="offset--text"
        :class="isMobile ? 'mb-13' : 'ma-4'"
        color="primary"
        :disabled="disableSabeOrderedButton"
        elevation="4"
        :fab="isMobile"
        fixed
        :loading="operationInProgress"
        right
        style="z-index: 10"
        @click="onReorderObjective"
      >
        <v-icon
          :left="!isMobile"
          size="24"
        >
          mdi-check
        </v-icon>
        <span v-if="!isMobile">Salvar Ordenação</span>
      </v-btn>
    </v-fade-transition>
  </div>
</template>
<script lang="ts" src="./ObjectiveActionsComponent.ts"></script>
