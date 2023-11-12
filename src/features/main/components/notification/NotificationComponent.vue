<template>
  <div>
    <v-menu
      v-model="showMenu"
      :close-on-content-click="false"
      min-width="360"
      :nudge-left="isMobile ? 280 : 380"
      offset-y
      permanent
    >
      <template #activator="{ on }">
        <v-btn
          class="mr-2"
          fab
          text
          x-small
          v-on="on"
        >
          <v-badge
            color="orange darken-3"
            dot
            offset-x="4"
            offset-y="4"
            :value="notificationsUnreadCount"
          >
            <v-icon size="26">
              mdi-bell-outline
            </v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-sheet
        class="notification--container"
        height="600"
        :width="isMobile ? '360' : '420'"
      >
        <div class="header">
          <div
            class="d-flex justify-space-between align-center"
            style="height: 48px"
          >
            <v-badge
              color="orange darken-3"
              dot
              inline
              :value="notificationsUnreadCount"
            >
              <span class="subtitle-1 font-weight-bold">
                Notificações
              </span>
            </v-badge>
            <div class="d-flex align-center">
              <v-tooltip
                v-if="!loading && notificationsFiltered.some((item) => !item.read)"
                left
              >
                <template #activator="{ on }">
                  <v-btn

                    class="mr-1"
                    color="blue lighten-1"
                    :disabled="!!notificationsUpdating.length"
                    fab
                    :loading="!!notificationsUpdating.length"
                    text
                    x-small
                    v-on="on"
                    @click="updateNotificationsRead(notificationsFiltered)"
                  >
                    <v-icon size="22">
                      mdi-eye-check-outline
                    </v-icon>
                  </v-btn>
                </template>
                Marcar tudo como lido
              </v-tooltip>
              <v-tooltip
                v-if="!loading && !!notificationsFiltered.length"
                left
              >
                <template #activator="{ on }">
                  <v-btn

                    color="red lighten-2"
                    :disabled="!!notificationsRemoving.length"
                    fab
                    :loading="!!notificationsRemoving.length"
                    text
                    x-small
                    v-on="on"
                    @click="removeNotifications(notificationsFiltered)"
                  >
                    <v-icon size="22">
                      mdi-delete-empty-outline
                    </v-icon>
                  </v-btn>
                </template>
                Remover tudo
              </v-tooltip>
              <v-btn
                fab
                text
                x-small
                @click="showMenu = false"
              >
                <v-icon size="22">
                  mdi-close
                </v-icon>
              </v-btn>
            </div>
          </div>
        </div>
        <v-tabs
          v-model="tabSelected"
          height="32"
        >
          <v-tab
            class="subtitle-2"
            :disabled="loading"
          >
            <v-badge
              color="background"
              :content="loading ? '0' : notifications.length.toString()"
              inline
            >
              Todas
            </v-badge>
          </v-tab>
          <v-tab
            class="subtitle-2"
            :disabled="loading"
          >
            <v-badge
              color="background"
              :content="loading ? '0' : uncheckedNotificationsCount.toString()"
              inline
            >
              Não lidas
            </v-badge>
          </v-tab>
        </v-tabs>
        <notification-list-component
          :loading="loading"
          :notifications="notificationsFiltered"
          :notifications-removing="notificationsRemoving"
          :notifications-updating="notificationsUpdating"
          @removeNotification="removeNotifications"
          @updateNotificationRead="updateNotificationsRead"
        />
      </v-sheet>
    </v-menu>
    <v-snackbar
      v-model="showNewNotificationsAlert"
      color="primary"
      elevation="24"
      max-width="320"
      :right="!isMobile"
      style="margin-top: 48px"
      :timeout="1500"
      top
      vertical
    >
      <div class="d-flex align-center white--text">
        <v-icon
          class="mr-3"
          color="white"
          size="28"
        >
          mdi-bell-alert-outline
        </v-icon>
        Você possui {{ newNotificationsCount }} novas notificações.
      </div>
    </v-snackbar>
  </div>
</template>
<script lang="ts" src="./NotificationComponent.ts"></script>
<style lang="scss" scoped>
  .v-sheet.notification--container {
    div.header {
      padding: 0px 12px;
      border-bottom: 1px solid var(--v-border-base);
    }
  }

  ::v-deep .v-badge__badge {
    color: var(--v-primary-base);
  }
</style>
