import { Objective } from '@/models'

const IN_PROGRESS = 0

class ObjectiveHelper {
  filterObjectives (objectives: Objective[], tabSelected: number) {
    return objectives.filter((objective) => {
      if (tabSelected === IN_PROGRESS) return objective.status === 'inProgress'
      return objective.status !== 'inProgress'
    })
  }
}

const instance = new ObjectiveHelper()
export default instance
