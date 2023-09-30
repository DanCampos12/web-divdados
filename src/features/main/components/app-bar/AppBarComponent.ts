import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppBarComponent extends Vue {
  get isMobile () {
    return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
  }
}
