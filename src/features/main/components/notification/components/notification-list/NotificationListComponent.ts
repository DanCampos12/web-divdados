import { NotificationTypeEnum } from '@/enums/NotificationType'
import { Notification } from '@/models'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class NotificationListComponent extends Vue {
  @Prop({ type: Array, default: [] })
  readonly notifications!: Notification[]

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean

  @Prop({ type: Array, default: [] })
  readonly notificationsUpdating!: string[]

  @Prop({ type: Array, default: [] })
  readonly notificationsRemoving!: string[]

  notificationTypesConfig: Record<string, { icon: string; color: string }> = {
    [NotificationTypeEnum.OBJECTIVE_EXPIRED]: { icon: 'mdi-progress-close', color: 'red lighten-2' },
    [NotificationTypeEnum.OBJECTIVE_COMPLETED]: { icon: 'mdi-progress-check', color: 'success' },
    [NotificationTypeEnum.OBJECTIVE_HALF_COMPLETED]: { icon: 'mdi-progress-clock', color: 'blue lighten-1' },
    [NotificationTypeEnum.OBJECTIVE_FINISHED]: { icon: 'mdi-progress-star', color: 'green lighten-1' },
    [NotificationTypeEnum.OBJECTIVE_EXPIRING_IN_FIVE_DAYS]: { icon: 'mdi-progress-alert', color: 'yellow lighten-1' },
    [NotificationTypeEnum.OBJECTIVE_EXPIRING_TOMORROW]: { icon: 'mdi-progress-alert', color: 'orange lighten-1' },
    [NotificationTypeEnum.OPERATION_FIVE_HUNDRED_OUTFLOW]: { icon: 'mdi-progress-download', color: 'yellow lighten-1' },
    [NotificationTypeEnum.OPERATION_ONE_THOUSAND_OUTFLOW]: { icon: 'mdi-progress-download', color: 'yellow lighten-1' },
    [NotificationTypeEnum.OPERATION_TWO_THOUSAND_OUTFLOW]: { icon: 'mdi-progress-download', color: 'orange lighten-1' },
    [NotificationTypeEnum.OPERATION_THREE_THOUSAND_OUTFLOW]: { icon: 'mdi-progress-download', color: 'red lighten-2' },
    [NotificationTypeEnum.OPERATION_FIVE_THOUSAND_OUTFLOW]: { icon: 'mdi-progress-download', color: 'error' },
    [NotificationTypeEnum.EFFECT_OPERATION]: { icon: 'mdi-calendar-clock-outline', color: 'blue lighten-1' },
    [NotificationTypeEnum.CATEGORY_BEST_RESULTS]: { icon: 'mdi-progress-upload', color: 'success' },
    [NotificationTypeEnum.CATEGORY_WORST_RESULTS]: { icon: 'mdi-progress-download', color: 'error' },
    [NotificationTypeEnum.CATEGORY_LIMIT_EXCEEDED]: { icon: 'mdi-progress-question', color: 'purple lighten-1' }
  }

  notificationIsUpdating (notification: Notification) {
    return this.notificationsUpdating.some((item) => item === notification.id)
  }

  notificationIsRemoving (notification: Notification) {
    return this.notificationsRemoving.some((item) => item === notification.id)
  }
}
