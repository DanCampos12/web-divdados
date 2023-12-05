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
          style="width: 400px; height: 400px;"
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
            @keyup.enter="access"
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
          <div class="d-flex align-center">
            <v-btn
              class="mr-2"
              color="primary"
              elevation="0"
              height="48"
              text
              width="calc(50% - 4px)"
              @click="signUp"
            >
              Cadastre-se
            </v-btn>
            <v-btn
              color="primary"
              :disabled="disableAccessButton"
              elevation="0"
              height="48"
              :loading="loading"
              width="calc(50% - 4px)"
              @click="access"
            >
              Acessar
            </v-btn>
          </div>
          <v-btn
            class="mt-12"
            color="dark"
            elevation="0"
            text
            @click="$router.push({ name: 'Auth.RecoverPassword' })"
          >
            Esqueci minha senha
          </v-btn>
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
          @media screen and (max-width: 1366px) {
            width: 240px;
          }
        }

      }

      .form {
        background: var(--v-offset-base);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>
