<template>
  <div class="px-4 pt-4">
    <div class="d-flex flex-column justify-center mb-2">
      <span
        class="font-weight-bold"
        :class="isMobile ? 'subtitle-2' : 'subtitle-1'"
      >
        Informações básicas
      </span>
      <span
        class="font-weight-light mt-n2"
        :class="isMobile ? 'text-small' : 'text-caption'"
      >
        Alterar suas informações cadastrais
      </span>
    </div>
    <v-text-field
      v-model="userEntity.name"
      autocomplete="off"
      dense
      label="Nome"
      name="name"
      outlined
      :rules="[rules.required]"
    />
    <div class="d-flex">
      <v-autocomplete
        v-model="userEntity.sex"
        autocomplete="off"
        class="mr-1"
        dense
        item-text="name"
        item-value="key"
        :items="sexlist"
        label="Sexo"
        name="sex"
        outlined
        :rules="[rules.required]"
        style="width: 50%"
      />
      <dd-date-input
        v-model="userEntity.birthDate"
        autocomplete="off"
        class="mx-1"
        dense
        label="Nascimento"
        name="birthDate"
        outlined
        :rules="[rules.required]"
        style="width: 50%"
      />
      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn
            class="offset--text ml-1 mt-1"
            color="primary"
            elevation="0"
            fab
            x-small
            v-on="on"
          >
            <v-icon>
              mdi-check
            </v-icon>
          </v-btn>
        </template>
        Salvar alterações
      </v-tooltip>
    </div>
    <v-divider class="mb-4" />
    <div class="d-flex flex-column justify-center mb-2">
      <span
        class="font-weight-bold"
        :class="isMobile ? 'subtitle-2' : 'subtitle-1'"
      >
        Email para contato
      </span>
      <span
        class="font-weight-light mt-n2"
        :class="isMobile ? 'text-small' : 'text-caption'"
      >
        Email principal para o recebimento de informações
      </span>
    </div>
    <v-text-field
      v-model="userEntity.email"
      autocomplete="off"
      dense
      disabled
      label="E-mail"
      name="email"
      outlined
      readonly
    />
    <v-divider class="mb-4" />
  </div>
</template>

<script lang="ts" src="./ConfigurationBasicInfoComponent.ts"></script>
