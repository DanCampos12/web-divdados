import { Component, Vue } from 'vue-property-decorator'
import TemplateDesktop from './components/template-desktop/TemplateDesktop.vue'
import TemplateMobile from './components/template-mobile/TemplateMobile.vue'
import { getTemplate } from '@/helpers'
import { Snackbar } from '@/models'
import { Action, Mutation } from 'vuex-class'

@Component({
  components: {
    TemplateDesktop,
    TemplateMobile
  }
})
export default class RecoverPasswordComponent extends Vue {
  @Action('recoverPassword', { namespace: 'auth' })
  readonly recoverPassword!: ({ email }: { email: string }) => Promise<{ message: string }>

  @Mutation('setSnackbar')
  readonly setSnackbar!: (snackbar: Snackbar) => void

  loading = false

  async send (email: string) {
    try {
      this.loading = true
      await this.recoverPassword({ email })
      this.setSnackbar({
        visible: true,
        color: 'green lighten-1',
        icon: 'mdi-check-circle',
        messages: [`Acabamos de enviar um e-mail para que você possa recuperar sua senha. 
          Por favor, verifique sua caixa de entrada e siga as instruções 
          fornecidas para concluir o processo de recuperação`]
      })
      setTimeout(() => { this.$router.replace({ name: 'Auth.SignIn' }) }, 3500)
    } catch (errors: any) {
      this.setSnackbar({
        visible: true,
        color: 'red lighten-1',
        icon: 'mdi-alert-circle',
        messages: [`Lamentamos informar que ocorreu um erro ao tentar enviar o e-mail. 
          Por favor, certifique-se de que o endereço de e-mail fornecido é válido. 
          Caso persista o problema, entre em contato conosco`]
      })
    } finally {
      this.loading = false
    }
  }

  get template () {
    return getTemplate(this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm)
  }
}
