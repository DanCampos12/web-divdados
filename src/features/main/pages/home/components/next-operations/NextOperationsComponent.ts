import { Operation } from '@/models'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class NextOperationsComponent extends Vue {
  @Prop({ type: Array, default: [] })
  readonly nextOperations!: Operation[]

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean

  get isMobile () {
    return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
  }
}
