import { ObjectiveGridLayout } from './ObjectiveGridLayout'

export class ReorderObjectiveDTO {
  userId: string;
  objectivesOrder: {
    id: string;
    order: number;
  }[];

  constructor (userId: string, objectiveGridLayout: ObjectiveGridLayout[]) {
    this.userId = userId
    this.objectivesOrder = objectiveGridLayout.map((item) => {
      return {
        id: item.objective.id || '',
        order: item.y
      }
    })
  }
}
