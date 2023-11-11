import { Component, Prop, Vue } from 'vue-property-decorator'
import helper from '../../RecoverPasswordHelper'

@Component
export default class TemplateMobile extends Vue {
  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean

  formValid = false
  email = ''

  rules: Record<string, (value: string) => string | boolean> = {
    required: helper.rulesRequired,
    email: helper.rulesEmail
  }

  sendEmail () {
    this.$emit('sendEmail', this.email)
  }

  get disableSendButton () {
    return helper.disableSendButton(this.formValid, this.loading)
  }
}
