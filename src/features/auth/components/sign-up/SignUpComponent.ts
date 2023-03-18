import { Component, Vue } from 'vue-property-decorator'
import TemplateDesktop from './components/template-desktop/TemplateDesktop.vue'
import TemplateMobile from './components/template-mobile/TemplateMobile.vue'
import { getTemplate } from '@/helpers'

@Component({
  components: {
    TemplateDesktop,
    TemplateMobile
  }
})
export default class SignInComponent extends Vue {
  loading = false

  signUp ($event: { email: string, password: string }) {
    try {
      this.loading = true
      console.log($event)
    } finally {
      setTimeout(() => { this.loading = false }, 1000)
    }
  }

  get template () {
    return getTemplate(this.$vuetify.breakpoint.mobile)
  }
}
