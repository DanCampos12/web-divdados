import { ObjectiveState, ObjectiveEntity, RootState, ReorderObjectiveDTO } from '@/models'
import { ActionTree } from 'vuex'
import { ObjectiveService } from '../service/ObjectiveService'

export const actions: ActionTree<ObjectiveState, RootState> = {
  async getObjectives (_, userId: string) {
    try {
      const response = await ObjectiveService.getObjectives(userId)
      return response.data || []
    } catch (error: any) {
      throw error.response.data
    }
  },
  async postObjective (_, objective: ObjectiveEntity) {
    try {
      const response = await ObjectiveService.postObjective(objective)
      return response.data || new ObjectiveEntity()
    } catch (error: any) {
      throw error.response.data
    }
  },
  async putObjective (_, objective: ObjectiveEntity) {
    try {
      const response = await ObjectiveService.putObjective(objective)
      return response.data || new ObjectiveEntity()
    } catch (error: any) {
      throw error.response.data
    }
  },
  async deleteObjective (_, objective: ObjectiveEntity) {
    try {
      const response = await ObjectiveService.deleteObjective(objective)
      return response.data || ''
    } catch (error: any) {
      throw error.response.data
    }
  },
  async completeObjective (_, objective: ObjectiveEntity) {
    try {
      const response = await ObjectiveService.completeObjective(objective)
      return response.data || new ObjectiveEntity()
    } catch (error: any) {
      throw error.response.data
    }
  },
  async reorderObjectives (_, reorderObjectiveDTO: ReorderObjectiveDTO) {
    try {
      const response = await ObjectiveService.reorderObjectives(reorderObjectiveDTO)
      return response.data || []
    } catch (error: any) {
      throw error.response.data
    }
  },
  async processObjectives (_, userId: string) {
    try {
      const response = await ObjectiveService.processObjectives(userId)
      return response.data || []
    } catch (error: any) {
      throw error.response.data
    }
  }
}
