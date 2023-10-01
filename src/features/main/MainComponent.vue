<template>
  <v-sheet
    class="main-container"
    :style="{ gridTemplateColumns: isMobile ? '1fr' : '256px 1fr' }"
  >
    <side-bar-component
      :value="showSideBar"
      @close="setSideBarVisible(false)"
    />
    <div :class="{ 'transform-transalate--0': !isMobile }">
      <app-bar-component @openSideBar="setSideBarVisible(true)" />
      <router-view :style="{ paddingTop: isMobile ? '56px' : '64px' }" />
      <footer-bar-component v-if="isMobile" />
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

  .transform-transalate--0 {
    transform: translate(0);
  }
</style>
