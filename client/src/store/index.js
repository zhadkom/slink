import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },
  mutations: {
    AUTH_REQUEST(state) {
      state.status = 'Loading auth'
    },
    AUTH_SUCCESS(state, token, user) {
      state.status = 'Success auth'
      state.token = token
      state.user = user
    },
    AUTH_ERROR(state) {
      state.status = 'Error auth'
    },
    LOGOUT(state) {
      state.status = ''
      state.token = ''
    }
  },
  actions: {
    signUp({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        axios({
          // TODO: routes for production
          url: 'http://localhost:8081/sign-up',
          data: user,
          method: 'POST'
        })
          .then(response => {
            const token = response.data.token
            const user = response.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('AUTH_SUCCESS', token, user)
            resolve(response)
          })
          .catch(error => {
            commit('AUTH_ERROR')
            localStorage.removeItem('token')
            reject(error)
          })
      })
    },
    signIn({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        axios({
          // TODO: routes for production
          url: 'http://localhost:8081/sign-in',
          data: user,
          method: 'POST'
        })
          .then(response => {
            const token = response.data.token
            const user = response.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('AUTH_SUCCESS', token, user)
            resolve(response)
          })
          .catch(error => {
            commit('AUTH_ERROR')
            localStorage.removeItem('token')
            reject(error)
          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('LOGOUT')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  modules: {},
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
})
