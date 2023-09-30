import { Component, Vue } from 'vue-property-decorator'
import OperationFilterComponent from './components/operation-filter-component/OperationFilterComponent.vue'
import OperationTableComponent from './components/operation-table-component/OperationTableComponent.vue'
import { Action, State } from 'vuex-class'
import { Category, Operation, UserEntity } from '@/models'
import helper from './OperationHelper'

@Component({
  components: {
    OperationFilterComponent,
    OperationTableComponent
  }
})
export default class OperationComponent extends Vue {
  @Action('getCategories', { namespace: 'category' })
  readonly getCategories$!: (userId: string) => Promise<Category[]>

  @Action('getOperations', { namespace: 'operation' })
  readonly getOperations$!: (userId: string) => Promise<Operation[]>

  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  @State('filters', { namespace: 'operation' })
  readonly filters!: { searchText: string; inflow: boolean; outflow: boolean }

  categories: Category[] = []
  operations: Operation[] = []
  formVisible = false
  loading = false

  async getOperations () {
    try {
      this.loading = true
      this.operations = await this.getOperations$(this.user.id || '')
    } finally {
      this.loading = false
    }
  }

  async created () {
    this.loading = true
    this.categories = await this.getCategories$(this.user.id || '')
    this.getOperations()
  }

  setFormVisible (value: boolean) {
    console.log(value)
    this.formVisible = value
  }

  get operationsFiltered () {
    return helper.filterOperations(this.operations, this.filters)
  }

  get operationsEffected () {
    return helper.getOperationsEffected(this.operationsFiltered)
  }

  get operationsPending () {
    return helper.getOperationsPending(this.operationsFiltered)
  }

  tabSelected = 0
}
