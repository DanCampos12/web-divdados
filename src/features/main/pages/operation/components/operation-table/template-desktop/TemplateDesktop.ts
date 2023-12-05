import Debounce from '@/helpers/Debounce'
import { Operation } from '@/models'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class TemplateDesktop extends Vue {
  @Prop({ type: Array, default: [] })
  readonly operations!: Operation[]

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean

  @Watch('operations', { deep: true })
  onOperationsChange () {
    this.debounce.wait(50, this.setHasScroll)
  }

  hasScroll = false
  debounce = new Debounce()
  sortConfig = { column: 'date', desc: false }

  setSortConfig (column: string, desc: boolean) {
    this.sortConfig.column = column
    this.sortConfig.desc = desc
    this.$emit('sortOperations', this.sortConfig)
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
