<template>
  <v-container
    class="fill-height"
    fluid
  >
    <div class="sign-in-grid--layout">
      <div class="logo">
        <span class="text-h2 offset--text font-weight-light">
          DivDados
        </span>
        <img :src="require('@/assets/logo.png')">
        <span class="text-h6 offset--text font-weight-light">
          Faça o controle e a gestão do seu patrimônio!
        </span>
      </div>
      <div class="form">
        <v-form
          v-model="formValid"
          class="text-center"
          style="width: 480px;"
        >
          <div class="text-h5 font-weight-bold mb-8">
            Criar minha conta
          </div>
          <v-row dense>
            <v-col md="6">
              <v-text-field
                v-model="userEntity.name"
                autocomplete="off"
                label="Nome"
                name="name"
                outlined
                :rules="[rules.required]"
              />
            </v-col>
            <v-col md="6">
              <v-text-field
                v-model="userEntity.surname"
                autocomplete="off"
                label="Sobrenome"
                name="surname"
                outlined
                :rules="[rules.required]"
              />
            </v-col>
            <v-col md="6">
              <v-text-field
                v-model.number="userEntity.age"
                autocomplete="off"
                label="Idade"
                name="age"
                outlined
                :rules="[rules.required]"
                type="number"
              />
            </v-col>
            <v-col md="6">
              <v-autocomplete
                v-model="userEntity.sex"
                autocomplete="off"
                item-text="name"
                item-value="key"
                :items="sexlist"
                label="Sexo"
                name="sex"
                outlined
                :rules="[rules.required]"
              />
            </v-col>
            <v-col md="12">
              <v-text-field
                v-model="userEntity.email"
                autocomplete="off"
                label="E-mail"
                name="email"
                outlined
                :rules="[rules.required, rules.email]"
              />
            </v-col>
            <v-col md="6">
              <v-text-field
                v-model="userEntity.password"
                autocomplete="off"
                label="Senha"
                name="password"
                outlined
                :rules="[rules.required]"
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
            </v-col>
            <v-col md="6">
              <v-text-field
                v-model="userEntity.confirmPassword"
                autocomplete="off"
                label="Confirmar Senha"
                name="confirmPassword"
                outlined
                :rules="[rules.required]"
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
            </v-col>
            <div class="text-left full-width mt-n3 px-2">
              <span class="subtitle-1 font-weight-bold">
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
                    class="text-caption font-weight-medium"
                    :class="userEntity.passwordContainsUpperCase()
                      ? 'success--text'
                      : 'grey--text'"
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
                    class="text-caption font-weight-medium"
                    :class="userEntity.passwordContainsUpperCase()
                      ? 'success--text'
                      : 'grey--text'"
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
                    class="text-caption font-weight-medium"
                    :class="userEntity.passwordContainsNumber()
                      ? 'success--text'
                      : 'grey--text'"
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
                    class="text-caption font-weight-medium"
                    :class="userEntity.passwordContainsSpecialChar()
                      ? 'success--text'
                      : 'grey--text'"
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
                    class="text-caption font-weight-medium"
                    :class="userEntity.isValidPasswordSize()
                      ? 'success--text'
                      : 'grey--text'"
                  >
                    6 caracteres
                  </span>
                </div>
              </div>
            </div>
          </v-row>
          <div class="d-flex align-center mt-8">
            <v-btn
              class="mr-2"
              color="primary"
              elevation="0"
              height="48"
              text
              width="calc(50% - 4px)"
              @click="backToSignIn"
            >
              Voltar para login
            </v-btn>
            <v-tooltip
              bottom
              :disabled="userEntity.passwordsMatch()"
            >
              <template #activator="{ on }">
                <div
                  class="full-width"
                  v-on="on"
                >
                  <v-btn
                    color="primary"
                    :disabled="disableSignUpButton"
                    elevation="0"
                    height="48"
                    :loading="loading"
                    width="100%"
                    @click="register"
                  >
                    Cadastrar
                  </v-btn>
                </div>
              </template>
              Senhas não correspondem
            </v-tooltip>
          </div>
        </v-form>
      </div>
    </div>
  </v-container>
</template>
<script lang="ts" src="./TemplateDesktop.ts"></script>
<style lang="scss" scoped>
  .container {
    padding: 0px;
    background: var(--v-primary-base);

    div.sign-in-grid--layout {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      .logo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          width: 400px;
          margin: 38px 0px;
        }
      }

      .form {
        background: var(--v-offset-base);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      div.validation-grid--layout {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        column-gap: 8px;
      }
    }
  }
</style>
