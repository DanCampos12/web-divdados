import { Component, Vue } from 'vue-property-decorator'
import { Mutation, State } from 'vuex-class'
import { Snackbar, UserEntity } from './models'

@Component
export default class AppComponent extends Vue {
  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  @State('snackbar')
  readonly snackbar!: Snackbar

  @Mutation('setSnackbar')
  readonly setSnackbar!: (snackbar: Snackbar) => void

  flowComplete = false

  async created () {
    const idTokenFromQuery = this.$route.query.idToken as string | undefined
    const isAuthorized = await this.$authorizer.authorize(idTokenFromQuery)
    this.configureRoute(isAuthorized)
    this.flowComplete = true
  }

  mounted () {
    const htmlElement = document.querySelector('html') as HTMLElement
    const htmlElementClasses = [...htmlElement.classList]
    if (htmlElementClasses.includes('scroll-disabled')) return
    htmlElement.classList.add('scroll-disabled')
  }

  configureRoute (isAuthorized: boolean) {
    if (!isAuthorized) {
      this.$router.replace({ name: 'Auth.SignIn', params: {} })
      return
    }
    if (!this.user.flowComplete) {
      this.$router.replace({ name: 'Auth.ChangePassword', params: {} })
      return
    }
    const routeName = this.$route.name?.includes('Auth')
      ? 'Main.Home'
      : this.$route.name as string
    this.$router.replace({ name: routeName, params: {} })
  }
}
