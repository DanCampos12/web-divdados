import Debounce from '@/helpers/Debounce'
import { Category } from '@/models'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class TemplateDesktop extends Vue {
  @Prop({ type: Array, default: [] })
  readonly categories!: Category[]

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean

  @Watch('categories', { deep: true })
  onCategoriesChange () {
    this.debounce.wait(50, this.setHasScroll)
  }

  hasScroll = false
  debounce = new Debounce()
  sortConfig = { column: 'name', desc: false }

  setSortConfig (column: string, desc: boolean) {
    this.sortConfig.column = column
    this.sortConfig.desc = desc
    this.$emit('sortCategories', this.sortConfig)
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
