import { OperationState, OperationEntity, RootState } from '@/models'
import { ActionTree } from 'vuex'
import { OperationService } from '../service/OperationService'

export const actions: ActionTree<OperationState, RootState> = {
  async getOperations (_, userId: string) {
    try {
      const response = await OperationService.getOperations(userId)
      return response.data || []
    } catch (error: any) {
      throw error.response.data
    }
  },
  async postOperation (_, operation: OperationEntity) {
    try {
      const response = await OperationService.postOperation(operation)
      return response.data || new OperationEntity()
    } catch (error: any) {
      throw error.response.data
    }
  },
  async putOperation (_, operation: OperationEntity) {
    try {
      const response = await OperationService.putOperation(operation)
      return response.data || new OperationEntity()
    } catch (error: any) {
      throw error.response.data
    }
  },
  async deleteOperation (_, operation: OperationEntity) {
    try {
      const response = await OperationService.deleteOperation(operation)
      return response.data || ''
    } catch (error: any) {
      throw error.response.data
    }
  }
}
