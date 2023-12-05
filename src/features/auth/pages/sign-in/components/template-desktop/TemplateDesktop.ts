import { Component, Prop, Vue } from 'vue-property-decorator'
import helper from '../../SignInHelper'

@Component
export default class TemplateDesktop extends Vue {
  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean

  showPassword = false
  formValid = false
  email = ''
  password = ''
  rules: Record<string, (value: string) => string | boolean> = {
    required: helper.rulesRequired,
    email: helper.rulesEmail
  }

  toggleShowPassword () {
    this.showPassword = !this.showPassword
  }

  access () {
    if (!this.formValid) return
    this.$emit('signIn', {
      email: this.email,
      password: this.password
    })
  }

  signUp () {
    this.$router.push({ name: 'Auth.SignUp' })
  }

  get disableAccessButton () {
    return helper.disableAccessButton(this.formValid, this.loading)
  }

  get showPasswordIcon () {
    return helper.getShowPasswordIcon(this.showPassword)
  }
}
