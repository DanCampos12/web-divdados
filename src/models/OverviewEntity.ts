import { Objective } from './Objective'
import { ObjectiveEntity } from './ObjectiveEntity'
import { Operation } from './Operation'
import { Overview } from './Overview'
import { OverviewAccumulatedValue } from './OverviewAccumulatedValue'
import { OverviewCategoryAllocation } from './OverviewCategoryAllocation'
import { OverviewOperationTypeAllocation } from './OverviewOperationTypeAllocation'
import { OverviewSummary } from './OverviewSummary'

export class OverviewEntity implements Overview {
  date: string;
  summary: OverviewSummary;
  accumulatedValues: OverviewAccumulatedValue[];
  categoryAllocations: OverviewCategoryAllocation[];
  operationTypeAllocations: OverviewOperationTypeAllocation[];
  nextObjective: Objective;
  nextOperations: Operation[];

  constructor () {
    this.date = ''
    this.summary = { totalValue: 0, inflowValue: 0, outflowValue: 0 }
    this.accumulatedValues = []
    this.categoryAllocations = []
    this.operationTypeAllocations = []
    this.nextObjective = new ObjectiveEntity()
    this.nextOperations = []
  }

  static parse (overview: Overview) {
    const instance = new OverviewEntity()
    if (overview) {
      instance.date = overview.date
      instance.summary = { ...overview.summary }
      instance.accumulatedValues = [...overview.accumulatedValues]
      instance.categoryAllocations = [...overview.categoryAllocations]
      instance.operationTypeAllocations = [...overview.operationTypeAllocations]
      instance.nextObjective = ObjectiveEntity.parse(overview.nextObjective)
      instance.nextOperations = [...overview.nextOperations]
    }
    return instance
  }
}
