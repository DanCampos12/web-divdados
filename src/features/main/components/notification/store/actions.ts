import { NotificationState, RootState, Notification } from '@/models'
import { ActionTree } from 'vuex'
import { NotificationService } from '../service/NotificationService'

export const actions: ActionTree<NotificationState, RootState> = {
  async processNotifications (_, userId: string) {
    try {
      const response = await NotificationService.processNotifications(userId)
      return response.data || []
    } catch (error: any) {
      throw error.response.data
    }
  },
  async updateNotificationsRead (_, { userId, notifications }: { userId: string; notifications: Notification[] }) {
    try {
      const response = await NotificationService.updateNotificationsRead({ userId, notifications })
      return response.data || []
    } catch (error: any) {
      throw error.response.data
    }
  },
  async removeNotifications (_, { userId, notifications }: { userId: string; notifications: Notification[] }) {
    try {
      const response = await NotificationService.removeNotifications({ userId, notifications })
      return response.data || []
    } catch (error: any) {
      throw error.response.data
    }
  }
}
