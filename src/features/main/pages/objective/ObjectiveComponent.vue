<template>
  <div>
    <v-tabs
      background-color="transparent"
      dense
      height="44"
    >
      <v-tab
        class="ml-2"
        :class="{ 'primary offset--text': tabSelected === 0 }"
        :style="{ width: isMobile ? '100%' : '296px' }"
        @click="onTabSelectedChange(0)"
      >
        <v-icon class="mr-2">
          mdi-progress-clock
        </v-icon>
        Em andamento
      </v-tab>
      <v-tab
        class="mr-2"
        :class="{ 'primary offset--text': tabSelected === 1 }"
        :style="{ width: isMobile ? '100%' : '296px' }"
        @click="onTabSelectedChange(1)"
      >
        <v-icon class="mr-2">
          mdi-progress-check
        </v-icon>
        Finalizados
      </v-tab>
    </v-tabs>
    <objective-actions-component
      :objectives="objectivesFiltered"
      @addObjective="setFormVisible(true)"
      @operationPerformed="getObjectives"
    />
    <objective-grid-layout-component
      :loading="loading"
      @objectiveSelectedToEdit="onObjectiveSelectedToEdit"
      @operationPerformed="getObjectives"
    />
    <objective-form-component
      v-model="formVisible"
      :objective-selected="objectiveSelected"
      @closeForm="setFormVisible(false)"
      @operationPerformed="getObjectives"
    />
  </div>
</template>
<script lang="ts" src="./ObjectiveComponent.ts"></script>
