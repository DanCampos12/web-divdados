import { OverviewEntity } from '@/models'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TemplateMobile extends Vue {
  @Prop({ type: Object, default: new OverviewEntity() })
  readonly overview!: OverviewEntity

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean
}
