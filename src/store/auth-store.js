/* eslint-disable no-empty-pattern */
import axios from 'axios'
import { firebaseAuth } from 'boot/firebase'
import { SessionStorage } from 'quasar'
import endpoints from '../shared/endpoints'

const state = {
  loggedIn: false
}

const mutations = {
  setLoggedIn (state, value) {
    state.loggedIn = value
  }
}

const actions = {
  registerUser ({}, payload) {
    const notification = this._vm.$q.notify({
      type: 'ongoing',
      message: 'Account is being created'
    })
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        axios.post(`${endpoints.BACKEND_URL}${endpoints.POST_USER}`, { id: response.user.uid, email: response.user.email })
        setTimeout(() => {
          notification({
            type: 'positive',
            message: 'Succesfully created account',
            timeout: 250
          })
          window.history.length > 1 ? this.$router.go(-2) : this.$router.push('/search')
        }, 1000)
        console.log('response ', response)
      })
      .catch(error => {
        console.log('error ', error)
      })
  },
  loginUser ({}, payload) {
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log('login response', response)
      }).catch(error => {
        console.log('login error', error)
      })
  },
  handleAuthStateChange ({ commit }) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        commit('setLoggedIn', true)
        SessionStorage.set('loggedIn', true)
        SessionStorage.set('userName', user.email)
        SessionStorage.set('userId', user.uid)
      } else {
        commit('setLoggedIn', false)
        SessionStorage.set('loggedIn', false)
        SessionStorage.set('userName', '')
        SessionStorage.set('userId', '')
      }
    })
  },
  logoutUser () {
    firebaseAuth.signOut()
      .then(response => {
        if (this.$router.currentRoute.path === '/watchlist') {
          this.$router.push('search')
        }
      })
  }
}

const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
