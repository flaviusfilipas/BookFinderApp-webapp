const state = {
  offersModal: false,
  isOffersLoadingSpinnerVisible: false,
  filterModal: false,
  alertsModal: false,
  deleteAlertsModal: false
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
  },
  setAlertsModalVisibility ({ commit }, value) {
    commit('setAlertsModalVisibility', value)
  },
  setDeleteAlertsModalVisibility ({ commit }, value) {
    commit('setDeleteAlertsModalVisibility', value)
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
  },
  setAlertsModalVisibility (state, value) {
    state.alertsModal = value
  },
  setDeleteAlertsModalVisibility (state, value) {
    state.deleteAlertsModal = value
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
  },
  getAlertsModal: (state) => {
    return state.alertsModal
  },
  getDeleteAlertsModal: (state) => {
    return state.deleteAlertsModal
  }
}
export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
