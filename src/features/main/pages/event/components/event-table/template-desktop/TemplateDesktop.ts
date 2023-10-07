import Debounce from '@/helpers/Debounce'
import { EventPeriod, Event } from '@/models'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class TemplateDesktop extends Vue {
  @State('eventPeriods', { namespace: 'event' })
  readonly eventPeriods!: EventPeriod[];

  @Prop({ type: Array, default: [] })
  readonly events!: Event[]

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean

  @Watch('events', { deep: true })
  onEventsChange () {
    this.debounce.wait(50, this.setHasScroll)
  }

  hasScroll = false
  debounce = new Debounce()
  sortConfig = { column: 'initialDate', desc: false }

  getPeriodDescription (key: string) {
    const period = this.eventPeriods.find((period) => period.key === key)
    return period?.name || ''
  }

  setSortConfig (column: string, desc: boolean) {
    this.sortConfig.column = column
    this.sortConfig.desc = desc
    this.$emit('sortEvents', this.sortConfig)
  }

  setHasScroll () {
    const scrollContainer = document.querySelector('.v-virtual-scroll') as HTMLElement
    if (!scrollContainer) return
    this.$nextTick(() => {
      this.hasScroll = scrollContainer.scrollHeight > scrollContainer.clientHeight
    })
  }

  mounted () {
    window.addEventListener('resize', this.setHasScroll)
    this.setHasScroll()
  }

  beforeDestroy () {
    window.removeEventListener('resize', this.setHasScroll)
  }
}
