import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppComponent extends Vue {
  flowComplete = false

  async created () {
    const isAuthorized = await this.$authorizer.authorize()
    if (!isAuthorized) this.$router.replace({ name: 'Auth.SignIn' })
    this.flowComplete = true
  }
}
