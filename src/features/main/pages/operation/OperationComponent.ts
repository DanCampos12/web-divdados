import { Component, Vue, Watch } from 'vue-property-decorator'
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
  readonly getOperations$!: ({ userId, date }: { userId: string, date: string }) => Promise<Operation[]>

  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  @State('filters', { namespace: 'operation' })
  readonly filters!: { searchText: string; inflow: boolean; outflow: boolean }

  @State('date', { namespace: 'home' })
  readonly date!: string

  @Watch('date')
  onDateChange () {
    this.getOperations()
  }

  tabSelected = 0
  categories: Category[] = []
  operations: Operation[] = []
  operationSelected = new OperationEntity()
  formVisible = false
  loading = false

  async getOperations () {
    try {
      this.loading = true
      this.operations = await this.getOperations$({
        userId: this.user.id || '',
        date: this.date
      })
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

  sortOperations ({ column, desc }: { column: keyof Operation; desc: boolean }) {
    this.operations.sort((a, b) => {
      if (a[column]! > b[column]!) return desc ? -1 : 1
      if (a[column]! < b[column]!) return desc ? 1 : -1
      return 0
    })
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

  get isMobile () {
    return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
  }
}
