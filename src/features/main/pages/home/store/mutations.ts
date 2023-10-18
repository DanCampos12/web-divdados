import { HomeState } from '@/models'
import { MutationTree } from 'vuex'

export const mutations: MutationTree<HomeState> = {
  setDate (state: HomeState, value: string) {
    state.date = value
  }
}
