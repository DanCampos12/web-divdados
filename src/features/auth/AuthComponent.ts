import { UserEntity } from '@/models'
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class AuthComponent extends Vue {
  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  created () {
    if (this.user.isLogged()) this.$router.replace({ name: 'Main.Home' })
    this.$vuetify.theme.dark = false
  }
}
