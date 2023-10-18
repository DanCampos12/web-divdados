<template>
  <div class="full-height full-width offset rounded pa-2">
    <span class="subtitle-2 font-weight-bold">
      Próximo objetivo
    </span>
    <div class="d-flex flex-column justify-center mt-2">
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
      <div class="text-center">
        <dd-percent :value="nextObjective.progress" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./NextObjectiveComponent.ts"></script>
