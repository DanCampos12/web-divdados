import { Objective, ObjectiveGridLayout, ObjectiveState } from '@/models'
import { MutationTree } from 'vuex'

export const mutations: MutationTree<ObjectiveState> = {
  setTabSelected (state: ObjectiveState, value: number) {
    state.tabSelected = value
  },
  setObjectiveGridLayout (state: ObjectiveState, objectives: Objective[]) {
    state.objectiveGridLayout = (objectives || []).map((objective, index) =>
      new ObjectiveGridLayout(objective, index))
  },
  setIsEditMode (state: ObjectiveState, value: boolean) {
    state.isEditMode = value
  }
}
