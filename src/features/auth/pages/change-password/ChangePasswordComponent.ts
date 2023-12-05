import { Component, Vue } from 'vue-property-decorator'
import TemplateDesktop from './components/template-desktop/TemplateDesktop.vue'
import TemplateMobile from './components/template-mobile/TemplateMobile.vue'
import { getTemplate } from '@/helpers'
import { ChangePasswordDTO, Snackbar, User, UserEntity } from '@/models'
import { Action, Mutation } from 'vuex-class'

@Component({
  components: {
    TemplateDesktop,
    TemplateMobile
  }
})
export default class ChangePasswordComponent extends Vue {
  @Action('changePassword', { namespace: 'auth' })
  readonly changePassword!: (changePasswordDTO: ChangePasswordDTO) => Promise<{ user: User; idToken: string }>

  @Mutation('setSnackbar')
  readonly setSnackbar!: (snackbar: Snackbar) => void

  loading = false

  async save (userEntity: UserEntity) {
    try {
      this.loading = true
      await this.changePassword(new ChangePasswordDTO(userEntity, ''))
      this.setSnackbar({
        visible: true,
        color: 'green lighten-1',
        icon: 'mdi-check-circle',
        messages: ['Operação realizada com sucesso']
      })
      setTimeout(() => { this.$router.replace({ name: 'Main.Home' }) }, 750)
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
