import { Objective } from './Objective'
import { ObjectiveEntity } from './ObjectiveEntity'

export class ObjectiveGridLayout {
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
  objective: Objective;

  constructor (objective: Objective, index: number) {
    this.x = 0
    this.y = index
    this.w = 1
    this.h = 1
    this.i = index.toString()
    this.objective = ObjectiveEntity.parse(objective)
  }
}
