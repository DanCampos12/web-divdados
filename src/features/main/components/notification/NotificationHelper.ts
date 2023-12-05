import { Notification } from '@/models'

class NotificationHelper {
  filterNotifications (notifications: Notification[], tabSelected: number) {
    return notifications.filter((notification) =>
      tabSelected === 0 || !notification.read)
  }
}

const instance = new NotificationHelper()
export default instance
