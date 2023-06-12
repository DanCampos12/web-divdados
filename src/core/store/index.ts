import { RootState, Snackbar } from '@/models'
import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { auth } from '@/features/auth/store'
import { category } from '@/features/main/pages/category/store'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
    snackbar: {
      visible: false,
      color: 'green lighten-1',
      icon: '',
      messages: []
    }
  },
  mutations: {
    setSnackbar (state: RootState, snackbar: Snackbar) {
      state.snackbar = snackbar
    }
  },
  modules: {
    auth,
    category
  }
}

const vuexStore = new Vuex.Store<RootState>(store)
export default vuexStore
