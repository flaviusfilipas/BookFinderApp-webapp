const state = {
  drinks: []
}

const actions = {
  saveDrinks ({ commit }, payload) {
    commit('saveDrinks', payload)
  }
}

const mutations = {
  saveDrinks (state, payload) {
    Object.assign(state.drinks, payload.drinks)
    console.log(state.drinks)
  }
}

const getters = {
  getDrinks: (state) => {
    return state.drinks
  }
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
