import { Category, CategoryEntity, Snackbar } from '@/models'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Action, Mutation } from 'vuex-class'

@Component
export default class CategoryTableComponent extends Vue {
  @Action('deleteCategory', { namespace: 'category' })
  readonly deleteCategory!: (category: Category) => Promise<string>

  @Mutation('setSnackbar')
  readonly setSnackbar!: (snackbar: Snackbar) => void

  @Prop({ type: Array, default: [] })
  readonly categories!: Category[]

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean

  categorySelected = new CategoryEntity()
  showDeleteDialog = false
  operationInProgress = false

  startDeleteCategory (category: Category) {
    this.showDeleteDialog = true
    this.categorySelected = CategoryEntity.parse(category)
  }

  finishDeleteCategoryProcess () {
    this.operationInProgress = false
    this.showDeleteDialog = false
    this.categorySelected = new CategoryEntity()
  }

  async onDeleteCategory () {
    try {
      this.operationInProgress = true
      await this.deleteCategory(this.categorySelected)
      this.setSnackbar({
        visible: true,
        color: 'green lighten-1',
        icon: 'mdi-check-circle',
        messages: ['Operação realizada com sucesso']
      })
      this.$emit('operationPerformed')
    } catch (errors: any) {
      this.setSnackbar({
        visible: true,
        color: 'red lighten-1',
        icon: 'mdi-alert-circle',
        messages: errors.map((e: any) => e.message)
      })
    } finally {
      this.finishDeleteCategoryProcess()
    }
  }
}
