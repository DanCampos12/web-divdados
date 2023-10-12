import { Objective } from './Objective'

export class ObjectiveEntity implements Objective {
  id?: string;
  description: string;
  value: number | null;
  initialDate: string;
  finalDate: string;
  status: string;
  order: number;
  progress: number | null;
  userId: string;

  constructor () {
    this.description = ''
    this.value = null
    this.initialDate = ''
    this.finalDate = ''
    this.status = 'inProgress'
    this.order = 0
    this.progress = null
    this.userId = ''
  }

  static parse (objective: Objective) {
    const instance = new ObjectiveEntity()
    if (objective) {
      instance.id = objective.id
      instance.description = objective.description
      instance.value = objective.value
      instance.initialDate = objective.initialDate
      instance.finalDate = objective.finalDate
      instance.status = objective.status
      instance.order = objective.order
      instance.progress = objective.progress
      instance.userId = objective.userId
    }
    return instance
  }

  isEdit () {
    return !!this.id
  }
}
