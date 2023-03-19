<template>
  <div>
    <v-navigation-drawer
      fixed
      left
      :permanent="true"
      :value="true"
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
          <span class="subtitle-2 font-weight-light mt-n1">
            Controle suas finanças
          </span>
        </div>
      </div>
      <v-divider />
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
    </v-navigation-drawer>
  </div>
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

    &:hover {
      background: #F5F5F5;
      cursor: pointer;
    }

    &.selected {
      background: var(--v-primary-base);
      color: var(--v-offset-base);
      .v-icon {
        color: var(--v-offset-base);
      }
    }
  }
</style>
