import { Module } from 'vuex'
import { state } from './state'
import { actions } from './actions'
import { mutations } from './mutations'
import { RootState, OperationState } from '@/models'

export const operation: Module<OperationState, RootState> = {
  namespaced: true,
  actions,
  mutations,
  state
}
