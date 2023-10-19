<template>
  <div
    class="full-width offset rounded pa-2"
    :class="{ 'full-height': !isMobile, 'text-center': isMobile }"
  >
    <span class="subtitle-2 font-weight-bold">
      Próximo objetivo
    </span>
    <div
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
