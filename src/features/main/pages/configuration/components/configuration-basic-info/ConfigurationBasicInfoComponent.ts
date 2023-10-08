import { Snackbar, User, UserEntity } from '@/models'
import { Component, Vue } from 'vue-property-decorator'
import { Action, Mutation, State } from 'vuex-class'
import helper from './ConfigurationBasicInfoHelper'

@Component
export default class ConfigurationBasicInfoComponent extends Vue {
  @Action('putUser', { namespace: 'auth' })
  readonly putUser!: (user: UserEntity) => Promise<User>

  @Mutation('setSnackbar')
  readonly setSnackbar!: (snackbar: Snackbar) => void

  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  userEntity = new UserEntity()
  formValid = false
  loading = false
  showPassword = false
  showChangeUserDialog = false
  sexlist = [
    { key: 'M', name: 'Masculino' },
    { key: 'F', name: 'Feminino' }
  ]

  rules: Record<string, (value: string) => string | boolean> = {
    required: helper.rulesRequired
  }

  created () {
    this.userEntity = UserEntity.parse(this.user)
  }

  async save () {
    try {
      this.loading = true
      await this.putUser(this.userEntity)
      this.userEntity = UserEntity.parse(this.user)
      this.setSnackbar({
        visible: true,
        color: 'green lighten-1',
        icon: 'mdi-check-circle',
        messages: ['Operação realizada com sucesso']
      })
      this.showChangeUserDialog = false
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
    return helper.disableCheckButton(this.formValid, this.user, this.userEntity)
  }

  get disableConfirmButton () {
    return helper.disableConfirmButton(this.userEntity, this.loading)
  }

  get showPasswordIcon () {
    return helper.getShowPasswordIcon(this.showPassword)
  }

  get isMobile () {
    return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
  }
}
