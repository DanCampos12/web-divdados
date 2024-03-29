import { OverviewEntity } from '@/models'
import { Component, Prop, Vue } from 'vue-property-decorator'
import SummaryComponent from '../components/summary/SummaryComponent.vue'
import AccumulatedValuesComponent from '../components/accumulated-values/AccumulatedValuesComponent.vue'
import OperationTypeAllocationComponent from '../components/operation-type-allocation/OperationTypeAllocationComponent.vue'
import NextObjectiveComponent from '../components/next-objetive/NextObjectiveComponent.vue'
import NextOperationsComponent from '../components/next-operations/NextOperationsComponent.vue'
import CategoryAllocationComponent from '../components/category-allocation/CategoryAllocationComponent.vue'
import Debounce from '@/helpers/Debounce'

@Component({
  components: {
    SummaryComponent,
    AccumulatedValuesComponent,
    OperationTypeAllocationComponent,
    NextObjectiveComponent,
    NextOperationsComponent,
    CategoryAllocationComponent
  }
})
export default class TemplateDesktop extends Vue {
  @Prop({ type: Object, default: new OverviewEntity() })
  readonly overview!: OverviewEntity

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean

  debounce = new Debounce()
  isResizing = false

  setIsResizing () {
    this.isResizing = true
    this.debounce.wait(200, () => {
      this.isResizing = false
    })
  }

  mounted () {
    window.addEventListener('resize', this.setIsResizing)
    this.setIsResizing()
  }

  beforeDestroy () {
    window.removeEventListener('resize', this.setIsResizing)
  }
}
