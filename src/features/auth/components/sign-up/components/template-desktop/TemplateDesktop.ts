import { Component, Prop, Vue } from 'vue-property-decorator'
import helper from '../../SignUpHelper'

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

  register () {
    this.$emit('signUp', {
      email: this.email,
      password: this.password
    })
  }

  toggleShowPassword () {
    this.showPassword = !this.showPassword
  }

  backToSignIn () {
    this.$router.push({ name: 'Main.Auth.SignIn' })
  }

  get disableSignUpButton () {
    return helper.disableSignUpButton(this.formValid, this.loading)
  }

  get showPasswordIcon () {
    return helper.getShowPasswordIcon(this.showPassword)
  }
}
