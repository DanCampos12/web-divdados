import { getTemplate } from '@/helpers'
import { Component, Vue } from 'vue-property-decorator'
import TemplateDesktop from './template-desktop/TemplateDesktop.vue'
import TemplateMobile from './template-mobile/TemplateMobile.vue'

@Component({
  components: {
    TemplateDesktop,
    TemplateMobile
  }
})
export default class EventFilterComponent extends Vue {
  get template () {
    return getTemplate(this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm)
  }
}
