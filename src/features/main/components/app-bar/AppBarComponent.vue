<template>
  <v-app-bar
    color="offset"
    elevation="0"
    fixed
  >
    <div class="d-flex align-center full-height full-width">
      <div
        v-if="isMobile"
        class="d-flex align-center"
      >
        <v-btn
          class="mr-2"
          fab
          small
          text
          @click="$emit('openSideBar')"
        >
          <v-icon size="24">
            mdi-menu
          </v-icon>
        </v-btn>
        <div class="d-flex align-center">
          <img
            :src="require('@/assets/logo.png')"
            width="40"
          >
          <div class="d-flex flex-column ml-2">
            <span class="text-h6 font-weight-bold">
              DivDados
            </span>
          </div>
        </div>
      </div>
      <v-spacer />
      <v-btn
        class="mr-2"
        fab
        text
        x-small
      >
        <v-icon size="26">
          mdi-bell-outline
        </v-icon>
      </v-btn>
      <v-btn
        fab
        text
        x-small
      >
        <v-icon size="32">
          mdi-account-circle-outline
        </v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script lang="ts" src="./AppBarComponent.ts"></script>
