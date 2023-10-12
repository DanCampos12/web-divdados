<template>
  <div class="settings--container scroller">
    <v-sheet
      class="full-width full-height rounded ma-2 scroller"
      color="offset"
      :style="{ height: 'calc(100vh - 112px)' }"
    >
      <div class="d-flex align-center primary offset--text rounded pa-2">
        <v-icon
          class="mr-4"
          color="offset"
          size="36"
        >
          mdi-account-cog-outline
        </v-icon>
        <div class="d-flex flex-column justify-center">
          <span
            class="font-weight-bold"
            :class="isMobile ? 'subtitle-2' : 'subtitle-1'"
          >
            Configurações da conta
          </span>
          <span
            class="font-weight-light mt-n1"
            :class="isMobile ? 'text-small' : 'text-caption'"
          >
            Informações e atividades em tempo real do seu perfil
          </span>
        </div>
      </div>
      <settings-basic-info-component />
      <settings-change-password-component />
      <settings-preference-component />
    </v-sheet>
  </div>
</template>
<script lang="ts" src="./SettingsComponent.ts"></script>
<style lang="scss" scoped>
  div.settings--container {
    margin: auto;
    max-width: 1080px;
    height: 100%;
    display: flex;
    align-items: center;
  }
</style>
