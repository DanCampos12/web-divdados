import { Category } from '@/models'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TemplateMobile extends Vue {
  @Prop({ type: Array, default: [] })
  readonly categories!: Category[]

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean
}
