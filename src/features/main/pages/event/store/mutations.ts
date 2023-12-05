import { EventState } from '@/models'
import { MutationTree } from 'vuex'

export const mutations: MutationTree<EventState> = {
  setFilters (state: EventState, filters: { searchText: string; inflow: boolean; outflow: boolean;}) {
    state.filters = { ...filters }
  }
}
