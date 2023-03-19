<template>
  <v-sheet
    class="main-container"
    :style="{ gridTemplateColumns: isMobile ? '1fr' : '256px 1fr' }"
  >
    <side-bar-component
      :value="showSideBar"
      @close="setSideBarVisible(false)"
    />
    <div>
      <app-bar-component @openSideBar="setSideBarVisible(true)" />
      <router-view class="d-flex align-center justify-center full-height text-h3 font-weight-thin" />
    </div>
  </v-sheet>
</template>

<script lang="ts" src="./MainComponent.ts"></script>
<style lang="scss" scoped>
  .v-sheet.main-container {
    background: var(--v-background-base);
    height: 100%;
    display: grid;
  }
</style>
