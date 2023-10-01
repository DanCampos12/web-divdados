import ApiService from '@/core/services/ApiService'
import { Operation, OperationEntity } from '@/models'
import { AxiosResponse } from 'axios'

export class OperationService extends ApiService {
  static async getOperations (userId: string): Promise<AxiosResponse<Operation[]>> {
    return this.httpService.get(`v1/users/${userId}/operations`)
  }

  static async postOperation (operation: OperationEntity): Promise<AxiosResponse<Operation>> {
    return this.httpService.post(`v1/users/${operation.userId}/operations`, operation)
  }

  static async putOperation (operation: OperationEntity): Promise<AxiosResponse<Operation>> {
    return this.httpService.put(`v1/users/${operation.userId}/operations/${operation.id}`, operation)
  }

  static async deleteOperation (operation: OperationEntity): Promise<AxiosResponse<string>> {
    return this.httpService.delete(`v1/users/${operation.userId}/operations/${operation.id}`)
  }

  static async effectOperation (operation: OperationEntity): Promise<AxiosResponse<Operation>> {
    return this.httpService.put(`v1/users/${operation.userId}/operations/${operation.id}/effect`)
  }
}
