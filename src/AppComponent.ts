import { Component, Vue, Watch } from 'vue-property-decorator'
import { Mutation, State } from 'vuex-class'
import { Snackbar } from './models'

@Component
export default class AppComponent extends Vue {
  @State('snackbar')
  readonly snackbar!: Snackbar

  @Mutation('setSnackbar')
  readonly setSnackbar!: (snackbar: Snackbar) => void

  @Watch('isMobile')
  onIsMobileChange () {
    const htmlElement = document.querySelector('html') as HTMLElement
    const htmlElementClasses = [...htmlElement.classList]
    const scrollDisabled = htmlElementClasses.includes('scroll-disabled')
    this.isMobile
      ? this.applyMobileStyles(scrollDisabled)
      : this.applyDesktopStyles(scrollDisabled)
  }

  flowComplete = false

  async created () {
    const isAuthorized = await this.$authorizer.authorize()
    if (!isAuthorized) this.$router.replace({ name: 'Auth.SignIn' })
    this.flowComplete = true
  }

  mounted () {
    this.onIsMobileChange()
  }

  applyMobileStyles (scrollDisabled: boolean) {
    if (!scrollDisabled) return
    const htmlElement = document.querySelector('html') as HTMLElement
    htmlElement.classList.remove('scroll-disabled')
  }

  applyDesktopStyles (scrollDisabled: boolean) {
    if (scrollDisabled) return
    const htmlElement = document.querySelector('html') as HTMLElement
    htmlElement.classList.add('scroll-disabled')
  }

  get isMobile () {
    return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
  }
}
