import { UserEntity } from '@/models'
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import helper from './ConfigurationBasicInfoHelper'

@Component
export default class ConfigurationBasicInfoComponent extends Vue {
  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  userEntity = new UserEntity()
  showPassword = false

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

  toggleShowPassword () {
    this.showPassword = !this.showPassword
  }

  get isMobile () {
    return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
  }
}
