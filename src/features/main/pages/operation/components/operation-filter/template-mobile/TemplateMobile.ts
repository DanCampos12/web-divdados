import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class TemplateMobile extends Vue {
  @State('filters', { namespace: 'operation' })
  readonly filters!: { searchText: string; inflow: boolean; outflow: boolean }
}
