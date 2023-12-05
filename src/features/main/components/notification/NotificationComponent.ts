import { UserEntity, Notification } from '@/models'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'
import helper from './NotificationHelper'
import NotificationListComponent from './components/notification-list/NotificationListComponent.vue'

const FIFTEEN_SECONDS = 15000

@Component({
  components: {
    NotificationListComponent
  }
})
export default class NotificationComponent extends Vue {
  @Action('processNotifications', { namespace: 'notification' })
  readonly processNotifications$!: (userId: string) => Promise<Notification[]>

  @Action('updateNotificationsRead', { namespace: 'notification' })
  readonly updateNotificationsRead$!: ({ userId, notifications }:
    { userId: string; notifications: Notification[] }) => Promise<Notification[]>

  @Action('removeNotifications', { namespace: 'notification' })
  readonly removeNotifications$!: ({ userId, notifications }:
    { userId: string; notifications: Notification[] }) => Promise<Notification[]>

  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  @Watch('showMenu')
  onShowMenuChange () {
    this.showNewNotificationsAlert = false
  }

  showMenu = false
  loading = false
  notificationsUpdating: string[] = []
  notificationsRemoving: string[] = []
  notifications: Notification[] = []
  showNewNotificationsAlert = false
  newNotificationsCount = 0
  tabSelected = 0

  async processNotifications () {
    try {
      this.loading = true
      const notifications = await this.processNotifications$(this.user.id || '')
      this.newNotificationsCount = 0
      notifications.forEach((notification) => {
        if (notification.read || this.notifications.some((item) => item.id === notification.id)) return
        this.newNotificationsCount++
      })
      if (this.newNotificationsCount > 0 && !this.showMenu) this.showNewNotificationsAlert = true
      this.notifications = notifications
    } finally {
      this.loading = false
    }
  }

  initializeProcessNotificationTimer () {
    setInterval(async () => {
      if (this.showMenu && !!this.notifications.length) return
      await this.processNotifications()
    }, FIFTEEN_SECONDS)
  }

  async created () {
    await this.processNotifications()
    this.initializeProcessNotificationTimer()
  }

  async updateNotificationsRead (notifications: Notification[]) {
    try {
      notifications.forEach((notification) => {
        if (this.notificationsUpdating.some((item) => item === notification.id)) return
        this.notificationsUpdating.push(notification.id)
      })
      const notificationsUpdated = await this.updateNotificationsRead$({
        userId: this.user.id || '',
        notifications: [...notifications]
      })
      this.notifications.forEach((notification) => {
        if (!notificationsUpdated.some((item) => item.id === notification.id)) return
        notification.read = true
      })
    } finally {
      notifications.forEach((notification) => {
        const index = this.notificationsUpdating.indexOf(notification.id)
        if (index >= 0) this.notificationsUpdating.splice(index, 1)
      })
    }
  }

  async removeNotifications (notifications: Notification[]) {
    try {
      notifications.forEach((notification) => {
        if (this.notificationsRemoving.some((item) => item === notification.id)) return
        this.notificationsRemoving.push(notification.id)
      })
      const notificationsRemoved = await this.removeNotifications$({
        userId: this.user.id || '',
        notifications: [...notifications]
      })
      notificationsRemoved.forEach((notification) => {
        const index = this.notifications.findIndex((item) => item.id === notification.id)
        if (index >= 0) this.notifications.splice(index, 1)
      })
    } finally {
      notifications.forEach((notification) => {
        const index = this.notificationsRemoving.indexOf(notification.id)
        if (index >= 0) this.notificationsRemoving.splice(index, 1)
      })
    }
  }

  get notificationsFiltered () {
    return helper.filterNotifications(this.notifications, this.tabSelected)
  }

  get uncheckedNotificationsCount () {
    const notifications = helper.filterNotifications(this.notifications, 1)
    return notifications.length
  }

  get notificationsUnreadCount () {
    const notificationsUnread = this.notifications.filter(item => !item.read)
    return notificationsUnread.length
  }

  get isMobile () {
    return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
  }
}
