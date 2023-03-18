<template>
  <v-container
    class="fill-height"
    fluid
  >
    <div class="sign-in-grid--layout">
      <div class="logo">
        <span class="text-h4 offset--text font-weight-light">
          DivDados
        </span>
        <img :src="require('@/assets/logo.png')">
        <span class="offset--text font-weight-light">
          Faça o controle e a gestão do seu patrimônio!
        </span>
      </div>
      <div class="form">
        <v-form
          v-model="formValid"
          class="text-center"
          style="width: calc(100% - 20px)"
        >
          <div class="text-h5 font-weight-bold mb-8">
            Acessar minha conta
          </div>
          <v-text-field
            v-model="email"
            autocomplete="off"
            class="mb-2"
            label="E-mail"
            name="email"
            outlined
            :rules="[rules.required, rules.email]"
          />
          <v-text-field
            v-model="password"
            autocomplete="off"
            class="mb-2"
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
          <v-btn
            color="primary"
            :disabled="disableAccessButton"
            elevation="0"
            height="48"
            :loading="loading"
            width="100%"
            @click="access"
            @keyup.enter="access"
          >
            Acessar
          </v-btn>
          <v-btn
            class="mt-2"
            color="primary"
            elevation="0"
            height="48"
            text
            width="100%"
            @click="signUp"
          >
            Cadastre-se
          </v-btn>
        </v-form>
      </div>
    </div>
  </v-container>
</template>
<script lang="ts" src="./TemplateMobile.ts"></script>
<style lang="scss" scoped>
  .container {
    padding: 0px;
    background: var(--v-primary-base);

    div.sign-in-grid--layout {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;

      .logo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 308px;
        img {
          margin: 8px 0px;
          width: 112px;
          height: 112px
        }
      }

      .form {
        padding-top: 56px;
        background: var(--v-offset-base);
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
      }
    }
  }
</style>
