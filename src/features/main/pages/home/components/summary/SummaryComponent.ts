import { OverviewSummary } from '@/models'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SummaryComponent extends Vue {
  @Prop({ type: Object, default: {} })
  readonly summary!: OverviewSummary

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean
}
