import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class TemplateDesktop extends Vue {
  @State('filters', { namespace: 'event' })
  readonly filters!: { searchText: string; inflow: boolean; outflow: boolean }
}
