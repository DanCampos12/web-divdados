<template>
  <div class="body scroller mt-2">
    <div
      v-if="loading"
      class="full-width full-height d-flex flex-column align-center justify-center font-weight-thin"
    >
      <v-progress-circular
        class="ma-4"
        color="primary"
        indeterminate
      />
      <div style="font-size: 24px">
        Carregando suas <b>notificações</b>...
      </div>
    </div>
    <div
      v-else-if="!notifications.length"
      class="full-width full-height d-flex flex-column align-center justify-center font-weight-thin"
    >
      <v-icon
        class="ma-4"
        size="80"
      >
        mdi-database-minus-outline
      </v-icon>
      <div
        class="text-center px-4"
        style="font-size: 24px"
      >
        Não há novas <b>notificações</b> no momento.
      </div>
    </div>
    <div
      v-for="(notification, index) in notifications"
      v-else
      :key="index"
      class="list--item"
    >
      <div class="notification--description d-flex align-start pa-2">
        <v-icon
          class="mr-2"
          :color="notificationTypesConfig[notification.type].color"
          size="40"
        >
          {{ notificationTypesConfig[notification.type].icon }}
        </v-icon>
        <div class="d-flex flex-column justify-center">
          <div class="d-flex align-center justify-space-between">
            <span
              class="font-weight-bold"
              :class="{ 'subtitle-2': isMobile }"
            >
              {{ notification.title }}
            </span>
            <dd-date
              class="mr-2"
              :class="{
                'text-small': isMobile,
                'subtitle-2': !isMobile
              }"
              format="DD/MM/YYYY HH:mm"
              :value="notification.date"
            />
          </div>
          <div
            :class="{
              'font-weight-light': notification.read,
              'font-weight-medium': !notification.read,
              'text-small': isMobile,
              'subtitle-2': !isMobile
            }"
          >
            {{ notification.message }}
          </div>
        </div>
      </div>
      <div class="d-flex">
        <v-spacer />
        <v-btn
          v-if="!notification.read"
          color="blue lighten-1"
          :disabled="notificationIsUpdating(notification)"
          :loading="notificationIsUpdating(notification)"
          small
          text
          width="50%"
          @click="$emit('updateNotificationRead', [notification])"
        >
          <span :class="{ 'subtitle-2': isMobile }">
            Marcar como lida
          </span>
          <v-icon
            right
            size="22"
          >
            mdi-eye-check-outline
          </v-icon>
        </v-btn>
        <v-btn
          color="red lighten-2"
          :disabled="notificationIsRemoving(notification)"
          :loading="notificationIsRemoving(notification)"
          small
          text
          width="50%"
          @click="$emit('removeNotification', [notification])"
        >
          <span :class="{ 'subtitle-2': isMobile }">
            Remover Notificação
          </span>
          <v-icon
            right
            size="22"
          >
            mdi-delete-outline
          </v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./NotificationListComponent.ts"></script>
<style lang="scss" scoped>
  div.body {
    height: calc(100% - 104px);
    width: 100%;

    div.list--item {
      min-height: 80px;
      border-bottom: 1px solid var(--v-border-base);
    }
  }
</style>
