<template>
  <div
    class="full-width offset rounded pa-2"
    :class="{ 'full-height': !isMobile, 'text-center': isMobile }"
  >
    <span class="subtitle-2 font-weight-bold">
      Próximo objetivo
    </span>
    <div
      v-if="loading"
      class="full-width d-flex flex-column align-center justify-center font-weight-thin"
      style="height: calc(100% - 24px)"
    >
      <v-progress-circular
        class="ma-4"
        color="primary"
        indeterminate
      />
      <div style="font-size: 16px">
        Carregando próximo objetivo...
      </div>
    </div>
    <div
      v-else-if="!nextObjective.id"
      class="full-width d-flex flex-column align-center justify-center font-weight-thin"
      style="height: calc(100% - 24px)"
    >
      <div class="d-flex align-center">
        <div style="font-size: 24px">
          Ainda não há objetivos em andamento.
        </div>
        <v-icon
          class="mx-2"
          size="32"
        >
          mdi-bullseye-arrow
        </v-icon>
      </div>
      <v-btn
        text
        @click="$router.push({ name: 'Main.Objective' })"
      >
        Ir para objetivos
      </v-btn>
    </div>
    <div
      v-else
      class="d-flex flex-column justify-center"
      style="height: calc(100% - 16px)"
    >
      <div class="d-flex align-center justify-space-between">
        <span>
          {{ nextObjective.description }}
        </span>
        <dd-money :value="nextObjective.value" />
      </div>
      <v-progress-linear
        v-model="progress"
        class="my-1"
        color="primary"
        height="10"
        rounded
      />
      <div class="text-center text-caption font-weight-bold">
        <dd-percent :value="nextObjective.progress" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./NextObjectiveComponent.ts"></script>
