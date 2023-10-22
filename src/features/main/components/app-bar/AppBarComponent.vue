<template>
  <v-app-bar
    color="offset"
    elevation="0"
    fixed
  >
    <div class="d-flex align-center justify-space-between full-height full-width">
      <div
        v-if="isMobile"
        class="d-flex align-center"
      >
        <v-btn
          class="mr-1"
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
            width="32"
          >
          <v-menu
            v-model="showDatePicker"
            :close-on-content-click="false"
            offset-y
            permanent
            transition="slide-y-transition"
          >
            <template #activator="{ on }">
              <div
                class="d-flex align-center button-sort"
                v-on="on"
              >
                <v-icon
                  class="mx-1"
                  color="dark"
                  size="22"
                >
                  mdi-calendar-month-outline
                </v-icon>
                <div class="d-flex flex-column">
                  <div class="text-small text-uppercase font-weight-bold">
                    Data:
                  </div>
                  <dd-date
                    class="subtitle-1 mt-n2"
                    pattern="DD/MM/YYYY"
                    :value="date"
                  />
                </div>
              </div>
            </template>
            <v-date-picker
              no-title
              :value="date"
              @change="onDateChange"
            />
          </v-menu>
        </div>
      </div>
      <div
        v-else
        class="d-flex align-center"
      >
        <v-menu
          v-model="showDatePicker"
          :close-on-content-click="false"
          offset-y
          permanent
          transition="slide-y-transition"
        >
          <template #activator="{ on }">
            <div
              class="d-flex align-center button-sort"
              v-on="on"
            >
              <v-icon
                class="mx-1"
                color="dark"
                size="22"
              >
                mdi-calendar-month-outline
              </v-icon>
              <div class="d-flex flex-column">
                <div class="text-small font-weight-bold">
                  Data
                </div>
                <dd-date
                  class="subtitle-1 mt-n2"
                  pattern="DD/MM/YYYY"
                  :value="date"
                />
              </div>
            </div>
          </template>
          <v-date-picker
            no-title
            :value="date"
            @change="onDateChange"
          />
        </v-menu>
      </div>
      <div class="d=flex align-center">
        <v-btn
          class="mr-1"
          fab
          text
          x-small
        >
          <v-icon size="26">
            mdi-bell-outline
          </v-icon>
        </v-btn>
        <v-btn
          class="background offset-text"
          elevation="0"
          fab
          x-small
        >
          {{ userInitials }}
        </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<script lang="ts" src="./AppBarComponent.ts"></script>
