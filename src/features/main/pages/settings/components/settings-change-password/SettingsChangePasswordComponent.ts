import { ChangePasswordDTO, Snackbar, User, UserEntity } from '@/models'
import { Component, Vue } from 'vue-property-decorator'
import helper from './SettingsChangePasswordHelper'
import { Action, Mutation, State } from 'vuex-class'

@Component
export default class SettingsChangePasswordComponent extends Vue {
  @Action('changePassword', { namespace: 'auth' })
  readonly changePassword!: (changePasswordDTO: ChangePasswordDTO) => Promise<{ user: User; idToken: string }>

  @Mutation('setSnackbar')
  readonly setSnackbar!: (snackbar: Snackbar) => void

  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  userEntity = new UserEntity()
  formValid = false
  loading = false
  showPassword = false
  showChangePasswordDialog = false
  currentPassword = ''

  $refs!: Record<string, any>
  rules: Record<string, (value: string) => string | boolean> = {
    required: helper.rulesRequired
  }

  created () {
    this.userEntity = UserEntity.parse(this.user)
  }

  async save () {
    try {
      this.loading = true
      await this.changePassword(new ChangePasswordDTO(this.userEntity, this.currentPassword))
      this.userEntity = UserEntity.parse(this.user)
      this.setSnackbar({
        visible: true,
        color: 'green lighten-1',
        icon: 'mdi-check-circle',
        messages: ['Operação realizada com sucesso']
      })
      this.showChangePasswordDialog = false
      this.$refs.form.resetValidation()
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

  toggleShowPassword () {
    this.showPassword = !this.showPassword
  }

  get disableCheckButton () {
    return helper.disableCheckButton(this.formValid, this.userEntity)
  }

  get disableConfirmButton () {
    return helper.disableConfirmButton(this.currentPassword, this.loading)
  }

  get showPasswordIcon () {
    return helper.getShowPasswordIcon(this.showPassword)
  }

  get isMobile () {
    return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
  }
}
