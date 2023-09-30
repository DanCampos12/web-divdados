import { Category, Operation } from '@/models'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TemplateMobile extends Vue {
  @Prop({ type: Array, default: [] })
  readonly operations!: Operation[]

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean

  @Prop({ type: Array, default: [] })
  readonly categories!: Category[]
}
