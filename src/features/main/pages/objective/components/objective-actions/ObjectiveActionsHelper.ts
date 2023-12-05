import { Objective, ObjectiveGridLayout } from '@/models'

class ObjectiveActionsHelper {
  disableSabeOrderedButton (loading: boolean, objectives: Objective[], objectiveGridLayout: ObjectiveGridLayout[]) {
    return loading || objectives.every((objective) => {
      const objectiveInGrid = objectiveGridLayout.find((item) =>
        item.objective.id === objective.id)
      return objective.order === objectiveInGrid?.y
    })
  }
}

const instance = new ObjectiveActionsHelper()
export default instance
