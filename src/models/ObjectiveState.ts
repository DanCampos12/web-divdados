import { ObjectiveGridLayout } from './ObjectiveGridLayout'

export interface ObjectiveState {
  tabSelected: number;
  objectiveGridLayout: ObjectiveGridLayout[];
  isEditMode: boolean;
}
