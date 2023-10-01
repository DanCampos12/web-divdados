import { Component, Vue } from 'vue-property-decorator'
import OperationFilterComponent from './components/operation-filter/OperationFilterComponent.vue'
import OperationTableComponent from './components/operation-table/OperationTableComponent.vue'
import OperationFormComponent from './components/operation-form/OperationFormComponent.vue'
import { Action, State } from 'vuex-class'
import { Category, Operation, OperationEntity, UserEntity } from '@/models'
import helper from './OperationHelper'

@Component({
  components: {
    OperationFilterComponent,
    OperationTableComponent,
    OperationFormComponent
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

  tabSelected = 0
  categories: Category[] = []
  operations: Operation[] = []
  operationSelected = new OperationEntity()
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
    this.formVisible = value
    if (!this.formVisible) this.operationSelected = new OperationEntity()
  }

  onOperationSelectedToEdit (operation: OperationEntity) {
    this.operationSelected = OperationEntity.parse(operation)
    this.setFormVisible(true)
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
}
