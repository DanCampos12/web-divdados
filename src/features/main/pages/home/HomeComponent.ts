import { getTemplate } from '@/helpers'
import { Component, Vue } from 'vue-property-decorator'
import TemplateDesktop from './template-desktop/TemplateDesktop.vue'
import TemplateMobile from './template-mobile/TemplateMobile.vue'
import { Action, State } from 'vuex-class'
import { Overview, OverviewEntity, UserEntity } from '@/models'

@Component({
  components: {
    TemplateDesktop,
    TemplateMobile
  }
})
export default class HomeComponent extends Vue {
  @Action('getOverview', { namespace: 'home' })
  readonly getOverview$!: ({ userId, date }: { userId: string; date: string; }) => Promise<Overview>

  @State('date', { namespace: 'home' })
  readonly date!: string

  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  loading = false
  overview = new OverviewEntity()

  async getOverview () {
    try {
      this.loading = true
      this.overview = OverviewEntity.parse(await this.getOverview$({
        userId: this.user.id || '',
        date: this.date
      }))
    } finally {
      this.loading = false
    }
  }

  created () {
    this.getOverview()
  }

  get template () {
    return getTemplate(this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm)
  }
}
