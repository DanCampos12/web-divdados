import { Component, Vue } from 'vue-property-decorator'
import TemplateDesktop from './components/template-desktop/TemplateDesktop.vue'
import TemplateMobile from './components/template-mobile/TemplateMobile.vue'
import { getTemplate } from '@/helpers'
import { UserEntity } from '@/models'
import { Action } from 'vuex-class'

@Component({
  components: {
    TemplateDesktop,
    TemplateMobile
  }
})
export default class SignInComponent extends Vue {
  @Action('signUp', { namespace: 'auth' })
  readonly signUp$!: (user: UserEntity) => Promise<string>

  loading = false

  async signUp (user: UserEntity) {
    try {
      this.loading = true
      const idToken = await this.signUp$(user)
      this.$authorizer.setLocalStorageIdToken(idToken)
      this.$router.replace({ name: 'Main.Home' })
    } finally {
      this.loading = false
    }
  }

  get template () {
    return getTemplate(this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm)
  }
}
