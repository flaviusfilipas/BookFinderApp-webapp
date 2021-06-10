const state = {
  offersModal: false,
  isOffersLoadingSpinnerVisible: false,
  filterModal: false
}
const actions = {
  setFilterModal ({ commit }, value) {
    commit('setFilterModal', value)
  },
  setOffersLoadingSpinner ({ commit }, value) {
    commit('setOffersLoadingSpinner', value)
  },
  setOffersModalVisibility ({ commit }, value) {
    commit('setOffersModalVisibility', value)
  }
}
const mutations = {
  setFilterModal (state, value) {
    state.filterModal = value
  },
  setOffersLoadingSpinner (state, value) {
    state.isOffersLoadingSpinnerVisible = value
  },
  setOffersModalVisibility (state, value) {
    state.offersModal = value
  }
}
const getters = {
  getFilterModal: (state) => {
    return state.filterModal
  },
  getOffersModal: (state) => {
    return state.offersModal
  },
  getOffersLoadingSpinnerState: (state) => {
    return state.isOffersLoadingSpinnerVisible
  }
}
export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
