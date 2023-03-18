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
            :disabled="disableSignUpButton"
            elevation="0"
            height="48"
            :loading="loading"
            width="100%"
            @click="register"
          >
            Cadastrar
          </v-btn>
        </v-form>
        <v-btn
          color="primary"
          elevation="0"
          text
          @click="backToSignIn"
        >
          Voltar para login
        </v-btn>
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
    }
  }
</style>
