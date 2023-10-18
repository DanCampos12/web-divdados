import { OverviewCategoryAllocation } from '@/models'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CategoryAllocationComponent extends Vue {
  @Prop({ type: Array, default: [] })
  readonly categoryAllocations!: OverviewCategoryAllocation[]

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean
}
