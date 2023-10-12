<template>
  <div class="settings--container">
    <v-sheet class="rounded scroller">
      <objective-grid-layout-component is-draggable />
    </v-sheet>
  </div>
</template>
<script lang="ts" src="./ObjectiveComponent.ts"></script>
<style lang="scss" scoped>
  div.settings--container {
    margin: auto;
    height: 100%;
    display: flex;
    align-items: center;

    .v-sheet {
      overflow-x: hidden;
      width: 100%;
      height: calc(100vh - 112px);
    }
  }
</style>
