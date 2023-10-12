<template>
  <div class="px-4">
    <div class="d-flex flex-column justify-center mb-2">
      <span
        class="font-weight-bold"
        :class="isMobile ? 'subtitle-2' : 'subtitle-1'"
      >
        Alterar senha
      </span>
      <span
        class="font-weight-light mt-n2"
        :class="isMobile ? 'text-small' : 'text-caption'"
      >
        Altere sua senha atual
      </span>
    </div>
    <v-form
      ref="form"
      v-model="formValid"
    >
      <div class="d-flex">
        <v-text-field
          v-model="userEntity.password"
          autocomplete="off"
          class="mr-1"
          dense
          label="Senha"
          name="password"
          outlined
          :rules="[rules.required]"
          style="width: 50%"
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
        <v-text-field
          v-model="userEntity.confirmPassword"
          autocomplete="off"
          class="mx-1"
          dense
          label="Confirmar Senha"
          name="confirmPassword"
          outlined
          :rules="[rules.required]"
          style="width: 50%"
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
              @click="showChangePasswordDialog = true"
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
    <div class="text-left full-width mb-4">
      <span class="subtitle-2 font-weight-bold">
        Requisitos mínimos da senha:
      </span>
      <div class="validation-grid--layout mt-1">
        <div>
          <div
            :style="{
              height: '4px',
              background: userEntity.passwordContainsUpperCase()
                ? 'var(--v-success-base)'
                : '#E0E0E0',
              borderRadius: '4px'
            }"
          />
          <span
            class="font-weight-medium"
            :class="{
              'success--text': userEntity.passwordContainsUpperCase(),
              'grey--text': !userEntity.passwordContainsUpperCase(),
              'text-small': isMobile,
              'text-caption': !isMobile,
            }"
          >
            1 Maiúsculo
          </span>
        </div>
        <div>
          <div
            :style="{
              height: '4px',
              background: userEntity.passwordContainsUpperCase()
                ? 'var(--v-success-base)'
                : '#E0E0E0',
              borderRadius: '4px'
            }"
          />
          <span
            class="font-weight-medium"
            :class="{
              'success--text': userEntity.passwordContainsUpperCase(),
              'grey--text': !userEntity.passwordContainsUpperCase(),
              'text-small': isMobile,
              'text-caption': !isMobile,
            }"
          >
            1 Minúsculo
          </span>
        </div>
        <div>
          <div
            :style="{
              height: '4px',
              background: userEntity.passwordContainsNumber()
                ? 'var(--v-success-base)'
                : '#E0E0E0',
              borderRadius: '4px'
            }"
          />
          <span
            class="font-weight-medium"
            :class="{
              'success--text': userEntity.passwordContainsNumber(),
              'grey--text': !userEntity.passwordContainsNumber(),
              'text-small': isMobile,
              'text-caption': !isMobile,
            }"
          >
            1 Número
          </span>
        </div>
        <div>
          <div
            :style="{
              height: '4px',
              background: userEntity.passwordContainsSpecialChar()
                ? 'var(--v-success-base)'
                : '#E0E0E0',
              borderRadius: '4px'
            }"
          />
          <span
            class="font-weight-medium"
            :class="{
              'success--text': userEntity.passwordContainsSpecialChar(),
              'grey--text': !userEntity.passwordContainsSpecialChar(),
              'text-small': isMobile,
              'text-caption': !isMobile,
            }"
          >
            1 Especial
          </span>
        </div>
        <div>
          <div
            :style="{
              height: '4px',
              background: userEntity.isValidPasswordSize()
                ? 'var(--v-success-base)'
                : '#E0E0E0',
              borderRadius: '4px'
            }"
          />
          <span
            class="font-weight-medium"
            :class="{
              'success--text': userEntity.isValidPasswordSize(),
              'grey--text': !userEntity.isValidPasswordSize(),
              'text-small': isMobile,
              'text-caption': !isMobile,
            }"
          >
            6 caracteres
          </span>
        </div>
      </div>
    </div>
    <v-dialog
      v-model="showChangePasswordDialog"
      max-width="356px"
      persistent
      transition="dialog-transition"
    >
      <v-card :loading="loading">
        <v-card-title primary-title>
          Deseja alterar sua senha?
        </v-card-title>
        <v-card-text>
          Informe sua <b>senha</b> para confimar as alterações:
          <v-text-field
            v-model="currentPassword"
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
            @click="showChangePasswordDialog = false"
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
  </div>
</template>

<script lang="ts" src="./SettingsChangePasswordComponent.ts"></script>
<style lang="scss" scoped>
  div.validation-grid--layout {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 4px;
  }
</style>
