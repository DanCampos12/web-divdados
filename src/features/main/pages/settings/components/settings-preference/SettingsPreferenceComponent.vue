<template>
  <div>
    <div class="d-flex align-center primary offset--text rounded pa-2">
      <v-icon
        class="mr-4"
        color="offset"
        size="36"
      >
        mdi-application-cog-outline
      </v-icon>
      <div class="d-flex flex-column justify-center">
        <span
          class="font-weight-bold"
          :class="isMobile ? 'subtitle-2' : 'subtitle-1'"
        >
          Preferências
        </span>
        <span
          class="font-weight-light mt-n1"
          :class="isMobile ? 'text-small' : 'text-caption'"
        >
          Configurar aparência do sistema
        </span>
      </div>
    </div>
    <div class="d-flex align-center px-4">
      <v-switch
        v-model="userEntity.preference.dark"
        class="mr-4"
        :disabled="loading"
        label="Modo escuro"
        @click="save"
      />
      <v-switch
        v-model="userEntity.preference.displayValues"
        class="ml-4"
        :disabled="loading"
        label="Exibir valores"
        @click="save"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./SettingsPreferenceComponent.ts"></script>
