import { UserEntity } from '@/models'
import { Component, Vue } from 'vue-property-decorator'
import helper from './ConfigurationChangePasswordHelper'

@Component
export default class ConfigurationChangePasswordComponent extends Vue {
  userEntity = new UserEntity()
  showPassword = false

  rules: Record<string, (value: string) => string | boolean> = {
    required: helper.rulesRequired
  }

  toggleShowPassword () {
    this.showPassword = !this.showPassword
  }

  get showPasswordIcon () {
    return helper.getShowPasswordIcon(this.showPassword)
  }

  get isMobile () {
    return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
  }
}
