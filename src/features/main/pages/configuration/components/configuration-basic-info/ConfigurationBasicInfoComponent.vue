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
    <v-form v-model="formValid">
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
              :disabled="disableCheckButton"
              elevation="0"
              fab
              x-small
              v-on="on"
              @click="showChangeUserDialog = true"
            >
              <v-icon>
                mdi-check
              </v-icon>
            </v-btn>
          </template>
          Salvar alterações
        </v-tooltip>
      </div>
    </v-form>
    <v-dialog
      v-model="showChangeUserDialog"
      max-width="362px"
      persistent
      transition="dialog-transition"
    >
      <v-card :loading="loading">
        <v-card-title primary-title>
          Deseja alterar seus dados?
        </v-card-title>
        <v-card-text>
          Informe sua <b>senha</b> para confimar as alterações:
          <v-text-field
            v-model="userEntity.password"
            autocomplete="off"
            class="mt-4"
            dense
            label="Senha"
            name="password"
            outlined
            :type="showPassword ? 'text' : 'password'"
          >
            <template #append>
              <v-btn
                elevation="0"
                fab
                height="24"
                small
                tabindex="-1"
                text
                width="24"
                @click.stop="toggleShowPassword"
              >
                <v-icon size="24">
                  {{ showPasswordIcon }}
                </v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="showChangeUserDialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            class="offset--text"
            color="action"
            :disabled="disableConfirmButton"
            elevation="0"
            :loading="loading"
            @click="save"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
