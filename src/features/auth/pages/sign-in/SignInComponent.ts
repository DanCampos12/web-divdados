import { Component, Vue } from 'vue-property-decorator'
import TemplateDesktop from './components/template-desktop/TemplateDesktop.vue'
import TemplateMobile from './components/template-mobile/TemplateMobile.vue'
import { getTemplate } from '@/helpers'
import { Action } from 'vuex-class'

@Component({
  components: {
    TemplateDesktop,
    TemplateMobile
  }
})
export default class SignInComponent extends Vue {
  @Action('signInWithEmailAndPassoword', { namespace: 'auth' })
  readonly signInWithEmailAndPassoword!: ({ email, password }:
    { email: string, password: string }) => Promise<string>

  loading = false

  async signIn ({ email, password }: { email: string, password: string }) {
    try {
      this.loading = true
      const idToken = await this.signInWithEmailAndPassoword({ email, password })
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
