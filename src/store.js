import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    splitter: {
      namespaced: true,
      state: {
        open: false
      },
      mutations: {
        toggle (state, shouldOpen) {
          if (typeof shouldOpen === 'boolean') {
            state.open = shouldOpen
          } else {
            state.open = !state.open
          }
        }
      }
    },
    user: {
      namespaced: true,
      state: {
        data: {},
        hasLogin: false
      },
      mutations: {
        login (state, user) {
          state.data = user
          state.hasLogin = true
        },
        logout (state) {
          state.data = {}
          state.hasLogin = false
        }
      }
    }
  }
})
