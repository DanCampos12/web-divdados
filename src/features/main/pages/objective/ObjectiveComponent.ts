import { Component, Vue } from 'vue-property-decorator'
import ObjectiveActionsComponent from './components/objective-actions/ObjectiveActionsComponent.vue'
import ObjectiveGridLayoutComponent from './components/objective-grid-layout/ObjectiveGridLayoutComponent.vue'
import ObjectiveFormComponent from './components/objective-form/ObjectiveFormComponent.vue'
import { Action, Mutation, State } from 'vuex-class'
import { Objective, ObjectiveEntity, UserEntity } from '@/models'
import helper from './ObjectiveHelper'

@Component({
  components: {
    ObjectiveActionsComponent,
    ObjectiveGridLayoutComponent,
    ObjectiveFormComponent
  }
})
export default class ObjectiveComponent extends Vue {
  @Action('getObjectives', { namespace: 'objective' })
  readonly getObjectives$!: (userId: string) => Promise<Objective[]>

  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  @State('tabSelected', { namespace: 'objective' })
  readonly tabSelected!: number

  @Mutation('setObjectiveGridLayout', { namespace: 'objective' })
  readonly setObjectiveGridLayout!: (objectives: Objective[]) => void

  @Mutation('setTabSelected', { namespace: 'objective' })
  readonly setTabSelected!: (value: number) => void

  @Mutation('setIsEditMode', { namespace: 'objective' })
  readonly setIsEditMode!: (value: boolean) => void

  objectives: Objective[] = []
  loading = false
  formVisible = false
  objectiveSelected = new ObjectiveEntity()
  $refs!: Record<string, any>

  created () {
    this.getObjectives()
  }

  async getObjectives () {
    try {
      this.loading = true
      this.objectives = await this.getObjectives$(this.user.id || '')
      this.setObjectiveGridLayout(this.objectivesFiltered)
    } finally {
      this.loading = false
    }
  }

  onTabSelectedChange (value: number) {
    if (this.tabSelected === value) return
    this.setTabSelected(value)
    this.setIsEditMode(false)
    this.setObjectiveGridLayout(this.objectivesFiltered)
  }

  setFormVisible (value: boolean) {
    this.formVisible = value
    if (!this.formVisible) this.objectiveSelected = new ObjectiveEntity()
  }

  onObjectiveSelectedToEdit (objective: ObjectiveEntity) {
    this.objectiveSelected = ObjectiveEntity.parse(objective)
    this.setFormVisible(true)
  }

  beforeDestroy () {
    this.onTabSelectedChange(0)
  }

  get objectivesFiltered () {
    return helper.filterObjectives(this.objectives, this.tabSelected)
  }

  get isMobile () {
    return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
  }
}
