import { EventPeriod } from '@/models'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class TemplateMobile extends Vue {
  @State('eventPeriods', { namespace: 'event' })
  readonly eventPeriods!: EventPeriod[];

  @Prop({ type: Array, default: [] })
  readonly events!: Event[]

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean

  getPeriodDescription (key: string) {
    const period = this.eventPeriods.find((period) => period.key === key)
    return period?.name || ''
  }
}
