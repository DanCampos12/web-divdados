<template>
  <v-container
    class="fill-height"
    fluid
  >
    <div class="recover-password-grid--layout">
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
          <div class="text-h5 font-weight-bold mb-2">
            Recuperar senha
          </div>
          <div class="text-center mb-8">
            Se tiver alguma dúvida ou precisar de assistência, entre em contato conosco pelo e-mail
            <a href="mailto: suporte@divdados.com.br">suporte@divdados.com.br</a>.
          </div>
          <v-text-field
            v-model="email"
            autocomplete="off"
            label="E-mail"
            name="email"
            outlined
            :rules="[rules.required, rules.email]"
          />
          <div class="full-width d-flex align-center mt-8">
            <v-btn
              class="mr-1"
              color="primary"
              elevation="0"
              height="48"
              text
              width="calc(50% - 4px)"
              @click="$router.push({ name: 'Auth.SignIn' })"
            >
              Voltar para login
            </v-btn>
            <v-btn
              class="ml-1"
              color="primary"
              :disabled="disableSendButton"
              elevation="0"
              height="48"
              :loading="loading"
              width="calc(50% - 4px)"
              @click="sendEmail"
            >
              Enviar
            </v-btn>
          </div>
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

    div.recover-password-grid--layout {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;

      .logo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 302px;
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

      div.validation-grid--layout {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        column-gap: 8px;
      }
    }
  }
</style>
