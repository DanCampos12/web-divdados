import { Objective } from '@/models'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class NextObjectiveComponent extends Vue {
  @Prop({ type: Object, default: {} })
  readonly nextObjective!: Objective

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean
}
