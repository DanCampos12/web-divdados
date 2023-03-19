import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppBarComponent extends Vue {
  toggleTheme () {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark
  }

  get isMobile () {
    return this.$vuetify.breakpoint.mobile
  }
}
