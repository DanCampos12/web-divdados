<template>
  <div class="configuration--container scroller">
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
      <configuration-basic-info-component />
      <configuration-change-password-component />
      <configuration-preference-component />
    </v-sheet>
  </div>
</template>
<script lang="ts" src="./ConfigurationComponent.ts"></script>
<style lang="scss" scoped>
  div.configuration--container {
    margin: auto;
    max-width: 600px;
    height: 100%;
    display: flex;
    align-items: center;
  }
</style>
