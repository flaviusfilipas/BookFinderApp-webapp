/* eslint-disable no-empty-pattern */
import axios from 'axios'
import { firebaseAuth } from 'boot/firebase'
import { SessionStorage, Loading, Dialog } from 'quasar'
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
    Loading.show()
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        axios.post(`${endpoints.BACKEND_URL}${endpoints.POST_USER}`, { id: response.user.uid, email: response.user.email })
        Loading.hide()
        window.history.length > 1 ? this.$router.go(-2) : this.$router.push('/search')
        console.log('response ', response)
      })
      .catch(error => {
        Loading.hide()
        Dialog.create({
          title: 'Error',
          message: error.message
        })
        console.log('error ', error)
      })
  },
  loginUser ({}, payload) {
    Loading.show()
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        Loading.hide()
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/search')
        console.log('login response', response)
      }).catch(error => {
        Loading.hide()
        Dialog.create({
          title: 'Error',
          message: error.message
        })
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
