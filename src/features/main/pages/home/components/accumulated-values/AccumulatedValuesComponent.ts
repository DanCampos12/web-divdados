import { OverviewAccumulatedValue } from '@/models'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class AccumulatedValuesComponent extends Vue {
  @Prop({ type: Array, default: [] })
  readonly accumulatedValues!: OverviewAccumulatedValue[]

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean
}
