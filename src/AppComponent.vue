<template>
  <v-app>
    <v-progress-circular
      v-if="!flowComplete"
      class="ma-4"
      color="primary"
      indeterminate
    />
    <router-view v-else />
    <v-snackbar
      v-show="!!snackbar.messages.length"
      v-model="snackbar.visible"
      :color="snackbar.color"
      elevation="24"
      max-width="320"
      :timeout="2000"
      top
      vertical
    >
      <div class="d-flex align-center">
        <v-icon
          v-if="snackbar.icon"
          class="mr-3"
          size="28"
        >
          {{ snackbar.icon }}
        </v-icon>
        <div class="d-flex flex-column">
          <div
            v-for="(message, index) in snackbar.messages"
            :key="index"
          >
            {{ message }}!
          </div>
        </div>
      </div>
    </v-snackbar>
    <v-scroll-y-transition>
      <v-btn
        v-if="showRefreshButton"
        color="primary"
        fab
        fixed
        style="left: 50%; margin-left: -16px; z-index: 10; top: 56px"
        x-small
      >
        <v-progress-circular
          color="offset"
          indeterminate
          size="20"
          width="2"
        />
      </v-btn>
    </v-scroll-y-transition>
  </v-app>
</template>
<script lang="ts" src="./AppComponent.ts"></script>
<style lang="scss" src="./AppComponent.scss"></style>
<style lang="scss" src="./features/plugins/vuetify/styles/index.scss"></style>
