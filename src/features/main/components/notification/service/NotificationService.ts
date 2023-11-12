import ApiService from '@/core/services/ApiService'
import { Notification } from '@/models'
import { AxiosResponse } from 'axios'

export class NotificationService extends ApiService {
  static async processNotifications (userId: string): Promise<AxiosResponse<Notification[]>> {
    return this.httpService.post(`v1/users/${userId}/notifications/process`)
  }

  static async updateNotificationsRead ({ userId, notifications }: {
    userId: string; notifications: Notification[];
  }): Promise<AxiosResponse<Notification[]>> {
    return this.httpService.put(`v1/users/${userId}/notifications/update-read`, { userId, notifications })
  }

  static async removeNotifications ({ userId, notifications }: {
    userId: string; notifications: Notification[];
  }): Promise<AxiosResponse<Notification[]>> {
    return this.httpService.put(`v1/users/${userId}/notifications/remove`, { userId, notifications })
  }
}
