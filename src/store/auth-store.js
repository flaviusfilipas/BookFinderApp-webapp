/* eslint-disable no-empty-pattern */
import { firebaseAuth } from 'boot/firebase'
import { SessionStorage } from 'quasar'

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
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
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
        SessionStorage.set('usernName', user.email)
      } else {
        commit('setLoggedIn', false)
        SessionStorage.set('loggedIn', false)
        SessionStorage.clear('usernName', '')
      }
    })
  },
  logoutUser () {
    firebaseAuth.signOut()
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
