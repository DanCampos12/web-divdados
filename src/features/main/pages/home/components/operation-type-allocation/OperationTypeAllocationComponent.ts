import { OverviewOperationTypeAllocation } from '@/models'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class OperationTypeAllocationComponent extends Vue {
  @Prop({ type: Array, default: [] })
  readonly operationTypeAllocations!: OverviewOperationTypeAllocation[]

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean
}
