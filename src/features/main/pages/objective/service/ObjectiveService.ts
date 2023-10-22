import ApiService from '@/core/services/ApiService'
import { Objective, ObjectiveEntity, ReorderObjectiveDTO } from '@/models'
import { AxiosResponse } from 'axios'

export class ObjectiveService extends ApiService {
  static async getObjectives ({ userId, date }: { userId: string, date: string }): Promise<AxiosResponse<ObjectiveService[]>> {
    return this.httpService.get(`v1/users/${userId}/objectives/${date}`)
  }

  static async postObjective (objective: ObjectiveEntity): Promise<AxiosResponse<Objective>> {
    return this.httpService.post(`v1/users/${objective.userId}/objectives`, objective)
  }

  static async putObjective (objective: ObjectiveEntity): Promise<AxiosResponse<Objective>> {
    return this.httpService.put(`v1/users/${objective.userId}/objectives/${objective.id}`, objective)
  }

  static async deleteObjective (objective: ObjectiveEntity): Promise<AxiosResponse<string>> {
    return this.httpService.delete(`v1/users/${objective.userId}/objectives/${objective.id}`)
  }

  static async completeObjective ({ objective, shouldLaunchOperation }: {
    objective: ObjectiveEntity, shouldLaunchOperation: boolean }): Promise<AxiosResponse<Objective>> {
    return this.httpService.put(`v1/users/${objective.userId}/objectives/${objective.id}/complete`, {}, {
      params: { shouldLaunchOperation }
    })
  }

  static async reorderObjectives (reorderObjectiveDTO: ReorderObjectiveDTO): Promise<AxiosResponse<Objective[]>> {
    return this.httpService.put(`v1/users/${reorderObjectiveDTO.userId}/objectives/reorder`, reorderObjectiveDTO)
  }

  static async processObjectives (userId: string): Promise<AxiosResponse<Objective[]>> {
    return this.httpService.post(`v1/users/${userId}/objectives/process`)
  }
}
