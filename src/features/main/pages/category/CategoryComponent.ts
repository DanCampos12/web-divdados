import { Category, UserEntity } from '@/models'
import { Component, Vue } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'
import CategoryTableComponent from './components/category-table/CategoryTableComponent.vue'
import helper from './CategoryHelper'

@Component({
  components: {
    CategoryTableComponent
  }
})
export default class CategoryComponent extends Vue {
  @Action('getCategories', { namespace: 'category' })
  readonly getCategories$!: (userId: string) => Promise<Category[]>

  @State('categories', { namespace: 'category' })
  readonly categories!: Category[]

  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  searchText = ''
  loading = false

  async getCategories () {
    try {
      this.loading = true
      await this.getCategories$(this.user.id || '')
    } finally {
      this.loading = false
    }
  }

  created () {
    this.getCategories()
  }

  get categoriesFiltered () {
    return helper.filterCategories(this.categories, this.searchText)
  }
}
