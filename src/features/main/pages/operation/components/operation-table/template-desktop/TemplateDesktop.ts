import Debounce from '@/helpers/Debounce'
import { Category, CategoryEntity, Operation } from '@/models'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class TemplateDesktop extends Vue {
  @Prop({ type: Array, default: [] })
  readonly operations!: Operation[]

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean

  @Prop({ type: Array, default: [] })
  readonly categories!: Category[]

  @Watch('operations', { deep: true })
  onOperationsChange () {
    this.debounce.wait(50, this.setHasScroll)
  }

  hasScroll = false
  debounce = new Debounce()

  setHasScroll () {
    const scrollContainer = document.querySelector('.v-virtual-scroll') as HTMLElement
    if (!scrollContainer) return
    this.$nextTick(() => {
      this.hasScroll = scrollContainer.scrollHeight > scrollContainer.clientHeight
    })
  }

  getCategoryName (operation: Operation) {
    const category = this.categories.find((category) =>
      category.id === operation.categoryId) || new CategoryEntity()
    return category.name
  }

  mounted () {
    window.addEventListener('resize', this.setHasScroll)
    this.setHasScroll()
  }

  beforeDestroy () {
    window.removeEventListener('resize', this.setHasScroll)
  }
}
