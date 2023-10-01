import { UserEntity } from '@/models'
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class AppBarComponent extends Vue {
  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  get isMobile () {
    return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
  }
}
