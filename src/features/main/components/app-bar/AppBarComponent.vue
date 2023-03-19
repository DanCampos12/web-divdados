<template>
  <v-app-bar
    color="offset"
    elevation="0"
  >
    <div class="d-flex align-center justify-space-between full-height full-width">
      <div class="d-flex align-center">
        <v-btn
          v-if="isMobile"
          fab
          small
          text
        >
          <v-icon size="24">
            mdi-menu
          </v-icon>
        </v-btn>
        <div class="d-flex flex-column mr-8">
          <span class="text-small text-uppercase font-weight-bold">
            Data Base
          </span>
          <span class="mt-n1">
            31/05/2022
          </span>
        </div>
        <div class="d-flex flex-column">
          <span class="text-small text-uppercase font-weight-bold">
            Período
          </span>
          <span class="mt-n1">
            Últimos 3 meses
          </span>
        </div>
      </div>
      <div>
        <v-btn
          class="mr-2"
          fab
          text
          x-small
        >
          <v-icon size="24">
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
    </div>
  </v-app-bar>
</template>

<script lang="ts" src="./AppBarComponent.ts"></script>
