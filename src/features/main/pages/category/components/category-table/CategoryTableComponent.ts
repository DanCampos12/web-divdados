import { Category } from '@/models'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class CategoryTableComponent extends Vue {
  @Prop({ type: Array, default: [] })
  readonly categories!: Category[]

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean
}
