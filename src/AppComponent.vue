<template>
  <v-app>
    <v-progress-circular
      v-if="!flowComplete"
      class="ma-4"
      color="primary"
      indeterminate
    />
    <router-view v-else />
  </v-app>
</template>
<script lang="ts" src="./AppComponent.ts"></script>
<style lang="scss" src="./AppComponent.scss"></style>
<style lang="scss" src="./features/plugins/vuetify/styles/index.scss"></style>
