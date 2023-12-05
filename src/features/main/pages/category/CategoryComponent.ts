import { Category, CategoryEntity, UserEntity } from '@/models'
import { Component, Vue } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'
import CategoryTableComponent from './components/category-table/CategoryTableComponent.vue'
import CategoryFormComponent from './components/category-form/CategoryFormComponent.vue'
import helper from './CategoryHelper'

@Component({
  components: {
    CategoryTableComponent,
    CategoryFormComponent
  }
})
export default class CategoryComponent extends Vue {
  @Action('getCategories', { namespace: 'category' })
  readonly getCategories$!: (userId: string) => Promise<Category[]>

  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  categories: Category[] = []
  categorySelected = new CategoryEntity()
  formVisible = false
  searchText = ''
  loading = false

  async getCategories () {
    try {
      this.loading = true
      this.categories = await this.getCategories$(this.user.id || '')
    } finally {
      this.loading = false
    }
  }

  created () {
    this.getCategories()
  }

  setFormVisible (value: boolean) {
    this.formVisible = value
    if (!this.formVisible) this.categorySelected = new CategoryEntity()
  }

  onCategorySelectedToEdit (category: CategoryEntity) {
    this.categorySelected = CategoryEntity.parse(category)
    this.setFormVisible(true)
  }

  sortCategories ({ column, desc }: { column: keyof Category; desc: boolean }) {
    this.categories.sort((a, b) => {
      if ((a[column] || 0) > (b[column] || 0)) return desc ? -1 : 1
      if ((a[column] || 0) < (b[column] || 0)) return desc ? 1 : -1
      return 0
    })
  }

  get categoriesFiltered () {
    return helper.filterCategories(this.categories, this.searchText)
  }

  get isMobile () {
    return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
  }
}
