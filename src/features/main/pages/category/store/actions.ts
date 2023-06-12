import { CategoryEntity, CategoryState, RootState } from '@/models'
import { ActionTree, Commit } from 'vuex'
import { CategoryService } from '../service/AuthService'

export const actions: ActionTree<CategoryState, RootState> = {
  async getCategories ({ commit }: { commit: Commit }, userId: string) {
    try {
      const response = await CategoryService.getCategories(userId)
      commit('setCategories', response.data)
      return response.data || []
    } catch (error: any) {
      throw error.response.data
    }
  },
  async postCategory (_, category: CategoryEntity) {
    try {
      const response = await CategoryService.postCategory(category)
      return response.data || new CategoryEntity()
    } catch (error: any) {
      throw error.response.data
    }
  },
  async putCategory (_, category: CategoryEntity) {
    try {
      const response = await CategoryService.putCategory(category)
      return response.data || new CategoryEntity()
    } catch (error: any) {
      throw error.response.data
    }
  },
  async deleteCategory (_, category: CategoryEntity) {
    try {
      const response = await CategoryService.deleteCategory(category)
      return response.data || ''
    } catch (error: any) {
      throw error.response.data
    }
  }
}
