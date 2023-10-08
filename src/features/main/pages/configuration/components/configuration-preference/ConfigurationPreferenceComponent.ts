import { UserEntity } from '@/models'
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class ConfigurationPreferenceComponent extends Vue {
  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  userEntity = new UserEntity()

  created () {
    this.userEntity = UserEntity.parse(this.user)
  }

  get isMobile () {
    return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
  }
}
