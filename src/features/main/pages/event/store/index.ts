import { Module } from 'vuex'
import { state } from './state'
import { actions } from './actions'
import { mutations } from './mutations'
import { RootState, EventState } from '@/models'

export const event: Module<EventState, RootState> = {
  namespaced: true,
  actions,
  mutations,
  state
}
