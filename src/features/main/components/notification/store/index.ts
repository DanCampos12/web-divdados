import { Module } from 'vuex'
import { state } from './state'
import { actions } from './actions'
import { mutations } from './mutations'
import { RootState, NotificationState } from '@/models'

export const notification: Module<NotificationState, RootState> = {
  namespaced: true,
  actions,
  mutations,
  state
}
