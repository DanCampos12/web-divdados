<template>
  <v-sheet class="main-container">
    <side-bar-component />
    <div>
      <app-bar-component />
      <router-view class="d-flex align-center justify-center full-height text-h1 font-weight-thin" />
    </div>
  </v-sheet>
</template>

<script lang="ts" src="./MainComponent.ts"></script>
<style lang="scss" scoped>
  .v-sheet.main-container {
    background: var(--v-background-base);
    height: 100%;
    display: grid;
    grid-template-columns: 256px 1fr;
  }
</style>
