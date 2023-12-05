import { UserEntity } from '@/models'
import { Component, Prop, Vue } from 'vue-property-decorator'
import helper from '../../SignUpHelper'

@Component
export default class TemplateDesktop extends Vue {
  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean

  showPassword = false
  formValid = false
  userEntity = new UserEntity()

  sexlist = [
    { key: 'M', name: 'Masculino' },
    { key: 'F', name: 'Feminino' }
  ]

  rules: Record<string, (value: string) => string | boolean> = {
    required: helper.rulesRequired,
    email: helper.rulesEmail
  }

  register () {
    this.$emit('signUp', this.userEntity)
  }

  toggleShowPassword () {
    this.showPassword = !this.showPassword
  }

  backToSignIn () {
    this.$router.push({ name: 'Auth.SignIn' })
  }

  get disableSignUpButton () {
    return helper.disableSignUpButton(this.formValid, this.loading, this.userEntity.isValidPassword())
  }

  get showPasswordIcon () {
    return helper.getShowPasswordIcon(this.showPassword)
  }
}
