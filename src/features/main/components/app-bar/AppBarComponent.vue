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
                  class="mr-1"
                  color="dark"
                  size="22"
                >
                  mdi-calendar-month-outline
                </v-icon>
                <div
                  class="d-flex flex-column"
                  style="margin-top: 4px"
                >
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
          <div
            class="full-height full-width d-flex align-center justify-center"
            style="position: absolute; top: 0; left: 0; z-index: -1"
          >
            <img
              :src="require('@/assets/logo.png')"
              style="cursor: pointer"
              width="32"
              @click="$router.push({ name: 'Main.Home' })"
            >
          </div>
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
              >
                mdi-calendar-month-outline
              </v-icon>
              <div
                class="d-flex flex-column"
                style="margin-top: 4px"
              >
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
      <div class="d-flex align-center">
        <notification-component />
        <v-menu
          bottom
          offset-y
          permanent
        >
          <template #activator="{ on }">
            <v-btn
              class="background--text"
              color="primary"
              elevation="0"
              fab
              x-small
              v-on="on"
            >
              <div style="margin-right: 1px">
                {{ userInitials }}
              </div>
            </v-btn>
          </template>
          <v-sheet width="260">
            <v-list :disabled="loading">
              <v-list-item @click="onThemeChange">
                <v-icon class="mr-2">
                  mdi-theme-light-dark
                </v-icon>
                Alterar tema
              </v-list-item>
              <v-list-item @click="onDisplayValuesChange">
                <v-icon class="mr-2">
                  {{ user.preference.displayValues ? 'mdi-eye-off-outline' : 'mdi-eye-outline' }}
                </v-icon>
                {{ user.preference.displayValues ? 'Esconder valores' : 'Visualizar valores' }}
              </v-list-item>
              <v-list-item @click="$router.push({ name: 'Main.Settings' })">
                <v-icon class="mr-2">
                  mdi-account-cog-outline
                </v-icon>
                Conta
              </v-list-item>
              <v-list-item @click="showSignOutDialog = true">
                <v-icon class="mr-2">
                  mdi-account-arrow-right-outline
                </v-icon>
                Sair
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-menu>
      </div>
    </div>
    <v-dialog
      v-model="showSignOutDialog"
      max-width="340px"
      persistent
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title>
          Deseja sair do sistema?
        </v-card-title>
        <v-card-text>Operações não salvas poderão ser perdidas.</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="showSignOutDialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            class="offset--text"
            color="action"
            :disabled="loading"
            elevation="0"
            :loading="loading"
            @click="signOut"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>
<script lang="ts" src="./AppBarComponent.ts"></script>
