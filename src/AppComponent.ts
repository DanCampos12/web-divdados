import { Component, Vue } from 'vue-property-decorator'
import { Mutation, State } from 'vuex-class'
import { Snackbar, UserEntity } from './models'

@Component
export default class AppComponent extends Vue {
  @State('isEditMode', { namespace: 'objective' })
  readonly isObjectiveEditMode!: boolean

  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  @State('snackbar')
  readonly snackbar!: Snackbar

  @Mutation('setSnackbar')
  readonly setSnackbar!: (snackbar: Snackbar) => void

  flowComplete = false
  isDragging = false
  startY = 0
  showRefreshButton = false

  async created () {
    const idTokenFromQuery = this.$route.query.idToken as string | undefined
    const isAuthorized = await this.$authorizer.authorize(idTokenFromQuery)
    this.configureRoute(isAuthorized)
    this.flowComplete = true
  }

  mounted () {
    this.configurePullRefresh()
    const htmlElement = document.querySelector('html') as HTMLElement
    const htmlElementClasses = [...htmlElement.classList]
    if (htmlElementClasses.includes('scroll-disabled')) return
    htmlElement.classList.add('scroll-disabled')
  }

  configureRoute (isAuthorized: boolean) {
    if (!isAuthorized) {
      if (this.$route.name === 'Auth.SignIn') return
      this.$router.replace({ name: 'Auth.SignIn', params: {} })
      return
    }

    if (!this.user.flowComplete) {
      if (this.$route.name === 'Auth.ChangePassword') return
      this.$router.replace({ name: 'Auth.ChangePassword', params: {} })
      return
    }

    const routeName = this.$route.name?.includes('Auth') ? 'Main.Home' : this.$route.name as string
    if (this.$route.name === routeName) return
    this.$router.replace({ name: routeName, params: {} })
  }

  configurePullRefresh () {
    if (!this.isMobile) return
    document.addEventListener('touchstart', this.onTouchStart)
    document.addEventListener('touchmove', this.onTouchMove)
    document.addEventListener('touchend', this.onTouchEnd)
  }

  onTouchStart (event: TouchEvent) {
    const scrollElements = document.querySelectorAll('.scroller')
    let scrollYTotal = 0
    scrollElements.forEach((element) => { scrollYTotal += element.scrollTop })
    const scrollY = scrollElements.length ? scrollYTotal : window.scrollY
    if (scrollY !== 0 || this.isObjectiveEditMode) return
    this.isDragging = true
    this.startY = event.touches[0].clientY
  }

  onTouchMove (event: TouchEvent) {
    if (!this.isDragging) return
    const currentY = event.touches[0].clientY
    this.showRefreshButton = (currentY - this.startY) > 200
  }

  onTouchEnd () {
    if (!this.isDragging) return
    if (this.showRefreshButton) window.location.reload()
    this.isDragging = false
    this.startY = 0
    this.showRefreshButton = false
  }

  get isMobile () {
    return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
  }
}
