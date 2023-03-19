import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class AppComponent extends Vue {
  @Watch('isMobile')
  onIsMobileChange () {
    const htmlElement = document.querySelector('html') as HTMLElement
    const htmlElementClasses = [...htmlElement.classList]
    const scrollDisabled = htmlElementClasses.includes('scroll-disabled')
    this.isMobile
      ? this.applyMobileStyles(scrollDisabled)
      : this.applyDesktopStyles(scrollDisabled)
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

  flowComplete = false

  async created () {
    const isAuthorized = await this.$authorizer.authorize()
    if (!isAuthorized) this.$router.replace({ name: 'Auth.SignIn' })
    this.flowComplete = true
  }

  mounted () {
    this.onIsMobileChange()
  }

  get isMobile () {
    return this.$vuetify.breakpoint.mobile
  }
}
