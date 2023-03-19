<template>
  <v-navigation-drawer
    :fixed="isMobile"
    left
    :permanent="value"
    :temporary="isMobile"
    :value="value"
    width="256"
  >
    <div class="d-flex align-center pa-4">
      <img
        :src="require('@/assets/logo.png')"
        width="40"
      >
      <div class="d-flex flex-column ml-4">
        <span class="text-h6 font-weight-bold">
          DivDados
        </span>
        <span
          v-if="!isMobile"
          class="subtitle-2 font-weight-light mt-n1"
        >
          Controle suas finanças
        </span>
      </div>
      <v-spacer v-if="isMobile" />
      <v-btn
        v-if="isMobile"
        fab
        text
        x-small
        @click="$emit('close')"
      >
        <v-icon size="24">
          mdi-close
        </v-icon>
      </v-btn>
    </div>
    <v-divider />
    <div
      class="d-flex flex-column justify-space-between"
      style="height: calc(100% - 104px)"
    >
      <div>
        <v-sheet
          v-for="(item, index) in menuOptions"
          :key="index"
          class="menu--item"
          :class="{ 'selected': isPageSelected(item.key) }"
          @click="onSelectMenu(item)"
        >
          <v-icon size="28">
            {{ item.icon }}
          </v-icon>
          <span class="ml-2">{{ item.name }}</span>
        </v-sheet>
      </div>
      <v-sheet
        class="menu--item"
        @click="showSignOutDialog = true"
      >
        <v-icon size="28">
          mdi-account-arrow-right-outline
        </v-icon>
        <span class="ml-2">Sair</span>
      </v-sheet>
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
            elevation="0"
            @click="signOut"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-navigation-drawer>
</template>
<script lang="ts" src="./SideBarComponent.ts"></script>
<style lang="scss" scoped>
  .v-sheet.menu--item {
    height: 56px;
    display: flex;
    align-items: center;
    padding: 0px 16px;
    margin-bottom: 4px;
    font-size: 16px;
    font-weight: 700;

    &.theme--dark {
      background: #363636;
      &:hover {
        background: #424242;
        cursor: pointer;
      }
    }

    &.theme--light {
      &:hover {
        background: #F5F5F5;
        cursor: pointer;
      }
    }

    &.selected {
      background: var(--v-primary-base) !important;
      color: var(--v-offset-base);
      .v-icon {
        color: var(--v-offset-base);
      }

      &:hover {
        background: inherit;
      }
    }
  }
</style>
