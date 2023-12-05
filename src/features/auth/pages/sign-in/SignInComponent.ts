import { Component, Vue } from 'vue-property-decorator'
import TemplateDesktop from './components/template-desktop/TemplateDesktop.vue'
import TemplateMobile from './components/template-mobile/TemplateMobile.vue'
import { getTemplate } from '@/helpers'
import { Action, Mutation, State } from 'vuex-class'
import { Snackbar, User, UserEntity } from '@/models'

@Component({
  components: {
    TemplateDesktop,
    TemplateMobile
  }
})
export default class SignInComponent extends Vue {
  @Action('signIn', { namespace: 'auth' })
  readonly signIn$!: ({ email, password }:
    { email: string, password: string }) => Promise<{ user: User; idToken: string }>

  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  @Mutation('setSnackbar')
  readonly setSnackbar!: (snackbar: Snackbar) => void

  loading = false

  async signIn ({ email, password }: { email: string, password: string }) {
    try {
      this.loading = true
      await this.signIn$({ email, password })
      this.setSnackbar({
        visible: true,
        color: 'green lighten-1',
        icon: 'mdi-check-circle',
        messages: ['Login efetuado com sucesso']
      })
      this.$router.replace({ name: this.user.flowComplete ? 'Main.Home' : 'Auth.ChangePassword' })
    } catch (errors: any) {
      this.setSnackbar({
        visible: true,
        color: 'red lighten-1',
        icon: 'mdi-alert-circle',
        messages: errors.map((e: any) => e.message)
      })
    } finally {
      this.loading = false
    }
  }

  get template () {
    return getTemplate(this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm)
  }
}
