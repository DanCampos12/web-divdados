import { Objective } from './Objective'
import { Operation } from './Operation'
import { OverviewAccumulatedValue } from './OverviewAccumulatedValue'
import { OverviewCategoryAllocation } from './OverviewCategoryAllocation'
import { OverviewOperationTypeAllocation } from './OverviewOperationTypeAllocation'
import { OverviewSummary } from './OverviewSummary'

export interface Overview {
  date: string;
  summary: OverviewSummary;
  accumulatedValues: OverviewAccumulatedValue[];
  categoryAllocations: OverviewCategoryAllocation[];
  operationTypeAllocations: OverviewOperationTypeAllocation[];
  nextObjective: Objective;
  nextOperations: Operation[];
}
