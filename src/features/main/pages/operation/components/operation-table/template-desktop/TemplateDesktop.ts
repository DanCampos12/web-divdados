import { Category, CategoryEntity, Operation } from '@/models'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TemplateDesktop extends Vue {
  @Prop({ type: Array, default: [] })
  readonly operations!: Operation[]

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean

  @Prop({ type: Array, default: [] })
  readonly categories!: Category[]

  getCategoryName (operation: Operation) {
    const category = this.categories.find((category) =>
      category.id === operation.categoryId) || new CategoryEntity()
    return category.name
  }
}
