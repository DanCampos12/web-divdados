import { HomeState, RootState } from '@/models'
import { ActionTree } from 'vuex'
import { HomeService } from '../service/HomeService'

export const actions: ActionTree<HomeState, RootState> = {
  async getOverview (_, { userId, date }: { userId: string; date: string; }) {
    try {
      const response = await HomeService.getOverview(userId, date)
      return response.data || {}
    } catch (error: any) {
      throw error.response.data
    }
  }
}
