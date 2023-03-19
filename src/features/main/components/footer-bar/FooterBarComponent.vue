<template>
  <v-footer
    v-if="!isPageConfig"
    bottom
    class="pa-0"
    fixed
    height="56"
  >
    <div class="menu--items">
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
        <span>{{ item.name }}</span>
      </v-sheet>
    </div>
  </v-footer>
</template>
<script lang="ts" src="./FooterBarComponent.ts"></script>
<style lang="scss" scoped>
  div.menu--items {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    width: 100%;
    height: 100%;

    .v-sheet.menu--item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 500;

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
  }
</style>
