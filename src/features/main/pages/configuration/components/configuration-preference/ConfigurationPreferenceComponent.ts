import { UpdatePreferenceDTO, User, UserEntity } from '@/models'
import { Component, Vue } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'

@Component
export default class ConfigurationPreferenceComponent extends Vue {
  @Action('updatePreferences', { namespace: 'auth' })
  readonly updatePreferences!: (updatePreferenceDTO: UpdatePreferenceDTO) => Promise<User>

  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  userEntity = new UserEntity()
  loading = false

  created () {
    this.userEntity = UserEntity.parse(this.user)
  }

  async save () {
    try {
      this.loading = true
      await this.updatePreferences(new UpdatePreferenceDTO(this.userEntity))
      this.userEntity = UserEntity.parse(this.user)
      this.$vuetify.theme.dark = this.user.preference.dark
    } finally {
      this.loading = false
    }
  }

  get isMobile () {
    return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
  }
}
