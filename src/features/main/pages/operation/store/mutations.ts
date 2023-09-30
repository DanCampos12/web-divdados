import { OperationState } from '@/models'
import { MutationTree } from 'vuex'

export const mutations: MutationTree<OperationState> = {
  setFilters (state: OperationState, filters: { searchText: string; inflow: boolean; outflow: boolean;}) {
    state.filters = { ...filters }
  }
}
