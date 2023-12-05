import { UserEntity } from '@/models'
import { Component, Prop, Vue } from 'vue-property-decorator'
import helper from '../../ChangePasswordHelper'
import { State } from 'vuex-class'

@Component
export default class TemplateDesktop extends Vue {
  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean

  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  showPassword = false
  formValid = false
  userEntity = new UserEntity()

  created () {
    this.userEntity = UserEntity.parse(this.user)
  }

  rules: Record<string, (value: string) => string | boolean> = {
    required: helper.rulesRequired
  }

  register () {
    this.$emit('changePassword', this.userEntity)
  }

  toggleShowPassword () {
    this.showPassword = !this.showPassword
  }

  get disableRegisterButton () {
    return helper.disableRegisterButton(this.formValid, this.loading, this.userEntity.isValidPassword())
  }

  get showPasswordIcon () {
    return helper.getShowPasswordIcon(this.showPassword)
  }
}
